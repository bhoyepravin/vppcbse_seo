// hooks/useSchoolSEO.js
import { useEffect } from "react";
import { schoolSeoConfig, schoolPageSEO } from "../utils/schoolSeoConfig";
import { schoolSlugToSeoKeyMap } from "../utils/schoolSeoMappings";

export const useSchoolSEO = (pathname = "/") => {
  useEffect(() => {
    // Extract the base path without leading/trailing slashes
    const cleanPath = pathname.replace(/^\/|\/$/g, '');
    
    // Get the SEO key from mapping, default to 'home' if not found
    const seoKey = schoolSlugToSeoKeyMap[cleanPath] || 
                   schoolSlugToSeoKeyMap[cleanPath.split('/')[0]] || 
                   'home';
    
    // Get page data from SEO config
    const pageData = schoolPageSEO[seoKey] || schoolPageSEO.home;
    
    // Construct full title
    const fullTitle = pageData.title; // Title already includes school name
    
    // Construct full image URL
    const ogImageUrl = pageData.ogImage 
      ? `${schoolSeoConfig.baseUrl}${pageData.ogImage}`
      : `${schoolSeoConfig.baseUrl}/images/default-og-image.jpg`;

    // Update document title
    document.title = fullTitle;

    // Update or create meta description
    updateOrCreateMetaTag('description', pageData.description);
    
    // Update or create meta keywords
    updateOrCreateMetaTag('keywords', pageData.keywords);
    
    // Update canonical link
    updateCanonicalLink(`${schoolSeoConfig.baseUrl}${pageData.canonical}`);

    // Update Open Graph tags
    updateOpenGraphTags({
      title: fullTitle,
      description: pageData.description,
      url: `${schoolSeoConfig.baseUrl}${pageData.canonical}`,
      image: ogImageUrl,
      siteName: schoolSeoConfig.siteName
    });

    // Update Twitter Card tags
    updateTwitterTags({
      title: fullTitle,
      description: pageData.description,
      image: ogImageUrl,
      site: schoolSeoConfig.twitterHandle
    });

    // Add/Update JSON-LD structured data
    addStructuredData(seoKey, pageData);

    // Cleanup function (optional)
    return () => {
      // You can reset to default values if needed
      // document.title = schoolSeoConfig.defaultTitle;
    };
  }, [pathname]);
};

// Helper function to update or create meta tags
function updateOrCreateMetaTag(name, content) {
  let metaTag = document.querySelector(`meta[name="${name}"]`);
  
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.name = name;
    document.head.appendChild(metaTag);
  }
  
  metaTag.content = content;
}

// Helper function to update canonical link
function updateCanonicalLink(href) {
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.appendChild(canonicalLink);
  }
  
  canonicalLink.href = href;
}

// Helper function to update Open Graph tags
function updateOpenGraphTags({ title, description, url, image, siteName }) {
  const ogTags = [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: siteName },
    { property: "og:locale", content: "en_IN" },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },
  ];

  ogTags.forEach(({ property, content }) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`);
    
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("property", property);
      document.head.appendChild(metaTag);
    }
    
    metaTag.content = content;
  });
}

// Helper function to update Twitter Card tags
function updateTwitterTags({ title, description, image, site }) {
  const twitterTags = [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: site },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: title },
  ];

  twitterTags.forEach(({ name, content }) => {
    let metaTag = document.querySelector(`meta[name="${name}"]`);
    
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", name);
      document.head.appendChild(metaTag);
    }
    
    metaTag.content = content;
  });
}

// Helper function to add structured data
function addStructuredData(seoKey, pageData) {
  // Base structured data for the school
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "School",
    name: schoolSeoConfig.siteName,
    url: schoolSeoConfig.baseUrl,
    logo: `${schoolSeoConfig.baseUrl}/logo.png`,
    description: pageData.description || schoolSeoConfig.defaultDescription,
    telephone: schoolSeoConfig.phone,
    email: schoolSeoConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: schoolSeoConfig.address.split(',')[0].trim(),
      addressLocality: "Nashik Road",
      addressRegion: "Maharashtra",
      postalCode: "422101",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.9975", // Update with actual coordinates
      longitude: "73.7898" // Update with actual coordinates
    },
    sameAs: [
      schoolSeoConfig.socialMedia.facebook,
      schoolSeoConfig.socialMedia.instagram,
      schoolSeoConfig.socialMedia.youtube
    ],
    foundingDate: "2000", // Update with actual year
    gradeLevels: ["Pre-Primary", "Primary", "Secondary"],
    educationalLevel: ["PreSchool", "PrimarySchool", "SecondarySchool"],
    curriculum: "CBSE",
    areaServed: "Nashik Metropolitan Region"
  };

  // Page-specific structured data enhancements
  let structuredData = { ...baseStructuredData };

  // Customize based on page type
  if (seoKey.includes('admission')) {
    structuredData.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Admissions",
      itemListElement: [{
        "@type": "Offer",
        itemOffered: {
          "@type": "EducationalOccupationalProgram",
          name: "School Admission",
          description: "Admission to Vidya Prabodhini Prashala",
          educationalLevel: "PrimarySchool, SecondarySchool",
          timeToComplete: "P1Y"
        }
      }]
    };
  }

  // Remove existing structured data
  const existingScript = document.querySelector(
    'script[type="application/ld+json"]'
  );
  if (existingScript) {
    document.head.removeChild(existingScript);
  }

  // Add new structured data
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
}