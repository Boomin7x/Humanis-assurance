// src/pages/AboutPage.tsx
/**
 * HUMANIS ABOUT PAGE
 *
 * Professional credibility and regulatory compliance focus:
 * - CIMA regulatory approval and compliance messaging
 * - Team expertise and professional credentials
 * - Local market knowledge and Cameroon expertise
 * - Trust building through years of experience and client success
 * - Company values and missions aligned with insurance industry standards
 *
 * Design Language: "Refined Precision"
 * - Authority through professional imagery and clear value propositions
 * - Transparency in company history, certifications, and expertise
 * - Trust elements positioned strategically throughout the page
 */

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ListenIcon from "@mui/icons-material/Hearing";
import InnovationIcon from "@mui/icons-material/Lightbulb";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  Badge,
  HumanisImage,
  SectionHeader,
  SectionWrapper,
  TrustBadge,
} from "@/components/ui";
import { animationPresets } from "@/theme/motion";
import {
  BRAND_50,
  NAVY_800,
  NEUTRAL_50,
  NEUTRAL_600,
  PRIMARY_500,
  TEAL_500,
  WHITE,
} from "@/theme/tokens";
import {
  TOUCH_TARGETS,
  GRID_MOBILE,
  INSURANCE_MOBILE_UX,
} from "@/theme/responsive";
import { getImage, images } from "@/utils/imageLoader";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  // Team members data
  const teamMembers = [
    {
      name: "Jean-Claude Eyoum",
      position: "Directeur Général",
      description: `Expert en courtage d'assurance avec 20+ ans d'expérience`,
      image: images.team.member01,
      specialties: ["Courtage", "Risk Management", "Stratégie"],
    },
    {
      name: "Marie Ngono",
      position: "Directrice Opérationnelle",
      description: "Spécialiste en assurance vie et programmes internationaux",
      image: images.team.member02,
      specialties: ["Assurance Vie", "International", "Conseil"],
    },
    {
      name: "Paul Mendomo",
      position: "Responsable IARDT",
      description: "Expert en assurance dommages et responsabilité civile",
      image: images.team.member03,
      specialties: ["IARDT", "Entreprises", "Sinistres"],
    },
    {
      name: "Sarah Bello",
      position: "Consultante Risk Management",
      description: "Analyste risk manager certifiée avec focus PME",
      image: images.team.member04,
      specialties: ["Risk Management", "PME", "Audit"],
    },
  ];

  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <SectionWrapper background="dark" paddingY="large">
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.3,
            zIndex: 0,
          }}
        >
          <HumanisImage
            src={getImage(images.office.exterior, "office")}
            alt="Immeuble Akwa où se trouve Humanis Assurances"
            ratio="16/9"
            overlay="navy"
            overlayOpacity={0.8}
            radius={0}
            priority
            animated={false}
          />
        </Box>

        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, px: { xs: 2, sm: 3, md: 0 } }}
        >
          <motion.div
            variants={animationPresets.slideUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            <Box
              sx={{
                textAlign: "center",
                maxWidth: { xs: "100%", sm: "700px", md: "800px" },
                mx: "auto",
              }}
            >
              {/* Breadcrumb */}
              <Typography
                variant="overline"
                sx={{
                  color: TEAL_500,
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                {t("pages.about.breadcrumb")}
              </Typography>

              {/* Title */}
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  color: WHITE,
                  fontSize: {
                    xs: "clamp(1.75rem, 8vw, 2.5rem)", // 28-40px mobile
                    sm: "clamp(2.25rem, 6vw, 3rem)", // 36-48px mobile landscape
                    md: "clamp(3rem, 4vw, 3.75rem)", // 48-60px desktop
                  },
                  fontWeight: 700,
                  lineHeight: { xs: 1.2, md: 1.1 },
                  letterSpacing: "-0.03em",
                  mb: { xs: 2, sm: 3 },
                }}
              >
                {t("pages.about.title")}
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                  fontWeight: 400,
                  lineHeight: 1.5,
                  mb: { xs: 3, sm: 4 },
                  maxWidth: { xs: "100%", sm: "500px", md: "600px" },
                  mx: "auto",
                }}
              >
                {t("pages.about.subtitle")}
              </Typography>

              {/* Trust Badges */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 3 }}
                justifyContent="center"
                alignItems="center"
                sx={{
                  mt: { xs: 3, sm: 4 },
                  ...INSURANCE_MOBILE_UX.trustBadges,
                }}
              >
                <TrustBadge
                  variant="cima-approved"
                  theme="dark"
                  size="medium"
                />
                <TrustBadge
                  variant="client-count"
                  value="500"
                  theme="dark"
                  size="medium"
                />
                <TrustBadge
                  variant="experience-years"
                  value="15"
                  theme="dark"
                  size="medium"
                />
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ===== WHO WE ARE ===== */}
      <SectionWrapper background="white" paddingY="large">
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, sm: 5, md: 6 }} alignItems="center">
            {/* Content */}
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 1 }}>
              <SectionHeader
                title="Qui sommes-nous?"
                subtitle="Humanis Assurances est un cabinet de courtage en assurances installé à Douala depuis 2009. Nous accompagnons les entreprises et particuliers du Cameroun dans leurs démarches d'assurance avec une approche personnalisée et professionnelle."
                align="left"
              />

              <Box sx={{ mt: { xs: 3, md: 4 } }}>
                <Typography
                  sx={{
                    color: NEUTRAL_600,
                    fontFamily: "Satoshi, system-ui, sans-serif",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    lineHeight: 1.6,
                    mb: { xs: 2.5, md: 3 },
                    textAlign: "center",
                    "@media (min-width: 900px)": {
                      textAlign: "left",
                    },
                  }}
                >
                  <strong>Agréé CIMA depuis 2009</strong>, nous offrons une
                  gamme complète de services d'assurance : courtage
                  professionnel, risk management avancé, et programmes
                  internationaux. Notre expertise reconnue nous positionne comme
                  le partenaire de confiance des entreprises et particuliers au
                  Cameroun.
                </Typography>

                <Typography
                  sx={{
                    color: NEUTRAL_600,
                    fontFamily: "Satoshi, system-ui, sans-serif",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    lineHeight: 1.6,
                    textAlign: "center",
                    "@media (min-width: 900px)": {
                      textAlign: "left",
                    },
                  }}
                >
                  En tant que courtier indépendant, nous négocions les
                  meilleures conditions auprès de 20+ compagnies partenaires,
                  garantissant à nos clients des solutions optimales adaptées
                  aux réalités du marché camerounais tout en respectant les
                  standards internationaux de qualité.
                </Typography>
              </Box>

              {/* Key Stats - Mobile responsive */}
              <Grid
                container
                spacing={{ xs: 2, sm: 3 }}
                sx={{ mt: { xs: 3, md: 4 } }}
              >
                <Grid size={{ xs: 4 }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: PRIMARY_500,
                        fontFamily: "ClashDisplay, system-ui, sans-serif",
                        fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                        fontWeight: 700,
                        lineHeight: 1,
                        mb: { xs: 0.5, md: 1 },
                      }}
                    >
                      2009
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: NEUTRAL_600,
                        fontFamily: "Satoshi, system-ui, sans-serif",
                        fontSize: { xs: "0.6875rem", sm: "0.75rem" },
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        lineHeight: 1.3,
                        display: "block",
                      }}
                    >
                      Agrément CIMA
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: PRIMARY_500,
                        fontFamily: "ClashDisplay, system-ui, sans-serif",
                        fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                        fontWeight: 700,
                        lineHeight: 1,
                        mb: { xs: 0.5, md: 1 },
                      }}
                    >
                      500+
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: NEUTRAL_600,
                        fontFamily: "Satoshi, system-ui, sans-serif",
                        fontSize: { xs: "0.6875rem", sm: "0.75rem" },
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        lineHeight: 1.3,
                        display: "block",
                      }}
                    >
                      Clients protégés
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: PRIMARY_500,
                        fontFamily: "ClashDisplay, system-ui, sans-serif",
                        fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                        fontWeight: 700,
                        lineHeight: 1,
                        mb: { xs: 0.5, md: 1 },
                      }}
                    >
                      20+
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: NEUTRAL_600,
                        fontFamily: "Satoshi, system-ui, sans-serif",
                        fontSize: { xs: "0.6875rem", sm: "0.75rem" },
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        lineHeight: 1.3,
                        display: "block",
                      }}
                    >
                      Assureurs partenaires
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Office Image */}
            <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 2 }}>
              <HumanisImage
                src={getImage(images.office.interior, "office")}
                alt="Intérieur des bureaux Humanis Assurances à Douala"
                ratio="4/3"
                radius={8}
              />
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== OUR MISSIONS ===== */}
      <SectionWrapper background="alt" paddingY="large">
        <Container maxWidth="lg">
          <SectionHeader
            overline={t("pages.about.missions.overline")}
            title="Notre mission au service de l'économie camerounaise"
            align="center"
            animationDelay={0.1}
          />

          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 4 }}
            sx={{ mt: { xs: 3, sm: 4 } }}
          >
            {[
              {
                title: "Protection accessible",
                description:
                  "Démocratiser l'assurance au Cameroun avec des solutions adaptées aux réalités locales et des conseils d'experts",
                icon: <SupportAgentIcon />,
              },
              {
                title: "Croissance accompagnée",
                description:
                  "Soutenir le développement des PME-PMI camerounaises avec des programmes d'assurance évolutifs et flexibles",
                icon: <TrendingUpIcon />,
              },
              {
                title: "Expertise internationale",
                description:
                  "Offrir aux grandes entreprises un courtage de niveau international avec une connaissance approfondie du marché CEMAC",
                icon: <BusinessCenterIcon />,
              },
              {
                title: "Risk Management intégré",
                description:
                  "Intégrer la gestion des risques dans la stratégie d'entreprise pour une protection proactive et optimisée",
                icon: <SecurityIcon />,
              },
            ].map((mission, index) => (
              <Grid size={GRID_MOBILE.halfOnDesktop} key={index}>
                <motion.div
                  variants={animationPresets.slideUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor: WHITE,
                      border: `1px solid rgba(13, 94, 175, 0.1)`,
                      borderRadius: "8px",
                      p: { xs: 0.5, md: 1 },
                      transition: "all 300ms ease",
                      "&:hover": {
                        borderColor: PRIMARY_500,
                        borderWidth: "2px",
                        // Disable hover transform on mobile
                        transform: { xs: "none", md: "translateY(-2px)" },
                        backgroundColor: BRAND_50,
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 2, sm: 3 }}
                        alignItems={{ xs: "center", sm: "flex-start" }}
                        textAlign={{ xs: "center", sm: "left" }}
                      >
                        <Box
                          sx={{
                            width: { xs: 48, sm: 56 },
                            height: { xs: 48, sm: 56 },
                            borderRadius: "50%",
                            backgroundColor: `rgba(13, 94, 175, 0.1)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: PRIMARY_500,
                            "& svg": {
                              fontSize: { xs: "1.25rem", sm: "1.5rem" },
                            },
                          }}
                        >
                          {mission.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: NAVY_800,
                              fontFamily: "ClashDisplay, system-ui, sans-serif",
                              fontSize: { xs: "1rem", sm: "1.125rem" },
                              fontWeight: 600,
                              lineHeight: 1.3,
                              mb: { xs: 1, sm: 1.5 },
                            }}
                          >
                            {mission.title}
                          </Typography>
                          <Typography
                            sx={{
                              color: NEUTRAL_600,
                              fontFamily: "Satoshi, system-ui, sans-serif",
                              fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                              lineHeight: 1.5,
                            }}
                          >
                            {mission.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== OUR VALUES ===== */}
      <SectionWrapper background="white" paddingY="large">
        <Container maxWidth="lg">
          <SectionHeader
            overline={t("pages.about.values.overline")}
            title="Les valeurs qui nous guident"
            align="center"
            animationDelay={0.1}
          />

          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 4 }}
            sx={{ mt: { xs: 3, sm: 4 } }}
          >
            {[
              {
                title: "Écoute active",
                description:
                  "Nous prenons le temps de comprendre vos besoins spécifiques pour proposer des solutions sur-mesure",
                icon: <ListenIcon />,
                color: PRIMARY_500,
              },
              {
                title: "Disponibilité permanente",
                description:
                  "Support client réactif et présence terrain pour un accompagnement optimal en toute circonstance",
                icon: <AccessTimeIcon />,
                color: TEAL_500,
              },
              {
                title: "Innovation continue",
                description:
                  "Intégration des dernières technologies et pratiques du marché pour optimiser votre protection",
                icon: <InnovationIcon />,
                color: PRIMARY_500,
              },
              {
                title: "Engagement durable",
                description:
                  "Partenariat à long terme basé sur la confiance, la transparence et des résultats mesurables",
                icon: <HandshakeIcon />,
                color: TEAL_500,
              },
            ].map((value, index) => (
              <Grid size={GRID_MOBILE.quarterOnDesktop} key={index}>
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
                      p: { xs: 2.5, sm: 3 },
                      height: "100%",
                      borderRadius: "8px",
                      transition: "all 300ms ease",
                      "&:hover": {
                        backgroundColor: NEUTRAL_50,
                        // Disable hover transform on mobile
                        transform: { xs: "none", md: "translateY(-2px)" },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 60, sm: 72 },
                        height: { xs: 60, sm: 72 },
                        borderRadius: "50%",
                        backgroundColor: `rgba(${value.color === PRIMARY_500 ? "13, 94, 175" : "26, 158, 117"}, 0.1)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: { xs: 2, sm: 3 },
                        color: value.color,
                        "& svg": {
                          fontSize: { xs: 28, sm: 32 },
                        },
                      }}
                    >
                      {value.icon}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        color: NAVY_800,
                        fontFamily: "ClashDisplay, system-ui, sans-serif",
                        fontSize: { xs: "1rem", sm: "1.125rem" },
                        fontWeight: 600,
                        mb: { xs: 1.5, sm: 2 },
                        lineHeight: 1.3,
                      }}
                    >
                      {value.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: NEUTRAL_600,
                        fontFamily: "Satoshi, system-ui, sans-serif",
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                        lineHeight: 1.5,
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== OUR EXPERTISE ===== */}
      <SectionWrapper background="alt" paddingY="large">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Content */}
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionHeader
                title={t("pages.about.expertise.title")}
                overline={t("pages.about.expertise.since")}
              />

              <Stack spacing={3} sx={{ mt: 4 }}>
                {[
                  "Audit et diagnostic des besoins d'assurance",
                  "Conseil stratégique en gestion des risques",
                  "Gestion administrative des contrats et sinistres",
                  "Représentation auprès des compagnies d'assurance",
                  "Risk management et prévention des risques",
                ].map((item, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <VerifiedIcon sx={{ color: TEAL_500, fontSize: 24 }} />
                    <Typography
                      sx={{
                        color: NEUTRAL_600,
                        fontFamily: "Satoshi, system-ui, sans-serif",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>

            {/* Client Consultation Image */}
            <Grid size={{ xs: 12, md: 6 }}>
              <HumanisImage
                src={getImage(images.clients.consultation, "consultation")}
                alt="Consultation client chez Humanis Assurances"
                ratio="4/3"
                radius={8}
              />
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== OUR TEAM ===== */}
      <SectionWrapper background="white" paddingY="large">
        <Container maxWidth="lg">
          <SectionHeader
            overline={t("pages.about.team.overline")}
            title={t("pages.about.team.title")}
            align="center"
            animationDelay={0.1}
          />

          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 4 }}
            sx={{ mt: { xs: 3, sm: 4 } }}
          >
            {teamMembers.map((member, index) => (
              <Grid size={GRID_MOBILE.quarterOnDesktop} key={index}>
                <motion.div
                  variants={animationPresets.slideUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor: WHITE,
                      border: `1px solid rgba(13, 94, 175, 0.1)`,
                      borderRadius: "8px",
                      overflow: "hidden",
                      transition: "all 300ms ease",
                      "&:hover": {
                        // Disable hover transform on mobile
                        transform: { xs: "none", md: "translateY(-4px)" },
                        borderColor: PRIMARY_500,
                        borderWidth: "2px",
                        backgroundColor: BRAND_50,
                      },
                    }}
                  >
                    {/* Member Photo */}
                    <HumanisImage
                      src={getImage(member.image, "team")}
                      alt={`${member.name}, ${member.position} chez Humanis Assurances`}
                      ratio="1/1"
                      radius={0}
                    />

                    <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                      {/* Name & Position */}
                      <Typography
                        variant="h6"
                        sx={{
                          color: NAVY_800,
                          fontFamily: "ClashDisplay, system-ui, sans-serif",
                          fontSize: { xs: "1rem", sm: "1.125rem" },
                          fontWeight: 600,
                          lineHeight: 1.2,
                          mb: 0.5,
                        }}
                      >
                        {member.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: PRIMARY_500,
                          fontFamily: "Satoshi, system-ui, sans-serif",
                          fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                          fontWeight: 600,
                          mb: { xs: 1.5, sm: 2 },
                        }}
                      >
                        {member.position}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          color: NEUTRAL_600,
                          fontFamily: "Satoshi, system-ui, sans-serif",
                          fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                          lineHeight: 1.5,
                          mb: { xs: 2, sm: 3 },
                        }}
                      >
                        {member.description}
                      </Typography>

                      {/* Specialties - Stack vertically on mobile */}
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        gap={1}
                      >
                        {member.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="blue" size="small">
                            {specialty}
                          </Badge>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== CTA SECTION ===== */}
      <SectionWrapper background="dark" paddingY="large">
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
                  fontFamily: "ClashDisplay, system-ui, sans-serif",
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                {t("pages.about.cta.title")}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontFamily: "Satoshi, system-ui, sans-serif",
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  lineHeight: 1.6,
                  mb: 4,
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                {t("pages.about.cta.subtitle")}
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                href="/contact"
                sx={{
                  backgroundColor: TEAL_500,
                  color: WHITE,
                  fontFamily: "Satoshi, system-ui, sans-serif",
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: { xs: "6px", sm: "8px" },
                  minHeight: TOUCH_TARGETS.buttonComfortable,
                  py: { xs: 1.75, sm: 2 },
                  px: { xs: 3, sm: 4 },
                  minWidth: { xs: "280px", sm: "auto" },
                  "&:hover": {
                    backgroundColor: "#148560",
                  },
                  // Mobile tap feedback
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                {t("pages.about.cta.button")}
              </Button>
            </motion.div>
          </Box>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default AboutPage;
