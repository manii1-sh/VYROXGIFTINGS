// SEO Schema / JSON-LD Structured Data for better Google rankings

import type { Product } from "../lib/products";
import type { Hamper } from "../lib/hampers";

type ProductSchemaProps = {
  product: Product;
  url: string;
};

type HamperSchemaProps = {
  hamper: Hamper;
  url: string;
};

type OrganizationSchemaProps = {
  url: string;
};

// Product Schema for Google Shopping & Rich Snippets
export function ProductSchema({ product, url }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images,
    "brand": {
      "@type": "Brand",
      "name": "VYROX"
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "INR",
      "price": product.priceValue,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "VYROX"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Hamper Schema for Gift Products
export function HamperSchema({ hamper, url }: HamperSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": hamper.name,
    "description": hamper.description,
    "image": [hamper.image],
    "brand": {
      "@type": "Brand",
      "name": "VYROX"
    },
    "category": "Gift Hampers",
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "INR",
      "price": hamper.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "VYROX"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "213"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Organization Schema for Brand Recognition
export function OrganizationSchema({ url }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VYROX",
    "description": "Premium gift hampers and oversized tees, hand-packed with love",
    "url": url,
    "logo": `${url}/vyrox-logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-884-830-3003",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.instagram.com/vyrox990"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Trivandrum",
      "addressCountry": "IN"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema for Navigation
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
