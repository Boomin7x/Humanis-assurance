// src/components/ui/StatCard.tsx
/**
 * HUMANIS STAT CARD COMPONENT
 *
 * Features:
 * - Large prominent number with counting animation
 * - Label below in smaller text
 * - Blue background (#0D5EAF) with white text
 * - Supports count-up animation when in view
 * - Tabular numbers for consistent width
 */

import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { PRIMARY_500, WHITE } from "@/theme/tokens";
import { statReveal } from "@/theme/motion";
import { RADIUS } from "@/constants/layout";

interface StatCardProps {
  /** The target number to count up to */
  number: number;
  /** Text label below the number */
  label: string;
  /** Optional icon to display with the stat */
  icon?: React.ReactElement;
  /** Suffix after the number (e.g., '+', '%', 'K') */
  suffix?: string;
  /** Prefix before the number (e.g., '$', '€') */
  prefix?: string;
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Enable count-up animation */
  animated?: boolean;
  /** Custom formatting function */
  formatNumber?: (value: number) => string;
}

// Custom hook for counting animation
const useCountUp = (
  target: number,
  duration: number = 2,
  shouldStart: boolean = false,
  formatNumber?: (value: number) => string,
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (target - startValue) * easeOut;

      if (formatNumber) {
        setCount(Math.floor(currentValue));
      } else {
        setCount(Math.floor(currentValue));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, shouldStart, formatNumber]);

  return count;
};

const StatCard: React.FC<StatCardProps> = ({
  number,
  label,
  icon,
  suffix = "",
  prefix = "",
  animationDuration = 2,
  animated = true,
  formatNumber,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  // Mobile-first: disable animations on mobile for better performance
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const count = useCountUp(
    number,
    animationDuration,
    animated && !isMobile ? isInView : true,
    formatNumber,
  );

  const displayNumber = animated && !isMobile ? count : number;
  const formattedNumber = formatNumber
    ? formatNumber(displayNumber)
    : displayNumber.toLocaleString();

  return (
    <Box
      ref={ref}
      component={motion.div}
      variants={animated && !isMobile ? statReveal : undefined}
      initial={animated && !isMobile ? "hidden" : undefined}
      animate={animated && !isMobile && isInView ? "visible" : undefined}
      sx={{
        backgroundColor: PRIMARY_500,
        borderRadius: RADIUS.md / 8, // Convert to MUI units
        // Mobile-first responsive padding - tight on mobile, comfortable on desktop
        padding: { xs: 2.5, sm: 3, md: 4 },
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg,
            rgba(255,255,255,0.1) 0%,
            rgba(255,255,255,0.05) 50%,
            rgba(255,255,255,0.0) 100%)`,
          pointerEvents: "none",
        },
      }}
    >
      {/* Icon */}
      {icon && (
        <Box
          sx={{
            color: "rgba(255,255,255,0.9)",
            mb: { xs: 0.75, sm: 1 },
            position: "relative",
            zIndex: 1,
            "& svg": {
              // Mobile-first responsive icon sizing
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            },
          }}
        >
          {icon}
        </Box>
      )}

      {/* Number */}
      <Typography
        variant="h2"
        component="div"
        sx={{
          color: WHITE,
          // Mobile-first responsive sizing with fluid clamp
          fontSize: {
            xs: "clamp(1.75rem, 8vw, 2.5rem)", // Mobile: 28px-40px (tighter for small screens)
            sm: "clamp(2rem, 6vw, 2.75rem)", // Mobile landscape: 32px-44px
            md: "clamp(2.5rem, 4vw, 3.5rem)", // Desktop: 40px-56px
          },
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          fontFeatureSettings: '"tnum" 1', // Tabular numbers for consistent width
          mb: { xs: 0.75, sm: 1 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {prefix}
        {formattedNumber}
        {suffix}
      </Typography>

      {/* Label */}
      <Typography
        variant="body2"
        component="div"
        sx={{
          color: "rgba(255,255,255,0.9)",
          // Mobile-first responsive label sizing
          fontSize: { xs: "0.75rem", sm: "0.8125rem", md: "0.875rem" }, // 12px → 13px → 14px
          fontWeight: 500,
          lineHeight: { xs: 1.3, sm: 1.4 },
          letterSpacing: "0.01em",
          position: "relative",
          zIndex: 1,
          // Mobile: slightly wider max-width for better readability
          maxWidth: { xs: "160px", sm: "150px", md: "140px" },
          mx: "auto",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default StatCard;
