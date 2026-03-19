// src/components/ui/ServiceCard.tsx
/**
 * HUMANIS SERVICE CARD COMPONENT
 *
 * Features:
 * - Iconify icon at top
 * - Service title and description
 * - "En savoir plus" link with arrow
 * - Border accent (blue/teal top border)
 * - Hover animations with lift effect
 * - Clean card styling following design system
 */

import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Link,
  Stack,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { ArrowForward } from '@mui/icons-material'

import HumanisImage from '@/components/ui/HumanisImage'

import {
  PRIMARY_500,
  TEAL_500,
  NAVY_800,
  NEUTRAL_600,
  NEUTRAL_200,
  WHITE,
  GLASS_NAVY_04,
} from '@/theme/tokens'
import { RADIUS } from '@/constants/layout'

interface ServiceCardProps {
  /** Iconify icon name (e.g., 'mdi:shield-check') */
  icon: string
  /** Service title */
  title: string
  /** Service description */
  description: string
  /** Link destination (internal route or external URL) */
  href: string
  /** Color accent for top border */
  accentColor?: 'blue' | 'teal'
  /** Top photo strip image URL (following insurance plan specifications) */
  photo?: string
  /** Photo alt text for accessibility */
  photoAlt?: string
  /** Enable animations */
  animated?: boolean
  /** Custom click handler */
  onClick?: () => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  href,
  accentColor = 'blue',
  photo,
  photoAlt,
  animated = true,
  onClick,
}) => {
  const isExternal = href.startsWith('http')
  const accentColorValue = accentColor === 'blue' ? PRIMARY_500 : TEAL_500

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
        component={isExternal ? 'div' : RouterLink}
        to={isExternal ? undefined : href}
        onClick={onClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: WHITE,
          border: `1px solid ${NEUTRAL_200}`,
          borderTop: photo ? 'none' : `3px solid ${accentColorValue}`,
          borderRadius: RADIUS.md / 8, // 1px for MUI units
          boxShadow: 'none',
          textDecoration: 'none',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'all 200ms ease',
          '&:hover': {
            borderColor: accentColorValue,
            backgroundColor: GLASS_NAVY_04,
            boxShadow: `0 4px 12px rgba(13, 94, 175, 0.08), 0 2px 4px rgba(13, 94, 175, 0.04)`,
            textDecoration: 'none',
            transform: 'translateY(-2px)',
            // Photo hover effect
            '& .service-photo': {
              transform: 'scale(1.05)',
            },
          },
          // External link behavior
          ...(isExternal && {
            component: 'a',
            href,
            target: '_blank',
            rel: 'noopener noreferrer',
          }),
        }}
      >
        {/* Top Photo Strip (Insurance Industry Pattern) */}
        {photo && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 180,
              overflow: 'hidden',
              borderRadius: `${RADIUS.md}px ${RADIUS.md}px 0 0`,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                backgroundColor: accentColorValue,
                zIndex: 2,
              },
            }}
          >
            <HumanisImage
              src={photo}
              alt={photoAlt || `${title} - Service Humanis Assurances`}
              ratio="16/9"
              overlay="none"
              radius={0}
              priority={false}
              animated={false}
              className="service-photo"
              fallbackCategory="business"
              sx={{
                width: '100%',
                height: '100%',
                transition: 'transform 300ms ease',
              }}
            />
          </Box>
        )}

        <CardContent
          sx={{
            p: 4,
            pt: photo ? 3 : 4,
            pb: '32px !important', // Override MUI default
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            gap: 3,
            flex: 1,
          }}
        >
          {/* Icon - Professional Insurance Service Indicator */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: RADIUS.md / 8,
              backgroundColor: `${accentColorValue}12`, // 7% opacity
              color: accentColorValue,
              border: `1px solid ${accentColorValue}20`,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: -2,
                borderRadius: 'inherit',
                background: `linear-gradient(135deg, ${accentColorValue}20, transparent)`,
                zIndex: -1,
              },
            }}
          >
            <Icon
              icon={icon}
              width="28"
              height="28"
              style={{
                color: accentColorValue,
              }}
            />
          </Box>

          {/* Content */}
          <Stack spacing={2} sx={{ flex: 1 }}>
            {/* Title - Insurance Service Authority */}
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
                  bottom: -4,
                  left: 0,
                  width: '24px',
                  height: '2px',
                  backgroundColor: accentColorValue,
                  borderRadius: '1px',
                  opacity: 0.6,
                },
              }}
            >
              {title}
            </Typography>

            {/* Description - Clear Value Proposition */}
            <Typography
              variant="body2"
              sx={{
                color: NEUTRAL_600,
                lineHeight: 1.65,
                flex: 1,
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
          </Stack>

          {/* CTA Link - Professional Insurance Action */}
          <Box
            sx={{
              mt: 'auto',
              pt: 2,
              borderTop: `1px solid ${NEUTRAL_200}`,
            }}
          >
            <Link
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: accentColorValue,
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'all 150ms ease',
                padding: '8px 0',
                '&:hover': {
                  color: accentColor === 'blue' ? PRIMARY_500 : TEAL_500,
                  textDecoration: 'none',
                  '& .arrow-icon': {
                    transform: 'translateX(6px)',
                  },
                  '& .cta-text': {
                    letterSpacing: '0.01em',
                  },
                },
              }}
            >
              <span className="cta-text" style={{ transition: 'letter-spacing 150ms ease' }}>
                Découvrir ce service
              </span>
              <ArrowForward
                className="arrow-icon"
                sx={{
                  fontSize: '1.125rem',
                  transition: 'transform 200ms ease',
                  opacity: 0.8,
                }}
              />
            </Link>
          </Box>
        </CardContent>
      </Card>
    </MotionCard>
  )
}

export default ServiceCard