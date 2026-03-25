import React from "react";
import { Box } from "@mui/material";

interface GoogleMapsSectionProps {
  height?: number;
}

export const GoogleMapsSection: React.FC<GoogleMapsSectionProps> = ({
  height = 400,
}) => {
  return (
    <Box
      component="section"
      sx={{
        height,
        border: "1px solid",
        borderColor: "neutral.200",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8936234567!2d9.7043!3d4.0483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDInNTEuMCJOIDnCsDQyJzE1LjUiRQ!5e0!3m2!1sfr!2scm!4v1234567890"
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation Humanis Assurances - 688 Rue Joffre, Akwa-Douala"
      />
    </Box>
  );
};