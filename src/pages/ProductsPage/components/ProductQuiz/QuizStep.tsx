import { Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useRef } from "react";
import {
  insuranceAriaLabels,
  insuranceFormA11y,
  keyboardNavigation,
} from "../../utils/insuranceA11y";

interface Option {
  readonly value: string;
  readonly label: string;
}

interface QuizStepProps {
  step: number;
  title: string;
  options: readonly Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  layout?: "row" | "grid";
}

export const QuizStep: React.FC<QuizStepProps> = ({
  step,
  title,
  options,
  selectedValue,
  onSelect,
  layout = "row",
}) => {
  const isGridLayout = layout === "grid" && options.length > 3;
  const stepRef = useRef<HTMLDivElement>(null);

  // Announce step change and manage focus
  useEffect(() => {
    insuranceFormA11y.manageFocus.announceStepChange(step, 4);

    // Focus management for better accessibility
    const timer = setTimeout(() => {
      insuranceFormA11y.manageFocus.focusFirstOption(stepRef.current);
    }, 100);

    return () => clearTimeout(timer);
  }, [step]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    keyboardNavigation.handleQuizNavigation(
      event.nativeEvent,

      onSelect,
    );
  };

  return (
    <Stack spacing={3} ref={stepRef}>
      <Typography
        variant="h6"
        color="neutral.800"
        sx={{ textAlign: "left", width: "100%" }}
        id={`quiz-step-${step}-title`}
        role="heading"
        aria-level={3}
      >
        {step}. {title}
      </Typography>

      {isGridLayout ? (
        <Grid container spacing={2}>
          {options.map((option) => (
            <Grid size={{ xs: 6 }} key={option.value}>
              <Chip
                label={option.label}
                onClick={() => onSelect(option.value)}
                onKeyDown={handleKeyDown}
                variant={selectedValue === option.value ? "filled" : "outlined"}
                color="secondary"
                tabIndex={0}
                role="button"
                data-value={option.value}
                aria-pressed={selectedValue === option.value}
                aria-label={insuranceAriaLabels.quiz.option(option.label)}
                aria-describedby={`quiz-step-${step}-title`}
                sx={{
                  width: "100%",
                  borderRadius: "6px",
                  py: 1.5,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor:
                      selectedValue === option.value
                        ? "success.600"
                        : "success.50",
                    transform: "translateY(-1px)",
                  },
                  "&:focus-visible": {
                    outline: "3px solid #1D6FA4",
                    outlineOffset: "2px",
                    transform: "translateY(-1px)",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          flexWrap="wrap"
          gap={1}
        >
          {options.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              onClick={() => onSelect(option.value)}
              onKeyDown={handleKeyDown}
              variant={selectedValue === option.value ? "filled" : "outlined"}
              color="primary"
              tabIndex={0}
              role="button"
              data-value={option.value}
              aria-pressed={selectedValue === option.value}
              aria-label={insuranceAriaLabels.quiz.option(option.label)}
              aria-describedby={`quiz-step-${step}-title`}
              sx={{
                borderRadius: "6px",
                px: 3,
                py: 1,
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor:
                    selectedValue === option.value ? "brand.600" : "brand.50",
                  transform: "translateY(-1px)",
                },
                "&:focus-visible": {
                  outline: "3px solid #1D6FA4",
                  outlineOffset: "2px",
                  transform: "translateY(-1px)",
                },
              }}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
