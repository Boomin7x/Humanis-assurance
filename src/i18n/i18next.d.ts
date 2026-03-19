// src/i18n/i18next.d.ts
// Type declarations for i18next to ensure type-safe translation keys

import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        nav: {
          home: string;
          about: string;
          services: string;
          products: string;
          contact: string;
          getQuote: string;
          language: string;
        };
        hero: {
          tagline: string;
          title: string;
          subtitle: string;
          cta: {
            primary: string;
            secondary: string;
          };
          trust: {
            clients: string;
            experience: string;
            certified: string;
          };
        };
        sections: {
          stats: {
            clients: string;
            experience: string;
            partners: string;
            expertise: string;
          };
          services: {
            overline: string;
            title: string;
            cta: string;
          };
          about: {
            overline: string;
            title: string;
            cta: string;
            experience: string;
          };
          products: {
            overline: string;
            title: string;
            iardt: {
              title: string;
              count: string;
              cta: string;
            };
            life: {
              title: string;
              count: string;
              cta: string;
            };
          };
          process: {
            overline: string;
            title: string;
            steps: {
              contact: string;
              audit: string;
              proposal: string;
              subscription: string;
              followup: string;
            };
          };
          testimonials: {
            overline: string;
            title: string;
          };
          partners: {
            overline: string;
            subtitle: string;
          };
        };
        pages: {
          home: {
            title: string;
            description: string;
            cta: {
              title: string;
              subtitle: string;
              button: string;
            };
          };
          about: {
            title: string;
            subtitle: string;
            description: string;
            breadcrumb: string;
            missions: {
              overline: string;
              items: {
                '1': string;
                '2': string;
                '3': string;
                '4': string;
              };
            };
            values: {
              overline: string;
              listening: {
                title: string;
                description: string;
              };
              availability: {
                title: string;
                description: string;
              };
              innovation: {
                title: string;
                description: string;
              };
              commitment: {
                title: string;
                description: string;
              };
            };
            expertise: {
              title: string;
              since: string;
              items: {
                audit: string;
                counsel: string;
                management: string;
                representation: string;
                risk: string;
              };
            };
            team: {
              overline: string;
              title: string;
            };
            cta: {
              title: string;
              subtitle: string;
              button: string;
            };
          };
          services: {
            title: string;
            subtitle: string;
            description: string;
            breadcrumb: string;
          };
          products: {
            title: string;
            subtitle: string;
            description: string;
            breadcrumb: string;
          };
          contact: {
            title: string;
            subtitle: string;
            description: string;
            breadcrumb: string;
          };
        };
        footer: {
          tagline: string;
          services: string;
          products: string;
          contact: string;
          address: string;
          hours: string;
          legal: string;
          privacy: string;
          copyright: string;
        };
        contact: {
          form: {
            name: string;
            email: string;
            phone: string;
            type: string;
            subject: string;
            message: string;
            submit: string;
            success: string;
            error: string;
          };
          types: {
            individual: string;
            company: string;
            other: string;
          };
          subjects: {
            brokerage: string;
            risk: string;
            international: string;
            quote: string;
            other: string;
          };
          whatsapp: string;
        };
        common: {
          learnMore: string;
          readMore: string;
          getQuote: string;
          contact: string;
          phone: string;
          email: string;
          website: string;
          loading: string;
          error: string;
        };
      };
    };
  }
}