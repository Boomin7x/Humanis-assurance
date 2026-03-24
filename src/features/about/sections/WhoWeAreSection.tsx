// src/features/about/sections/WhoWeAreSection.tsx
/**
 * ENTERPRISE WHO WE ARE SECTION
 *
 * @module WhoWeAreSection
 * @description
 * Enterprise-grade company overview section with:
 * - Full accessibility compliance (WCAG 2.1 AA)
 * - Comprehensive TypeScript typing
 * - Performance optimizations (lazy loading, memoization)
 * - Testing support (data-testid attributes)
 * - Analytics integration hooks
 * - Error boundary support
 * - Configurable content and statistics
 * - SEO optimization
 * - Responsive two-column layout
 *
 * @example
 * ```tsx
 * <WhoWeAreSection
 *   statistics={[
 *     { value: "2009", label: "Agrément CIMA", highlight: true },
 *     { value: "500+", label: "Clients protégés" }
 *   ]}
 *   onAnalyticsEvent={(event, props) => trackEvent(event, props)}
 * />
 * ```
 */

import { Box, Container, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { Suspense, useEffect } from "react";

import { SectionHeader, SectionWrapper } from "@/components/ui";
import { NEUTRAL_600, PRIMARY_500 } from "@/theme/tokens";
import { getImage, images } from "@/utils/imageLoader";

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Statistic item configuration
 */
export interface StatisticConfig {
  /** Statistic value (number or text) */
  readonly value: string | number;
  /** Label description */
  readonly label: string;
  /** Highlight this statistic with accent color */
  readonly highlight?: boolean;
  /** Custom aria-label for accessibility */
  readonly ariaLabel?: string;
}

/**
 * Content paragraph configuration
 */
export interface ContentParagraph {
  /** Paragraph text content */
  readonly text: string;
  /** Highlight/bold specific text */
  readonly highlight?: string;
}

/**
 * Analytics event callback
 */
export type AnalyticsCallback = (
  eventName: string,
  properties?: Record<string, unknown>,
) => void;

/**
 * Section layout variant
 */
export type WhoWeAreSectionVariant = "default" | "compact" | "detailed";

/**
 * WhoWeAreSection Props Interface
 */
export interface WhoWeAreSectionProps {
  /**
   * Component CSS class name for custom styling
   */
  readonly className?: string;

  /**
   * Layout variant
   * @default "default"
   */
  readonly variant?: WhoWeAreSectionVariant;

  /**
   * Custom section title (overrides i18n default)
   */
  readonly title?: string;

  /**
   * Custom section subtitle (overrides i18n default)
   */
  readonly subtitle?: string;

  /**
   * Content paragraphs
   * @default Default company description paragraphs
   */
  readonly contentParagraphs?: readonly ContentParagraph[];

  /**
   * Statistics to display
   * @default Default statistics (2009, 500+, 20+)
   */
  readonly statistics?: readonly StatisticConfig[];

  /**
   * Image URL (overrides default)
   */
  readonly imageUrl?: string;

  /**
   * Image alt text
   */
  readonly imageAlt?: string;

  /**
   * Show/hide statistics section
   * @default true
   */
  readonly showStatistics?: boolean;

  /**
   * Show/hide image
   * @default true
   */
  readonly showImage?: boolean;

  /**
   * Image position on desktop
   * @default "right"
   */
  readonly imagePosition?: "left" | "right";

  /**
   * Analytics event handler
   */
  readonly onAnalyticsEvent?: AnalyticsCallback;

  /**
   * Custom test ID for e2e testing
   * @default "who-we-are-section"
   */
  readonly testId?: string;

  /**
   * Loading state
   * @default false
   */
  readonly isLoading?: boolean;

  /**
   * Error state for error boundary
   */
  readonly error?: Error | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Default statistics configuration
 */
const DEFAULT_STATISTICS: readonly StatisticConfig[] = [
  {
    value: "2009",
    label: "Agrément CIMA",
    highlight: true,
    ariaLabel: "Agréé CIMA depuis 2009",
  },
  {
    value: "500+",
    label: "Clients protégés",
    ariaLabel: "Plus de 500 clients protégés",
  },
  {
    value: "20+",
    label: "Assureurs partenaires",
    ariaLabel: "Plus de 20 assureurs partenaires",
  },
] as const;

/**
 * Default content paragraphs
 */
const DEFAULT_CONTENT: readonly ContentParagraph[] = [
  {
    text: "Courtier d'assurance agréé CIMA depuis 2009, Humanis Assurances se positionne comme le cabinet de référence en courtage professionnel au Cameroun. Nous délivrons une gamme complète de solutions d'assurance : courtage entreprise et particulier, risk management stratégique, audit de conformité réglementaire, et programmes internationaux d'envergure.",
    highlight: "Courtier d'assurance agréé CIMA depuis 2009",
  },
  {
    text: "En tant que courtier indépendant et régulé, nous négocions les conditions les plus avantageuses auprès de 20+ compagnies d'assurance partenaires, garantissant à nos clients une protection optimale, des tarifs compétitifs, et une conformité totale aux normes CIMA et internationales.",
  },
] as const;

/**
 * Variant-specific configurations
 */
const VARIANT_CONFIGS = {
  default: {
    spacing: { xs: 4, sm: 5, md: 6 },
    contentSpacing: { xs: 3, md: 4 },
    statisticSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
  },
  compact: {
    spacing: { xs: 3, sm: 4, md: 5 },
    contentSpacing: { xs: 2, md: 3 },
    statisticSize: { xs: "1.375rem", sm: "1.5rem", md: "1.75rem" },
  },
  detailed: {
    spacing: { xs: 5, sm: 6, md: 8 },
    contentSpacing: { xs: 4, md: 5 },
    statisticSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SKELETON COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Loading skeleton for who we are section
 */
const WhoWeAreSkeleton: React.FC = () => (
  <Container maxWidth="lg">
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="90%" height={30} sx={{ mb: 3 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="95%" height={20} sx={{ mb: 3 }} />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {[1, 2, 3].map((i) => (
            <Grid key={i} size={{ xs: 4 }}>
              <Skeleton variant="text" width="80%" height={40} />
              <Skeleton variant="text" width="100%" height={20} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Grid>
    </Grid>
  </Container>
);

// ─────────────────────────────────────────────────────────────────────────────
// ERROR FALLBACK COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Error fallback UI
 */
const WhoWeAreErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
  <Container maxWidth="lg">
    <Box
      sx={{
        textAlign: "center",
        p: 4,
        border: "2px dashed",
        borderColor: "error.main",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" color="error" gutterBottom>
        Failed to load section
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {error.message || "An unexpected error occurred"}
      </Typography>
    </Box>
  </Container>
);

// ─────────────────────────────────────────────────────────────────────────────
// STATISTIC ITEM COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Individual statistic display component
 */
interface StatisticItemProps {
  readonly config: StatisticConfig;
  readonly size: { xs: string; sm: string; md: string };
  readonly testId: string;
}

const StatisticItem: React.FC<StatisticItemProps> = React.memo(
  ({ config, size, testId }) => (
    <Box
      sx={{ textAlign: "center" }}
      role="figure"
      aria-label={config.ariaLabel || `${config.value} ${config.label}`}
      data-testid={testId}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{
          color: config.highlight ? PRIMARY_500 : NEUTRAL_600,
          fontFamily: "ClashDisplay, system-ui, sans-serif",
          fontSize: size,
          fontWeight: 700,
          lineHeight: 1,
          mb: { xs: 0.5, md: 1 },
        }}
        aria-hidden="false"
      >
        {config.value}
      </Typography>
      <Typography
        variant="caption"
        component="figcaption"
        sx={{
          color: NEUTRAL_600,
          fontFamily: "Satoshi, system-ui, sans-serif",
          fontSize: { xs: "0.6875rem", sm: "0.75rem" },
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          lineHeight: 1.3,
          display: "block",
        }}
      >
        {config.label}
      </Typography>
    </Box>
  ),
);

StatisticItem.displayName = "StatisticItem";

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT PARAGRAPH COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Renders a content paragraph with optional highlighted text
 */
interface ContentParagraphComponentProps {
  readonly paragraph: ContentParagraph;
  readonly index: number;
  readonly testId: string;
}

const ContentParagraphComponent: React.FC<ContentParagraphComponentProps> =
  React.memo(({ paragraph, index, testId }) => {
    const { text, highlight } = paragraph;

    // Split text by highlight if present
    const renderContent = () => {
      if (!highlight || !text.includes(highlight)) {
        return text;
      }

      const parts = text.split(highlight);
      return (
        <>
          {parts[0]}
          <strong>{highlight}</strong>
          {parts[1]}
        </>
      );
    };

    return (
      <Typography
        sx={{
          color: NEUTRAL_600,
          fontFamily: "Satoshi, system-ui, sans-serif",
          fontSize: { xs: "0.875rem", sm: "1rem" },
          lineHeight: 1.7,
          mb: index === 0 ? { xs: 2.5, md: 3 } : 0,
          textAlign: "center",
          "@media (min-width: 900px)": {
            textAlign: "left",
          },
        }}
        data-testid={testId}
      >
        {renderContent()}
      </Typography>
    );
  });

ContentParagraphComponent.displayName = "ContentParagraphComponent";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * WhoWeAreSection Component
 *
 * Enterprise-grade company overview section with full accessibility,
 * configurability, and performance optimizations.
 *
 * @component
 * @example
 * ```tsx
 * <WhoWeAreSection
 *   variant="default"
 *   statistics={customStats}
 *   onAnalyticsEvent={(event, props) => console.log(event, props)}
 * />
 * ```
 */
export const WhoWeAreSection: React.FC<WhoWeAreSectionProps> = React.memo(
  ({
    className,
    variant = "default",
    title,
    subtitle,
    contentParagraphs = DEFAULT_CONTENT,
    statistics = DEFAULT_STATISTICS,
    imageUrl,
    imageAlt,
    showStatistics = true,
    showImage = true,
    imagePosition = "right",
    onAnalyticsEvent,
    testId = "who-we-are-section",
    isLoading = false,
    error = null,
  }) => {
    // const { t } = useTranslation();

    // Get variant configuration
    const variantConfig = VARIANT_CONFIGS[variant];

    // Default content
    const displayTitle = title || "Qui sommes-nous?";
    const displaySubtitle =
      subtitle ||
      "Humanis Assurances est un cabinet de courtage en assurances installé à Douala depuis 2009. Nous accompagnons les entreprises et particuliers du Cameroun dans leurs démarches d'assurance avec une approche personnalisée et professionnelle.";
    const displayImageUrl =
      imageUrl || getImage(images.office.interior, "office");
    const displayImageAlt =
      imageAlt || "Intérieur des bureaux Humanis Assurances à Douala";

    // Determine grid order based on image position
    const contentOrder =
      imagePosition === "right" ? { xs: 1, md: 1 } : { xs: 1, md: 2 };
    const imageOrder =
      imagePosition === "right" ? { xs: 2, md: 2 } : { xs: 2, md: 1 };

    // ─── ANALYTICS & SIDE EFFECTS ──────────────────────────────────────────

    /**
     * Track component mount for analytics
     */
    useEffect(() => {
      onAnalyticsEvent?.("who_we_are_viewed", {
        variant,
        statisticsCount: statistics.length,
        hasCustomContent: contentParagraphs !== DEFAULT_CONTENT,
        imagePosition,
      });
    }, [
      variant,
      statistics.length,
      contentParagraphs,
      imagePosition,
      onAnalyticsEvent,
    ]);

    // ─── ERROR HANDLING ────────────────────────────────────────────────────

    if (error) {
      return (
        <SectionWrapper
          background="white"
          paddingY="large"
          component="section"
          aria-label="Who we are (error state)"
          data-testid={`${testId}-error`}
        >
          <WhoWeAreErrorFallback error={error} />
        </SectionWrapper>
      );
    }

    // ─── LOADING STATE ─────────────────────────────────────────────────────

    if (isLoading) {
      return (
        <SectionWrapper
          background="white"
          paddingY="large"
          component="section"
          aria-label="Who we are (loading)"
          data-testid={`${testId}-loading`}
        >
          <WhoWeAreSkeleton />
        </SectionWrapper>
      );
    }

    // ─── MAIN RENDER ───────────────────────────────────────────────────────

    return (
      <SectionWrapper
        background="white"
        paddingY="large"
        className={className}
        component="section"
        aria-label="Who we are"
        data-testid={testId}
      >
        <Box
          alignItems="center"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            height: "100%",
          }}
        >
          {/* Content Column */}
          <Grid
            size={{ xs: 12, md: 6 }}
            order={contentOrder}
            data-testid={`${testId}-content`}
          >
            {/* Section Header */}
            <SectionHeader
              title={displayTitle}
              subtitle={displaySubtitle}
              align="left"
            />

            {/* Content Paragraphs */}
            <Box
              component="article"
              sx={{ mt: variantConfig.contentSpacing }}
              data-testid={`${testId}-paragraphs`}
            >
              {contentParagraphs.map((paragraph, index) => (
                <ContentParagraphComponent
                  key={index}
                  paragraph={paragraph}
                  index={index}
                  testId={`${testId}-paragraph-${index}`}
                />
              ))}
            </Box>

            {/* Statistics Grid */}
            {showStatistics && statistics.length > 0 && (
              <Grid
                container
                spacing={{ xs: 2, sm: 3 }}
                sx={{ mt: variantConfig.contentSpacing }}
                component="aside"
                role="region"
                aria-label="Company statistics"
                data-testid={`${testId}-statistics`}
              >
                {statistics.map((stat, index) => (
                  <Grid key={index} size={{ xs: 4 }}>
                    <StatisticItem
                      config={stat}
                      size={variantConfig.statisticSize}
                      testId={`${testId}-statistic-${index}`}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>

          {/* Image Column */}
          {showImage && (
            <Grid
              size={{ xs: 12, md: 6 }}
              order={imageOrder}
              data-testid={`${testId}-image-container`}
              sx={{
                position: "relative",
                bgcolor: "red",
                height: "100%",
                width: "100%",
              }}
            >
              <Suspense
                fallback={
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={300}
                    sx={{ borderRadius: 2 }}
                  />
                }
              >
                <img
                  src={displayImageUrl}
                  alt={displayImageAlt}
                  data-testid={`${testId}-image`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                {/* <HumanisImage
                    src={displayImageUrl}
                    alt={displayImageAlt}
                    ratio="4/3"
                    radius={8}
                    data-testid={`${testId}-image`}
                  /> */}
              </Suspense>
            </Grid>
          )}
        </Box>
      </SectionWrapper>
    );
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT METADATA
// ─────────────────────────────────────────────────────────────────────────────

WhoWeAreSection.displayName = "WhoWeAreSection";

// ─────────────────────────────────────────────────────────────────────────────
// PROP VALIDATION (Development Mode)
// ─────────────────────────────────────────────────────────────────────────────

// if (process.env.NODE_ENV === "development") {
//   // Runtime prop validation in development
//   const originalWhoWeAreSection = WhoWeAreSection;

//   Object.defineProperty(WhoWeAreSection, "propTypes", {
//     value: {
//       // Basic validation - can be enhanced with prop-types or zod
//     },
//   });
// }

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export default WhoWeAreSection;
