// src/pages/HomePage.tsx
/**
 * HUMANIS HOME PAGE
 *
 * Trust-first insurance broker homepage implementing:
 * - Professional hero with team imagery and CIMA trust badges
 * - Social proof through client statistics and testimonials
 * - Service credibility with real business imagery
 * - Product authority with IARDT vs Vie distinction
 * - Partner trust through major insurer logos
 * - Clear conversion paths with strategic CTAs
 *
 * Design Language: "Refined Precision"
 * - No shadows, blue-tinted only design system
 * - Trust-building through authority, transparency, accessibility
 * - Insurance-specific UX patterns for conversion optimization
 */

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import PhoneIcon from "@mui/icons-material/Phone";
import SecurityIcon from "@mui/icons-material/Security";
import {
  alpha,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import {
  Badge,
  HumanisImage,
  PartnerLogos,
  SectionHeader,
  SectionWrapper,
  ServiceCard,
  StatCard,
  TestimonialCard,
} from "@/components/ui";
import { animationPresets } from "@/theme/motion";
import { GRID_MOBILE, TOUCH_TARGETS } from "@/theme/responsive";
import {
  BRAND_100,
  BRAND_300,
  BRAND_500,
  BRAND_700,
  GLASS_NAVY_04,
  GRADIENT_TEXT_HERO,
  NAVY_800,
  NEUTRAL_600,
  NEUTRAL_700,
  PRIMARY_500,
  PRIMARY_700,
  TEAL_500,
  WHITE,
} from "@/theme/tokens";
import { getImage, images } from "@/utils/imageLoader";

const HomePage: React.FC = () => {
  // Scroll to sections handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <Box
        component="section"
        sx={{
          position: "relative",
          minHeight: {
            xs: "90vh", // Mobile: 90vh to avoid browser UI issues
            sm: "85vh", // Mobile landscape: slightly smaller
            md: "100vh", // Desktop: full viewport
          },
          maxHeight: {
            xs: "900px",
            sm: "800px",
            md: "1080px",
          },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          px: { xs: 0, md: 0 }, // Remove horizontal padding on mobile - handled by Container
        }}
      >
        {/* Hero Background Image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <HumanisImage
            src={getImage(images.hero.teamGroup, "hero")}
            alt="Équipe Humanis Assurances dans les bureaux d'Akwa, Douala"
            ratio="hero"
            overlay="navy"
            overlayOpacity={0.75}
            priority
            animated={false}
            radius={0}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: (theme) =>
              `linear-gradient(180deg, ${alpha(theme.palette.text.primary, 0.8)}, ${alpha(theme.palette.primary.dark, 0)})`,
          }}
        />

        {/* Hero Content */}
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 6 }}
          sx={{ position: "relative", zIndex: 1, mx: "auto", maxWidth: 1440 }}
          alignItems="center"
        >
          {/* Left Column - Content - Full width on mobile */}
          <Grid size={{ xs: 12, md: 7 }} order={{ xs: 1, md: 1 }}>
            <motion.div
              variants={animationPresets.slideUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8 }}
            >
              <Stack
                spacing={{ xs: 2, sm: 3, md: 4 }}
                alignItems={{ xs: "center", md: "flex-start" }}
                sx={{ textAlign: { xs: "center", md: "left" } }}
              >
                {/* Overline Badge - Cabinet de courtage */}
                <Box>
                  <Badge
                    variant="teal"
                    sx={{
                      backgroundColor: TEAL_500,
                      color: WHITE,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      px: 2,
                      py: 1,
                      borderRadius: "20px",
                    }}
                  >
                    Cabinet de courtage · Douala, Cameroun
                  </Badge>
                </Box>

                {/* Hero Title */}
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    background: GRADIENT_TEXT_HERO,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: {
                      xs: "clamp(1.75rem, 8vw, 2.5rem)", // 28-40px mobile
                      sm: "clamp(2.25rem, 6vw, 3rem)", // 36-44px mobile landscape
                      md: "clamp(3rem, 4vw, 4rem)", // 48-64px desktop
                    },
                    fontWeight: 700,
                    lineHeight: { xs: 1.2, md: 1.1 },
                    letterSpacing: "-0.03em",
                    maxWidth: "100%",
                    textAlign: "center",
                    "@media (min-width: 900px)": {
                      textAlign: "left",
                    },
                  }}
                >
                  Nous protégeons ce qui compte le plus pour vous
                </Typography>

                {/* Hero Subtitle */}
                <Typography
                  variant="h5"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: { xs: "1.125rem", md: "1.25rem" },
                    fontWeight: 400,
                    lineHeight: 1.5,
                    maxWidth: { xs: "100%", md: "480px" },
                  }}
                >
                  Courtage d'assurances · Risk Management · Programmes
                  Internationaux
                </Typography>

                {/* CTA Buttons */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 2, sm: 2 }}
                  sx={{
                    mt: { xs: 3, sm: 4 },
                    alignItems: "center",
                    width: "100%",
                    maxWidth: { xs: "320px", sm: "none" },
                    mx: { xs: "auto", md: 0 },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<PhoneIcon />}
                    onClick={() => scrollToSection("contact-cta")}
                    sx={{
                      backgroundColor: PRIMARY_500,
                      color: WHITE,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: { xs: "1rem", sm: "1.125rem" },
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: "6px",
                      minHeight: TOUCH_TARGETS.buttonComfortable,
                      py: { xs: 2, sm: 1.75 },
                      px: { xs: 4, sm: 3 },
                      minWidth: { xs: "100%", sm: "240px" },
                      "&:hover": {
                        backgroundColor: PRIMARY_700,
                      },
                      // Mobile tap feedback for conversion optimization
                      "&:active": {
                        transform: "scale(0.98)",
                      },
                    }}
                  >
                    Devis gratuit
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => scrollToSection("services")}
                    sx={{
                      borderColor: WHITE,
                      color: WHITE,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: "6px",
                      borderWidth: "2px",
                      minHeight: TOUCH_TARGETS.buttonComfortable,
                      py: { xs: 2, sm: 1.75 },
                      px: { xs: 3, sm: 3 },
                      minWidth: { xs: "100%", sm: "200px" },
                      "&:hover": {
                        borderColor: WHITE,
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        borderWidth: "2px",
                      },
                      // Mobile tap feedback
                      "&:active": {
                        transform: "scale(0.98)",
                      },
                    }}
                  >
                    Nos services
                  </Button>
                </Stack>

                {/* Trust Indicators - Enhanced Insurance Credibility */}
                <Stack spacing={{ xs: 2, sm: 3 }} sx={{ mt: 4 }}>
                  {/* CIMA Certification Badge - Most Prominent */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "flex-start" },
                      gap: 1.5,
                      backgroundColor: TEAL_500,
                      border: `2px solid ${WHITE}`,
                      borderRadius: "8px",
                      px: 3,
                      py: 2,
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      fontWeight: 600,
                      color: WHITE,
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ fontSize: "1.25rem", color: WHITE }}
                    />
                    Cabinet agréé CIMA depuis 2009
                  </Box>

                  {/* Secondary Trust Indicators */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    flexWrap="wrap"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        border: "1px solid rgba(255, 255, 255, 0.25)",
                        borderRadius: "20px",
                        px: 2,
                        py: 1,
                        fontSize: { xs: "0.75rem", md: "0.875rem" },
                        fontWeight: 500,
                        color: WHITE,
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ fontSize: "1rem", color: TEAL_500 }}
                      />
                      500+ clients protégés
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        border: "1px solid rgba(255, 255, 255, 0.25)",
                        borderRadius: "20px",
                        px: 2,
                        py: 1,
                        fontSize: { xs: "0.75rem", md: "0.875rem" },
                        fontWeight: 500,
                        color: WHITE,
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ fontSize: "1rem", color: TEAL_500 }}
                      />
                      15+ ans d'expérience
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </motion.div>
          </Grid>

          {/* Right Column - Team Photo with Floating Badge - Hidden on mobile */}
          <Grid
            size={{ xs: 12, md: 5 }}
            order={{ xs: 2, md: 2 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <motion.div
              variants={animationPresets.slideUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: "relative",
                  maxWidth: { xs: "300px", md: "400px" },
                  mx: "auto",
                }}
              >
                {/* Team Photo */}
                <Box
                  sx={{
                    border: `3px solid ${TEAL_500}`,
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <HumanisImage
                    src={getImage(images.office.teamAtWork, "team")}
                    alt="Équipe d'experts Humanis Assurances"
                    ratio="4/3"
                    radius={8}
                  />
                </Box>

                {/* Floating Experience Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 16, md: 24 },
                    right: { xs: -12, md: -16 },
                    background: WHITE,
                    borderRadius: "8px",
                    p: { xs: 2, md: 3 },
                    border: `2px solid ${BRAND_500}`,
                  }}
                >
                  <Stack spacing={0.5} alignItems="center">
                    <Typography
                      variant="h4"
                      sx={{
                        color: PRIMARY_500,
                        fontSize: { xs: "1.5rem", md: "2rem" },
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      15+
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: NEUTRAL_600,
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: { xs: "0.625rem", md: "0.75rem" },
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        textAlign: "center",
                      }}
                    >
                      ans
                      <br />
                      d'expérience
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
          }}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <Button
            onClick={() => scrollToSection("stats")}
            sx={{
              color: WHITE,
              minWidth: "auto",
              p: 1,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ArrowDownwardIcon />
          </Button>
        </motion.div>
      </Box>

      {/* ===== STATS BAR ===== */}
      <SectionWrapper
        id="stats"
        background="blue"
        paddingY="small"
        maxWidth={false}
      >
        <Grid
          container
          sx={{ maxWidth: 1440, mx: "auto" }}
          spacing={{ xs: 2, sm: 3, md: 4 }}
        >
          <Grid size={GRID_MOBILE.quarterOnDesktop}>
            <StatCard
              number={500}
              suffix="+"
              label="Clients protégés"
              icon={<GroupsIcon />}
            />
          </Grid>
          <Grid size={GRID_MOBILE.quarterOnDesktop}>
            <StatCard
              number={15}
              suffix="+"
              label="Années d'expérience"
              icon={<BusinessCenterIcon />}
            />
          </Grid>
          <Grid size={GRID_MOBILE.quarterOnDesktop}>
            <StatCard
              number={20}
              suffix="+"
              label="Partenaires assureurs"
              icon={<SecurityIcon />}
            />
          </Grid>
          <Grid size={GRID_MOBILE.quarterOnDesktop}>
            <StatCard
              number={3}
              label="Domaines d'expertise"
              icon={<CheckCircleIcon />}
            />
          </Grid>
        </Grid>
      </SectionWrapper>

      {/* ===== SERVICES OVERVIEW ===== */}
      <SectionWrapper
        id="services"
        background="alt"
        paddingY="normal"
        maxWidth={false}
      >
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <SectionHeader
            overline="Nos services"
            title="Solutions d'assurance complètes"
            align="center"
            animationDelay={0.1}
          />

          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 4 }}
            sx={{ mt: { xs: 3, sm: 4 } }}
          >
            <Grid size={GRID_MOBILE.thirdOnDesktop}>
              <ServiceCard
                icon="mdi:shield-check"
                title="Courtage d'assurances"
                description="Accompagnement personnalisé pour trouver les meilleures couvertures adaptées à vos besoins spécifiques. Audit, conseil et gestion de vos contrats."
                href="/services#courtage"
                accentColor="blue"
                photo={getImage(images.office.teamAtWork, "team")}
                photoAlt="Équipe Humanis Assurances - Experts en courtage"
                animated
              />
            </Grid>
            <Grid size={GRID_MOBILE.thirdOnDesktop}>
              <ServiceCard
                icon="mdi:chart-line"
                title="Risk Management"
                description="Analyse et gestion proactive des risques pour protéger vos actifs et optimiser vos coûts d'assurance. Identification et maîtrise des risques."
                href="/services#risk-management"
                accentColor="teal"
                photo={getImage(images.services.businessMeeting, "business")}
                photoAlt="Consultation risk management - Analyse des risques"
                animated
              />
            </Grid>
            <Grid size={GRID_MOBILE.thirdOnDesktop}>
              <ServiceCard
                icon="mdi:earth"
                title="Programmes Internationaux"
                description="Solutions d'assurance globales pour les entreprises opérant à l'international et leurs expatriés. Couverture mondiale adaptée."
                href="/services#international"
                accentColor="blue"
                photo={getImage(images.services.international, "international")}
                photoAlt="Programmes internationaux - Couverture mondiale"
                animated
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              href="/services"
              sx={{
                backgroundColor: PRIMARY_500,
                color: WHITE,
                fontFamily: "DM Sans, sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "4px",
                py: 1.5,
                px: 4,
                "&:hover": {
                  backgroundColor: PRIMARY_700,
                },
              }}
            >
              Découvrir tous nos services
            </Button>
          </Box>
        </Container>
      </SectionWrapper>

      {/* ===== ABOUT TEASER ===== */}
      <SectionWrapper background="white" paddingY="normal" maxWidth={false}>
        <Container
          maxWidth={false}
          sx={{ position: "relative", maxWidth: 1440 }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* Left - Content */}
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 1 }}>
              <SectionHeader
                overline="À propos"
                title="Leader du courtage d'assurance au Cameroun"
                subtitle="Cabinet agréé CIMA depuis 2009, Humanis Assurances accompagne plus de 500 entreprises et particuliers dans la protection de leurs biens les plus précieux. Notre expertise reconnue en courtage, risk management et programmes internationaux fait de nous le partenaire de confiance des grandes entreprises camerounaises."
                align="left"
              />

              {/* Professional Credibility Indicators */}
              <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ mt: { xs: 3, md: 4 } }}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  sx={{
                    backgroundColor: BRAND_100,
                    borderRadius: "8px",
                    p: { xs: 1.5, md: 2 },
                    border: `1px solid ${BRAND_300}`,
                  }}
                >
                  <CheckCircleIcon
                    sx={{ color: BRAND_500, fontSize: { xs: 20, md: 24 } }}
                  />
                  <Typography
                    sx={{
                      color: BRAND_700,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      fontWeight: 600,
                    }}
                  >
                    Cabinet agréé CIMA depuis 2009
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <CheckCircleIcon
                    sx={{ color: TEAL_500, fontSize: { xs: 20, md: 24 } }}
                  />
                  <Typography
                    sx={{
                      color: NEUTRAL_700,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      fontWeight: 500,
                    }}
                  >
                    Plus de 500 clients accompagnés en 15+ ans
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <CheckCircleIcon
                    sx={{ color: TEAL_500, fontSize: { xs: 20, md: 24 } }}
                  />
                  <Typography
                    sx={{
                      color: NEUTRAL_700,
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      fontWeight: 500,
                    }}
                  >
                    Partenaire exclusif de 20+ compagnies d'assurance
                  </Typography>
                </Stack>
              </Stack>

              <Box
                sx={{
                  textAlign: "center",
                  "@media (min-width: 900px)": {
                    textAlign: "left",
                  },
                  mt: { xs: 3, md: 4 },
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  href="/a-propos"
                  sx={{
                    borderColor: PRIMARY_500,
                    color: PRIMARY_500,
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "6px",
                    minHeight: TOUCH_TARGETS.buttonMinHeight,
                    py: { xs: 1.25, md: 1.5 },
                    px: { xs: 3, md: 4 },
                    "&:hover": {
                      borderColor: PRIMARY_700,
                      backgroundColor: GLASS_NAVY_04,
                    },
                  }}
                >
                  En savoir plus
                </Button>
              </Box>
            </Grid>

            {/* Right - Office Photo */}
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 2 }}>
              <HumanisImage
                src={getImage(images.office.exterior, "office")}
                alt="Siège social Humanis Assurances à Akwa, Douala"
                ratio="4/3"
                radius={8}
              />
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== PRODUCTS TEASER - Insurance Product Categories ===== */}
      <SectionWrapper background="dark" paddingY="normal" maxWidth={false}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <SectionHeader
            overline="Nos produits"
            title="Une couverture complète pour chaque besoin"
            align="center"
            variant="dark"
            animationDelay={0.1}
          />

          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 4 }}
            sx={{ mt: { xs: 3, sm: 4 } }}
          >
            {/* IARDT Product Category */}
            <Grid size={GRID_MOBILE.halfOnDesktop}>
              <motion.div
                variants={animationPresets.slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "350px", sm: "400px", md: "500px" },
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 300ms ease",
                    "&:hover": {
                      // Disable hover transform on mobile for better touch performance
                      transform: { xs: "none", md: "scale(1.02)" },
                      "& .category-image": {
                        transform: { xs: "none", md: "scale(1.05)" },
                      },
                      "& .category-overlay": {
                        backgroundColor: "rgba(17,27,46,0.85)",
                      },
                    },
                  }}
                  onClick={() => (window.location.href = "/produits#iardt")}
                >
                  {/* Background Image */}
                  <Box
                    className="category-image"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      transition: "transform 300ms ease",
                    }}
                  >
                    <HumanisImage
                      src={getImage(
                        images.services.businessMeeting,
                        "business",
                      )}
                      alt="Assurance IARDT - Entreprises et professionnels"
                      ratio="3/4"
                      radius={8}
                      priority={false}
                    />
                  </Box>

                  {/* Overlay */}
                  <Box
                    className="category-overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(17,27,46,0.95) 0%, rgba(17,27,46,0.20) 60%)",
                      transition: "background-color 300ms ease",
                    }}
                  />

                  {/* Content */}
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
                    <Badge variant="blue" sx={{ mb: 2 }}>
                      IARDT
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
                      Incendie, Accidents, Risques Divers & Transport
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
                      14 produits disponibles
                    </Typography>

                    <Typography
                      component="span"
                      sx={{
                        color: PRIMARY_500,
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
                      Explorer les produits IARDT
                      <ArrowForwardIcon
                        className="arrow"
                        sx={{ fontSize: "1rem" }}
                      />
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Assurance Vie Product Category */}
            <Grid size={GRID_MOBILE.halfOnDesktop}>
              <motion.div
                variants={animationPresets.slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "350px", sm: "400px", md: "500px" },
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 300ms ease",
                    "&:hover": {
                      // Disable hover transform on mobile for better touch performance
                      transform: { xs: "none", md: "scale(1.02)" },
                      "& .category-image": {
                        transform: { xs: "none", md: "scale(1.05)" },
                      },
                      "& .category-overlay": {
                        backgroundColor: "rgba(26,158,117,0.85)",
                      },
                    },
                  }}
                  onClick={() => (window.location.href = "/produits#vie")}
                >
                  {/* Background Image */}
                  <Box
                    className="category-image"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      transition: "transform 300ms ease",
                    }}
                  >
                    <HumanisImage
                      src={getImage(images.clients.family, "family")}
                      alt="Assurance Vie - Particuliers et familles"
                      ratio="3/4"
                      radius={8}
                      priority={false}
                    />
                  </Box>

                  {/* Overlay */}
                  <Box
                    className="category-overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(26,158,117,0.92) 0%, rgba(26,158,117,0.25) 60%)",
                      transition: "background-color 300ms ease",
                    }}
                  />

                  {/* Content */}
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
                    <Badge variant="teal" sx={{ mb: 1 }}>
                      Épargne
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
                      Prévoyance & Épargne
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
                      8 produits disponibles
                    </Typography>

                    <Typography
                      component="span"
                      sx={{
                        color: WHITE,
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
                      Explorer l'assurance vie
                      <ArrowForwardIcon
                        className="arrow"
                        sx={{ fontSize: "1rem" }}
                      />
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== CLIENT PROCESS ===== */}
      <SectionWrapper background="white" paddingY="normal" maxWidth={false}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <SectionHeader
            overline="Notre processus"
            title="Comment nous vous accompagnons"
            align="center"
            animationDelay={0.1}
          />

          {/* Process Steps - Mobile-first responsive grid */}
          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 4 }}
            sx={{ mt: { xs: 3, sm: 4 } }}
          >
            {[
              {
                step: "01",
                title: "Contact initial",
                description:
                  "Prise de contact initiale pour comprendre vos besoins",
                icon: <PhoneIcon />,
              },
              {
                step: "02",
                title: "Audit des risques",
                description:
                  "Analyse détaillée de votre situation et de vos risques",
                icon: <SecurityIcon />,
              },
              {
                step: "03",
                title: "Proposition",
                description:
                  "Présentation de solutions sur mesure et comparatifs",
                icon: <BusinessCenterIcon />,
              },
              {
                step: "04",
                title: "Souscription",
                description: "Souscription et mise en place des garanties",
                icon: <CheckCircleIcon />,
              },
              {
                step: "05",
                title: "Suivi",
                description:
                  "Suivi personnalisé et gestion des renouvellements",
                icon: <GroupsIcon />,
              },
            ].map((item, index) => (
              <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={index}>
                <motion.div
                  variants={animationPresets.slideUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      p: { xs: 2, sm: 3 },
                      height: "100%",
                    }}
                  >
                    {/* Step Number */}
                    <Box
                      sx={{
                        width: { xs: 56, sm: 64 },
                        height: { xs: 56, sm: 64 },
                        borderRadius: "50%",
                        backgroundColor: PRIMARY_500,
                        color: WHITE,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: { xs: 1.5, sm: 2 },
                        fontSize: { xs: "1.125rem", sm: "1.25rem" },
                        fontWeight: 700,
                      }}
                    >
                      {item.step}
                    </Box>

                    {/* Icon */}
                    <Box
                      sx={{
                        color: TEAL_500,
                        mb: { xs: 1.5, sm: 2 },
                        "& svg": {
                          fontSize: { xs: 28, sm: 32 },
                        },
                      }}
                    >
                      {item.icon}
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: NAVY_800,
                        fontSize: { xs: "1rem", sm: "1.125rem" },
                        fontWeight: 600,
                        mb: { xs: 0.75, sm: 1 },
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: NEUTRAL_600,
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== CLIENT TESTIMONIALS ===== */}
      <SectionWrapper background="alt" paddingY="normal" maxWidth={false}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <SectionHeader
            overline="Témoignages"
            title="Ce que disent nos clients"
            align="center"
            animationDelay={0.1}
          />

          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 4 }}
            sx={{ mt: { xs: 3, sm: 4 } }}
          >
            <Grid size={GRID_MOBILE.thirdOnDesktop}>
              <TestimonialCard
                quote="Humanis nous accompagne depuis 5 ans. Leur expertise en risk management nous a permis d'optimiser nos coûts d'assurance de 25% tout en améliorant notre couverture."
                author="Marie Ngono"
                company="Cameroun Industries"
                sector="Secteur Manufacturier"
                rating={5}
                animated
              />
            </Grid>
            <Grid size={GRID_MOBILE.thirdOnDesktop}>
              <TestimonialCard
                quote="Service exceptionnel et réactivité remarquable. L'équipe de Humanis comprend parfaitement les enjeux des PME camerounaises."
                author="Paul Mendomo"
                company="Transport Express"
                sector="Secteur Transport"
                rating={5}
                animated
              />
            </Grid>
            <Grid size={GRID_MOBILE.thirdOnDesktop}>
              <TestimonialCard
                quote="Grâce à Humanis, nous avons mis en place une couverture internationale complète pour nos expatriés. Un partenaire de confiance."
                author="Jean-Claude Eyoum"
                company="Agro-Business"
                sector="Secteur Agricole"
                rating={5}
                animated
              />
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== PARTNER LOGOS ===== */}
      <SectionWrapper background="white" paddingY="small" maxWidth={false}>
        <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
          <SectionHeader
            overline="Nos Partenaires de Confiance"
            title="Partenaires"
            subtitle="Ils nous font confiance pour protéger leurs intérêts et ceux de leurs clients."
            align="center"
            animationDelay={0.2}
          />

          <Box sx={{ mt: 4 }}>
            <PartnerLogos animated />
          </Box>
        </Container>
      </SectionWrapper>

      {/* ===== CTA BANNER ===== */}
      <SectionWrapper id="contact-cta" background="dark" paddingY="normal">
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <motion.div
              variants={animationPresets.slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: WHITE,
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  mb: { xs: 2, sm: 2 },
                  textAlign: "center",
                }}
              >
                Obtenez votre devis d'assurance gratuit
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  lineHeight: 1.5,
                  mb: { xs: 4, sm: 4 },
                  maxWidth: { xs: "100%", sm: "480px", md: "560px" },
                  mx: "auto",
                  textAlign: "center",
                  fontWeight: 400,
                }}
              >
                Nos experts CIMA vous accompagnent pour trouver la meilleure
                couverture adaptée à vos besoins. Réponse sous 24h garantie.
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<PhoneIcon />}
                href="/contact"
                sx={{
                  backgroundColor: TEAL_500,
                  color: WHITE,
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: { xs: "1.125rem", sm: "1.25rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "8px",
                  minHeight: TOUCH_TARGETS.buttonLarge,
                  py: { xs: 2.5, sm: 2.25 },
                  px: { xs: 4, sm: 5 },
                  minWidth: { xs: "320px", sm: "280px" },
                  "&:hover": {
                    backgroundColor: "#148560",
                    transform: { xs: "none", md: "translateY(-1px)" },
                  },
                  // Mobile tap feedback for conversion optimization
                  "&:active": {
                    transform: "scale(0.97)",
                  },
                  // Professional insurance CTA styling
                  boxShadow: "none",
                  border: `2px solid ${WHITE}`,
                }}
              >
                Obtenir mon devis gratuit
              </Button>
            </motion.div>
          </Box>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default HomePage;
