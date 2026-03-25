import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";

import { SectionHeader } from "@/components/ui";
import { useContactForm } from "../hooks/useContactForm";
import { FORM_FIELDS } from "../constants/formFields";

const formVariants = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

export const EnhancedContactForm: React.FC = () => {
  const {
    formData,
    submitStatus,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    getFieldError,
    isFieldRequired,
  } = useContactForm();

  return (
    <motion.div {...formVariants}>
      <Stack spacing={4}>
        <SectionHeader
          overline="Devis gratuit en 2 minutes"
          title="Découvrez votre tarif personnalisé"
          align="left"
        />

        {/* Premium Estimation Hint */}
        <Box
          sx={{
            p: 2,
            border: "1px solid",
            borderColor: "brand.100",
            borderRadius: "6px",
            backgroundColor: "brand.50",
          }}
        >
          <Typography
            variant="body2"
            color="brand.700"
            sx={{ fontWeight: 500 }}
          >
            📈 Estimation immédiate: Recevez votre tarif préliminaire sous 2h
            par email ou téléphone
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: "1px solid",
            borderColor: "neutral.200",
            borderRadius: "8px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            role="form"
            aria-label="Formulaire de demande de devis d'assurance"
          >
            <Stack spacing={3}>
              {/* Status Alerts */}
              {submitStatus === "success" && (
                <Alert
                  severity="success"
                  icon={<CheckCircleIcon />}
                  sx={{
                    borderRadius: "6px",
                    "& .MuiAlert-message": {
                      fontWeight: 500,
                    },
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Votre demande de devis a été reçue!
                  </Typography>
                  <Typography variant="caption" display="block">
                    Un expert Humanis vous contactera sous 2h avec votre
                    tarification personnalisée et vos options de couverture.
                  </Typography>
                </Alert>
              )}

              {submitStatus === "error" && (
                <Alert
                  severity="error"
                  sx={{
                    borderRadius: "6px",
                  }}
                >
                  Une erreur est survenue. Veuillez réessayer ou nous contacter
                  directement.
                </Alert>
              )}

              {/* Personal Information */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Nom complet"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    error={!!getFieldError("fullName")}
                    helperText={getFieldError("fullName")}
                    required={isFieldRequired("fullName")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "6px",
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={!!getFieldError("email")}
                    helperText={getFieldError("email")}
                    required={isFieldRequired("email")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "6px",
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                type="tel"
                label="Téléphone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={!!getFieldError("phone")}
                helperText={
                  getFieldError("phone") ||
                  "Pour vous joindre rapidement avec votre devis"
                }
                placeholder="+237 6XX XX XX XX"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                  },
                }}
              />

              {/* Insurance-Specific Fields */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl
                    fullWidth
                    required={isFieldRequired("clientType")}
                    error={!!getFieldError("clientType")}
                  >
                    <InputLabel>Vous êtes</InputLabel>
                    <Select
                      value={formData.clientType}
                      label="Vous êtes"
                      onChange={(e) =>
                        handleInputChange("clientType", e.target.value)
                      }
                      sx={{ borderRadius: "6px" }}
                    >
                      {FORM_FIELDS.clientTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {getFieldError("clientType") && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 0.5, ml: 2 }}
                      >
                        {getFieldError("clientType")}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl
                    fullWidth
                    required={isFieldRequired("subject")}
                    error={!!getFieldError("subject")}
                  >
                    <InputLabel>Objet</InputLabel>
                    <Select
                      value={formData.subject}
                      label="Objet"
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      sx={{ borderRadius: "6px" }}
                    >
                      {FORM_FIELDS.subjects.map((subject) => (
                        <MenuItem key={subject.value} value={subject.value}>
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {subject.label}
                              {subject.priority === "high" && (
                                <Typography
                                  component="span"
                                  variant="caption"
                                  color="error.main"
                                  sx={{ ml: 1, fontWeight: 600 }}
                                >
                                  ⚡ Express
                                </Typography>
                              )}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              {subject.description}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                    {getFieldError("subject") && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 0.5, ml: 2 }}
                      >
                        {getFieldError("subject")}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              {/* Coverage Information */}
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl
                    fullWidth
                    required={isFieldRequired("coverageType")}
                    error={!!getFieldError("coverageType")}
                  >
                    <InputLabel>Type de couverture</InputLabel>
                    <Select
                      value={formData.coverageType}
                      label="Type de couverture"
                      onChange={(e) =>
                        handleInputChange("coverageType", e.target.value)
                      }
                      sx={{ borderRadius: "6px" }}
                    >
                      {FORM_FIELDS.coverageTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {getFieldError("coverageType") && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 0.5, ml: 2 }}
                      >
                        {getFieldError("coverageType")}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl
                    fullWidth
                    required={isFieldRequired("urgencyLevel")}
                    error={!!getFieldError("urgencyLevel")}
                  >
                    <InputLabel>Délai souhaité</InputLabel>
                    <Select
                      value={formData.urgencyLevel}
                      label="Délai souhaité"
                      onChange={(e) =>
                        handleInputChange("urgencyLevel", e.target.value)
                      }
                      sx={{ borderRadius: "6px" }}
                    >
                      {FORM_FIELDS.urgencyLevels.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <span>{level.label}</span>
                            {level.priority === "high" && (
                              <Typography
                                component="span"
                                variant="caption"
                                color="error.main"
                                sx={{ fontWeight: 600 }}
                              >
                                🔥 Urgent
                              </Typography>
                            )}
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                    {getFieldError("urgencyLevel") && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 0.5, ml: 2 }}
                      >
                        {getFieldError("urgencyLevel")}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              {/* Conditional Fields */}
              {formData.clientType === "entreprise" && (
                <FormControl
                  fullWidth
                  required={isFieldRequired("companySize")}
                  error={!!getFieldError("companySize")}
                >
                  <InputLabel>Taille de l'entreprise</InputLabel>
                  <Select
                    value={formData.companySize}
                    label="Taille de l'entreprise"
                    onChange={(e) =>
                      handleInputChange("companySize", e.target.value)
                    }
                    sx={{ borderRadius: "6px" }}
                  >
                    {FORM_FIELDS.companySizes.map((size) => (
                      <MenuItem key={size.value} value={size.value}>
                        {size.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {getFieldError("companySize") && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, ml: 2 }}
                    >
                      {getFieldError("companySize")}
                    </Typography>
                  )}
                </FormControl>
              )}

              {["auto", "habitation"].includes(formData.coverageType) && (
                <TextField
                  fullWidth
                  label="Valeur estimée"
                  value={formData.estimatedValue}
                  onChange={(e) =>
                    handleInputChange("estimatedValue", e.target.value)
                  }
                  error={!!getFieldError("estimatedValue")}
                  helperText={
                    getFieldError("estimatedValue") ||
                    `${
                      formData.coverageType === "auto"
                        ? "Valeur du véhicule - impact direct sur votre prime"
                        : "Valeur du bien à assurer - détermine votre couverture"
                    }`
                  }
                  placeholder={
                    formData.coverageType === "auto"
                      ? "Ex: 8,500,000 FCFA"
                      : "Ex: 25,000,000 FCFA"
                  }
                  required={isFieldRequired("estimatedValue")}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "6px",
                    },
                  }}
                />
              )}

              <FormControl fullWidth>
                <InputLabel>Préférence de contact</InputLabel>
                <Select
                  value={formData.preferredContactTime}
                  label="Préférence de contact"
                  onChange={(e) =>
                    handleInputChange("preferredContactTime", e.target.value)
                  }
                  sx={{ borderRadius: "6px" }}
                >
                  {FORM_FIELDS.preferredContactTimes.map((time) => (
                    <MenuItem key={time.value} value={time.value}>
                      {time.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Message */}
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                error={!!getFieldError("message")}
                helperText={
                  getFieldError("message") ||
                  "Plus vous êtes précis, plus votre devis sera adapté à vos besoins (situation familiale, profession, risques spécifiques...)"
                }
                required={isFieldRequired("message")}
                aria-describedby="message-helper"
                inputProps={{
                  "aria-label": "Décrivez vos besoins d'assurance en détail",
                  "aria-required": "true",
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                endIcon={
                  isSubmitting ? (
                    <CircularProgress
                      size={20}
                      color="inherit"
                      aria-hidden="true"
                    />
                  ) : (
                    <SendIcon aria-hidden="true" />
                  )
                }
                fullWidth
                aria-label={
                  isSubmitting
                    ? "Traitement de votre demande en cours"
                    : "Soumettre la demande de devis"
                }
                role="button"
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: "6px",
                  backgroundColor: "brand.500",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "brand.700",
                  },
                  "&:disabled": {
                    backgroundColor: "neutral.300",
                  },
                }}
              >
                {isSubmitting
                  ? "Calcul de votre tarif..."
                  : "Recevoir mon devis gratuit"}
              </Button>

              {/* Trust footer */}
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <CheckCircleIcon sx={{ fontSize: 16, color: "success.main" }} />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="center"
                >
                  🔒 100% gratuit • 🕐 Réponse sous 2h • ❌ Sans engagement • 📞
                  Conseil personnalisé
                </Typography>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </motion.div>
  );
};
