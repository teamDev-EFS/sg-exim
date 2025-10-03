import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: any;
  noindex?: boolean;
}

const SEO = ({
  title = "The 11 Exim Overseas | India's Premier Agro Exporter | Global Trade & Partnerships",
  description = "The 11 Exim Overseas is a leading agro-export company from India, connecting premium agricultural products to global markets with excellence, sustainability, and trust.",
  keywords = "The 11 Exim Overseas, 11 Exim Overseas, Exim Overseas India, agricultural exports, premium rice, spices, jaggery, global trade, India exports, agricultural products, international trade, basmati rice, organic products, agro exporter India",
  image = "https://the11eximoverseas.com/images/11eximoverseas-logo.png",
  url = "https://the11eximoverseas.com",
  type = "website",
  structuredData,
  noindex = false,
}: SEOProps) => {
  const baseUrl = "https://the11eximoverseas.com";
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The 11 Exim Overseas",
    alternateName: [
      "11 Exim Overseas",
      "Exim Overseas India",
      "The11EximOverseas",
    ],
    url: baseUrl,
    logo: `${baseUrl}/images/11eximoverseas-logo.png`,
    description: description,
    foundingDate: "1999",
    address: {
      "@type": "PostalAddress",
      streetAddress: "81, Vishwakarma Nagar",
      addressLocality: "Indore",
      addressRegion: "Madhya Pradesh",
      postalCode: "452001",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9xxxxxxxxx",
      contactType: "Customer Service",
      areaServed: "Global",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/the11eximoverseas",
      "https://www.linkedin.com/company/the11eximoverseas",
      "https://www.instagram.com/the11eximoverseas",
      "https://twitter.com/the11eximoverseas",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Agricultural Export Products",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Premium Basmati Rice",
            category: "Rice",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Natural Jaggery",
            category: "Sweeteners",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Premium Spices",
            category: "Spices",
          },
        },
      ],
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="The 11 Exim Overseas" />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <meta
        name="googlebot"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="The 11 Exim Overseas" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="application-name" content="The 11 Exim Overseas" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
