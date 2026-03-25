import React from "react";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import VerifiedIcon from "@mui/icons-material/Verified";
import SecurityIcon from "@mui/icons-material/Security";
import GavelIcon from "@mui/icons-material/Gavel";
import { motion } from "framer-motion";

import { images } from "@/utils/imageLoader";
import { contactInfo } from "@/data/contact";
import { ContactCard, ContactLink } from "./ContactCard";

const staggerVariants = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

export const ContactInfo: React.FC = () => {
  return (
    <motion.div {...staggerVariants}>
      <Stack spacing={4}>
        {/* Humanis Logo */}
        <Box textAlign="center">
          <img
            src={images.logo.color}
            alt="Humanis Assurances"
            style={{ maxHeight: "60px", width: "auto" }}
          />
        </Box>

        {/* Contact Cards */}
        <Stack spacing={3}>
          {/* Address */}
          <ContactCard
            icon={<LocationOnIcon />}
            title="Adresse"
          >
            <Typography variant="body2" color="text.secondary">
              {contactInfo.address}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Akwa, Douala - Cameroun
            </Typography>
          </ContactCard>

          {/* Phone */}
          <ContactCard
            icon={<PhoneIcon />}
            title="Téléphone"
          >
            {contactInfo.phones.map((phone, index) => (
              <Typography
                key={index}
                variant="body2"
                color="text.secondary"
              >
                <ContactLink href={`tel:+237${phone.replace(/\s/g, "")}`}>
                  +237 {phone}
                </ContactLink>
              </Typography>
            ))}
          </ContactCard>

          {/* Email */}
          <ContactCard
            icon={<EmailIcon />}
            title="Email"
          >
            <Typography variant="body2" color="text.secondary">
              <ContactLink href={`mailto:${contactInfo.email}`}>
                {contactInfo.email}
              </ContactLink>
            </Typography>
          </ContactCard>

          {/* Website */}
          <ContactCard
            icon={<LanguageIcon />}
            title="Site web"
          >
            <Typography variant="body2" color="text.secondary">
              {contactInfo.website}
            </Typography>
          </ContactCard>

          {/* WhatsApp */}
          <ContactCard
            icon={<WhatsAppIcon sx={{ color: "#25D366", fontSize: "2rem" }} />}
            title="WhatsApp"
            action={{
              label: "Discuter",
              href: "https://wa.me/237686132013",
              backgroundColor: "#25D366",
              color: "white",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Discutez directement avec nous
            </Typography>
          </ContactCard>

          {/* Office Hours */}
          <ContactCard
            icon={<AccessTimeIcon />}
            title="Horaires d'ouverture"
          >
            <Typography variant="body2" color="text.secondary">
              {contactInfo.hours}
            </Typography>
          </ContactCard>

          {/* Trust Indicators Section */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              border: "1px solid",
              borderColor: "brand.100",
              borderRadius: "6px",
              backgroundColor: "brand.50",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "brand.900",
                fontWeight: 600,
                mb: 2,
                textAlign: "center",
              }}
            >
              Certifications & Agréments
            </Typography>

            <Stack spacing={2}>
              {/* FANAF Certification */}
              <Stack direction="row" spacing={2} alignItems="center">
                <VerifiedIcon sx={{ color: "brand.500", fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600} color="brand.700">
                    Membre FANAF
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Fédération des Sociétés d'Assurances de Droit National Africaines
                  </Typography>
                </Box>
              </Stack>

              {/* ISO 27001 */}
              <Stack direction="row" spacing={2} alignItems="center">
                <SecurityIcon sx={{ color: "success.main", fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600} color="brand.700">
                    Certifié ISO 27001
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sécurité des données et protection de la vie privée
                  </Typography>
                </Box>
              </Stack>

              {/* Legal Authorization */}
              <Stack direction="row" spacing={2} alignItems="center">
                <GavelIcon sx={{ color: "warning.main", fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600} color="brand.700">
                    Agréé CIMA
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Conférence Interafricaine des Marchés d'Assurances
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            <Typography
              variant="caption"
              color="brand.700"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 2,
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Votre confiance est notre priorité
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </motion.div>
  );
};