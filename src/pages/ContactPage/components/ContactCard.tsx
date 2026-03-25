import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";

interface ContactCardProps {
  icon: React.ReactElement;
  title: string;
  children: React.ReactNode;
  action?: {
    label: string;
    href: string;
    color?: string;
    backgroundColor?: string;
  };
}

export const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  children,
  action,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "neutral.300",
        borderRadius: "6px",
        backgroundColor: "white",
        "&:hover": {
          borderColor: "brand.500",
          borderWidth: "2px",
          backgroundColor: "brand.50",
          transform: "none",
          transition: "all 0.2s ease-in-out",
        },
        "&:focus-within": {
          borderColor: "brand.500",
          borderWidth: "2px",
          backgroundColor: "brand.50",
          outline: "2px solid",
          outlineColor: "brand.300",
          outlineOffset: "2px",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            sx={{
              color: "primary.main",
              mt: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon}
          </Box>
          <Stack spacing={1} flexGrow={1}>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            {children}
          </Stack>
          {action && (
            <Button
              variant="contained"
              size="small"
              href={action.href}
              target="_blank"
              sx={{
                backgroundColor: action.backgroundColor || "brand.500",
                color: action.color || "white",
                borderRadius: "6px",
                textTransform: "none",
                fontWeight: 600,
                border: "1px solid",
                borderColor: "transparent",
                "&:hover": {
                  backgroundColor: action.backgroundColor
                    ? `${action.backgroundColor}E6`
                    : "brand.700",
                  borderColor: action.backgroundColor || "brand.700",
                  transform: "translateY(-1px)",
                  transition: "all 0.2s ease-in-out",
                },
                "&:focus": {
                  outline: "2px solid",
                  outlineColor: "brand.300",
                  outlineOffset: "2px",
                },
              }}
            >
              {action.label}
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

interface ContactLinkProps {
  href: string;
  children: React.ReactNode;
  color?: string;
}

export const ContactLink: React.FC<ContactLinkProps> = ({
  href,
  children,
  color = "inherit",
}) => {
  return (
    <Link
      href={href}
      color={color}
      sx={{
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          textDecoration: "underline",
          color: "brand.500",
          textDecorationThickness: "2px",
          textUnderlineOffset: "2px",
        },
        "&:focus": {
          outline: "2px solid",
          outlineColor: "brand.300",
          outlineOffset: "2px",
          borderRadius: "2px",
        },
      }}
    >
      {children}
    </Link>
  );
};