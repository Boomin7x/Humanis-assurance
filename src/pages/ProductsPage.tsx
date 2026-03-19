/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/ProductsPage.tsx
/**
 * HUMANIS PRODUCTS PAGE
 *
 * Comprehensive product showcase and selection interface:
 * - IARDT vs Assurance Vie product categorization
 * - Filterable product grid with search capabilities
 * - Product comparison and selection tools
 * - Client-centric product recommendation system
 * - Clear conversion paths to quotation requests
 *
 * Design Language: "Refined Precision"
 * - Product authority through comprehensive coverage lists
 * - Trust building through clear product explanations
 * - Decision support through comparison tools
 */

import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import QuizIcon from "@mui/icons-material/Quiz";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";

import {
  HumanisImage,
  ProductCard,
  SectionHeader,
  SectionWrapper,
} from "@/components/ui";
import { allProducts, iardtProducts, vieProducts } from "@/data/products";
import { images } from "@/utils/imageLoader";

const ProductsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "iardt" | "vie">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [clientType, setClientType] = useState<
    "all" | "particulier" | "entreprise"
  >("all");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    clientType: "",
    need: "",
    budget: "",
  });

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Filter by tab
    if (activeTab === "iardt") {
      products = iardtProducts;
    } else if (activeTab === "vie") {
      products = vieProducts;
    }

    // Filter by search query
    if (searchQuery) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return products;
  }, [activeTab, searchQuery]);

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: "all" | "iardt" | "vie",
  ) => {
    setActiveTab(newValue);
  };

  const handleQuizAnswer = (field: keyof typeof quizAnswers, value: string) => {
    setQuizAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const getQuizRecommendations = () => {
    const { clientType, need } = quizAnswers;
    let recommendations: string | any[] = [];

    if (clientType === "particulier") {
      if (need === "habitation") recommendations = vieProducts.slice(0, 2);
      else if (need === "automobile")
        recommendations = iardtProducts.filter((p) => p.id === "automobile");
      else if (need === "famille")
        recommendations = vieProducts.filter(
          (p) => p.id.includes("epargne") || p.id.includes("education"),
        );
      else recommendations = vieProducts.slice(0, 3);
    } else if (clientType === "entreprise") {
      if (need === "responsabilite")
        recommendations = iardtProducts.filter(
          (p) =>
            p.id.includes("responsabilite") || p.id.includes("multirisques"),
        );
      else if (need === "transport")
        recommendations = iardtProducts.filter((p) =>
          p.id.includes("transport"),
        );
      else if (need === "personnel")
        recommendations = vieProducts.filter(
          (p) => p.id.includes("groupe") || p.id.includes("fin-carriere"),
        );
      else recommendations = iardtProducts.slice(0, 3);
    }

    return recommendations.slice(0, 3);
  };

  return (
    <>
      {/* ===== SECTION 4.1 - PAGE HERO ===== */}
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
            src={images.services.businessMeeting}
            alt="Réunion d'affaires - présentation des produits d'assurance"
            ratio="16/9"
            overlay="navy"
            overlayOpacity={0.8}
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
            <Stack spacing={4} alignItems="center" textAlign="center">
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
                <Typography color="white">Produits</Typography>
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
                Nos Produits
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
                IARDT & Assurance Vie — des solutions pour chaque profil
              </Typography>

              {/* Tab Navigation */}
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  "& .MuiTabs-indicator": { backgroundColor: "secondary.main" },
                  "& .MuiTab-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 600,
                    "&.Mui-selected": { color: "white" },
                  },
                }}
              >
                <Tab label="Tous les produits" value="all" />
                <Tab label="IARDT" value="iardt" />
                <Tab label="Assurance Vie" value="vie" />
              </Tabs>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ===== SECTION 4.2 - PRODUCT FILTER BAR ===== */}
      <Paper
        component="section"
        sx={{
          position: "sticky",
          top: 72, // Navbar height
          zIndex: 100,
          borderBottom: "1px solid",
          borderBottomColor: "divider",
          boxShadow: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Type de client</InputLabel>
                <Select
                  value={clientType}
                  label="Type de client"
                  onChange={(e) =>
                    setClientType(e.target.value as typeof clientType)
                  }
                >
                  <MenuItem value="all">Tous</MenuItem>
                  <MenuItem value="particulier">Particulier</MenuItem>
                  <MenuItem value="entreprise">Entreprise</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                variant="outlined"
                startIcon={<QuizIcon />}
                onClick={() => setShowQuiz(true)}
                fullWidth
                size="small"
              >
                Quel produit pour moi?
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* ===== SECTION 4.3 - IARDT PRODUCTS GRID ===== */}
      {(activeTab === "all" || activeTab === "iardt") && (
        <SectionWrapper id="iardt" background="white" paddingY="normal">
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                overline="IARDT"
                title="Incendie, Accidents, Risques Divers & Transport"
                align="center"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key="iardt-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    {(activeTab === "iardt"
                      ? filteredProducts
                      : iardtProducts
                    ).map((product, index) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <ProductCard {...product} />
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </Container>
        </SectionWrapper>
      )}

      {/* ===== SECTION 4.4 - ASSURANCE VIE PRODUCTS GRID ===== */}
      {(activeTab === "all" || activeTab === "vie") && (
        <SectionWrapper id="vie" background="alt" paddingY="normal">
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                overline="Assurance Vie"
                title="Prévoyance & Épargne"
                align="center"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key="vie-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    {(activeTab === "vie" ? filteredProducts : vieProducts).map(
                      (product, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <ProductCard {...product} />
                          </motion.div>
                        </Grid>
                      ),
                    )}
                  </Grid>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </Container>
        </SectionWrapper>
      )}

      {/* ===== SECTION 4.5 - PRODUCT COMPARISON HELPER ===== */}
      <SectionWrapper background="white" paddingY="normal">
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card sx={{ border: "1px solid", borderColor: "divider" }}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3} alignItems="center" textAlign="center">
                  <QuizIcon
                    sx={{ fontSize: "3rem", color: "secondary.main" }}
                  />

                  <Typography variant="h4" fontWeight={600}>
                    Quel produit pour moi?
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    Pas sûr du produit qui vous convient? Répondez à quelques
                    questions et obtenez des recommandations personnalisées.
                  </Typography>

                  {!showQuiz ? (
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<QuizIcon />}
                      onClick={() => setShowQuiz(true)}
                      sx={{ mt: 2 }}
                    >
                      Commencer le quiz
                    </Button>
                  ) : (
                    <Box sx={{ width: "100%", maxWidth: 500 }}>
                      {quizStep === 1 && (
                        <Stack spacing={3}>
                          <Typography variant="h6">1. Vous êtes ?</Typography>
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                          >
                            <Chip
                              label="Particulier"
                              onClick={() => {
                                handleQuizAnswer("clientType", "particulier");
                                setQuizStep(2);
                              }}
                              variant={
                                quizAnswers.clientType === "particulier"
                                  ? "filled"
                                  : "outlined"
                              }
                              color="primary"
                            />
                            <Chip
                              label="Entreprise"
                              onClick={() => {
                                handleQuizAnswer("clientType", "entreprise");
                                setQuizStep(2);
                              }}
                              variant={
                                quizAnswers.clientType === "entreprise"
                                  ? "filled"
                                  : "outlined"
                              }
                              color="primary"
                            />
                            <Chip
                              label="PME-PMI"
                              onClick={() => {
                                handleQuizAnswer("clientType", "entreprise");
                                setQuizStep(2);
                              }}
                              variant={
                                quizAnswers.clientType === "entreprise"
                                  ? "filled"
                                  : "outlined"
                              }
                              color="primary"
                            />
                          </Stack>
                        </Stack>
                      )}

                      {quizStep === 2 && (
                        <Stack spacing={3}>
                          <Typography variant="h6">
                            2. Quel est votre besoin principal ?
                          </Typography>
                          <Grid container spacing={2}>
                            {(quizAnswers.clientType === "particulier"
                              ? [
                                  {
                                    value: "habitation",
                                    label: "Protéger mon logement",
                                  },
                                  {
                                    value: "automobile",
                                    label: "Assurer mon véhicule",
                                  },
                                  {
                                    value: "famille",
                                    label: "Protéger ma famille",
                                  },
                                  {
                                    value: "epargne",
                                    label: "Épargner pour l'avenir",
                                  },
                                ]
                              : [
                                  {
                                    value: "responsabilite",
                                    label: "Responsabilité civile",
                                  },
                                  {
                                    value: "biens",
                                    label: "Protéger mes biens",
                                  },
                                  {
                                    value: "transport",
                                    label: "Transport/Logistique",
                                  },
                                  {
                                    value: "personnel",
                                    label: "Prévoyance personnel",
                                  },
                                ]).map((option) => (
                                  <Grid size={{ xs: 6 }} key={option.value}>
                                    <Chip
                                      label={option.label}
                                      onClick={() => {
                                        handleQuizAnswer("need", option.value);
                                        setQuizStep(3);
                                      }}
                                      variant={
                                        quizAnswers.need === option.value
                                          ? "filled"
                                          : "outlined"
                                      }
                                      color="secondary"
                                      sx={{ width: "100%" }}
                                    />
                                  </Grid>
                                ))}
                          </Grid>
                        </Stack>
                      )}

                      {quizStep === 3 && (
                        <Stack spacing={3}>
                          <Typography variant="h6">
                            3. Quel est votre budget approximatif ?
                          </Typography>
                          <Stack direction="column" spacing={2}>
                            {[
                              {
                                value: "basic",
                                label: "Moins de 50 000 FCFA/mois",
                              },
                              {
                                value: "standard",
                                label: "50 000 - 200 000 FCFA/mois",
                              },
                              {
                                value: "premium",
                                label: "Plus de 200 000 FCFA/mois",
                              },
                            ].map((option) => (
                              <Chip
                                key={option.value}
                                label={option.label}
                                onClick={() => {
                                  handleQuizAnswer("budget", option.value);
                                  setQuizStep(4);
                                }}
                                variant={
                                  quizAnswers.budget === option.value
                                    ? "filled"
                                    : "outlined"
                                }
                                color="primary"
                                sx={{ width: "100%" }}
                              />
                            ))}
                          </Stack>
                        </Stack>
                      )}

                      {quizStep === 4 && (
                        <Stack spacing={3}>
                          <Typography variant="h6" color="secondary.main">
                            Nos recommandations pour vous :
                          </Typography>
                          <Grid container spacing={2}>
                            {getQuizRecommendations().map((product) => (
                              <Grid size={{ xs: 12 }} key={product.id}>
                                <Card variant="outlined">
                                  <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                      {product.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {product.description}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                          <Button
                            variant="contained"
                            color="secondary"
                            href="/contact"
                            startIcon={<PhoneIcon />}
                          >
                            Demander un devis personnalisé
                          </Button>
                          <Button
                            variant="text"
                            onClick={() => {
                              setShowQuiz(false);
                              setQuizStep(1);
                              setQuizAnswers({
                                clientType: "",
                                need: "",
                                budget: "",
                              });
                            }}
                          >
                            Recommencer
                          </Button>
                        </Stack>
                      )}
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ===== SECTION 4.6 - PRODUCTS CTA ===== */}
      <SectionWrapper background="dark" paddingY="normal">
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Stack spacing={3} alignItems="center" textAlign="center">
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                }}
              >
                Vous ne savez pas quoi choisir?
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 400,
                  maxWidth: "600px",
                }}
              >
                Nos conseillers sont là pour vous aider à trouver la solution
                d'assurance parfaitement adaptée à vos besoins et à votre
                budget.
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<PhoneIcon />}
                href="/contact"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "grey.100",
                  },
                }}
              >
                Parler à un conseiller
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default ProductsPage;
