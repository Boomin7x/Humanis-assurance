import React from "react";
import { Container } from "@mui/material";
import { motion } from "framer-motion";

import { SectionWrapper } from "@/components/ui";
import { useProductFilters } from "./hooks/useProductFilters";
import { ProductHero } from "./components/ProductHero";
import { ProductFilterBar } from "./components/ProductFilterBar";
import { ProductGrid } from "./components/ProductGrid";
import { ProductQuiz } from "./components/ProductQuiz";
import { ProductCTA } from "./components/ProductCTA";
import { ANIMATION_VARIANTS } from "./constants/animations";

const ProductsPage: React.FC = () => {
  const {
    activeTab,
    searchQuery,
    clientType,
    iardtFilteredProducts,
    vieFilteredProducts,
    setActiveTab,
    setSearchQuery,
    setClientType,
  } = useProductFilters();

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: "all" | "iardt" | "vie",
  ) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {/* Hero Section */}
      <ProductHero activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Filter Bar */}
      <ProductFilterBar
        searchQuery={searchQuery}
        clientType={clientType}
        onSearchChange={setSearchQuery}
        onClientTypeChange={setClientType}
        onStartQuiz={() => {
          const element = document.getElementById("quiz-section");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* IARDT Products Grid */}
      {(activeTab === "all" || activeTab === "iardt") && (
        <ProductGrid
          sectionId="iardt"
          overline="IARDT"
          title="Incendie, Accidents, Risques Divers & Transport"
          products={iardtFilteredProducts}
          background="white"
        />
      )}

      {/* Assurance Vie Products Grid */}
      {(activeTab === "all" || activeTab === "vie") && (
        <ProductGrid
          sectionId="vie"
          overline="Assurance Vie"
          title="Prévoyance & Épargne"
          products={vieFilteredProducts}
          background="alt"
        />
      )}

      {/* Product Quiz Section */}
      <SectionWrapper
        id="quiz-section"
        background="white"
        paddingY="normal"
      >
        <Container maxWidth="md">
          <motion.div {...ANIMATION_VARIANTS.fadeInUp} viewport={{ once: true }}>
            <ProductQuiz />
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* CTA Section */}
      <ProductCTA />
    </>
  );
};

export default ProductsPage;