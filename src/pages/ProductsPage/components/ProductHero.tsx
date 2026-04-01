import React from "react";
import {
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedIcon from "@mui/icons-material/Verified";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { HumanisImage } from "@/components/ui";
import { images } from "@/utils/imageLoader";
import { ANIMATION_VARIANTS } from "../constants/animations";
import type { ProductTab } from "../hooks/useProductFilters";

interface ProductHeroProps {
  activeTab: ProductTab;
  onTabChange: (event: React.SyntheticEvent, newValue: ProductTab) => void;
}

export const ProductHero: React.FC<ProductHeroProps> = ({
  activeTab,
  onTabChange,
}) => {
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
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div {...ANIMATION_VARIANTS.fadeInUp}>
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
                {t('common.home')}
              </Link>
              <Typography color="white">{t('products.hero.breadcrumb')}</Typography>
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
              {t('products.hero.title')}
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
              {t('products.hero.subtitle')}
            </Typography>

            {/* Trust Indicators */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2, md: 4 }}
              alignItems="center"
              sx={{
                px: 3,
                py: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Stack
                direction="row"
                spacing={4}
                alignItems="center"
                flexWrap="wrap"
                justifyContent="center"
              >
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <SecurityIcon sx={{ fontSize: 18, color: "white" }} />
                  <Typography variant="body2" color="white" fontWeight={500}>
                    {t('products.hero.trust.accredited')}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.5} alignItems="center">
                  <VerifiedIcon sx={{ fontSize: 18, color: "#25D366" }} />
                  <Typography variant="body2" color="white" fontWeight={500}>
                    {t('products.hero.trust.certified')}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.5} alignItems="center">
                  <GroupsIcon sx={{ fontSize: 18, color: "white" }} />
                  <Typography variant="body2" color="white" fontWeight={500}>
                    {t('products.hero.trust.clients')}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.5} alignItems="center">
                  <TrendingUpIcon sx={{ fontSize: 18, color: "white" }} />
                  <Typography variant="body2" color="white" fontWeight={500}>
                    {t('products.hero.trust.experience')}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* Regulatory Badges */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              flexWrap="wrap"
              gap={1}
            >
              <Chip
                label={t('products.hero.badges.orias')}
                size="small"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label={t('products.hero.badges.ffa')}
                size="small"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label={t('products.hero.badges.iso')}
                size="small"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                }}
              />
            </Stack>

            {/* Tab Navigation */}
            <Tabs
              value={activeTab}
              onChange={onTabChange}
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#25D366",
                  height: 3,
                  borderRadius: "1.5px",
                },
                "& .MuiTab-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1rem",
                  minWidth: 120,
                  px: 3,
                  py: 1.5,
                  "&.Mui-selected": {
                    color: "white",
                    fontWeight: 700,
                  },
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                },
              }}
            >
              <Tab label={t('products.hero.tabs.all')} value="all" />
              <Tab label={t('products.hero.tabs.iardt')} value="iardt" />
              <Tab label={t('products.hero.tabs.vie')} value="vie" />
            </Tabs>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};
