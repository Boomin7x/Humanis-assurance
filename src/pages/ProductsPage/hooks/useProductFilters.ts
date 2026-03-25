import { useMemo, useState } from "react";
import { allProducts, iardtProducts, vieProducts } from "@/data/products";

export type ProductTab = "all" | "iardt" | "vie";
export type ClientType = "all" | "particulier" | "entreprise";

export interface ProductFilters {
  activeTab: ProductTab;
  searchQuery: string;
  clientType: ClientType;
}

export const useProductFilters = () => {
  const [activeTab, setActiveTab] = useState<ProductTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [clientType, setClientType] = useState<ClientType>("all");

  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Filter by tab
    if (activeTab === "iardt") {
      products = iardtProducts;
    } else if (activeTab === "vie") {
      products = vieProducts;
    }

    // Filter by search query
    if (searchQuery) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return products;
  }, [activeTab, searchQuery]);

  const iardtFilteredProducts = useMemo(() => {
    return activeTab === "iardt" ? filteredProducts : iardtProducts;
  }, [activeTab, filteredProducts]);

  const vieFilteredProducts = useMemo(() => {
    return activeTab === "vie" ? filteredProducts : vieProducts;
  }, [activeTab, filteredProducts]);

  return {
    // State
    activeTab,
    searchQuery,
    clientType,

    // Derived state
    filteredProducts,
    iardtFilteredProducts,
    vieFilteredProducts,

    // Actions
    setActiveTab,
    setSearchQuery,
    setClientType,
  };
};