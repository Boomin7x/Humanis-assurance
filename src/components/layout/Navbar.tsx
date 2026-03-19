// src/components/layout/Navbar.tsx
/**
 * HUMANIS NAVBAR COMPONENT
 *
 * Features:
 * - Transparent state when at page top (transparent bg, white logo/links)
 * - Scrolled state when user scrolls >80px (blue bg, transition 300ms)
 * - Active link indicator with teal bottom border
 * - Language toggle (FR/EN)
 * - CTA button "Demander un devis"
 * - Mobile responsive with hamburger menu and right drawer
 * - Sticky positioning (fixed top, full width, z-index 1000)
 */

import { Close as CloseIcon, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import {
  NAV_HEIGHT,
  NAV_HEIGHT_MOBILE,
  NAV_SCROLL_THRESHOLD,
  Z,
} from "@/constants/layout";
import { fadeIn } from "@/theme/motion";
import {
  INSURANCE_MOBILE_UX,
  TOUCH_TARGETS,
  TYPOGRAPHY_MOBILE,
} from "@/theme/responsive";
import {
  GLASS_WHITE_15,
  GLASS_WHITE_80,
  PRIMARY_500,
  TEAL_500,
  WHITE,
} from "@/theme/tokens";
import LanguageToggle from "../ui/LanguageToggle";

// Navigation links configuration - Insurance platform focused
const navLinks = [
  { key: "home", label: "Accueil", path: "/" },
  { key: "about", label: "Notre Cabinet", path: "/a-propos" },
  { key: "services", label: "Expertises", path: "/services" },
  { key: "products", label: "Solutions", path: "/produits" },
  { key: "contact", label: "Nous Contacter", path: "/contact" },
] as const;

// Logo component with trust indicators - Declared outside main component
type LogoProps = {
  idx?: unknown;
};

const Logo: React.FC<LogoProps> = () => (
  <Box
    component={Link}
    to="/"
    sx={{
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "inherit",
      minHeight: TOUCH_TARGETS.buttonMinHeight,
      "&:hover": {
        textDecoration: "none",
      },
      "&:focus-visible": {
        outline: `2px solid ${TEAL_500}`,
        outlineOffset: 2,
        borderRadius: 4,
      },
    }}
  >
    <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
      <Stack direction="column" spacing={0} alignItems="flex-start">
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'ClashDisplay', 'Inter', sans-serif",
            ...TYPOGRAPHY_MOBILE.h5, // Mobile-first responsive typography
            fontWeight: 700,
            color: WHITE,
            lineHeight: 1,
            transition: "color 300ms ease",
          }}
        >
          Humanis
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'ClashDisplay', 'Inter', sans-serif",
            ...TYPOGRAPHY_MOBILE.h5, // Mobile-first responsive typography
            fontWeight: 700,
            color: WHITE,
            lineHeight: 1,
            transition: "color 300ms ease",
          }}
        >
          Assurances
        </Typography>
      </Stack>

      {/* Insurance Trust Indicator - CIMA Certification */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "flex-start",
          borderLeft: `2px solid ${TEAL_500}`,
          pl: 1.5,
          py: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: TEAL_500,
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Agréé CIMA
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: WHITE,
            fontSize: "0.6875rem",
            fontWeight: 500,
            lineHeight: 1.1,
            opacity: 0.9,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Depuis 2009
        </Typography>
      </Box>
    </Stack>
  </Box>
);

