// src/components/layout/PageLayout.tsx
/**
 * HUMANIS PAGE LAYOUT WRAPPER
 * Insurance Platform Layout Architecture
 *
 * Wraps every page with:
 * - Navbar (sticky at top) with CIMA trust indicators
 * - Main content (children) with proper semantic structure
 * - Footer with regulatory compliance messaging
 * - WhatsAppFAB (floating action button) for instant contact
 *
 * Features:
 * - Scroll position reset on route change
 * - Proper accessibility landmarks (WCAG 2.1 AA)
 * - Consistent page structure for insurance trust
 * - Professional insurance platform architecture
 */

import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import WhatsAppFAB from "../ui/WhatsAppFAB";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface PageLayoutProps {
  /** Hide the navbar (for fullscreen pages like quote forms) */
  hideNavbar?: boolean;
  /** Hide the footer (for fullscreen pages or applications) */
  hideFooter?: boolean;
  /** Hide the WhatsApp FAB (for clean presentation pages) */
  hideWhatsAppFAB?: boolean;
  /** Add specific page context for insurance tracking and analytics */
  pageContext?:
    | "quote"
    | "claims"
    | "info"
    | "contact"
    | "services"
    | "products"
    | "about"
    | "default";
  /** Enable insurance-specific trust enhancements (schema markup, trust signals) */
  enableTrustEnhancements?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  hideNavbar = false,
  hideFooter = false,
  hideWhatsAppFAB = false,
  pageContext = "default",
  enableTrustEnhancements = true,
}) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Standard viewport height to ensure scrolling works
        position: "relative",
        // Insurance platform styling - professional and trustworthy
        backgroundColor: "transparent",
        // Mobile-first text rendering optimizations
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
        // Insurance platform optimizations
        isolation: "isolate", // Create new stacking context for trust
        // Better mobile performance
        // contain: "layout style paint", // Removed - can interfere with scrolling
        // Safe area insets for mobile devices
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      // Insurance platform metadata
      data-insurance-platform="humanis"
      data-page-context={pageContext}
      data-trust-enhanced={enableTrustEnhancements}
      // Accessibility and SEO
      role="document" // More semantic than main for the outer wrapper
    >
      {/* Navigation */}
      {!hideNavbar && <Navbar />}

      {/* Main Content - Insurance Platform Architecture */}
      <Box
        component="main"
        role="main"
        sx={{
          flex: 1,
          // Account for fixed navbar height (commented out as per original design)
          // paddingTop: hideNavbar
          //   ? 0
          //   : {
          //       xs: `${NAV_HEIGHT_MOBILE}px`,
          //       md: `${NAV_HEIGHT}px`,
          //     },
          position: "relative",
          zIndex: 0,
          // Insurance platform styling - professional and authoritative
          backgroundColor: "transparent",
          isolation: "isolate", // Create new stacking context for insurance trust
          // Mobile-first optimizations for insurance UX
          width: "100%",
          overflowX: "hidden", // Prevent horizontal scroll on mobile
          // Improve touch scrolling on iOS and mobile devices
          // WebkitOverflowScrolling: "touch",
          // overscrollBehavior: "contain", // Prevent overscroll bounce
          // Insurance platform performance optimizations
          // contain: "layout style", // Removed - can interfere with scrolling
          // Mobile-first responsive spacing system
          "& .MuiContainer-root": {
            px: { xs: 2, sm: 3, md: 4 }, // Progressive container padding
          },
          // Professional layout spacing with mobile-first approach
          "& > *": {
            // Ensure consistent section spacing
            "&:not(:last-child)": {
              marginBottom: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            },
          },
          // Mobile typography optimizations
          "& p, & li": {
            // Better line height for mobile reading
            lineHeight: { xs: 1.6, sm: 1.65 },
          },
          // Mobile-first form optimizations
          "& .MuiTextField-root": {
            "& .MuiInputBase-root": {
              minHeight: { xs: 48, sm: 44 }, // Comfortable touch targets
            },
          },
          "& .MuiButton-root": {
            minHeight: { xs: 48, sm: 44 }, // Comfortable touch targets
          },
        }}
        // Insurance platform metadata
        data-page-context={pageContext}
        data-mobile={isMobile}
        data-insurance-content="main"
        // Enhanced accessibility for insurance platform
        aria-label={`${pageContext} page content`}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      {!hideFooter && <Footer />}

      {/* WhatsApp Floating Action Button - Mobile-optimized positioning */}
      {!hideWhatsAppFAB && <WhatsAppFAB />}
    </Box>
  );
};

export default PageLayout;
