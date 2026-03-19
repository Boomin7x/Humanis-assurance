// src/components/ui/ProductCard.tsx
/**
 * HUMANIS PRODUCT CARD COMPONENT
 *
 * Features:
 * - Category badge (IARDT/Vie)
 * - Product name and description
 * - Iconify icon
 * - Expandable list of coverages
 * - CTA button "Je veux ce produit"
 * - Hover animations and interactions
 */

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
} from '@mui/material'
import {
  ExpandMore,
  ExpandLess,
  CheckCircleOutline,
  Shield,
  VerifiedUser,
  Gavel,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

import {
  PRIMARY_500,
  TEAL_500,
  NAVY_800,
  NEUTRAL_600,
  NEUTRAL_200,
  NEUTRAL_100,
  WHITE,
  GLASS_NAVY_04,
} from '@/theme/tokens'
import { RADIUS } from '@/constants/layout'

interface ProductCardProps {
  /** Product category */
  category: 'iardt' | 'vie'
  /** Product name */
  name: string
  /** Product description */
  description: string
  /** Iconify icon name */
  icon: string
  /** List of coverage items */
  coverages: string[]
  /** CIMA regulatory approval status */
  cimaApproved?: boolean
  /** Minimum premium range indicator */
  premiumRange?: 'economique' | 'standard' | 'premium'
  /** Popular product indicator */
  isPopular?: boolean
  /** Click handler for CTA button */
  onCTAClick?: () => void
  /** Enable animations */
  animated?: boolean
  /** Show expanded state by default */
  defaultExpanded?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  category,
  name,
  description,
  icon,
  coverages,
  cimaApproved = true,
  premiumRange = 'standard',
  isPopular = false,
  onCTAClick,
  animated = true,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const categoryConfig = {
    iardt: {
      label: 'IARDT',
      fullLabel: 'Incendie, Accidents, Risques Divers & Transport',
      color: PRIMARY_500,
      bgColor: `${PRIMARY_500}12`,
      icon: Shield,
    },
    vie: {
      label: 'Assurance Vie',
      fullLabel: 'Prévoyance & Épargne',
      color: TEAL_500,
      bgColor: `${TEAL_500}12`,
      icon: VerifiedUser,
    },
  }

  const premiumConfig = {
    economique: { label: 'Économique', color: TEAL_500 },
    standard: { label: 'Standard', color: PRIMARY_500 },
    premium: { label: 'Premium', color: NAVY_800 },
  }

  const config = categoryConfig[category]

  const MotionCard = animated ? motion.div : 'div'

  return (
    <MotionCard
      {...(animated && {
        whileHover: { y: -4, scale: 1.02, transition: { duration: 0.2 } },
        initial: { y: 0, scale: 1 },
        animate: { y: 0, scale: 1 },
      })}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: WHITE,
          border: `1px solid ${NEUTRAL_200}`,
          borderTop: isPopular ? `3px solid ${config.color}` : `1px solid ${NEUTRAL_200}`,
          borderRadius: RADIUS.md / 8,
          boxShadow: 'none',
          overflow: 'hidden',
          transition: 'all 200ms ease',
          position: 'relative',
          '&:hover': {
            borderColor: config.color,
            backgroundColor: GLASS_NAVY_04,
            boxShadow: `0 4px 12px rgba(13, 94, 175, 0.08), 0 2px 4px rgba(13, 94, 175, 0.04)`,
            transform: 'translateY(-2px)',
          },
          // Popular product styling
          ...(isPopular && {
            boxShadow: `0 2px 8px ${config.color}20`,
            '&::before': {
              content: '"POPULAIRE"',
              position: 'absolute',
              top: 12,
              right: -24,
              backgroundColor: config.color,
              color: WHITE,
              fontSize: '0.625rem',
              fontWeight: 600,
              padding: '2px 28px',
              borderRadius: '12px',
              transform: 'rotate(45deg)',
              letterSpacing: '0.05em',
              zIndex: 1,
              boxShadow: `0 2px 4px ${config.color}40`,
            },
          }),
        }}
      >
        <CardContent
          sx={{
            p: { xs: 3, md: 4 },
            pb: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Header - Insurance Product Authority */}
          <Stack spacing={3} sx={{ mb: 3 }}>
            {/* Category Badge & Trust Indicators */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {/* Category & Premium Range */}
              <Stack spacing={1}>
                <Chip
                  label={config.label}
                  size="small"
                  icon={<config.icon sx={{ fontSize: '0.875rem !important' }} />}
                  sx={{
                    backgroundColor: config.bgColor,
                    color: config.color,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    borderRadius: RADIUS.pill / 8,
                    border: `1px solid ${config.color}30`,
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.5,
                    },
                    '& .MuiChip-icon': {
                      ml: 0.5,
                    },
                  }}
                />

                <Chip
                  label={premiumConfig[premiumRange].label}
                  size="small"
                  sx={{
                    backgroundColor: `${premiumConfig[premiumRange].color}12`,
                    color: premiumConfig[premiumRange].color,
                    fontWeight: 500,
                    fontSize: '0.6875rem',
                    height: 20,
                    borderRadius: RADIUS.pill / 8,
                    '& .MuiChip-label': {
                      px: 1,
                      py: 0,
                    },
                  }}
                />
              </Stack>

              {/* Icon & Trust Badge */}
              <Stack alignItems="center" spacing={1}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: RADIUS.sm / 8,
                    backgroundColor: config.bgColor,
                    color: config.color,
                    border: `2px solid ${config.color}20`,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: -3,
                      borderRadius: 'inherit',
                      background: `linear-gradient(135deg, ${config.color}15, transparent)`,
                      zIndex: -1,
                    },
                  }}
                >
                  <Icon
                    icon={icon}
                    width="24"
                    height="24"
                    style={{ color: config.color }}
                  />
                </Box>

                {/* CIMA Approval Badge */}
                {cimaApproved && (
                  <Chip
                    icon={<Gavel sx={{ fontSize: '0.75rem !important' }} />}
                    label="CIMA"
                    size="small"
                    sx={{
                      backgroundColor: `${NAVY_800}12`,
                      color: NAVY_800,
                      fontWeight: 600,
                      fontSize: '0.625rem',
                      height: 18,
                      borderRadius: RADIUS.pill / 8,
                      '& .MuiChip-label': {
                        px: 0.5,
                        py: 0,
                        letterSpacing: '0.05em',
                      },
                      '& .MuiChip-icon': {
                        ml: 0.25,
                      },
                    }}
                  />
                )}
              </Stack>
            </Box>

            {/* Product Name - Insurance Authority */}
            <Typography
              variant="h4"
              component="h3"
              sx={{
                                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.3,
                color: NAVY_800,
                letterSpacing: '-0.01em',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -6,
                  left: 0,
                  width: '32px',
                  height: '2px',
                  backgroundColor: config.color,
                  borderRadius: '1px',
                  opacity: 0.7,
                },
              }}
            >
              {name}
            </Typography>

            {/* Description - Clear Insurance Value */}
            <Typography
              variant="body2"
              sx={{
                color: NEUTRAL_600,
                lineHeight: 1.65,
                fontSize: '0.9375rem',
                fontWeight: 400,
                '& strong': {
                  color: NAVY_800,
                  fontWeight: 600,
                },
              }}
            >
              {description}
            </Typography>

            {/* Category Description */}
            <Typography
              variant="caption"
              sx={{
                color: config.color,
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                opacity: 0.8,
              }}
            >
              {config.fullLabel}
            </Typography>
          </Stack>

          {/* Coverages Section - Insurance Coverage Details */}
          <Box
            sx={{
              flex: 1,
              mb: 3,
              p: 2,
              backgroundColor: NEUTRAL_100,
              borderRadius: RADIUS.sm / 8,
              border: `1px solid ${config.color}20`,
            }}
          >
            {/* Coverage Header */}
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: NAVY_800,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  mb: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Shield sx={{ fontSize: '1rem', color: config.color }} />
                Garanties incluses
              </Typography>
            </Box>

            {/* Toggle Button */}
            <Button
              onClick={handleExpandClick}
              endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
              sx={{
                color: config.color,
                fontWeight: 600,
                fontSize: '0.875rem',
                textTransform: 'none',
                p: 0,
                mb: 1,
                justifyContent: 'flex-start',
                minHeight: 24,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: config.color,
                  '& .expand-icon': {
                    transform: 'scale(1.1)',
                  },
                },
                '& .MuiButton-endIcon': {
                  ml: 0.5,
                  transition: 'transform 150ms ease',
                },
              }}
            >
              {expanded ? 'Masquer' : 'Détailler'} ({coverages.length} garanties)
            </Button>

            {/* Expandable Coverages List */}
            <Collapse in={expanded} timeout={250}>
              <List
                dense
                disablePadding
                sx={{
                  backgroundColor: WHITE,
                  borderRadius: RADIUS.sm / 8,
                  border: `1px solid ${config.color}20`,
                  p: 1,
                  mt: 1,
                }}
              >
                {coverages.map((coverage, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{
                      py: 0.75,
                      px: 1,
                      borderRadius: RADIUS.xs / 8,
                      transition: 'background-color 150ms ease',
                      '&:hover': {
                        backgroundColor: `${config.color}08`,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleOutline
                        sx={{
                          fontSize: '1.125rem',
                          color: TEAL_500,
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={coverage}
                      slotProps={{
                        primary: {
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          color: NAVY_800,
                          lineHeight: 1.4,
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>

          {/* CTA Button - Insurance Product Action */}
          <Stack spacing={1} sx={{ mt: 'auto' }}>
            {/* Trust Indicator */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'center',
                py: 1,
                borderTop: `1px solid ${NEUTRAL_200}`,
              }}
            >
              <VerifiedUser
                sx={{
                  fontSize: '1rem',
                  color: TEAL_500,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: NEUTRAL_600,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                Produit agréé CIMA - Devis gratuit en 24h
              </Typography>
            </Box>

            {/* Primary CTA */}
            <Button
              variant="contained"
              fullWidth
              onClick={onCTAClick}
              sx={{
                backgroundColor: config.color,
                color: WHITE,
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: RADIUS.sm / 8,
                padding: '14px 24px',
                fontSize: '1rem',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  backgroundColor: config.color,
                  transform: 'translateY(-1px)',
                  boxShadow: `0 6px 20px ${config.color}40`,
                  '&::before': {
                    transform: 'translateX(100%)',
                  },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'transform 600ms ease',
                },
                transition: 'all 200ms ease',
              }}
            >
              Demander un devis
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </MotionCard>
  )
}

export default ProductCard