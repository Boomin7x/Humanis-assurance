import { useState, useCallback } from "react";
import { iardtProducts, vieProducts } from "@/data/products";

export interface QuizAnswers {
  clientType: string;
  need: string;
  budget: string;
}

export interface QuizState {
  showQuiz: boolean;
  step: number;
  answers: QuizAnswers;
}

const initialAnswers: QuizAnswers = {
  clientType: "",
  need: "",
  budget: "",
};

export const useProductQuiz = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);

  const handleAnswer = useCallback((field: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const resetQuiz = useCallback(() => {
    setShowQuiz(false);
    setStep(1);
    setAnswers(initialAnswers);
  }, []);

  const startQuiz = useCallback(() => {
    setShowQuiz(true);
  }, []);

  const getRecommendations = useCallback(() => {
    const { clientType, need } = answers;
    let recommendations: any[] = [];

    if (clientType === "particulier") {
      if (need === "habitation") recommendations = vieProducts.slice(0, 2);
      else if (need === "automobile")
        recommendations = iardtProducts.filter((p) => p.id === "automobile");
      else if (need === "famille")
        recommendations = vieProducts.filter(
          (p) => p.id.includes("epargne") || p.id.includes("education"),
        );
      else recommendations = vieProducts.slice(0, 3);
    } else if (clientType === "entreprise") {
      if (need === "responsabilite")
        recommendations = iardtProducts.filter(
          (p) =>
            p.id.includes("responsabilite") || p.id.includes("multirisques"),
        );
      else if (need === "transport")
        recommendations = iardtProducts.filter((p) =>
          p.id.includes("transport"),
        );
      else if (need === "personnel")
        recommendations = vieProducts.filter(
          (p) => p.id.includes("groupe") || p.id.includes("fin-carriere"),
        );
      else recommendations = iardtProducts.slice(0, 3);
    }

    return recommendations.slice(0, 3);
  }, [answers]);

  return {
    // State
    showQuiz,
    step,
    answers,

    // Derived state
    recommendations: getRecommendations(),

    // Actions
    handleAnswer,
    nextStep,
    resetQuiz,
    startQuiz,
    setStep,
  };
};