// Navigation Links Component - Declared outside main component
interface NavLinksProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
  isActiveLink: (path: string) => boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({
  isMobile = false,
  onLinkClick,
  isActiveLink,
}) => (
  <Stack
    direction={isMobile ? "column" : "row"}
    spacing={isMobile ? { xs: 0.5, sm: 1 } : { xs: 1, sm: 2 }}
    sx={{
      alignItems: isMobile ? "stretch" : "center", // Full width links on mobile
      justifyContent: isMobile ? "flex-start" : "center",
      width: isMobile ? "100%" : "auto",
      ...INSURANCE_MOBILE_UX.mobileNav, // Apply mobile navigation UX patterns
    }}
  >
    {navLinks.map((link) => (
      <Button
        key={link.key}
        component={Link}
        to={link.path}
        onClick={isMobile ? onLinkClick : undefined}
        sx={{
          fontFamily: "'Satoshi', 'Inter', sans-serif",
          color: WHITE,
          textTransform: "none",
          ...TYPOGRAPHY_MOBILE.body1, // Mobile-first responsive typography
          fontWeight: isActiveLink(link.path) ? 600 : 500,
          px: isMobile ? { xs: 2, sm: 3 } : { xs: 1.5, sm: 2 },
          py: isMobile ? { xs: 1.5, sm: 2 } : { xs: 1, sm: 1.5 },
          borderRadius: { xs: "4px", sm: "6px" }, // Insurance design system compliance - max 8px
          position: "relative",
          minWidth: "auto",
          minHeight: TOUCH_TARGETS.buttonMinHeight, // Ensure proper touch targets
          width: isMobile ? "100%" : "auto",
          justifyContent: isMobile ? "flex-start" : "center",
          whiteSpace: "nowrap",
          transition: "all 200ms ease",
          // Mobile-first interaction states
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.1)",
            color: WHITE,
            // Only lift on desktop
            transform: { xs: "none", lg: "translateY(-1px)" },
          },
          "&:active": {
            // Provide immediate feedback on touch
            backgroundColor: "rgba(255,255,255,0.2)",
            transform: "scale(0.98)",
          },
          "&:focus-visible": {
            outline: `2px solid ${TEAL_500}`,
            outlineOffset: 2,
          },
          // Active link indicator - mobile-optimized
          ...(isActiveLink(link.path) && {
            backgroundColor: "rgba(26, 158, 117, 0.15)",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: isMobile ? 0 : -2,
              left: isMobile ? { xs: 16, sm: 24 } : "50%",
              transform: isMobile ? "none" : "translateX(-50%)",
              width: isMobile
                ? { xs: "calc(100% - 32px)", sm: "calc(100% - 48px)" }
                : "60%",
              height: "2px",
              backgroundColor: TEAL_500,
              borderRadius: "1px",
            },
          }),
        }}
      >
        {link.label}
      </Button>
    ))}
  </Stack>
);

