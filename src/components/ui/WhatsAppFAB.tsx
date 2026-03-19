/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/ui/WhatsAppFAB.tsx
/**
 * HUMANIS WHATSAPP FLOATING ACTION BUTTON
 *
 * Features:
 * - Fixed position bottom-right corner
 * - WhatsApp green background with pulse animation
 * - Tooltip with call-to-action text
 * - Links to WhatsApp with pre-filled message
 * - Hide/show based on scroll position
 * - Accessible with proper ARIA labels
 */

import { WhatsApp } from "@mui/icons-material";
import {
  Box,
  Fab,
  Tooltip,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Z } from "@/constants/layout";
import { WHATSAPP, WHATSAPP_DARK, WHITE } from "@/theme/tokens";

interface WhatsAppFABProps {
  /** WhatsApp phone number (with country code, no +) */
  phoneNumber?: string;
  /** Pre-filled message */
  message?: string;
  /** Hide when footer is visible */
  hideOnFooter?: boolean;
  /** Custom position from bottom */
  bottom?: number;
  /** Custom position from right */
  right?: number;
}

const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({
  phoneNumber = "237686132013",
  message = "Bonjour, je souhaite obtenir plus d'informations sur vos services.",
  hideOnFooter = true,
  bottom = 24,
  right = 24,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show FAB after user scrolls a bit - mobile-optimized
  const trigger = useScrollTrigger({
    threshold: isMobile ? 100 : 200, // Show earlier on mobile
    disableHysteresis: true,
  });

  // Detect footer visibility
  useEffect(() => {
    if (!hideOnFooter) return;

    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Footer is visible if its top is above the bottom of the viewport
        const footerVisible = footerRect.top < windowHeight;
        setIsFooterVisible(footerVisible);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideOnFooter]);

  // Combine visibility logic
  useEffect(() => {
    setIsVisible(trigger && (!hideOnFooter || !isFooterVisible));
  }, [trigger, isFooterVisible, hideOnFooter]);

  const handleClick = (): void => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  // Pulse animation keyframes
  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity as any,
      ease: "easeInOut" as const,
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            stiffness: isMobile ? 200 : 260, // Slightly gentler on mobile
            damping: 20,
            duration: 0.3,
          }}
          style={{
            position: "fixed",
            bottom: isMobile ? 20 : bottom, // Larger margin on mobile
            right: isMobile ? 20 : right,
            zIndex: Z.fab,
          }}
        >
          <Tooltip
            title={t("whatsapp.tooltip", "Discutez avec nous sur WhatsApp")}
            placement={isMobile ? "top-start" : "top"} // Better positioning on mobile
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: { xs: "0.875rem", sm: "0.8125rem" },
                  py: { xs: 1, sm: 0.75 },
                  px: { xs: 1.5, sm: 1 },
                  // Ensure tooltip doesn't interfere with touch
                  pointerEvents: "none",
                },
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              {/* Pulse Ring - Mobile-optimized */}
              <motion.div
                animate={pulseAnimation}
                style={{
                  position: "absolute",
                  top: isMobile ? -6 : -4, // Larger pulse on mobile
                  left: isMobile ? -6 : -4,
                  right: isMobile ? -6 : -4,
                  bottom: isMobile ? -6 : -4,
                  borderRadius: "50%",
                  backgroundColor: WHATSAPP,
                  opacity: 0.25, // Slightly more subtle
                  zIndex: -1,
                }}
              />

              {/* FAB Button - Mobile-optimized */}
              <Fab
                onClick={handleClick}
                size={isMobile ? "large" : "large"} // Always large for better touch targets
                aria-label={t("whatsapp.label", "Contacter via WhatsApp")}
                sx={{
                  backgroundColor: WHATSAPP,
                  color: WHITE,
                  width: { xs: 64, sm: 56 }, // Larger on mobile
                  height: { xs: 64, sm: 56 },
                  // Mobile-first interaction states
                  "&:hover": {
                    backgroundColor: WHATSAPP_DARK,
                    boxShadow: `0 8px 32px rgba(37, 211, 102, 0.5)`,
                    // Only scale on desktop using media queries
                    "@media (min-width: 900px)": {
                      transform: "scale(1.05)",
                    },
                  },
                  "&:active": {
                    // Immediate feedback on touch
                    transform: "scale(0.92)",
                    backgroundColor: "#128C7E", // Darker WhatsApp green
                  },
                  "&:focus-visible": {
                    outline: `3px solid ${WHITE}`,
                    outlineOffset: 4,
                  },
                  transition: "all 150ms ease",
                  boxShadow: `0 6px 24px rgba(37, 211, 102, 0.4)`,
                  // Ensure proper z-index layering
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <WhatsApp
                  sx={{
                    fontSize: { xs: "1.75rem", sm: "1.625rem" }, // Larger on mobile
                  }}
                />
              </Fab>
            </Box>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFAB;
