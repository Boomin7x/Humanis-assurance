// src/features/home/components/ProductCategoryCard.tsx
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { Badge, HumanisImage } from "@/components/ui";
import { animationPresets } from "@/theme/motion";
import { WHITE } from "@/theme/tokens";

/**
 * ProductCategoryCard Props
 */
export interface ProductCategoryCardProps {
  readonly badgeText: string;
  readonly badgeVariant: "blue" | "teal";
  readonly title: string;
  readonly productCount: number;
  readonly ctaText: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly overlayGradient: string;
  readonly hoverOverlayColor: string;
  readonly href: string;
  readonly animationDelay?: number;
}

/**
 * ProductCategoryCard Component
 *
 * Large image card for product category showcasing:
 * - IARDT (Incendie, Accidents, Risques Divers & Transport)
 * - Assurance Vie (Prévoyance & Épargne)
 *
 * Features:
 * - Full-bleed imagery with gradient overlay
 * - Hover animations (desktop only)
 * - Touch-optimized for mobile
 * - Accessible navigation
 */
export const ProductCategoryCard: React.FC<ProductCategoryCardProps> = React.memo(
  ({
    badgeText,
    badgeVariant,
    title,
    productCount,
    ctaText,
    imageUrl,
    imageAlt,
    overlayGradient,
    hoverOverlayColor,
    href,
    animationDelay = 0,
  }) => {
    const handleClick = (): void => {
      window.location.href = href;
    };

    return (
      <motion.div
        variants={animationPresets.slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: animationDelay }}
      >
        <Box
          component="article"
          onClick={handleClick}
          sx={{
            position: "relative",
            height: { xs: "350px", sm: "400px", md: "500px" },
            borderRadius: "8px",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 300ms ease",
            "&:hover": {
              transform: { xs: "none", md: "scale(1.02)" },
              "& .category-image": {
                transform: { xs: "none", md: "scale(1.05)" },
              },
              "& .category-overlay": {
                backgroundColor: hoverOverlayColor,
              },
            },
          }}
          role="button"
          tabIndex={0}
          aria-label={`View ${title} products`}
          onKeyDown={(e): void => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <Box
            className="category-image"
            sx={{
              position: "absolute",
              inset: 0,
              transition: "transform 300ms ease",
            }}
          >
            <HumanisImage
              src={imageUrl}
              alt={imageAlt}
              ratio="3/4"
              radius={8}
              priority={false}
            />
          </Box>

          <Box
            className="category-overlay"
            sx={{
              position: "absolute",
              inset: 0,
              background: overlayGradient,
              transition: "background-color 300ms ease",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: { xs: 3, md: 4 },
              color: WHITE,
            }}
          >
            <Badge variant={badgeVariant} sx={{ mb: 2 }}>
              {badgeText}
            </Badge>

            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.5rem", md: "1.75rem" },
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.9)",
                mb: 2,
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              {productCount} produits disponibles
            </Typography>

            <Typography
              component="span"
              sx={{
                color: badgeVariant === "blue" ? "#3498db" : WHITE,
                fontSize: "0.875rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                "& .arrow": {
                  transition: "transform 200ms ease",
                },
                "&:hover .arrow": {
                  transform: "translateX(4px)",
                },
              }}
            >
              {ctaText}
              <ArrowForwardIcon className="arrow" sx={{ fontSize: "1rem" }} />
            </Typography>
          </Box>
        </Box>
      </motion.div>
    );
  }
);

ProductCategoryCard.displayName = "ProductCategoryCard";
