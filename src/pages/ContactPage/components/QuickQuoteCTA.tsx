import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { motion } from "framer-motion";

import { SectionHeader } from "@/components/ui";
import { processSteps } from "@/data/stats";

const ctaVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

export const QuickQuoteCTA: React.FC = () => {
  return (
    <motion.div {...ctaVariants}>
      <Grid container spacing={6} alignItems="center">
        {/* Left - Process Explanation */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={4}>
            <SectionHeader
              overline="Devis express"
              title="Votre protection en 3 étapes simples"
              align="left"
            />

            <Grid container spacing={3}>
              {processSteps.slice(0, 3).map((step) => (
                <Grid size={{ xs: 12, sm: 4 }} key={step.id}>
                  <Card
                    elevation={0}
                    sx={{
                      textAlign: "center",
                      height: "100%",
                      border: "1px solid",
                      borderColor: "neutral.200",
                      borderRadius: "8px",
                      "&:hover": {
                        borderColor: "brand.300",
                        backgroundColor: "brand.50",
                      },
                    }}
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
                        <Typography variant="body2" color="text.secondary">
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

        {/* Right - Enhanced CTA */}
        <Grid size={{ xs: 12, md: 5 }}>
          <motion.div {...cardVariants}>
            <Card
              elevation={0}
              sx={{
                textAlign: "center",
                p: 4,
                border: "2px solid",
                borderColor: "success.main",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
              }}
            >
              <CardContent>
                <Stack spacing={3} alignItems="center">
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "50%",
                      backgroundColor: "success.main",
                      color: "white",
                    }}
                  >
                    <RequestQuoteIcon sx={{ fontSize: "3rem" }} />
                  </Box>

                  <Stack spacing={1}>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      color="success.main"
                    >
                      Devis Gratuit
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color="text.primary"
                    >
                      Réponse sous 2 heures
                    </Typography>
                  </Stack>

                  <Typography variant="body1" color="text.secondary">
                    Recevez une proposition personnalisée avec tarifs
                    transparents et conditions détaillées. Notre équipe
                    d'experts analyse votre profil pour vous offrir la meilleure
                    protection.
                  </Typography>

                  <Stack spacing={2} width="100%">
                    <Button
                      variant="contained"
                      size="large"
                      color="success"
                      endIcon={<RequestQuoteIcon />}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: "6px",
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "1.1rem",
                      }}
                      onClick={() => {
                        const form = document.getElementById("contact-form");
                        form?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Obtenir mon devis gratuit
                    </Button>

                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Typography
                        variant="caption"
                        color="success.main"
                        fontWeight={600}
                      >
                        ✓ Sans engagement
                      </Typography>
                      <Typography
                        variant="caption"
                        color="success.main"
                        fontWeight={600}
                      >
                        ✓ Expertise certifiée
                      </Typography>
                      <Typography
                        variant="caption"
                        color="success.main"
                        fontWeight={600}
                      >
                        ✓ Tarifs transparents
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};
