import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

import { SectionWrapper } from "@/components/ui";
import { ANIMATION_VARIANTS } from "../constants/animations";

export const ProductCTA: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <SectionWrapper background="dark" paddingY="normal">
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <motion.div {...ANIMATION_VARIANTS.fadeInUp} viewport={{ once: true }}>
          <Stack
            spacing={{ xs: 3, md: 4 }}
            alignItems="center"
            textAlign="center"
          >
            {/* Main Heading */}
            <Stack
              spacing={{ xs: 1.5, md: 2 }}
              alignItems="center"
              sx={{ maxWidth: { xs: "100%", md: 700 } }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Besoin d'aide pour choisir votre assurance?
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: 400,
                  fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
                  lineHeight: 1.6,
                }}
              >
                Nos experts vous accompagnent gratuitement pour trouver les
                meilleures solutions adaptées à vos besoins.
              </Typography>
            </Stack>

            {/* Trust Indicators */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 1.5, sm: 4 }}
              alignItems="center"
              sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 1.5, sm: 2 },
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "6px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                width: "100%",
                maxWidth: { xs: "100%", sm: 600 },
              }}
            >
              <Stack direction="row" spacing={0.5} alignItems="center">
                <SecurityIcon
                  sx={{ fontSize: { xs: 16, sm: 18 }, color: "#25D366" }}
                />
                <Typography
                  variant="body2"
                  color="white"
                  fontWeight={500}
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Conseil gratuit
                </Typography>
              </Stack>

              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeIcon
                  sx={{ fontSize: { xs: 16, sm: 18 }, color: "#25D366" }}
                />
                <Typography
                  variant="body2"
                  color="white"
                  fontWeight={500}
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Réponse sous 24h
                </Typography>
              </Stack>

              <Stack direction="row" spacing={0.5} alignItems="center">
                <CheckCircleIcon
                  sx={{ fontSize: { xs: 16, sm: 18 }, color: "#25D366" }}
                />
                <Typography
                  variant="body2"
                  color="white"
                  fontWeight={500}
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  Sans engagement
                </Typography>
              </Stack>
            </Stack>

            {/* CTA Buttons */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2 }}
              alignItems="center"
              sx={{ width: "100%", maxWidth: { xs: "100%", sm: 500 } }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<PhoneIcon />}
                href="tel:+33123456789"
                fullWidth={isMobile}
                sx={{
                  backgroundColor: "#25D366",
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "6px",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.2, sm: 1.5 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  minWidth: isMobile ? "100%" : 180,
                  "&:hover": {
                    backgroundColor: "#1EBE5A",
                    transform: "translateY(-2px)",
                  },
                  "&:focus": {
                    outline: "3px solid rgba(37, 211, 102, 0.3)",
                  },
                }}
                aria-label="Appeler maintenant au +33 1 23 45 67 89"
              >
                Appeler maintenant
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<EmailIcon />}
                href="/contact"
                fullWidth={isMobile}
                sx={{
                  borderColor: "white",
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "6px",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.2, sm: 1.5 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  minWidth: isMobile ? "100%" : 180,
                  "&:hover": {
                    borderColor: "#25D366",
                    backgroundColor: "rgba(37, 211, 102, 0.1)",
                    transform: "translateY(-2px)",
                  },
                  "&:focus": {
                    outline: "3px solid rgba(255, 255, 255, 0.3)",
                  },
                }}
                aria-label="Envoyer un email pour être contacté"
              >
                Être contacté
              </Button>
            </Stack>

            {/* Additional Info */}
            <Box sx={{ mt: { xs: 1, sm: 2 }, px: { xs: 1, sm: 0 } }}>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  textAlign: "center",
                  display: "block",
                  mb: 0.5,
                }}
              >
                Disponible du lundi au vendredi de 9h à 18h
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: { xs: "0.625rem", sm: "0.75rem" },
                  textAlign: "center",
                  display: "block",
                  lineHeight: 1.4,
                }}
              >
                Appel non surtaxé • Devis gratuit • Expertise certifiée
              </Typography>
            </Box>
          </Stack>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
};
