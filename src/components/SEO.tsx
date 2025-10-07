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
  title = "TrustGlobe Exports | India's Premier Export Company | Bamboo Products & Agricultural Exports",
  description = "TrustGlobe Exports is a leading export company from India, connecting premium bamboo products, jute bags, onion & garlic products, soyabean, and more to global markets with excellence, sustainability, and trust.",
  keywords = "TrustGlobe Exports, export company India, bamboo products, jute bags, onion products, garlic products, soyabean, green chillies, mud bottles, pooja items, global trade, India exports, international trade, premium products",
  image = "https://trustglobeexports.com/images/Trust Globe Exports logo.jpeg",
  url = "https://trustglobeexports.com",
  type = "website",
  structuredData,
  noindex = false,
}: SEOProps) => {
  const baseUrl = "https://trustglobeexports.com";
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrustGlobe Exports",
    alternateName: [
      "TrustGlobe Exports",
      "Trust Globe Exports",
      "TrustGlobeExports",
    ],
    url: baseUrl,
    logo: `${baseUrl}/images/Trust Globe Exports logo.jpeg`,
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
      telephone: "+91-7247211741",
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
      <meta name="author" content="TrustGlobe Exports" />
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
      <meta property="og:site_name" content="TrustGlobe Exports" />
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
      <meta name="application-name" content="TrustGlobe Exports" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
