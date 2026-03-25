import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import SecurityIcon from "@mui/icons-material/Security";
import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useProductQuiz } from "../../hooks/useProductQuiz";
import { QUIZ_OPTIONS } from "../../constants/quizOptions";
import { QuizStep } from "./QuizStep";
import { QuizRecommendations } from "./QuizRecommendations";

export const ProductQuiz: React.FC = () => {
  const {
    showQuiz,
    step,
    answers,
    recommendations,
    handleAnswer,
    nextStep,
    resetQuiz,
    startQuiz,
    setStep,
  } = useProductQuiz();

  const handleStepAnswer = (field: keyof typeof answers, value: string) => {
    handleAnswer(field, value);
    nextStep();
  };

  const handleBudgetAnswer = (value: string) => {
    handleAnswer("budget", value);
    setStep(4);
  };

  const getProgressValue = () => {
    const totalSteps = 4;
    return (step / totalSteps) * 100;
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "neutral.200",
        borderRadius: '8px',
        '&:hover': {
          borderColor: 'brand.300',
          backgroundColor: 'brand.50',
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Progress Bar - Only show when quiz is active */}
        {showQuiz && (
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="body2" color="neutral.600" fontWeight={500}>
                Étape {step} sur 4
              </Typography>
              <Typography variant="body2" color="neutral.600">
                {Math.round(getProgressValue())}% terminé
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={getProgressValue()}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'neutral.100',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'brand.500',
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}

        <Stack spacing={3} alignItems="center" textAlign="center">
          {!showQuiz && (
            <>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  backgroundColor: 'brand.50',
                  border: '2px solid',
                  borderColor: 'brand.100',
                }}
              >
                <QuizIcon sx={{ fontSize: "2.5rem", color: "brand.500" }} />
              </Box>

              <Typography variant="h4" fontWeight={600} color="neutral.800">
                Trouvez votre assurance idéale
              </Typography>

              <Typography variant="body1" color="neutral.600" sx={{ maxWidth: 500 }}>
                Notre questionnaire personnalisé vous aide à identifier les produits d'assurance
                les mieux adaptés à votre profil et vos besoins spécifiques.
              </Typography>

              {/* Trust indicators */}
              <Stack
                direction="row"
                spacing={3}
                sx={{
                  px: 3,
                  py: 2,
                  backgroundColor: 'neutral.50',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: 'neutral.200',
                }}
              >
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <TimerIcon sx={{ fontSize: 16, color: 'neutral.500' }} />
                  <Typography variant="caption" color="neutral.600" fontWeight={500}>
                    2-3 minutes
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <SecurityIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="caption" color="neutral.600" fontWeight={500}>
                    100% gratuit
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="caption" color="neutral.600" fontWeight={500}>
                    Sans engagement
                  </Typography>
                </Stack>
              </Stack>
            </>
          )}

          {!showQuiz ? (
            <Button
              variant="contained"
              size="large"
              startIcon={<QuizIcon />}
              onClick={startQuiz}
              sx={{
                mt: 2,
                borderRadius: '6px',
                backgroundColor: 'brand.500',
                fontWeight: 600,
                textTransform: 'none',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'brand.700',
                },
              }}
            >
              Commencer le questionnaire
            </Button>
          ) : (
            <Box sx={{ width: "100%", maxWidth: 500 }}>
              {step === 1 && (
                <QuizStep
                  step={1}
                  title="Vous êtes ?"
                  options={QUIZ_OPTIONS.clientTypes}
                  selectedValue={answers.clientType}
                  onSelect={(value) => handleStepAnswer("clientType", value)}
                  layout="row"
                />
              )}

              {step === 2 && (
                <QuizStep
                  step={2}
                  title="Quel est votre besoin principal ?"
                  options={
                    answers.clientType === "particulier"
                      ? QUIZ_OPTIONS.needs.particulier
                      : QUIZ_OPTIONS.needs.entreprise
                  }
                  selectedValue={answers.need}
                  onSelect={(value) => handleStepAnswer("need", value)}
                  layout="grid"
                />
              )}

              {step === 3 && (
                <Stack spacing={3}>
                  <Typography variant="h6" color="neutral.800">
                    3. Quel est votre budget approximatif ?
                  </Typography>
                  <Typography variant="body2" color="neutral.600" sx={{ mb: 1 }}>
                    Cette information nous aide à vous proposer des solutions adaptées à vos moyens.
                    Toutes nos recommandations incluront une estimation de prime transparente.
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    {QUIZ_OPTIONS.budgets.map((option) => (
                      <Chip
                        key={option.value}
                        label={option.label}
                        onClick={() => handleBudgetAnswer(option.value)}
                        variant={
                          answers.budget === option.value
                            ? "filled"
                            : "outlined"
                        }
                        color="primary"
                        sx={{
                          width: "100%",
                          borderRadius: '6px',
                          py: 1.5,
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: answers.budget === option.value
                              ? 'brand.600'
                              : 'brand.50',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Stack>
              )}

              {step === 4 && (
                <QuizRecommendations
                  recommendations={recommendations}
                  onRestart={resetQuiz}
                />
              )}
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};