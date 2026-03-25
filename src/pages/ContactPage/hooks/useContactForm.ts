import { useState, useCallback } from "react";
import { VALIDATION_PATTERNS } from "../constants/formFields";

export interface InsuranceFormData {
  fullName: string;
  email: string;
  phone: string;
  clientType: string;
  subject: string;
  coverageType: string;
  urgencyLevel: string;
  estimatedValue: string;
  companySize: string;
  preferredContactTime: string;
  message: string;
}

export type FormErrors = Partial<InsuranceFormData>;

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

const initialFormData: InsuranceFormData = {
  fullName: "",
  email: "",
  phone: "",
  clientType: "",
  subject: "",
  coverageType: "",
  urgencyLevel: "",
  estimatedValue: "",
  companySize: "",
  preferredContactTime: "",
  message: "",
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<InsuranceFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation with insurance-specific patterns
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis";
    } else if (!VALIDATION_PATTERNS.fullName.test(formData.fullName.trim())) {
      newErrors.fullName = "Veuillez saisir un nom valide (lettres uniquement)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!VALIDATION_PATTERNS.email.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.clientType) {
      newErrors.clientType = "Veuillez sélectionner votre profil";
    }

    if (!formData.subject) {
      newErrors.subject = "Veuillez sélectionner un objet";
    }

    if (!formData.coverageType) {
      newErrors.coverageType = "Type de couverture requis";
    }

    if (!formData.urgencyLevel) {
      newErrors.urgencyLevel = "Délai souhaité requis";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < VALIDATION_PATTERNS.minMessageLength) {
      newErrors.message = `Décrivez vos besoins en détail (min. ${VALIDATION_PATTERNS.minMessageLength} caractères)`;
    }

    // Enhanced phone validation for Cameroon
    if (formData.phone) {
      const cleanPhone = formData.phone.replace(/\s/g, "");
      if (!VALIDATION_PATTERNS.cameroonPhone.test(cleanPhone)) {
        newErrors.phone = "Format valide: +237 6XX XX XX XX, +237 2XX XX XX XX ou similaire";
      }
    }

    // Business-specific validation
    if (formData.clientType === "entreprise" && !formData.companySize) {
      newErrors.companySize = "Taille d'entreprise requise pour tarification";
    }

    // Coverage-specific validation with enhanced patterns
    if (["auto", "habitation"].includes(formData.coverageType)) {
      if (!formData.estimatedValue) {
        newErrors.estimatedValue = "Valeur estimée requise pour calculer votre prime";
      } else if (!VALIDATION_PATTERNS.estimatedValue.test(formData.estimatedValue)) {
        newErrors.estimatedValue = "Format: 15,000,000 FCFA ou 15000000";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((field: keyof InsuranceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus("submitting");

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form on success
      setFormData(initialFormData);
      setErrors({});
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }, [validateForm]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitStatus("idle");
  }, []);

  const getFieldError = useCallback((field: keyof InsuranceFormData) => {
    return errors[field];
  }, [errors]);

  const isFieldRequired = useCallback((field: keyof InsuranceFormData): boolean => {
    const requiredFields: (keyof InsuranceFormData)[] = [
      "fullName", "email", "clientType", "subject", "coverageType", "urgencyLevel", "message"
    ];

    // Add conditional required fields
    if (formData.clientType === "entreprise") {
      requiredFields.push("companySize");
    }

    if (["auto", "habitation"].includes(formData.coverageType)) {
      requiredFields.push("estimatedValue");
    }

    return requiredFields.includes(field);
  }, [formData.clientType, formData.coverageType]);

  return {
    // State
    formData,
    errors,
    submitStatus,
    isSubmitting: submitStatus === "submitting",

    // Actions
    handleInputChange,
    handleSubmit,
    resetForm,
    validateForm,
    getFieldError,
    isFieldRequired,

    // Computed values
    hasErrors: Object.keys(errors).length > 0,
    isFormValid: validateForm,
  };
};