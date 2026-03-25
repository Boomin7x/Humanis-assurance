import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import PhoneIcon from "@mui/icons-material/Phone";
import EuroIcon from "@mui/icons-material/Euro";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";

interface Product {
  id: string;
  name: string;
  description: string;
  premiumRange?: string;
  coverage?: string[];
  matchScore?: number;
}

interface QuizRecommendationsProps {
  recommendations: Product[];
  onRestart: () => void;
}

export const QuizRecommendations: React.FC<QuizRecommendationsProps> = ({
  recommendations,
  onRestart,
}) => {
  // Mock data for demonstration - in real app this would come from API
  const enhancedRecommendations = recommendations.map((product, index) => ({
    ...product,
    premiumRange: index === 0 ? "45-65€/mois" : index === 1 ? "120-180€/mois" : "25-40€/mois",
    coverage: index === 0
      ? ["Responsabilité civile", "Dégâts matériels", "Vol"]
      : index === 1
      ? ["Décès", "Incapacité", "Maladie grave"]
      : ["Incendie", "Dégâts des eaux", "Cambriolage"],
    matchScore: index === 0 ? 95 : index === 1 ? 88 : 82,
  }));

  return (
    <Stack spacing={4}>
      {/* Header with trust indicators */}
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <CheckCircleIcon sx={{ fontSize: 20, color: 'success.main' }} />
          <Typography variant="h6" color="success.main" fontWeight={600}>
            Analyse terminée - Voici vos recommandations
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            px: 2,
            py: 1,
            backgroundColor: 'neutral.50',
            borderRadius: '6px',
            border: '1px solid',
            borderColor: 'neutral.200',
          }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <InfoIcon sx={{ fontSize: 16, color: 'info.main' }} />
            <Typography variant="caption" color="neutral.600" fontWeight={500}>
              Basé sur votre profil
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <SecurityIcon sx={{ fontSize: 16, color: 'success.main' }} />
            <Typography variant="caption" color="neutral.600" fontWeight={500}>
              Comparaison transparente
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <EuroIcon sx={{ fontSize: 16, color: 'warning.main' }} />
            <Typography variant="caption" color="neutral.600" fontWeight={500}>
              Estimation de prime incluse
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {enhancedRecommendations.map((product, index) => (
          <Grid size={{ xs: 12 }} key={product.id}>
            <Card
              elevation={0}
              sx={{
                border: '2px solid',
                borderColor: index === 0 ? 'success.200' : 'neutral.200',
                borderRadius: '8px',
                backgroundColor: index === 0 ? 'success.50' : 'white',
                position: 'relative',
                '&:hover': {
                  borderColor: 'brand.300',
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease-in-out',
                },
              }}
            >
              {index === 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    left: 16,
                    backgroundColor: 'success.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  RECOMMANDÉ
                </Box>
              )}

              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  {/* Header with match score */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={600} color="neutral.800" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="neutral.600" sx={{ mb: 1 }}>
                        {product.description}
                      </Typography>
                    </Box>

                    <Chip
                      label={`${product.matchScore}% compatible`}
                      size="small"
                      sx={{
                        backgroundColor: index === 0 ? 'success.100' : 'neutral.100',
                        color: index === 0 ? 'success.700' : 'neutral.700',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Stack>

                  {/* Premium Range */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      px: 2,
                      py: 1,
                      backgroundColor: 'warning.50',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: 'warning.200',
                    }}
                  >
                    <EuroIcon sx={{ fontSize: 18, color: 'warning.600' }} />
                    <Typography variant="body2" fontWeight={600} color="warning.800">
                      Estimation de prime: {product.premiumRange}
                    </Typography>
                    <Typography variant="caption" color="warning.700">
                      (selon profil standard)
                    </Typography>
                  </Stack>

                  {/* Coverage Points */}
                  <Box>
                    <Typography variant="body2" fontWeight={500} color="neutral.700" sx={{ mb: 1 }}>
                      Couvertures principales:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
                      {product.coverage?.map((item, idx) => (
                        <Chip
                          key={idx}
                          label={item}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: '0.75rem',
                            borderColor: 'neutral.300',
                            '&:hover': { borderColor: 'brand.300' },
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Divider />

                  {/* Action Button */}
                  <Button
                    variant={index === 0 ? 'contained' : 'outlined'}
                    fullWidth
                    startIcon={<PhoneIcon />}
                    href="/contact"
                    sx={{
                      borderRadius: '6px',
                      fontWeight: 600,
                      textTransform: 'none',
                      py: 1.2,
                      ...(index === 0 ? {
                        backgroundColor: 'success.main',
                        '&:hover': { backgroundColor: 'success.600' }
                      } : {
                        borderColor: 'brand.500',
                        color: 'brand.500',
                        '&:hover': { borderColor: 'brand.700', backgroundColor: 'brand.50' }
                      })
                    }}
                  >
                    Demander un devis personnalisé
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Actions */}
      <Stack spacing={2} alignItems="center">
        <Typography variant="body2" color="neutral.600" textAlign="center" sx={{ maxWidth: 400 }}>
          Nos conseillers vérifieront ces estimations et vous proposeront les meilleures conditions du marché.
        </Typography>

        <Button
          variant="text"
          onClick={onRestart}
          sx={{
            color: 'neutral.600',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': { backgroundColor: 'neutral.100' }
          }}
        >
          Refaire le questionnaire
        </Button>
      </Stack>
    </Stack>
  );
};