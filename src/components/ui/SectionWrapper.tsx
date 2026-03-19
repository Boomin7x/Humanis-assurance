// src/components/ui/SectionWrapper.tsx
/**
 * HUMANIS SECTION WRAPPER COMPONENT
 *
 * Standardized section container with:
 * - Consistent vertical padding (responsive)
 * - Background color variants
 * - Max-width container with gutters
 * - Optional section ID for anchor links
 * - Accessible landmark structure
 */

import { Box, Container } from "@mui/material";
import React from "react";

import { GUTTER_DESKTOP, GUTTER_MOBILE, SECTION_PY } from "@/constants/layout";
import { NAVY_800, NEUTRAL_50, PRIMARY_500 } from "@/theme/tokens";

interface SectionWrapperProps {
  children: React.ReactNode;
  /** Background color variant */
  background?: "white" | "alt" | "dark" | "blue";
  /** Section ID for anchor navigation */
  id?: string;
  /** Additional padding on top/bottom */
  paddingY?: "none" | "small" | "normal" | "large";
  /** Custom component type (section, div, article) */
  component?: "section" | "div" | "article";
  /** Additional className for styling */
  className?: string;
  /** Container max width */
  maxWidth?: "sm" | "md" | "lg" | "xl" | false;
  /** Disable horizontal gutters */
  disableGutters?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  background = "white",
  id,
  paddingY = "normal",
  component = "section",
  className,
  maxWidth = "xl",
  disableGutters = false,
}) => {
  // Background color mapping
  const backgroundColor = {
    white: "#FFFFFF",
    alt: NEUTRAL_50, // Light grey alternating sections
    dark: NAVY_800, // Dark navy
    blue: PRIMARY_500, // Brand blue
  }[background];

  // Padding mapping
  const sectionPadding = {
    none: { xs: 0, md: 0 },
    small: { xs: "32px", md: "48px" },
    normal: SECTION_PY, // Standard section padding
    large: { xs: "80px", md: "120px" },
  }[paddingY];

  return (
    <Box
      component={component}
      id={id}
      className={className}
      sx={{
        backgroundColor,
        py: sectionPadding,
        position: "relative",
        width: "100%",
      }}
    >
      <Container
        maxWidth={maxWidth}
        disableGutters={disableGutters}
        sx={{
          px: disableGutters
            ? 0
            : {
                xs: `${GUTTER_MOBILE}px`,
                md: `${GUTTER_DESKTOP}px`,
              },
          position: "relative",
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default SectionWrapper;
