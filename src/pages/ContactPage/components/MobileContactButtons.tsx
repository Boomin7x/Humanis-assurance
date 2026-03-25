import React from "react";
import {
  Box,
  Fab,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { motion, AnimatePresence } from "framer-motion";

import { contactInfo } from "@/data/contact";

const buttonVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.95 },
};

const containerVariants = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    }
  },
  exit: { opacity: 0, y: 100 },
};

export const MobileContactButtons: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!isMobile) return null;

  const handlePhoneCall = () => {
    const primaryPhone = contactInfo.phones[0];
    if (primaryPhone) {
      window.location.href = `tel:+237${primaryPhone.replace(/\s/g, "")}`;
    }
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/237686132013", "_blank");
  };

  const handleEmail = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
        >
          <Stack spacing={2} alignItems="center">
            {/* Phone Button */}
            <motion.div
              variants={buttonVariants}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <Tooltip title="Appeler maintenant" placement="left">
                <Fab
                  onClick={handlePhoneCall}
                  aria-label="Appeler Humanis Assurances"
                  sx={{
                    backgroundColor: "brand.500",
                    color: "white",
                    width: 56,
                    height: 56,
                    "&:hover": {
                      backgroundColor: "brand.700",
                    },
                    boxShadow: "none",
                    border: "2px solid",
                    borderColor: "white",
                  }}
                >
                  <PhoneIcon />
                </Fab>
              </Tooltip>
            </motion.div>

            {/* WhatsApp Button */}
            <motion.div
              variants={buttonVariants}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <Tooltip title="WhatsApp" placement="left">
                <Fab
                  onClick={handleWhatsApp}
                  aria-label="Contacter via WhatsApp"
                  sx={{
                    backgroundColor: "#25D366",
                    color: "white",
                    width: 56,
                    height: 56,
                    "&:hover": {
                      backgroundColor: "#1DA851",
                    },
                    boxShadow: "none",
                    border: "2px solid",
                    borderColor: "white",
                  }}
                >
                  <WhatsAppIcon />
                </Fab>
              </Tooltip>
            </motion.div>

            {/* Email Button */}
            <motion.div
              variants={buttonVariants}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <Tooltip title="Envoyer un email" placement="left">
                <Fab
                  onClick={handleEmail}
                  aria-label="Envoyer un email à Humanis Assurances"
                  sx={{
                    backgroundColor: "neutral.700",
                    color: "white",
                    width: 48,
                    height: 48,
                    "&:hover": {
                      backgroundColor: "neutral.900",
                    },
                    boxShadow: "none",
                    border: "2px solid",
                    borderColor: "white",
                  }}
                >
                  <EmailIcon fontSize="small" />
                </Fab>
              </Tooltip>
            </motion.div>
          </Stack>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};