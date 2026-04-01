// src/features/home/sections/ProductsSection.tsx
import { Container, Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { SectionHeader, SectionWrapper } from "@/components/ui";
import { ProductCategoryCard } from "@/features/home/components/ProductCategoryCard";
import { productCategories } from "@/features/home/data/productCategories";
import { GRID_MOBILE } from "@/theme/responsive";

/**
 * ProductsSection Component
 *
 * Showcases two main insurance product categories:
 * - IARDT (Incendie, Accidents, Risques Divers & Transport)
 * - Assurance Vie (Prévoyance & Épargne)
 *
 * Features large, visually compelling category cards
 * with distinct branding for each category
 */
export const ProductsSection: React.FC = React.memo(() => {
  const { t } = useTranslation();

  return (
    <SectionWrapper
      background="dark"
      paddingY="normal"
      maxWidth={false}
      aria-label="Insurance product categories"
    >
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        <SectionHeader
          overline={t("sections.products.overline")}
          title={t("sections.products.title")}
          align="center"
          variant="dark"
          animationDelay={0.1}
        />

        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 4 }}
          sx={{ mt: { xs: 3, sm: 4 } }}
        >
          {productCategories.map((category, index) => (
            <Grid key={category.id} size={GRID_MOBILE.halfOnDesktop}>
              <ProductCategoryCard
                badgeText={t(category.badgeTextKey)}
                badgeVariant={category.badgeVariant}
                title={t(category.titleKey)}
                productCount={category.productCount}
                ctaText={t(category.ctaTextKey)}
                imageUrl={category.imageUrl}
                imageAlt={t(category.imageAltKey)}
                overlayGradient={category.overlayGradient}
                hoverOverlayColor={category.hoverOverlayColor}
                href={category.href}
                animationDelay={index * 0.1 + 0.1}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
});

ProductsSection.displayName = "ProductsSection";
