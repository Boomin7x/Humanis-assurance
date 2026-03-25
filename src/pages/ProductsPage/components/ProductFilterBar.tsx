import CloseIcon from "@mui/icons-material/Close";
import QuizIcon from "@mui/icons-material/Quiz";
import SearchIcon from "@mui/icons-material/Search";
import SecurityIcon from "@mui/icons-material/Security";
import TuneIcon from "@mui/icons-material/Tune";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  Button,
  Container,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";

import type { ClientType } from "../hooks/useProductFilters";

interface ProductFilterBarProps {
  searchQuery: string;
  clientType: ClientType;
  onSearchChange: (value: string) => void;
  onClientTypeChange: (value: ClientType) => void;
  onStartQuiz: () => void;
}

export const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  searchQuery,
  clientType,
  onSearchChange,
  onClientTypeChange,
  onStartQuiz,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const renderControl = () => (
    <>
      <FormControl fullWidth size="small">
        <InputLabel id="client-type-label">Type de client</InputLabel>
        <Select
          labelId="client-type-label"
          value={clientType}
          label="Type de client"
          onChange={(e) => onClientTypeChange(e.target.value as ClientType)}
          sx={{
            borderRadius: "6px",
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "brand.300",
              },
              "&.Mui-focused fieldset": {
                borderColor: "brand.500",
                borderWidth: "2px",
              },
            },
          }}
        >
          <MenuItem value="all">Tous</MenuItem>
          <MenuItem value="particulier">Particulier</MenuItem>
          <MenuItem value="entreprise">Entreprise</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        startIcon={<QuizIcon />}
        onClick={onStartQuiz}
        fullWidth={isMobile}
        sx={{
          borderRadius: "6px",
          borderColor: "brand.500",
          color: "brand.500",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": {
            borderColor: "brand.700",
            backgroundColor: "brand.50",
          },
        }}
      >
        Quel produit pour moi?
      </Button>
    </>
  );

  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        position: "sticky",
        top: 72, // Navbar height
        zIndex: 100,
        borderBottom: "1px solid",
        borderBottomColor: "neutral.200",
        backgroundColor: "white",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 2 }}>
        {/* Trust Indicators Bar */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 2, display: { xs: "none", md: "flex" } }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <SecurityIcon sx={{ fontSize: 16, color: "success.main" }} />
            <Typography variant="caption" color="neutral.600" fontWeight={500}>
              Agréé ACPR
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <VerifiedIcon sx={{ fontSize: 16, color: "success.main" }} />
            <Typography variant="caption" color="neutral.600" fontWeight={500}>
              Courtier certifié
            </Typography>
          </Stack>
          <Typography variant="caption" color="neutral.500">
            +15 ans d'expertise • 50,000+ clients satisfaits
          </Typography>
        </Stack>

        {/* Main Filter Bar */}
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder="Rechercher un produit d'assurance..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              size="small"
              slotProps={{
                input: {
                  "aria-label": "Rechercher un produit d'assurance",
                  startAdornment: (
                    <SearchIcon sx={{ color: "neutral.400", mr: 1 }} />
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "6px",
                  "&:hover fieldset": {
                    borderColor: "brand.300",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "brand.500",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          </Grid>

          {/* Desktop Filters */}
          <Grid
            size={{ xs: 0, md: 4 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {renderControl()}
            </Stack>
          </Grid>

          {/* Mobile Filter Button */}
          <Grid
            size={{ xs: 12, md: 0 }}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<TuneIcon />}
                onClick={() => setMobileFilterOpen(true)}
                fullWidth
                sx={{
                  borderRadius: "6px",
                  borderColor: "neutral.300",
                  color: "neutral.700",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "brand.300",
                    backgroundColor: "brand.50",
                  },
                }}
              >
                Filtres
              </Button>
              <Button
                variant="contained"
                startIcon={<QuizIcon />}
                onClick={onStartQuiz}
                sx={{
                  borderRadius: "6px",
                  backgroundColor: "brand.500",
                  fontWeight: 600,
                  textTransform: "none",
                  minWidth: "fit-content",
                  px: 3,
                  "&:hover": {
                    backgroundColor: "brand.700",
                  },
                }}
              >
                Quiz
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="bottom"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              maxHeight: "70vh",
            },
          },
        }}
      >
        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={600} color="neutral.800">
              Filtres de recherche
            </Typography>
            <IconButton
              onClick={() => setMobileFilterOpen(false)}
              size="small"
              aria-label="Fermer les filtres"
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2}>{renderControl()}</Stack>

          <Button
            variant="contained"
            onClick={() => setMobileFilterOpen(false)}
            fullWidth
            sx={{
              borderRadius: "6px",
              backgroundColor: "brand.500",
              fontWeight: 600,
              textTransform: "none",
              py: 1.5,
              "&:hover": {
                backgroundColor: "brand.700",
              },
            }}
          >
            Appliquer les filtres
          </Button>
        </Stack>
      </Drawer>
    </Paper>
  );
};
