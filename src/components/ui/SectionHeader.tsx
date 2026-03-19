// src/components/ui/SectionHeader.tsx
/**
 * HUMANIS SECTION HEADER COMPONENT
 *
 * Standardized section header with:
 * - Optional overline (teal, all-caps, above title)
 * - Title (main heading)
 * - Optional subtitle (below title)
 * - Configurable text alignment
 * - Consistent typography and spacing
 * - Framer Motion animation support
 */

import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { animationPresets } from "@/theme/motion";
import { NAVY_800, NEUTRAL_600, TEAL_500, WHITE } from "@/theme/tokens";

interface SectionHeaderProps {
  /** Small uppercase label above the title */
  overline?: string;
  /** Main section title */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Color variant for different backgrounds */
  variant?: "light" | "dark";
  /** Additional className for styling */
  className?: string;
  /** Enable entrance animation */
  animated?: boolean;
  /** Custom animation delay */
  animationDelay?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  overline,
  title,
  subtitle,
  align = "left",
  variant = "light",
  className,
  animated = true,
  animationDelay = 0,
}) => {
  // const { t } = useTranslation()

  const isLight = variant === "light";
  // const isDark = variant === 'dark'

  const textColor = {
    overline: isLight ? TEAL_500 : TEAL_500,
    title: isLight ? NAVY_800 : WHITE,
    subtitle: isLight ? NEUTRAL_600 : "rgba(255,255,255,0.8)",
  };

  const textAlign =
    align === "center" ? "center" : align === "right" ? "right" : "left";

  const MotionBox = animated ? motion.div : "div";

  return (
    <MotionBox
      className={className}
      {...(animated && {
        variants: animationPresets.sectionHeader,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px 0px" },
        transition: { delay: animationDelay },
      })}
    >
      <Box
        sx={{
          textAlign,
          maxWidth: align === "center" ? "800px" : "none",
          mx: align === "center" ? "auto" : 0,
        }}
      >
        <Stack
          spacing={2}
          alignItems={align === "center" ? "center" : "flex-start"}
        >
          {/* Overline */}
          {overline && (
            <Typography
              variant="overline"
              component="div"
              sx={{
                color: textColor.overline,
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.6875rem", // 11px
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                lineHeight: 1.5,
                mb: 0.5,
              }}
            >
              {overline}
            </Typography>
          )}

          {/* Title */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: textColor.title,
              fontSize: {
                xs: "clamp(1.75rem, 4vw + 0.5rem, 2.25rem)", // Mobile: 28px-36px
                md: "clamp(2rem, 3.5vw + 0.25rem, 2.75rem)", // Desktop: 32px-44px
              },
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              maxWidth: "100%",
            }}
          >
            {title}
          </Typography>

          {/* Subtitle */}
          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                color: textColor.subtitle,
                fontFamily: "DM Sans, sans-serif",
                fontSize: { xs: "1rem", md: "1.125rem" }, // 16px → 18px
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: align === "center" ? "600px" : "520px",
                mt: 1,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Stack>
      </Box>
    </MotionBox>
  );
};

export default SectionHeader;
