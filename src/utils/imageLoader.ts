// src/utils/imageLoader.ts
// Centralized image registry — import from here, never use raw paths in components

export const images = {
  hero: {
    teamGroup: "/imgs/pexels-august-de-richelieu-4262173.jpg", // Professional business team meeting
  },
  office: {
    exterior: "/imgs/pexels-rebrand-cities-581004-1367274.jpg", // Modern office building exterior
    interior: "/imgs/pexels-pnw-prod-8276364.jpg", // Professional workspace interior
    teamAtWork: "/imgs/pexels-cottonbro-4065137.jpg", // Team collaboration at work
  },
  services: {
    businessMeeting: "/imgs/pexels-edmond-dantes-4342493.jpg", // Professional business consultation
    international: "/imgs/pexels-divinetechygirl-1181396.jpg", // International business/global reach
  },
  clients: {
    consultation: "/imgs/pexels-tima-miroshnichenko-5439453.jpg", // Client consultation/advisor meeting
    family: "/imgs/pexels-anastasia-shuraeva-4091188.jpg", // Family/personal insurance context
    businessTeam: "/imgs/pexels-rdne-10375889.jpg", // Corporate team/enterprise clients
  },
  team: {
    member01: "/imgs/pexels-mikhail-nilov-7735635.jpg", // Professional portrait 1
    member02: "/imgs/pexels-olly-3778680.jpg", // Professional portrait 2
    member03: "/imgs/pexels-longkg2000-1642883.jpg", // Professional portrait 3
    member04: "/imgs/pexels-mayday-1516713.jpg", // Professional portrait 4
  },
  partners: {
    sanlam: new URL("@/assets/images/partners/Sanlam_logo.svg", import.meta.url)
      .href,
    activa: new URL("@/assets/images/partners/activa.svg", import.meta.url)
      .href,
    allianz: new URL("@/assets/images/partners/Allianz.svg", import.meta.url)
      .href,
    axa: new URL("@/assets/images/partners/AXA_Logo.svg", import.meta.url).href,
    nsia: new URL("@/assets/images/partners/nsia.svg", import.meta.url).href,
    chanas: new URL("@/assets/images/partners/chanas.svg", import.meta.url)
      .href,
  },
  logo: {
    color: new URL("@/assets/logo/humanis-logo-color.svg", import.meta.url)
      .href,
    white: new URL("@/assets/logo/humanis-logo-white.svg", import.meta.url)
      .href,
    mark: new URL("@/assets/logo/humanis-mark.svg", import.meta.url).href,
  },
};

// Placeholder images for development - fallback when real images are not available
export const placeholders = {
  hero: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&crop=faces",
  office:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
  team: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=faces",
  business:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
  consultation:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop",
  family:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop&crop=faces",
  international:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=800&fit=crop",
};

// Helper function to get image with fallback
export const getImage = (
  imagePath: string,
  fallbackCategory: keyof typeof placeholders = "business",
): string => {
  try {
    return imagePath || placeholders[fallbackCategory];
  } catch (error) {
    console.warn(`Image not found: ${imagePath}, using fallback`);
    console.error(error);
    return placeholders[fallbackCategory];
  }
};

// Preload critical images for performance
export const preloadCriticalImages = (): void => {
  const criticalImages = [
    images.hero.teamGroup,
    images.office.teamAtWork,
    images.logo.color,
    images.logo.white,
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
};
