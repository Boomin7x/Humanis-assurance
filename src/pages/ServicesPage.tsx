// src/pages/ServicesPage.tsx
/**
 * HUMANIS SERVICES PAGE
 *
 * Comprehensive showcase of service expertise:
 * - Courtage d'assurances with CIMA credentials
 * - Risk Management methodology and approach
 * - International Programs capability
 * - Client process transparency
 * - Audience segmentation (Particuliers vs Entreprises)
 * - Client testimonials for credibility
 *
 * Design Language: "Refined Precision"
 * - Service authority through process explanation and credentials
 * - Trust building through methodology transparency
 * - Clear value proposition for each service line
 */

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React from "react";

import {
  HumanisImage,
  SectionHeader,
  SectionWrapper,
  TestimonialCard,
} from "@/components/ui";
import { expertiseAreas, riskManagementPillars } from "@/data/services";
import { processSteps } from "@/data/stats";
import { testimonials } from "@/data/testimonials";
import { images } from "@/utils/imageLoader";
const ServicesPage: React.FC = () => {
  return (
    <>
      {/* ===== SECTION 3.1 - PAGE HERO ===== */}
      <Box
        component="section"
        sx={{
          position: "relative",
          height: "360px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
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
            src={images.office.teamAtWork}
            alt="Équipe Humanis Assurances au travail"
            ratio="16/9"
            overlay="navy"
            overlayOpacity={0.78}
            priority
            radius={0}
          />
        </Box>

        {/* Hero Content */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Stack spacing={3} alignItems="center" textAlign="center">
              {/* Breadcrumb */}
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                  "& .MuiBreadcrumbs-separator": {
                    color: "rgba(255, 255, 255, 0.6)",
                  },
                }}
              >
                <Link
                  color="inherit"
                  href="/"
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    textDecoration: "none",
                    "&:hover": { color: "white" },
                  }}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Accueil
                </Link>
                <Typography color="white">Services</Typography>
              </Breadcrumbs>

              {/* H1 Title */}
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  color: "white",
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Nos Services
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: { xs: "1.125rem", md: "1.375rem" },
                  fontWeight: 400,
                  textAlign: "center",
                  maxWidth: "600px",
                }}
              >
                Courtage · Risk Management · Programmes Internationaux
              </Typography>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ===== SECTION 3.2 - COURTAGE D'ASSURANCES ===== */}
      <SectionWrapper id="courtage" background="white" paddingY="normal">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left - Content */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Stack spacing={4}>
                  <SectionHeader
                    overline="Courtage d'assurances"
                    title="Votre partenaire expert pour tous vos besoins d'assurance"
                    align="left"
                  />

                  <Typography variant="body1" color="text.secondary">
                    En tant que courtier agréé CIMA, nous mettons notre
                    expertise au service de la protection de vos biens et
                    activités. Notre approche transparente et notre connaissance
                    approfondie du marché camerounais nous permettent de vous
                    proposer les meilleures solutions d'assurance.
                  </Typography>

                  {/* Expertise Checklist */}
                  <List sx={{ p: 0 }}>
                    {expertiseAreas.map((area) => (
                      <ListItem key={area.id} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: "secondary.main" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight={600}>
                              {area.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {area.description}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </motion.div>
            </Grid>

            {/* Right - Photo */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box sx={{ position: "relative" }}>
                  <HumanisImage
                    src={images.clients.consultation}
                    alt="Conseiller Humanis en consultation avec un client"
                    ratio="4/3"
                    radius={8}
                  />

                  {/* Badge Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      backgroundColor: "secondary.main",
                      color: "white",
                      px: 2,
                      py: 1,
                      borderRadius: "20px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    Expert courtier agréé CIMA
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== SECTION 3.3 - RISK MANAGEMENT ===== */}
      <SectionWrapper id="risk-management" background="alt" paddingY="normal">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left - Photo */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box sx={{ position: "relative" }}>
                  <HumanisImage
                    src={images.services.businessMeeting}
                    alt="Équipe dirigeante analysant les risques d'entreprise"
                    ratio="4/3"
                    radius={8}
                  />

                  {/* Badge Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      backgroundColor: "primary.dark",
                      color: "white",
                      px: 2,
                      py: 1,
                      borderRadius: "20px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    Risk Management
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right - 4 Pillars Grid */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Stack spacing={3}>
                  <SectionHeader
                    overline="Risk Management"
                    title="Maîtrisez vos risques pour sécuriser votre avenir"
                    align="left"
                  />

                  <Grid container spacing={2}>
                    {riskManagementPillars.map((pillar, index) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={pillar.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Card
                            sx={{
                              height: "100%",
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <CardContent>
                              <Stack spacing={2}>
                                <Typography
                                  variant="h3"
                                  sx={{
                                    color: "secondary.main",
                                    fontSize: "1.5rem",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                  }}
                                >
                                  {pillar.number.toString().padStart(2, "0")}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  fontWeight={600}
                                  fontSize="1rem"
                                >
                                  {pillar.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {pillar.description}
                                </Typography>
                              </Stack>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== SECTION 3.4 - INTERNATIONAL PROGRAMS ===== */}
      <SectionWrapper id="international" background="white" paddingY="normal">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left - Content */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Stack spacing={4}>
                  <SectionHeader
                    overline="Programmes Internationaux"
                    title="Gestion des assurances multi-pays pour vos activités internationales"
                    align="left"
                  />

                  <Typography variant="body1" color="text.secondary">
                    Nos programmes internationaux vous permettent de gérer
                    efficacement les assurances de vos filiales et activités à
                    l'étranger. Grâce à notre réseau de partenaires
                    internationaux et notre expertise locale, nous vous
                    accompagnons dans la mise en place de couvertures cohérentes
                    et optimisées.
                  </Typography>

                  {/* Key Points */}
                  <Stack spacing={2}>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <PublicIcon sx={{ color: "secondary.main", mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Couverture mondiale
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Programmes d'assurance cohérents dans tous vos pays
                          d'implantation
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <CheckCircleIcon
                        sx={{ color: "secondary.main", mt: 0.5 }}
                      />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Expertise locale
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Connaissance approfondie des réglementations et
                          marchés locaux
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <BusinessIcon sx={{ color: "secondary.main", mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          Réseau international
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Partenariats avec des courtiers de référence dans le
                          monde entier
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>

            {/* Right - Photo */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box sx={{ position: "relative" }}>
                  <HumanisImage
                    src={images.services.international}
                    alt="Réseau international et couverture mondiale"
                    ratio="4/3"
                    radius={8}
                  />

                  {/* Floating Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      backgroundColor: "primary.dark",
                      color: "white",
                      px: 2,
                      py: 1,
                      borderRadius: "20px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    Couverture mondiale
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== SECTION 3.5 - CLIENT PROCESS TIMELINE ===== */}
      <SectionWrapper background="alt" paddingY="normal">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              overline="Notre processus"
              title="De la demande à la protection : un accompagnement sur mesure"
              align="center"
            />

            {/* Process Steps - Horizontal on Desktop, Vertical on Mobile */}
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={3} justifyContent="center">
                {processSteps.map((step, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={step.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Stack
                        spacing={2}
                        alignItems="center"
                        textAlign="center"
                        sx={{ height: "100%" }}
                      >
                        {/* Step Number Circle */}
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: "primary.main",
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                            fontWeight: 700,
                          }}
                        >
                          {step.number}
                        </Box>

                        {/* Step Title */}
                        <Typography variant="h6" fontWeight={600}>
                          {step.title}
                        </Typography>

                        {/* Step Description */}
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Stack>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {/* Connecting Line - Hidden on Mobile */}
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "relative",
                  mt: -6,
                  mb: 4,
                }}
              >
                <Box
                  sx={{
                    height: "1px",
                    backgroundColor: "divider",
                    width: "80%",
                    margin: "0 auto",
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ===== SECTION 3.6 - AUDIENCE SPLIT ===== */}
      <SectionWrapper background="white" paddingY="normal">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              overline="Nos clients"
              title="Des solutions adaptées à chaque profil"
              align="center"
            />

            <Grid container spacing={4} sx={{ mt: 2 }}>
              {/* Particuliers Card */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      position: "relative",
                      minHeight: 480,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    {/* Background Photo */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                      }}
                    >
                      <HumanisImage
                        src={images.clients.family}
                        alt="Famille camerounaise heureuse"
                        ratio="1/1"
                        overlay="blue"
                        overlayOpacity={0.7}
                        radius={0}
                      />
                    </Box>

                    {/* Content */}
                    <CardContent
                      sx={{
                        position: "relative",
                        zIndex: 1,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        color: "white",
                        p: 4,
                      }}
                    >
                      <Stack spacing={3}>
                        <PersonIcon sx={{ fontSize: "3rem", color: "white" }} />

                        <Typography variant="h4" fontWeight={700}>
                          Vous êtes un particulier?
                        </Typography>

                        <Stack spacing={1}>
                          <Typography variant="body1">
                            • Assurance habitation
                          </Typography>
                          <Typography variant="body1">
                            • Assurance automobile
                          </Typography>
                          <Typography variant="body1">
                            • Assurance vie
                          </Typography>
                          <Typography variant="body1">
                            • Prévoyance individuelle
                          </Typography>
                        </Stack>

                        <Button
                          variant="outlined"
                          endIcon={<ArrowForwardIcon />}
                          href="/produits#vie"
                          sx={{
                            borderColor: "white",
                            color: "white",
                            alignSelf: "flex-start",
                            "&:hover": {
                              borderColor: "white",
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                          }}
                        >
                          Voir mes options
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              {/* Entreprises Card */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      position: "relative",
                      minHeight: 480,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    {/* Background Photo */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                      }}
                    >
                      <HumanisImage
                        src={images.clients.businessTeam}
                        alt="Équipe d'entreprise camerounaise"
                        ratio="1/1"
                        overlay="dark"
                        overlayOpacity={0.6}
                        radius={0}
                      />
                    </Box>

                    {/* Content */}
                    <CardContent
                      sx={{
                        position: "relative",
                        zIndex: 1,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        color: "white",
                        p: 4,
                        background:
                          "linear-gradient(to top, rgba(26,158,117,0.92) 0%, rgba(26,158,117,0.25) 100%)",
                      }}
                    >
                      <Stack spacing={3}>
                        <BusinessIcon
                          sx={{ fontSize: "3rem", color: "white" }}
                        />

                        <Typography variant="h4" fontWeight={700}>
                          Vous êtes une entreprise?
                        </Typography>

                        <Stack spacing={1}>
                          <Typography variant="body1">
                            • Multirisques professionnelle
                          </Typography>
                          <Typography variant="body1">
                            • Responsabilité civile
                          </Typography>
                          <Typography variant="body1">
                            • Flotte automobile
                          </Typography>
                          <Typography variant="body1">
                            • Risk Management
                          </Typography>
                        </Stack>

                        <Button
                          variant="outlined"
                          endIcon={<ArrowForwardIcon />}
                          href="/produits#iardt"
                          sx={{
                            borderColor: "white",
                            color: "white",
                            alignSelf: "flex-start",
                            "&:hover": {
                              borderColor: "white",
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                          }}
                        >
                          Voir mes options
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ===== SECTION 3.7 - TESTIMONIALS ===== */}
      <SectionWrapper background="alt" paddingY="normal">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              overline="Témoignages"
              title="Ce que disent nos clients"
              align="center"
            />

            <Grid container spacing={4} sx={{ mt: 2 }}>
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <TestimonialCard {...testimonial} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default ServicesPage;
