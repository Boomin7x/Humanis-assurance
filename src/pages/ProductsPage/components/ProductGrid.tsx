import Grid from "@mui/material/Grid";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@mui/material";
import React from "react";

import { ProductCard, SectionHeader, SectionWrapper } from "@/components/ui";
import { Product } from "@/types";
import { ANIMATION_VARIANTS } from "../constants/animations";

interface ProductGridProps {
  title: string;
  overline: string;
  products: Product[];
  background?: "white" | "alt" | "dark";
  sectionId?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  overline,
  products,
  background = "white",
  sectionId,
}) => {
  return (
    <SectionWrapper id={sectionId} background={background} paddingY="normal">
      <Container maxWidth="lg">
        <motion.div {...ANIMATION_VARIANTS.fadeInUp} viewport={{ once: true }}>
          <SectionHeader overline={overline} title={title} align="center" />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${sectionId}-grid`}
              {...ANIMATION_VARIANTS.staggerContainer}
            >
              <Grid container spacing={3} sx={{ mt: 2 }}>
                {products.map((product, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={product.id}>
                    <motion.div {...ANIMATION_VARIANTS.staggerItem(index)}>
                      <ProductCard {...product} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
};