// CTA Button Component - Declared outside main component
interface CTAButtonProps {
  isMobile?: boolean;
  onButtonClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  isMobile = false,
  onButtonClick,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={isMobile ? onButtonClick : undefined}
      sx={{
        fontFamily: "'Satoshi', 'Inter', sans-serif",
        backgroundColor: TEAL_500,
        color: WHITE,
        textTransform: "none",
        borderRadius: { xs: "6px", sm: "8px" }, // Insurance design system compliance - max 8px
        px: isMobile ? { xs: 3, sm: 4 } : { xs: 2.5, sm: 3 },
        py: isMobile ? { xs: 1.75, sm: 2 } : { xs: 1.25, sm: 1.5 },
        ...TYPOGRAPHY_MOBILE.body1, // Mobile-first responsive typography
        fontWeight: 600,
        width: isMobile ? "100%" : "auto",
        minWidth: isMobile ? "auto" : { xs: "140px", sm: "160px" },
        minHeight: TOUCH_TARGETS.buttonComfortable, // Comfortable touch target
        // NO SHADOWS - Insurance design system compliance
        border: `2px solid transparent`,
        // Mobile-first interaction states
        "&:hover": {
          backgroundColor: "#148560",
          borderColor: "rgba(255,255,255,0.2)",
          // Only lift on desktop
          transform: { xs: "none", lg: "translateY(-1px)" },
          // Depth achieved through color contrast only
        },
        "&:active": {
          // Immediate feedback on touch
          backgroundColor: "#0f5d48",
          transform: "scale(0.98)",
          borderColor: "rgba(255,255,255,0.3)",
        },
        "&:focus-visible": {
          outline: `3px solid ${WHITE}`,
          outlineOffset: 2,
        },
        transition: "all 150ms ease",
      }}
    >
      {t("navbar.cta", "Demander un devis")}
    </Button>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle scroll behavior for transparent/solid navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > NAV_SCROLL_THRESHOLD);
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = (): void => {
    setMobileOpen(false);
  };

  // Check if current route is active
  const isActiveLink = (path: string): boolean => {
    return location.pathname === path;
  };

  // Mobile Drawer Content - Full mobile optimization
  const drawerContent = (
    <Box
      sx={{
        width: "100%",
        height: "100dvh", // Use dynamic viewport height
        backgroundColor: GLASS_WHITE_80,
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        // Safe area insets for mobile devices
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        // Prevent overscroll bounce on mobile
        overscrollBehavior: "contain",
      }}
    >
      {/* Drawer Header - Mobile-optimized */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 3, sm: 4 }, // Progressive padding
          py: { xs: 2, sm: 3 },
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          minHeight: { xs: 64, sm: NAV_HEIGHT_MOBILE },
          // Add top safe area for mobile notches
          marginTop: { xs: "env(safe-area-inset-top, 0px)", sm: 0 },
        }}
      >
        <Logo />
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            color: WHITE,
            minHeight: TOUCH_TARGETS.buttonMinHeight,
            minWidth: TOUCH_TARGETS.buttonMinHeight,
            borderRadius: { xs: "4px", sm: "6px" },
            "&:focus-visible": {
              outline: `2px solid ${TEAL_500}`,
              outlineOffset: 2,
            },
          }}
          aria-label="Close navigation menu"
        >
          <CloseIcon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }} />
        </IconButton>
      </Box>

      {/* Navigation Links - Scrollable on small screens */}
      <Box
        sx={{
          flex: 1,
          px: { xs: 3, sm: 4 },
          py: { xs: 2, sm: 3 },
          overflowY: "auto",
          WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
        }}
      >
        <NavLinks
          isMobile={true}
          onLinkClick={handleDrawerClose}
          isActiveLink={isActiveLink}
        />
      </Box>

      {/* Drawer Footer - Mobile-safe positioning */}
      <Box
        sx={{
          px: { xs: 3, sm: 4 },
          py: { xs: 3, sm: 4 },
          borderTop: "1px solid rgba(255,255,255,0.12)",
          // Add bottom safe area for home indicator
          marginBottom: { xs: "env(safe-area-inset-bottom, 0px)", sm: 0 },
          flexShrink: 0, // Prevent shrinking
        }}
      >
        <Stack spacing={{ xs: 2, sm: 3 }}>
          <LanguageToggle variant="mobile" />
          <CTAButton isMobile={true} onButtonClick={handleDrawerClose} />
        </Stack>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: isScrolled ? PRIMARY_500 : "transparent",
          backdropFilter: isScrolled ? "none" : "blur(12px)",
          borderBottom: isScrolled ? "none" : `1px solid ${GLASS_WHITE_15}`,
          zIndex: Z.navbar,
          height: { xs: NAV_HEIGHT_MOBILE, md: NAV_HEIGHT },
          transition: "all 300ms ease",
        }}
        component={motion.header}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 4 }, // Progressive enhancement from mobile
            py: 0,
          }}
        >
          {/* Logo */}
          <Box sx={{ flexShrink: 0 }}>
            <Logo />
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <NavLinks isActiveLink={isActiveLink} />
              </Box>

              <Box sx={{ flexShrink: 0 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LanguageToggle />
                  <CTAButton />
                </Stack>
              </Box>
            </>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="Open navigation menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                color: WHITE,
                minHeight: TOUCH_TARGETS.buttonMinHeight,
                minWidth: TOUCH_TARGETS.buttonMinHeight,
                borderRadius: { xs: "4px", sm: "6px" },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
                "&:focus-visible": {
                  outline: `2px solid ${TEAL_500}`,
                  outlineOffset: 2,
                },
              }}
            >
              <MenuIcon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }} />
            </IconButton>
          )}
        </Container>
      </AppBar>

      {/* Mobile Drawer - Enhanced for mobile UX */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
            width: { xs: "100vw", sm: 320 }, // Full width on small mobile, fixed on larger
            maxWidth: "100vw",
          },
        }}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "transparent",
          },
          // Prevent background scroll on mobile
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
