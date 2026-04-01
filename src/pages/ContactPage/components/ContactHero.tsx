import React from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { HumanisImage } from "@/components/ui";
import { images } from "@/utils/imageLoader";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const ContactHero: React.FC = () => {
  const { t } = useTranslation();
  return (
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
        <motion.div {...fadeInUp}>
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
                {t('common.home')}
              </Link>
              <Typography color="white">{t('contact.hero.breadcrumb')}</Typography>
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
              {t('contact.hero.title')}
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
              {t('contact.hero.subtitle')}
            </Typography>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};