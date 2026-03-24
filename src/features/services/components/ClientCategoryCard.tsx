// src/features/services/components/ClientCategoryCard.tsx
/**
 * CLIENT CATEGORY CARD COMPONENT
 *
 * Displays a client category (Particuliers or Entreprises) with:
 * - Background image with overlay
 * - Icon, title, and feature list
 * - Call-to-action button
 * - Hover effects
 */

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

import { HumanisImage } from "@/components/ui";
import type { ClientCategory } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ClientCategoryCardProps {
  readonly category: ClientCategory;
  readonly delay?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// ICON MAPPING
// ─────────────────────────────────────────────────────────────────────────────

const ICON_MAP = {
  person: PersonIcon,
  business: BusinessIcon,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ClientCategoryCard Component
 *
 * Interactive card displaying a client category with image, features, and CTA.
 *
 * @component
 * @example
 * ```tsx
 * <ClientCategoryCard category={category} delay={0.2} />
 * ```
 */
export const ClientCategoryCard: React.FC<ClientCategoryCardProps> = React.memo(
  ({ category, delay = 0 }) => {
    const prefersReducedMotion = useReducedMotion();
    const enableAnimations = !prefersReducedMotion;
    const IconComponent = ICON_MAP[category.iconType];

    return (
      <motion.div
        initial={enableAnimations ? { opacity: 0, scale: 0.95 } : undefined}
        whileInView={enableAnimations ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        style={{ height: "100%" }}
      >
        <Card
          sx={{
            position: "relative",
            minHeight: { xs: 420, sm: 460, md: 480 },
            height: "100%",
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
          data-testid={`client-category-${category.id}`}
          role="article"
          aria-label={`Catégorie client: ${category.title}`}
        >
          {/* Background Photo */}
          <CardContent
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
            role="presentation"
            aria-hidden="true"
          >
            <HumanisImage
              src={category.imageSrc}
              alt={category.imageAlt}
              ratio="1/1"
              overlay={category.overlayType}
              overlayOpacity={category.overlayOpacity}
              radius={0}
            />
          </CardContent>

          {/* Content */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              color: "white",
              p: { xs: 3, sm: 3.5, md: 4 },
              background: category.gradientOverlay,
              height: "100%",
              width: "100%",
            }}
          >
            <Stack spacing={{ xs: 2.5, sm: 3 }}>
              {/* Icon */}
              <IconComponent
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                  color: "white",
                }}
                aria-hidden="true"
              />

              {/* Title */}
              <Typography
                variant="h4"
                component="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", sm: "1.75rem" },
                  lineHeight: 1.3,
                }}
              >
                {category.title}
              </Typography>

              {/* Features List */}
              <Stack
                component="ul"
                spacing={1}
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                }}
                aria-label="Services disponibles"
              >
                {category.features.map((feature, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body1"
                    sx={{
                      fontSize: { xs: "0.9375rem", sm: "1rem" },
                      "&::before": {
                        content: '"•"',
                        marginRight: 1,
                      },
                    }}
                  >
                    {feature}
                  </Typography>
                ))}
              </Stack>

              {/* CTA Button */}
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                href={category.ctaHref}
                sx={{
                  borderColor: "white",
                  color: "white",
                  alignSelf: "flex-start",
                  fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                  px: { xs: 2.5, sm: 3 },
                  py: { xs: 1, sm: 1.25 },
                  minHeight: { xs: 42, sm: 44 }, // WCAG touch target
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                aria-label={`${category.ctaText} pour ${category.title}`}
              >
                {category.ctaText}
              </Button>
            </Stack>
          </Box>
        </Card>
      </motion.div>
    );
  },
);

ClientCategoryCard.displayName = "ClientCategoryCard";

export default ClientCategoryCard;
