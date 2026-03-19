/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ui/HumanisImage.tsx
/**
 * HUMANIS IMAGE COMPONENT
 *
 * Insurance UI Design System Image Component
 *
 * Features:
 * - Consistent visual grammar for all images
 * - Professional aspect ratios and overlays
 * - Trust-building image presentation
 * - Loading states with insurance branding
 * - Error states with branded fallback
 * - Grayscale to color hover for partner logos
 * - Insurance-appropriate overlays and treatments
 *
 * Design Intent:
 * - Images are not decoration — they communicate trust and authority
 * - Every photograph follows consistent visual grammar
 * - Professional imagery builds confidence in insurance expertise
 * - Regulatory compliance through proper alt text and accessibility
 */

import { Box, SxProps, alpha } from "@mui/material";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";

import {
  NAVY_800,
  NEUTRAL_100,
  NEUTRAL_200,
  PRIMARY_500,
  TEAL_500,
  WHITE,
} from "@/theme/tokens";
import { getImage } from "@/utils/imageLoader";

interface HumanisImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Aspect ratio preset */
  ratio?: "16/9" | "4/3" | "3/4" | "1/1" | "hero";
  /** Overlay preset for text readability */
  overlay?: "none" | "dark" | "navy" | "blue";
  /** Custom overlay opacity (0.0 - 1.0) */
  overlayOpacity?: number;
  /** Border radius in pixels or responsive object */
  radius?:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  /** Priority loading for above-fold images */
  priority?: boolean;
  /** Grayscale with color on hover (for partner logos) */
  grayscale?: boolean;
  /** Custom className */
  className?: string;
  /** Custom click handler */
  onClick?: () => void;
  /** Animation enabled */
  animated?: boolean;
  sx?: SxProps;
  /** Fallback category for placeholder */
  fallbackCategory?:
    | "hero"
    | "office"
    | "team"
    | "business"
    | "consultation"
    | "family"
    | "international";
}

// Aspect ratio presets following insurance industry standards
const ratios = {
  "16/9": "16 / 9", // Page hero backgrounds, wide service photos - authoritative
  "4/3": "4 / 3", // Standard section photos - professional
  "3/4": "3 / 4", // Team member portraits - trustworthy
  "1/1": "1 / 1", // Square avatars, client photos - approachable
  hero: "14 / 9", // Ultra-wide hero - commanding presence
};

// Overlay presets for insurance context
const overlays = {
  none: "transparent",
  dark: "rgba(0, 0, 0, 0.45)", // Generic darkening for readability
  navy: "rgba(17, 27, 46, 0.72)", // Hero navy overlay - authority
  blue: "rgba(13, 94, 175, 0.55)", // Blue-tinted overlay - brand consistency
};

const HumanisImage: React.FC<HumanisImageProps> = ({
  src,
  alt,
  ratio = "4/3",
  overlay = "none",
  overlayOpacity,
  radius = 8,
  priority = false,
  grayscale = false,
  className,
  onClick,
  animated = true,
  sx = {},
  fallbackCategory = "business",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imgRef = React.useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setImageLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Get image with fallback handling
  const imageSrc = hasError ? getImage("", fallbackCategory) : src;

  // Determine overlay color and opacity
  const overlayColor = overlays[overlay];
  const finalOverlayOpacity = overlayOpacity ?? (overlay === "none" ? 0 : 1);

  // Handle responsive border radius
  const getBorderRadius = () => {
    if (typeof radius === "number") {
      return `${radius}px`;
    } else if (radius && typeof radius === "object") {
      // Convert responsive object to CSS
      const responsiveRadius: any = {};
      if (radius.xs) responsiveRadius.xs = `${radius.xs}px`;
      if (radius.sm) responsiveRadius.sm = `${radius.sm}px`;
      if (radius.md) responsiveRadius.md = `${radius.md}px`;
      if (radius.lg) responsiveRadius.lg = `${radius.lg}px`;
      if (radius.xl) responsiveRadius.xl = `${radius.xl}px`;
      return responsiveRadius;
    }
    return "8px"; // default
  };

  const MotionBox = animated ? motion.div : Box;

  React.useEffect(() => {
    // If the browser already has the image (common with Base64)

    if (imgRef.current?.complete) {
      handleLoad();
    }
  }, [src, handleLoad]);

  return (
    <MotionBox
      className={className}
      onClick={onClick}
      sx={[
        {
          position: "relative",
          width: "100%",
          aspectRatio: ratios[ratio],
          borderRadius: getBorderRadius(),
          overflow: "hidden",
          backgroundColor: NEUTRAL_100,
          cursor: onClick ? "pointer" : "default",
          // Grayscale hover effect for partner logos
          ...(grayscale && {
            filter: "grayscale(100%)",
            transition: "filter 300ms ease",
            "&:hover": {
              filter: "grayscale(0%)",
            },
          }),
        },
        // Spread user sx as separate array item to avoid type conflicts
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...(animated && {
        whileHover: onClick ? { scale: 1.02 } : undefined,
        transition: { duration: 0.2 },
      })}
    >
      {/* Loading State - Insurance Branded Shimmer */}
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg, ${NEUTRAL_100} 25%, ${NEUTRAL_200} 50%, ${NEUTRAL_100} 75%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            "@keyframes shimmer": {
              "0%": { backgroundPosition: "-200% 0" },
              "100%": { backgroundPosition: "200% 0" },
            },
          }}
        >
          {/* Humanis Loading Mark */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: alpha(PRIMARY_500, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${alpha(PRIMARY_500, 0.2)}`,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: PRIMARY_500,
                animation: "pulse 1.5s ease-in-out infinite",

                "@keyframes pulse": {
                  "0%, 100%": { transform: "scale(1)", opacity: 1 },
                  "50%": { transform: "scale(1.2)", opacity: 0.7 },
                },
              }}
            />
          </Box>
        </Box>
      )}

      {/* Error State - Branded Placeholder */}
      {hasError && !isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: NEUTRAL_100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            border: `1px dashed ${NEUTRAL_200}`,
          }}
        >
          {/* Humanis Mark */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: alpha(NAVY_800, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${alpha(NAVY_800, 0.2)}`,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: NAVY_800,
              }}
            />
          </Box>

          {/* Fallback text for screen readers */}
          <Box
            component="span"
            sx={{
              fontSize: "0.75rem",
              color: NAVY_800,
              fontWeight: 500,
              textAlign: "center",
              px: 2,
              opacity: 0.7,
            }}
          >
            Image Humanis
          </Box>
        </Box>
      )}

      {/* Main Image */}

      <Box
        component="img"
        src={imageSrc}
        ref={imgRef}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={handleLoad}
        onError={handleError}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
          objectFit: "cover",
          objectPosition: "center",
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 300ms ease",
          display: hasError ? "none" : "block",
        }}
      />

      {/* Overlay for text readability */}
      {overlay !== "none" && imageLoaded && !hasError && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: overlayColor,
            opacity: finalOverlayOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Trust indicator for team photos */}
      {imageLoaded && !hasError && alt.toLowerCase().includes("team") && (
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: TEAL_500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 2px 4px ${alpha(TEAL_500, 0.3)}`,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: WHITE,
            }}
          />
        </Box>
      )}
    </MotionBox>
  );
};

export default HumanisImage;
