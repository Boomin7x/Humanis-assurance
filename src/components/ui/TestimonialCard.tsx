// src/components/ui/TestimonialCard.tsx
/**
 * HUMANIS TESTIMONIAL CARD COMPONENT
 *
 * Features:
 * - Left teal border accent
 * - 5-star rating display
 * - Quote text in italic
 * - Author info with name, company, and sector badge
 * - Optional avatar image
 * - Clean, trustworthy design
 */

import { Business, Person, Star, VerifiedUser } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { RADIUS } from "@/constants/layout";
import {
  GLASS_NAVY_04,
  NAVY_800,
  NEUTRAL_200,
  NEUTRAL_600,
  PRIMARY_500,
  TEAL_500,
  WHITE,
} from "@/theme/tokens";

interface TestimonialCardProps {
  /** Quote text */
  quote: string;
  /** Author name */
  author: string;
  /** Company name */
  company: string;
  /** Business sector */
  sector: string;
  /** Avatar image URL */
  avatar?: string;
  /** Star rating (1-5) */
  rating?: number;
  /** Client type for trust indicators */
  clientType?: "particulier" | "entreprise" | "pme";
  /** Insurance product category */
  productCategory?: "iardt" | "vie" | "mixed";
  /** Years as client for credibility */
  yearsAsClient?: number;
  /** Enable animations */
  animated?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  company,
  sector,
  avatar,
  rating = 5,
  clientType = "entreprise",
  productCategory,
  yearsAsClient,
  animated = true,
}) => {
  // Generate author initials for fallback
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get client type configuration for trust indicators
  const clientConfig = {
    particulier: {
      icon: Person,
      label: "Particulier",
      bgColor: `${TEAL_500}12`,
      color: TEAL_500,
    },
    entreprise: {
      icon: Business,
      label: "Entreprise",
      bgColor: `${PRIMARY_500}12`,
      color: PRIMARY_500,
    },
    pme: {
      icon: VerifiedUser,
      label: "PME-PMI",
      bgColor: `${NAVY_800}12`,
      color: NAVY_800,
    },
  };

  const typeConfig = clientConfig[clientType];

  // Mobile-first: disable animations on mobile for better performance
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Render star rating
  const renderStars = (): React.ReactNode => {
    return (
      <Stack direction="row" spacing={0.25}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            sx={{
              // Mobile-first responsive star sizing
              fontSize: { xs: "0.875rem", sm: "1rem" },
              color: star <= rating ? TEAL_500 : NEUTRAL_200,
            }}
          />
        ))}
      </Stack>
    );
  };

  const MotionCard = animated && !isMobile ? motion.div : "div";

  return (
    <MotionCard
      {...(animated &&
        !isMobile && {
          whileHover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
          initial: { y: 0 },
          animate: { y: 0 },
        })}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: WHITE,
          border: `1px solid ${NEUTRAL_200}`,
          borderLeft: `4px solid ${TEAL_500}`, // Left accent border
          borderRadius: RADIUS.md / 8,
          boxShadow: "none",
          overflow: "hidden",
          transition: "all 200ms ease",
          "&:hover": {
            borderColor: PRIMARY_500,
            borderLeftColor: TEAL_500, // Keep accent border
            backgroundColor: GLASS_NAVY_04,
            boxShadow: "none", // NO SHADOWS - depth through border contrast
          },
        }}
      >
        <CardContent
          sx={{
            // Mobile-first responsive padding
            p: { xs: 2.5, sm: 3, md: 4 },
            pb: {
              xs: "20px !important",
              sm: "24px !important",
              md: "32px !important",
            },
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Header: Rating & Trust Indicators */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: { xs: 1.5, sm: 2 } }}
          >
            <Box>{renderStars()}</Box>

            {/* Trust Badge */}
            <Stack direction="row" spacing={1} alignItems="center">
              {yearsAsClient && (
                <Chip
                  label={`${yearsAsClient}+ ans`}
                  size="small"
                  icon={
                    <VerifiedUser sx={{ fontSize: "0.875rem !important" }} />
                  }
                  sx={{
                    backgroundColor: `${TEAL_500}12`,
                    color: TEAL_500,
                    fontWeight: 500,
                    fontSize: "0.6875rem",
                    height: 20,
                    borderRadius: RADIUS.pill / 8,
                    "& .MuiChip-label": { px: 1, py: 0 },
                    "& .MuiChip-icon": { ml: 0.5 },
                  }}
                />
              )}
            </Stack>
          </Stack>

          {/* Quote - Insurance Testimonial Styling */}
          <Typography
            variant="body1"
            component="blockquote"
            sx={{
              fontStyle: "italic",
              color: NAVY_800,
              lineHeight: { xs: 1.6, sm: 1.65 },
              // Mobile-first responsive quote sizing
              fontSize: { xs: "0.9375rem", sm: "1rem" },
              fontWeight: 400,
              mb: { xs: 2.5, sm: 3 },
              flex: 1,
              position: "relative",
              pl: { xs: 1.5, sm: 2 },
              pr: 1,
              "&::before": {
                content: '"\\201C"',
                // Mobile-first responsive quote mark sizing
                fontSize: { xs: "2rem", sm: "2.5rem" },
                fontWeight: 300,
                color: TEAL_500,
                position: "absolute",
                top: { xs: "-10px", sm: "-12px" },
                left: { xs: "-6px", sm: "-8px" },
                lineHeight: 1,
                opacity: 0.6,
                fontFamily: "serif",
              },
              // Insurance industry emphasis on trust words
              "& strong": {
                fontWeight: 600,
                color: NAVY_800,
                fontStyle: "normal",
              },
            }}
          >
            {quote}
          </Typography>

          {/* Author Section */}
          <Stack
            direction="row"
            spacing={{ xs: 1.5, sm: 2 }}
            alignItems="center"
            sx={{ mt: "auto" }}
          >
            {/* Avatar - Professional Insurance Client Photo */}
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={avatar}
                alt={`${author} - Client Humanis Assurances`}
                sx={{
                  // Mobile-first responsive avatar sizing
                  width: { xs: 48, sm: 56 },
                  height: { xs: 48, sm: 56 },
                  backgroundColor: typeConfig.color,
                  color: WHITE,
                  fontWeight: 600,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  border: {
                    xs: `2px solid ${WHITE}`,
                    sm: `3px solid ${WHITE}`,
                  },
                  outline: `2px solid ${typeConfig.color}`,
                  boxShadow: "none", // NO SHADOWS - depth through border layering
                }}
              >
                {!avatar && getInitials(author)}
              </Avatar>

              {/* Client Type Indicator */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  // Mobile-first responsive badge sizing
                  width: { xs: 18, sm: 20 },
                  height: { xs: 18, sm: 20 },
                  borderRadius: "50%",
                  backgroundColor: typeConfig.color,
                  color: WHITE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: {
                    xs: `1.5px solid ${WHITE}`,
                    sm: `2px solid ${WHITE}`,
                  },
                  boxShadow: "none", // NO SHADOWS - depth through border contrast
                }}
              >
                <typeConfig.icon
                  sx={{ fontSize: { xs: "0.625rem", sm: "0.75rem" } }}
                />
              </Box>
            </Box>

            {/* Author Info - Insurance Client Credibility */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Name with professional title emphasis */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: NAVY_800,
                  // Mobile-first responsive author name sizing
                  fontSize: { xs: "0.9375rem", sm: "1rem" },
                  lineHeight: 1.3,
                  mb: { xs: 0.375, sm: 0.5 },
                  letterSpacing: "-0.005em",
                }}
              >
                {author}
              </Typography>

              {/* Company with trust indicator */}
              <Typography
                variant="body2"
                sx={{
                  color: NEUTRAL_600,
                  // Mobile-first responsive company name sizing
                  fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                  lineHeight: 1.3,
                  mb: { xs: 1.25, sm: 1.5 },
                  fontWeight: 500,
                }}
              >
                {company}
              </Typography>

              {/* Sector & Client Type Badges */}
              <Stack
                direction="row"
                spacing={{ xs: 0.75, sm: 1 }}
                flexWrap="wrap"
                useFlexGap
              >
                <Chip
                  label={sector}
                  size="small"
                  sx={{
                    backgroundColor: `${TEAL_500}12`,
                    color: TEAL_500,
                    fontWeight: 500,
                    // Mobile-first responsive badge sizing
                    fontSize: { xs: "0.625rem", sm: "0.6875rem" },
                    height: { xs: 22, sm: 24 },
                    borderRadius: RADIUS.pill / 8,
                    "& .MuiChip-label": {
                      px: 1.5,
                      py: 0,
                    },
                  }}
                />

                <Chip
                  label={typeConfig.label}
                  size="small"
                  icon={
                    <typeConfig.icon
                      sx={{
                        fontSize: {
                          xs: "0.625rem !important",
                          sm: "0.75rem !important",
                        },
                      }}
                    />
                  }
                  sx={{
                    backgroundColor: typeConfig.bgColor,
                    color: typeConfig.color,
                    fontWeight: 500,
                    fontSize: { xs: "0.625rem", sm: "0.6875rem" },
                    height: { xs: 22, sm: 24 },
                    borderRadius: RADIUS.pill / 8,
                    "& .MuiChip-label": {
                      px: 1,
                      py: 0,
                    },
                    "& .MuiChip-icon": {
                      ml: 0.5,
                    },
                  }}
                />

                {productCategory && (
                  <Chip
                    label={productCategory.toUpperCase()}
                    size="small"
                    sx={{
                      backgroundColor: `${PRIMARY_500}12`,
                      color: PRIMARY_500,
                      fontWeight: 600,
                      fontSize: { xs: "0.5625rem", sm: "0.625rem" },
                      height: { xs: 22, sm: 24 },
                      borderRadius: RADIUS.pill / 8,
                      "& .MuiChip-label": {
                        px: 1,
                        py: 0,
                        letterSpacing: "0.05em",
                      },
                    }}
                  />
                )}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </MotionCard>
  );
};

export default TestimonialCard;
