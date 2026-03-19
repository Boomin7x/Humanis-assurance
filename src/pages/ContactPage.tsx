// src/pages/ContactPage.tsx
/**
 * HUMANIS CONTACT PAGE
 *
 * Professional contact interface with trust-building elements:
 * - Clear contact information and office details
 * - Professional contact form with proper validation
 * - Google Maps integration for location transparency
 * - Multiple communication channels (phone, email, WhatsApp)
 * - Rapid response commitment and service hours
 *
 * Design Language: "Refined Precision"
 * - Contact authority through multiple channels and quick response promise
 * - Trust building through transparency (address, hours, direct contact)
 * - Professional presentation of all contact methods
 */

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SendIcon from "@mui/icons-material/Send";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React, { useState } from "react";

import { HumanisImage, SectionHeader, SectionWrapper } from "@/components/ui";
import { contactInfo } from "@/data/contact";
import { processSteps } from "@/data/stats";
import { images } from "@/utils/imageLoader";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  clientType: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    clientType: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.clientType) {
      newErrors.clientType = "Veuillez sélectionner votre profil";
    }

    if (!formData.subject) {
      newErrors.subject = "Veuillez sélectionner un objet";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate form submission (replace with actual EmailJS or Formspree integration)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form on success
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        clientType: "",
        subject: "",
        message: "",
      });

      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ===== SECTION 5.1 - PAGE HERO ===== */}
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
            src={images.office.interior}
            alt="Bureaux Humanis Assurances - espace d'accueil moderne"
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
                <Typography color="white">Contact</Typography>
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
                Contactez-nous
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
                Notre équipe vous répond dans les 24 heures
              </Typography>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ===== SECTION 5.2 - CONTACT SPLIT LAYOUT ===== */}
      <SectionWrapper background="white" paddingY="normal">
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Left - Contact Form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Stack spacing={4}>
                  <SectionHeader
                    overline="Formulaire de contact"
                    title="Envoyez-nous un message"
                    align="left"
                  />

                  <Paper
                    sx={{ p: 4, border: "1px solid", borderColor: "divider" }}
                  >
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={3}>
                        {/* Form Status Alerts */}
                        {submitStatus === "success" && (
                          <Alert
                            severity="success"
                            icon={<CheckCircleIcon />}
                            sx={{ mb: 2 }}
                          >
                            Message envoyé avec succès! Nous vous répondons dans
                            les 24 heures.
                          </Alert>
                        )}

                        {submitStatus === "error" && (
                          <Alert severity="error" sx={{ mb: 2 }}>
                            Une erreur est survenue. Veuillez réessayer ou nous
                            contacter directement.
                          </Alert>
                        )}

                        {/* Form Fields */}
                        <Grid container spacing={3}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              label="Nom complet"
                              value={formData.fullName}
                              onChange={(e) =>
                                handleInputChange("fullName", e.target.value)
                              }
                              error={!!errors.fullName}
                              helperText={errors.fullName}
                              required
                            />
                          </Grid>

                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                              fullWidth
                              type="email"
                              label="Email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              error={!!errors.email}
                              helperText={errors.email}
                              required
                            />
                          </Grid>
                        </Grid>

                        <TextField
                          fullWidth
                          type="tel"
                          label="Téléphone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+237 6XX XX XX XX"
                        />

                        <Grid container spacing={3}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl
                              fullWidth
                              required
                              error={!!errors.clientType}
                            >
                              <InputLabel>Vous êtes</InputLabel>
                              <Select
                                value={formData.clientType}
                                label="Vous êtes"
                                onChange={(e) =>
                                  handleInputChange(
                                    "clientType",
                                    e.target.value,
                                  )
                                }
                              >
                                <MenuItem value="particulier">
                                  Particulier
                                </MenuItem>
                                <MenuItem value="entreprise">
                                  Entreprise
                                </MenuItem>
                                <MenuItem value="autre">Autre</MenuItem>
                              </Select>
                              {errors.clientType && (
                                <Typography
                                  variant="caption"
                                  color="error"
                                  sx={{ mt: 0.5, ml: 2 }}
                                >
                                  {errors.clientType}
                                </Typography>
                              )}
                            </FormControl>
                          </Grid>

                          <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl
                              fullWidth
                              required
                              error={!!errors.subject}
                            >
                              <InputLabel>Objet</InputLabel>
                              <Select
                                value={formData.subject}
                                label="Objet"
                                onChange={(e) =>
                                  handleInputChange("subject", e.target.value)
                                }
                              >
                                <MenuItem value="courtage">Courtage</MenuItem>
                                <MenuItem value="risk-management">
                                  Risk Management
                                </MenuItem>
                                <MenuItem value="international">
                                  Programmes Internationaux
                                </MenuItem>
                                <MenuItem value="devis">Devis</MenuItem>
                                <MenuItem value="autre">Autre</MenuItem>
                              </Select>
                              {errors.subject && (
                                <Typography
                                  variant="caption"
                                  color="error"
                                  sx={{ mt: 0.5, ml: 2 }}
                                >
                                  {errors.subject}
                                </Typography>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>

                        <TextField
                          fullWidth
                          multiline
                          rows={5}
                          label="Message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          error={!!errors.message}
                          helperText={
                            errors.message ||
                            "Décrivez votre besoin ou votre question"
                          }
                          required
                        />

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={isSubmitting}
                          endIcon={
                            isSubmitting ? (
                              <CircularProgress size={20} />
                            ) : (
                              <SendIcon />
                            )
                          }
                          fullWidth
                          sx={{ mt: 2 }}
                        >
                          {isSubmitting
                            ? "Envoi en cours..."
                            : "Envoyer le message"}
                        </Button>
                      </Stack>
                    </form>
                  </Paper>
                </Stack>
              </motion.div>
            </Grid>

            {/* Right - Contact Information */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Stack spacing={4}>
                  {/* Humanis Logo */}
                  <Box textAlign="center">
                    <img
                      src={images.logo.color}
                      alt="Humanis Assurances"
                      style={{ maxHeight: "60px", width: "auto" }}
                    />
                  </Box>

                  {/* Contact Cards */}
                  <Stack spacing={3}>
                    {/* Address */}
                    <Card variant="outlined">
                      <CardContent>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-start"
                        >
                          <LocationOnIcon
                            sx={{ color: "primary.main", mt: 0.5 }}
                          />
                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              Adresse
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {contactInfo.address}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Akwa, Douala - Cameroun
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>

                    {/* Phones */}
                    <Card variant="outlined">
                      <CardContent>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-start"
                        >
                          <PhoneIcon sx={{ color: "primary.main", mt: 0.5 }} />
                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              Téléphone
                            </Typography>
                            {contactInfo.phones.map((phone, index) => (
                              <Typography
                                key={index}
                                variant="body2"
                                color="text.secondary"
                              >
                                <Link
                                  href={`tel:+237${phone.replace(/\s/g, "")}`}
                                  color="inherit"
                                >
                                  +237 {phone}
                                </Link>
                              </Typography>
                            ))}
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>

                    {/* Email */}
                    <Card variant="outlined">
                      <CardContent>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-start"
                        >
                          <EmailIcon sx={{ color: "primary.main", mt: 0.5 }} />
                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              Email
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <Link
                                href={`mailto:${contactInfo.email}`}
                                color="inherit"
                              >
                                {contactInfo.email}
                              </Link>
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>

                    {/* Website */}
                    <Card variant="outlined">
                      <CardContent>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-start"
                        >
                          <LanguageIcon
                            sx={{ color: "primary.main", mt: 0.5 }}
                          />
                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              Site web
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {contactInfo.website}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>

                    {/* WhatsApp */}
                    <Card variant="outlined">
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <WhatsAppIcon
                            sx={{ color: "#25D366", fontSize: "2rem" }}
                          />
                          <Box flexGrow={1}>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              WhatsApp
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              gutterBottom
                            >
                              Discutez directement avec nous
                            </Typography>
                          </Box>
                          <Button
                            variant="contained"
                            size="small"
                            href="https://wa.me/237686132013"
                            target="_blank"
                            sx={{
                              backgroundColor: "#25D366",
                              "&:hover": { backgroundColor: "#1EBE5A" },
                            }}
                          >
                            Discuter
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>

                    {/* Office Hours */}
                    <Card variant="outlined">
                      <CardContent>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-start"
                        >
                          <AccessTimeIcon
                            sx={{ color: "primary.main", mt: 0.5 }}
                          />
                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              Horaires d'ouverture
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {contactInfo.hours}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* ===== SECTION 5.3 - GOOGLE MAPS ===== */}
      <Box
        component="section"
        sx={{
          height: 400,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8936234567!2d9.7043!3d4.0483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDInNTEuMCJOIDnCsDQyJzE1LjUiRQ!5e0!3m2!1sfr!2scm!4v1234567890"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation Humanis Assurances - 688 Rue Joffre, Akwa-Douala"
        />
      </Box>

      {/* ===== SECTION 5.4 - DEVIS RAPIDE CTA ===== */}
      <SectionWrapper background="alt" paddingY="normal">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Grid container spacing={6} alignItems="center">
              {/* Left - Process Explanation */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack spacing={4}>
                  <SectionHeader
                    overline="Devis rapide"
                    title="Obtenez votre devis en 3 étapes simples"
                    align="left"
                  />

                  <Grid container spacing={3}>
                    {processSteps.slice(0, 3).map((step) => (
                      <Grid size={{ xs: 12, sm: 4 }} key={step.id}>
                        <Card
                          variant="outlined"
                          sx={{ textAlign: "center", height: "100%" }}
                        >
                          <CardContent>
                            <Stack spacing={2} alignItems="center">
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  backgroundColor: "secondary.main",
                                  color: "white",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "1.25rem",
                                  fontWeight: 700,
                                }}
                              >
                                {step.number}
                              </Box>
                              <Typography
                                variant="h6"
                                fontWeight={600}
                                fontSize="1rem"
                              >
                                {step.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {step.description}
                              </Typography>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Grid>

              {/* Right - CTA */}
              <Grid size={{ xs: 12, md: 5 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      textAlign: "center",
                      p: 4,
                      border: "2px solid",
                      borderColor: "secondary.main",
                    }}
                  >
                    <CardContent>
                      <Stack spacing={3} alignItems="center">
                        <RequestQuoteIcon
                          sx={{ fontSize: "4rem", color: "secondary.main" }}
                        />

                        <Typography
                          variant="h4"
                          fontWeight={700}
                          color="primary.main"
                        >
                          Devis gratuit
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                          Recevez une proposition personnalisée adaptée à vos
                          besoins spécifiques en moins de 24 heures.
                        </Typography>

                        <Button
                          variant="contained"
                          size="large"
                          color="secondary"
                          endIcon={<RequestQuoteIcon />}
                          fullWidth
                          sx={{ py: 1.5 }}
                        >
                          Demander un devis gratuit
                        </Button>

                        <Typography variant="caption" color="text.secondary">
                          Sans engagement • Réponse sous 24h
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default ContactPage;
