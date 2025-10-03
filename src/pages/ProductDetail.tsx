import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Shield,
  Truck,
  CheckCircle,
  MapPin,
  Calendar,
  Package,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { api } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SEO from "../components/SEO";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    quantity: "",
    requirements: "",
  });
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteErrors, setQuoteErrors] = useState<Record<string, string>>({});
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteSubmitError, setQuoteSubmitError] = useState<string>("");

  // Mock product data - in production, this would be fetched from MongoDB
  const productsData = {
    "1": {
      id: "1",
      name: "Bamboo Furniture Collection",
      category: "Bamboo Products",
      images: [
        "/images/bamboo furniture.webp",
        "/images/bamboo chair.webp",
        "/images/bamboo tableware.webp",
      ],
      description:
        "Elegant and sustainable bamboo furniture including chairs, tables, and storage solutions crafted with traditional techniques. Perfect for eco-conscious consumers and modern homes.",
      longDescription: `Our Bamboo Furniture Collection represents the perfect blend of traditional craftsmanship and modern design. Each piece is carefully crafted by skilled artisans using sustainable bamboo, making it an excellent choice for environmentally conscious consumers.

    The furniture is designed to be both functional and beautiful, with attention to detail in every joint and finish. Our bamboo is sourced from sustainable plantations and treated to ensure durability and longevity.

    Perfect for modern homes, offices, and commercial spaces looking for sustainable and stylish furniture solutions.`,
      certifications: [
        "Eco-Friendly",
        "Sustainable",
        "Handcrafted",
        "FSC Certified",
      ],
      specifications: {
        Material: "100% Bamboo",
        Finish: "Natural or Stained",
        "Assembly Required": "Minimal",
        "Weight Capacity": "150-200 kg",
        "Shelf Life": "10+ years",
        Packaging: "Protective wrapping",
      },
      nutritionalInfo: {
        "Environmental Impact": "Carbon Negative",
        "Renewable Resource": "Yes",
        Biodegradable: "Yes",
        "Chemical Treatment": "Minimal",
        Durability: "High",
        Maintenance: "Low",
      },
      origin: "Assam, India",
      minimumOrder: "10 pieces",
      packaging: "Protective packaging available",
      shelfLife: "10+ years",
      storageConditions: "Store in dry place, avoid direct sunlight",
      popularity: 95,
      features: [
        "100% Sustainable Bamboo",
        "Handcrafted by Skilled Artisans",
        "Eco-Friendly and Biodegradable",
        "Modern Design with Traditional Craft",
        "Durable and Long-lasting",
        "Easy to Maintain",
      ],
    },
    "2": {
      id: "2",
      name: "Bamboo Tableware",
      category: "Bamboo Products",
      images: [
        "/images/bamboo tableware.webp",
        "/images/bamboo tableware two.webp",
        "/images/bamboo tableware three.webp",
      ],
      description:
        "Beautiful bamboo tableware including plates, bowls, and serving dishes perfect for eco-conscious dining. Made from sustainable bamboo with food-safe finishes.",
      longDescription: `Our Bamboo Tableware collection offers a perfect combination of sustainability and functionality. Each piece is crafted from premium bamboo and finished with food-safe, natural treatments that make them safe for daily use.

      The tableware is lightweight yet durable, making it perfect for both indoor and outdoor dining. The natural bamboo grain adds a beautiful, organic aesthetic to any table setting.

      Perfect for restaurants, cafes, and homes looking for sustainable dining solutions that don't compromise on style or functionality.`,
      certifications: [
        "Food Safe",
        "Eco-Friendly",
        "Biodegradable",
        "FDA Approved",
      ],
      specifications: {
        Material: "100% Bamboo",
        "Food Safe": "Yes",
        "Dishwasher Safe": "Hand wash recommended",
        "Microwave Safe": "No",
        Weight: "Lightweight",
        Packaging: "Eco-friendly packaging",
      },
      nutritionalInfo: {
        "Environmental Impact": "Minimal",
        Biodegradable: "Yes",
        "Chemical Free": "Yes",
        Reusable: "Yes",
        Durability: "High with proper care",
        Maintenance: "Easy",
      },
      origin: "Kerala, India",
      minimumOrder: "50 pieces",
      packaging: "Eco-friendly packaging available",
      shelfLife: "5+ years",
      storageConditions: "Store in dry place, hand wash only",
      popularity: 88,
      features: [
        "100% Natural Bamboo",
        "Food Safe and Non-toxic",
        "Lightweight and Durable",
        "Beautiful Natural Grain",
        "Eco-Friendly Alternative",
        "Perfect for Daily Use",
      ],
    },
    "3": {
      id: "3",
      name: "Bamboo Kitchen Accessories",
      category: "Bamboo Products",
      images: [
        "/images/Bamboo Wiker Kitchen Basket.webp",
        "/images/Bamboo Wiker Kitchen Basket two.webp",
        "/images/Bamboo Wiker Kitchen Basket three.webp",
      ],
      description:
        "Functional bamboo kitchen accessories including baskets, storage containers, and organizational items. Perfect for modern kitchens looking for sustainable storage solutions.",
      longDescription: `Our Bamboo Kitchen Accessories collection combines functionality with sustainability. Each piece is carefully crafted to provide practical storage solutions while adding a natural, organic touch to your kitchen.

      The accessories are designed to be both beautiful and functional, with attention to detail in every weave and finish. They're perfect for organizing fruits, vegetables, and other kitchen items.

      Perfect for modern kitchens, restaurants, and cafes looking for sustainable and stylish storage solutions.`,
      certifications: ["Natural", "Durable", "Food Safe", "Eco-Friendly"],
      specifications: {
        Material: "100% Bamboo",
        "Food Safe": "Yes",
        "Weight Capacity": "5-10 kg",
        "Water Resistant": "Natural treatment",
        Maintenance: "Easy cleaning",
        Packaging: "Protective wrapping",
      },
      nutritionalInfo: {
        "Environmental Impact": "Minimal",
        Biodegradable: "Yes",
        "Chemical Free": "Yes",
        Reusable: "Yes",
        Durability: "High",
        Maintenance: "Low",
      },
      origin: "West Bengal, India",
      minimumOrder: "20 pieces",
      packaging: "Eco-friendly packaging available",
      shelfLife: "5+ years",
      storageConditions: "Store in dry place, avoid moisture",
      popularity: 82,
      features: [
        "Natural Bamboo Material",
        "Functional and Beautiful",
        "Easy to Clean and Maintain",
        "Perfect for Organization",
        "Eco-Friendly Alternative",
        "Handcrafted Quality",
      ],
    },
    "4": {
      id: "4",
      name: "Bamboo Bags Collection",
      category: "Bamboo Products",
      images: [
        "/images/Bamboo Jute Bag.webp",
        "/images/Bamboo Jute Bag two.webp",
        "/images/Bamboo Jute Bag three.webp",
      ],
      description:
        "Stylish and sustainable bamboo bags including handbags, tote bags, and picnic accessories. Perfect for eco-conscious consumers who want both style and sustainability.",
      longDescription: `Our Bamboo Bags Collection offers a perfect blend of style, functionality, and sustainability. Each bag is crafted from premium bamboo fibers and natural materials, creating beautiful and durable accessories for everyday use.

      The bags are designed to be both fashionable and practical, with attention to detail in every stitch and finish. They're perfect for shopping, travel, and daily use while making a positive environmental impact.

      Perfect for fashion-conscious consumers, eco-friendly stores, and anyone looking for sustainable alternatives to traditional bags.`,
      certifications: ["Eco-Friendly", "Durable", "Stylish", "Sustainable"],
      specifications: {
        Material: "Bamboo fiber + Natural materials",
        "Weight Capacity": "10-15 kg",
        "Water Resistant": "Natural treatment",
        "Care Instructions": "Hand wash recommended",
        "Size Options": "Multiple sizes available",
        Packaging: "Eco-friendly packaging",
      },
      nutritionalInfo: {
        "Environmental Impact": "Minimal",
        Biodegradable: "Yes",
        "Chemical Free": "Yes",
        Reusable: "Yes",
        Durability: "High",
        Style: "Modern and Trendy",
      },
      origin: "Tamil Nadu, India",
      minimumOrder: "25 pieces",
      packaging: "Eco-friendly packaging available",
      shelfLife: "3+ years",
      storageConditions: "Store in dry place, avoid direct sunlight",
      popularity: 92,
      features: [
        "Sustainable Bamboo Material",
        "Stylish and Modern Design",
        "Durable and Long-lasting",
        "Perfect for Daily Use",
        "Eco-Friendly Alternative",
        "Handcrafted Quality",
      ],
    },
    "5": {
      id: "5",
      name: "Bamboo Craft Materials",
      category: "Bamboo Products",
      images: [
        "/images/Bamboo Craft Material.webp",
        "/images/Bamboo Craft Wall Decor.webp",
        "/images/Bamboo Craft Material two.webp",
      ],
      description:
        "Premium bamboo craft materials and decorative items perfect for DIY projects and home decoration. High-quality bamboo strips, panels, and craft supplies.",
      longDescription: `Our Bamboo Craft Materials collection provides everything needed for creative bamboo projects. From raw bamboo strips to finished decorative panels, each material is carefully selected for quality and workability.

      The materials are perfect for DIY enthusiasts, crafters, and interior designers looking to incorporate natural bamboo elements into their projects. Each piece is treated to ensure durability and ease of use.

      Perfect for craft stores, DIY workshops, and creative individuals who want to work with sustainable materials.`,
      certifications: [
        "Natural",
        "Craft Grade",
        "Sustainable",
        "Quality Assured",
      ],
      specifications: {
        Material: "100% Bamboo",
        Thickness: "2-10mm strips",
        Length: "Various sizes available",
        Treatment: "Natural or stained",
        Workability: "Easy to cut and shape",
        Packaging: "Protective wrapping",
      },
      nutritionalInfo: {
        "Environmental Impact": "Minimal",
        Biodegradable: "Yes",
        "Chemical Free": "Yes",
        Reusable: "Yes",
        Durability: "High",
        Versatility: "High",
      },
      origin: "Karnataka, India",
      minimumOrder: "100 pieces",
      packaging: "Protective packaging available",
      shelfLife: "2+ years",
      storageConditions: "Store in dry place, avoid moisture",
      popularity: 85,
      features: [
        "Premium Quality Bamboo",
        "Perfect for DIY Projects",
        "Easy to Work With",
        "Natural and Sustainable",
        "Versatile Applications",
        "Craft-Grade Quality",
      ],
    },
    "6": {
      id: "6",
      name: "Bamboo Baskets",
      category: "Bamboo Products",
      images: [
        "/images/Bamboo Laundry Basket.webp",
        "/images/Bamboo Laundry Basket two.webp",
        "/images/Bamboo Laundry Basket three.webp",
      ],
      description:
        "Beautiful and functional bamboo baskets perfect for storage, laundry, and decorative purposes. Handcrafted with traditional weaving techniques for durability and style.",
      longDescription: `Our Bamboo Baskets collection features beautifully crafted storage solutions made from premium bamboo. Each basket is handwoven using traditional techniques that have been passed down through generations.

      The baskets are designed to be both functional and decorative, perfect for organizing laundry, storing items, or adding a natural touch to any space. They're lightweight yet durable, making them perfect for daily use.

      Perfect for homes, hotels, spas, and anyone looking for sustainable storage solutions that combine functionality with natural beauty.`,
      certifications: ["Natural", "Handcrafted", "Durable", "Eco-Friendly"],
      specifications: {
        Material: "100% Bamboo",
        "Weight Capacity": "5-15 kg",
        "Size Options": "Multiple sizes available",
        Weaving: "Traditional handwoven",
        Finish: "Natural or stained",
        Packaging: "Protective wrapping",
      },
      nutritionalInfo: {
        "Environmental Impact": "Minimal",
        Biodegradable: "Yes",
        "Chemical Free": "Yes",
        Reusable: "Yes",
        Durability: "High",
        Maintenance: "Easy",
      },
      origin: "Assam, India",
      minimumOrder: "30 pieces",
      packaging: "Protective packaging available",
      shelfLife: "5+ years",
      storageConditions: "Store in dry place, avoid moisture",
      popularity: 78,
      features: [
        "Handwoven Bamboo",
        "Traditional Craftsmanship",
        "Functional and Decorative",
        "Lightweight and Durable",
        "Eco-Friendly Alternative",
        "Perfect for Storage",
      ],
    },
    "7": {
      id: "7",
      name: "Jute Bags Collection",
      category: "Jute Bags",
      images: [
        "/images/Bamboo Jute Bag.webp",
        "/images/Bamboo Jute Bag two.webp",
        "/images/Bamboo Jute Bag three.webp",
      ],
      description:
        "Eco-friendly jute bags perfect for shopping, travel, and daily use. Made from natural jute fiber with beautiful designs and durable construction.",
      longDescription: `Our Jute Bags Collection features beautifully crafted bags made from natural jute fiber. Each bag is designed to be both functional and stylish, perfect for eco-conscious consumers who want to make a positive environmental impact.

      The bags are made using traditional weaving techniques combined with modern designs, creating durable and attractive accessories for everyday use. They're perfect for shopping, travel, work, and any occasion where you need a reliable bag.

      Perfect for environmentally conscious consumers, fashion-forward individuals, and anyone looking for sustainable alternatives to plastic bags.`,
      certifications: ["Eco-Friendly", "Natural", "Durable", "Sustainable"],
      specifications: {
        Material: "100% Natural Jute",
        "Weight Capacity": "10-20 kg",
        "Size Options": "Multiple sizes available",
        Weaving: "Traditional handwoven",
        Finish: "Natural or printed",
        Packaging: "Eco-friendly packaging",
      },
      nutritionalInfo: {
        "Environmental Impact": "Minimal",
        Biodegradable: "Yes",
        "Chemical Free": "Yes",
        Reusable: "Yes",
        Durability: "High",
        Style: "Modern and Trendy",
      },
      origin: "West Bengal, India",
      minimumOrder: "50 pieces",
      packaging: "Eco-friendly packaging available",
      shelfLife: "3+ years",
      storageConditions: "Store in dry place, avoid moisture",
      popularity: 82,
      features: [
        "Natural Jute Material",
        "Eco-Friendly and Sustainable",
        "Durable and Long-lasting",
        "Stylish and Modern Design",
        "Perfect for Daily Use",
        "Biodegradable Alternative",
      ],
    },
    "8": {
      id: "8",
      name: "Fresh Onion",
      category: "Onion Products",
      images: [
        "/images/Fresh onion.jpeg",
        "/images/Fresh onion two.jpeg",
        "/images/Fresh onion three.jpeg",
      ],
      description:
        "Premium quality fresh onions with excellent shelf life and strong flavor. Perfect for international markets and culinary applications worldwide.",
      longDescription: `Our Fresh Onion collection features premium quality onions sourced from the finest farms across India. Each onion is carefully selected for size, color, and flavor, ensuring consistent quality for international markets.

      The onions are processed using modern techniques while maintaining their natural characteristics. They're perfect for both fresh consumption and processing into various onion products.

      Perfect for international markets, restaurants, food processors, and consumers who demand the highest quality onions.`,
      certifications: ["Fresh", "Export Quality", "FSSAI", "APEDA"],
      specifications: {
        "Onion Size": "5-7 cm diameter",
        "Moisture Content": "85-90%",
        "Shelf Life": "6-8 months",
        Storage: "Cool, dry, well-ventilated",
        Packaging: "Mesh bags, 10kg, 25kg",
        Color: "Red, Yellow, White varieties",
      },
      nutritionalInfo: {
        Energy: "40 kcal/100g",
        Protein: "1.1g/100g",
        Carbohydrates: "9.3g/100g",
        Fat: "0.1g/100g",
        Fiber: "1.7g/100g",
        "Vitamin C": "7.4mg/100g",
      },
      origin: "Maharashtra, India",
      minimumOrder: "1000 kg",
      packaging: "Export-grade mesh bags",
      shelfLife: "6-8 months",
      storageConditions: "Store in cool, dry place away from pests",
      popularity: 75,
      features: [
        "Premium Quality Selection",
        "Extended Shelf Life",
        "Strong Flavor and Aroma",
        "Export Quality Standards",
        "Consistent Size and Color",
        "Fresh Harvest Processing",
      ],
    },
    "9": {
      id: "9",
      name: "Dehydrated Onion Flakes",
      category: "Onion Products",
      images: [
        "/images/Dehydrated Onoin flakes.jpg",
        "/images/Dehydrated Onoin flakes two.jpg",
        "/images/Dehydrated Onoin flakes three.jpg",
      ],
      description:
        "Premium quality dehydrated onion flakes with excellent flavor retention and long shelf life. Perfect for food processing and international markets.",
      longDescription: `Our Dehydrated Onion Flakes are made from premium quality fresh onions using advanced dehydration technology. The flakes retain the natural flavor and aroma of fresh onions while offering extended shelf life and convenience.

      The dehydration process removes moisture while preserving the essential oils and nutrients, making these flakes perfect for food processing, seasoning blends, and culinary applications.

      Perfect for food manufacturers, restaurants, and consumers who want the convenience of dried onions without compromising on flavor.`,
      certifications: ["FSSAI", "Export Quality", "HACCP", "ISO 22000"],
      specifications: {
        "Moisture Content": "<8%",
        "Flake Size": "3-5mm",
        Color: "Light yellow to golden",
        "Shelf Life": "24 months",
        Packaging: "Food-grade bags, 1kg, 5kg, 25kg",
        Processing: "Air-dried, cleaned",
      },
      nutritionalInfo: {
        Energy: "350 kcal/100g",
        Protein: "10g/100g",
        Carbohydrates: "75g/100g",
        Fat: "3.4g/100g",
        Fiber: "6.3g/100g",
        "Vitamin C": "5mg/100g",
      },
      origin: "Maharashtra, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "24 months",
      storageConditions: "Store in cool, dry place away from pests",
      popularity: 70,
      features: [
        "Long Shelf Life",
        "Retains Natural Flavor",
        "Easy to Rehydrate",
        "Perfect for Food Processing",
        "Export Quality Standards",
        "Convenient Storage",
      ],
    },
    "10": {
      id: "10",
      name: "Dehydrated Onion Powder",
      category: "Onion Products",
      images: [
        "/images/Dehydrated Onion Powder.jpeg",
        "/images/Dehydrated Onion Powder two.jpeg",
        "/images/Dehydrated Onion Powder three.jpeg",
      ],
      description:
        "Premium quality dehydrated onion powder with intense flavor and aroma. Perfect for seasoning blends, food processing, and culinary applications worldwide.",
      longDescription: `Our Dehydrated Onion Powder is made from premium quality fresh onions using advanced drying technology. The powder retains the intense flavor and aroma of fresh onions while offering maximum convenience and long shelf life.

      The powder is finely ground to ensure even distribution and consistent flavor in all applications. It's perfect for seasoning blends, marinades, rubs, and any recipe that calls for onion flavor.

      Perfect for food manufacturers, restaurants, and home cooks who want the convenience of onion powder without compromising on flavor quality.`,
      certifications: ["FSSAI", "Export Quality", "HACCP", "ISO 22000"],
      specifications: {
        "Moisture Content": "<6%",
        "Particle Size": "60-80 mesh",
        Color: "Light yellow to golden",
        "Shelf Life": "36 months",
        Packaging: "Food-grade bags, 1kg, 5kg, 25kg",
        Processing: "Spray-dried, ground",
      },
      nutritionalInfo: {
        Energy: "350 kcal/100g",
        Protein: "10g/100g",
        Carbohydrates: "75g/100g",
        Fat: "3.4g/100g",
        Fiber: "6.3g/100g",
        "Vitamin C": "5mg/100g",
      },
      origin: "Maharashtra, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "36 months",
      storageConditions: "Store in cool, dry place away from light",
      popularity: 90,
      features: [
        "Intense Onion Flavor",
        "Long Shelf Life",
        "Easy to Use",
        "Perfect for Seasoning Blends",
        "Export Quality Standards",
        "Convenient Storage",
      ],
    },
    "11": {
      id: "11",
      name: "Whole Garlic",
      category: "Garlic Products",
      images: [
        "/images/Whole Garlic.webp",
        "/images/Whole Garlic two.webp",
        "/images/Whole Garlic three.webp",
      ],
      description:
        "Premium quality whole garlic with strong aroma and flavor. Perfect for international markets and culinary applications worldwide.",
      longDescription: `Our Whole Garlic collection features premium quality garlic sourced from the finest farms across India. Each bulb is carefully selected for size, color, and flavor, ensuring consistent quality for international markets.

      The garlic is processed using modern techniques while maintaining its natural characteristics. It's perfect for both fresh consumption and processing into various garlic products.

      Perfect for international markets, restaurants, food processors, and consumers who demand the highest quality garlic.`,
      certifications: ["Fresh", "Export Quality", "FSSAI", "APEDA"],
      specifications: {
        "Garlic Size": "3-4 cm diameter",
        "Moisture Content": "65-70%",
        "Shelf Life": "6-8 months",
        Storage: "Cool, dry, well-ventilated",
        Packaging: "Mesh bags, 10kg, 25kg",
        Color: "White, Purple varieties",
      },
      nutritionalInfo: {
        Energy: "149 kcal/100g",
        Protein: "6.4g/100g",
        Carbohydrates: "33g/100g",
        Fat: "0.5g/100g",
        Fiber: "2.1g/100g",
        "Vitamin C": "31mg/100g",
      },
      origin: "Maharashtra, India",
      minimumOrder: "1000 kg",
      packaging: "Export-grade mesh bags",
      shelfLife: "6-8 months",
      storageConditions: "Cool, dry, well-ventilated storage",
      popularity: 85,
      features: [
        "Premium Quality Selection",
        "Extended Shelf Life",
        "Strong Aroma and Flavor",
        "Export Quality Standards",
        "Consistent Size and Color",
        "Fresh Harvest Processing",
      ],
    },
    "12": {
      id: "12",
      name: "Dehydrated Garlic Flakes",
      category: "Garlic Products",
      images: [
        "/images/Dehydrated Garlic Flakes.jpeg",
        "/images/Dehydrated Garlic Flakes two.jpeg",
        "/images/Dehydrated Garlic Flakes three.jpeg",
      ],
      description:
        "Premium quality dehydrated garlic flakes with excellent flavor retention and long shelf life. Perfect for food processing and international markets.",
      longDescription: `Our Dehydrated Garlic Flakes are made from premium quality fresh garlic using advanced dehydration technology. The flakes retain the natural flavor and aroma of fresh garlic while offering extended shelf life and convenience.

      The dehydration process removes moisture while preserving the essential oils and nutrients, making these flakes perfect for food processing, seasoning blends, and culinary applications.

      Perfect for food manufacturers, restaurants, and consumers who want the convenience of dried garlic without compromising on flavor.`,
      certifications: ["FSSAI", "Export Quality", "HACCP", "ISO 22000"],
      specifications: {
        "Moisture Content": "<8%",
        "Flake Size": "3-5mm",
        Color: "Light yellow to golden",
        "Shelf Life": "24 months",
        Packaging: "Food-grade bags, 1kg, 5kg, 25kg",
        Processing: "Air-dried, cleaned",
      },
      nutritionalInfo: {
        Energy: "350 kcal/100g",
        Protein: "10g/100g",
        Carbohydrates: "75g/100g",
        Fat: "3.4g/100g",
        Fiber: "6.3g/100g",
        "Vitamin C": "5mg/100g",
      },
      origin: "Maharashtra, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "24 months",
      storageConditions: "Store in cool, dry place away from pests",
      popularity: 80,
      features: [
        "Long Shelf Life",
        "Retains Natural Flavor",
        "Easy to Rehydrate",
        "Perfect for Food Processing",
        "Export Quality Standards",
        "Convenient Storage",
      ],
    },
    "13": {
      id: "13",
      name: "Dehydrated Garlic Powder",
      category: "Garlic Products",
      images: [
        "/images/Dehydrated Garlic Powder.jpg",
        "/images/Dehydrated Garlic Powder two.jpg",
        "/images/Dehydrated Garlic Powder three.jpg",
      ],
      description:
        "Premium quality dehydrated garlic powder with intense flavor and aroma. Perfect for seasoning blends, food processing, and culinary applications worldwide.",
      longDescription: `Our Dehydrated Garlic Powder is made from premium quality fresh garlic using advanced drying technology. The powder retains the intense flavor and aroma of fresh garlic while offering maximum convenience and long shelf life.

      The powder is finely ground to ensure even distribution and consistent flavor in all applications. It's perfect for seasoning blends, marinades, rubs, and any recipe that calls for garlic flavor.

      Perfect for food manufacturers, restaurants, and home cooks who want the convenience of garlic powder without compromising on flavor quality.`,
      certifications: ["FSSAI", "Export Quality", "HACCP", "ISO 22000"],
      specifications: {
        "Moisture Content": "<6%",
        "Particle Size": "60-80 mesh",
        Color: "Light yellow to golden",
        "Shelf Life": "36 months",
        Packaging: "Food-grade bags, 1kg, 5kg, 25kg",
        Processing: "Spray-dried, ground",
      },
      nutritionalInfo: {
        Energy: "350 kcal/100g",
        Protein: "10g/100g",
        Carbohydrates: "75g/100g",
        Fat: "3.4g/100g",
        Fiber: "6.3g/100g",
        "Vitamin C": "5mg/100g",
      },
      origin: "Maharashtra, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "36 months",
      storageConditions: "Store in cool, dry place away from light",
      popularity: 88,
      features: [
        "Intense Garlic Flavor",
        "Long Shelf Life",
        "Easy to Use",
        "Perfect for Seasoning Blends",
        "Export Quality Standards",
        "Convenient Storage",
      ],
    },
    "14": {
      id: "14",
      name: "Dehydrated Garlic Paste",
      category: "Garlic Products",
      images: [
        "/images/Dehydrated Garlic Paste.jpeg",
        "/images/Dehydrated Garlic Paste two.jpeg",
        "/images/Dehydrated Garlic Paste three.jpeg",
      ],
      description:
        "Premium quality dehydrated garlic paste with concentrated flavor and aroma. Perfect for food processing and culinary applications worldwide.",
      longDescription: `Our Dehydrated Garlic Paste is made from premium quality fresh garlic using advanced processing technology. The paste retains the intense flavor and aroma of fresh garlic while offering extended shelf life and convenience.

      The paste is processed to maintain the natural texture and flavor of fresh garlic, making it perfect for marinades, sauces, and any recipe that calls for garlic paste.

      Perfect for food manufacturers, restaurants, and home cooks who want the convenience of garlic paste without compromising on flavor quality.`,
      certifications: ["FSSAI", "Export Quality", "HACCP", "ISO 22000"],
      specifications: {
        "Moisture Content": "<10%",
        Texture: "Smooth paste",
        Color: "Light yellow to golden",
        "Shelf Life": "24 months",
        Packaging: "Food-grade containers, 1kg, 5kg, 25kg",
        Processing: "Pasteurized, sealed",
      },
      nutritionalInfo: {
        Energy: "350 kcal/100g",
        Protein: "10g/100g",
        Carbohydrates: "75g/100g",
        Fat: "3.4g/100g",
        Fiber: "6.3g/100g",
        "Vitamin C": "5mg/100g",
      },
      origin: "Maharashtra, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "24 months",
      storageConditions: "Store in cool, dry place away from light",
      popularity: 75,
      features: [
        "Concentrated Garlic Flavor",
        "Long Shelf Life",
        "Easy to Use",
        "Perfect for Marinades",
        "Export Quality Standards",
        "Convenient Storage",
      ],
    },
    "15": {
      id: "15",
      name: "Soyabean",
      category: "Soyabean",
      images: [
        "/images/Soyabean.jpg",
        "/images/Soyabean two.jpg",
        "/images/Soyabean three.jpg",
      ],
      description:
        "Premium quality soyabean with high protein content and nutritional benefits. Perfect for food processing and health food markets worldwide.",
      longDescription: `Our Soyabean collection features premium quality beans sourced from the finest farms across India. Each bean is carefully selected for size, color, and nutritional content, ensuring consistent quality for international markets.

      The soyabean is processed using modern techniques while maintaining its natural characteristics. It's perfect for both direct consumption and processing into various soy products.

      Perfect for international markets, food processors, and consumers who demand the highest quality soyabean.`,
      certifications: ["FSSAI", "Export Quality", "Non-GMO", "High Protein"],
      specifications: {
        "Protein Content": "35-40%",
        "Moisture Content": "<12%",
        "Foreign Matter": "<1%",
        "Shelf Life": "24 months",
        Packaging: "Food-grade bags, 25kg, 50kg",
        Color: "Yellow to light brown",
      },
      nutritionalInfo: {
        Energy: "446 kcal/100g",
        Protein: "36g/100g",
        Carbohydrates: "30g/100g",
        Fat: "20g/100g",
        Fiber: "9g/100g",
        Iron: "15mg/100g",
      },
      origin: "Madhya Pradesh, India",
      minimumOrder: "1000 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "24 months",
      storageConditions: "Store in cool, dry place away from pests",
      popularity: 85,
      features: [
        "High Protein Content",
        "Non-GMO",
        "Rich in Nutrients",
        "Export Quality Standards",
        "Consistent Quality",
        "Versatile Applications",
      ],
    },
    "16": {
      id: "16",
      name: "Soyachunks",
      category: "Soyabean",
      images: [
        "/images/Soyachunks.jpeg",
        "/images/Soyachunks two.jpeg",
        "/images/Soyachunks three.jpeg",
      ],
      description:
        "Premium quality soyachunks with high protein content and meat-like texture. Perfect for vegetarian and vegan food markets worldwide.",
      longDescription: `Our Soyachunks are made from premium quality soyabean using advanced processing technology. The chunks have a meat-like texture and are rich in protein, making them perfect for vegetarian and vegan diets.

      The soyachunks are processed to maintain their nutritional value while providing a convenient and versatile protein source. They're perfect for curries, stir-fries, and any recipe that calls for protein-rich ingredients.

      Perfect for vegetarian and vegan markets, health food stores, and consumers looking for plant-based protein alternatives.`,
      certifications: ["FSSAI", "Export Quality", "Vegetarian", "High Protein"],
      specifications: {
        "Protein Content": "50-55%",
        "Moisture Content": "<10%",
        Texture: "Meat-like",
        "Shelf Life": "24 months",
        Packaging: "Food-grade bags, 1kg, 5kg, 25kg",
        Processing: "Textured, dried",
      },
      nutritionalInfo: {
        Energy: "350 kcal/100g",
        Protein: "50g/100g",
        Carbohydrates: "30g/100g",
        Fat: "15g/100g",
        Fiber: "8g/100g",
        Iron: "12mg/100g",
      },
      origin: "Madhya Pradesh, India",
      minimumOrder: "500 kg",
      packaging: "Food-grade packaging available",
      shelfLife: "24 months",
      storageConditions: "Store in cool, dry place away from moisture",
      popularity: 80,
      features: [
        "High Protein Content",
        "Meat-like Texture",
        "Vegetarian and Vegan",
        "Easy to Cook",
        "Export Quality Standards",
        "Versatile Applications",
      ],
    },
    "17": {
      id: "17",
      name: "Green Chillies",
      category: "Green Chillies",
      images: [
        "/images/Green Chillies.jpeg",
        "/images/Green Chillies two.jpeg",
        "/images/Green Chillies three.jpeg",
      ],
      description:
        "Premium quality green chillies with excellent flavor and heat. Perfect for international markets and culinary applications worldwide.",
      longDescription: `Our Green Chillies collection features premium quality chillies sourced from the finest farms across India. Each chilli is carefully selected for size, color, and heat level, ensuring consistent quality for international markets.

      The chillies are processed using modern techniques while maintaining their natural characteristics. They're perfect for both fresh consumption and processing into various chilli products.

      Perfect for international markets, restaurants, food processors, and consumers who demand the highest quality green chillies.`,
      certifications: ["Fresh", "Export Quality", "FSSAI", "APEDA"],
      specifications: {
        "Chilli Length": "5-8 cm",
        "Heat Level": "Medium to Hot",
        "Moisture Content": "85-90%",
        "Shelf Life": "7-10 days",
        Packaging: "Ventilated boxes, 5kg, 10kg",
        Color: "Bright green",
      },
      nutritionalInfo: {
        Energy: "40 kcal/100g",
        Protein: "2g/100g",
        Carbohydrates: "9g/100g",
        Fat: "0.2g/100g",
        Fiber: "1.5g/100g",
        "Vitamin C": "143mg/100g",
      },
      origin: "Andhra Pradesh, India",
      minimumOrder: "500 kg",
      packaging: "Ventilated packaging available",
      shelfLife: "7-10 days",
      storageConditions: "Store in cool, dry place",
      popularity: 75,
      features: [
        "Fresh and Crisp",
        "Consistent Heat Level",
        "Export Quality Standards",
        "Perfect for Cooking",
        "Rich in Vitamin C",
        "Versatile Applications",
      ],
    },
    "18": {
      id: "18",
      name: "Mud Bottles",
      category: "Mud Products",
      images: [
        "/images/Mud Bottles.jpg",
        "/images/Mud Bottles two.jpg",
        "/images/Mud Bottles three.jpg",
      ],
      description:
        "Beautiful and functional mud bottles perfect for water storage and cooling. Handcrafted with traditional techniques for natural water cooling properties.",
      longDescription: `Our Mud Bottles collection features beautifully crafted water storage vessels made from natural clay. Each bottle is handcrafted using traditional techniques that have been passed down through generations.

      The mud bottles have natural cooling properties and are perfect for storing water, keeping it cool and fresh. They're also beautiful decorative pieces that add a rustic charm to any space.

      Perfect for homes, restaurants, and anyone looking for natural and sustainable water storage solutions.`,
      certifications: ["Natural", "Handcrafted", "Eco-Friendly", "Traditional"],
      specifications: {
        Material: "100% Natural Clay",
        "Water Capacity": "1-5 liters",
        "Cooling Effect": "Natural",
        Finish: "Natural or glazed",
        Weight: "Lightweight",
        Packaging: "Protective wrapping",
      },
      nutritionalInfo: {
        "Environmental Impact": "Minimal",
        Biodegradable: "Yes",
        "Chemical Free": "Yes",
        "Natural Cooling": "Yes",
        Durability: "High with proper care",
        Maintenance: "Easy",
      },
      origin: "Rajasthan, India",
      minimumOrder: "50 pieces",
      packaging: "Protective packaging available",
      shelfLife: "10+ years",
      storageConditions: "Store in dry place, avoid extreme temperatures",
      popularity: 70,
      features: [
        "Natural Clay Material",
        "Traditional Handcrafting",
        "Natural Water Cooling",
        "Eco-Friendly and Sustainable",
        "Beautiful Decorative Piece",
        "Perfect for Water Storage",
      ],
    },
    "19": {
      id: "19",
      name: "Pooja Items",
      category: "Pooja Items",
      images: [
        "/images/Pooja Items.jpg",
        "/images/Pooja Items.jpg",
        "/images/Pooja Items.jpg",
      ],
      description:
        "Traditional pooja items and religious artifacts perfect for spiritual practices and cultural celebrations. Handcrafted with devotion and attention to detail.",
      longDescription: `Our Pooja Items collection features traditional religious artifacts and spiritual items handcrafted by skilled artisans. Each item is made with devotion and attention to detail, perfect for spiritual practices and cultural celebrations.

      The collection includes various items such as incense holders, prayer bowls, decorative pieces, and other religious artifacts. Each piece is crafted using traditional techniques and natural materials.

      Perfect for temples, homes, and anyone looking for authentic and beautiful religious items for their spiritual practices.`,
      certifications: ["Traditional", "Handcrafted", "Religious", "Authentic"],
      specifications: {
        Material: "Brass, Copper, Wood",
        Finish: "Traditional or polished",
        Size: "Various sizes available",
        Weight: "Lightweight to heavy",
        Care: "Regular cleaning recommended",
        Packaging: "Protective wrapping",
      },
      nutritionalInfo: {
        "Spiritual Value": "High",
        "Cultural Significance": "Traditional",
        Handcrafted: "Yes",
        Durable: "Yes",
        Maintenance: "Easy",
        Authenticity: "Genuine",
      },
      origin: "Uttar Pradesh, India",
      minimumOrder: "25 pieces",
      packaging: "Protective packaging available",
      shelfLife: "Lifetime",
      storageConditions: "Store in dry place, regular cleaning",
      popularity: 65,
      features: [
        "Traditional Handcrafting",
        "Authentic Religious Items",
        "Beautiful and Decorative",
        "Perfect for Spiritual Practices",
        "Cultural Significance",
        "Durable and Long-lasting",
      ],
    },
  };

  const product =
    productsData[id as keyof typeof productsData] || productsData["1"];

  // Get related products from the same category
  const relatedProducts = Object.values(productsData)
    .filter(
      (relatedProduct) =>
        relatedProduct.id !== id && relatedProduct.category === product.category
    )
    .slice(0, 3)
    .map((relatedProduct) => ({
      id: relatedProduct.id,
      name: relatedProduct.name,
      image: relatedProduct.images[0],
      category: relatedProduct.category,
    }));

  const validateQuoteForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!quoteFormData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (quoteFormData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!quoteFormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteFormData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Product validation
    if (!quoteFormData.product.trim()) {
      newErrors.product = "Product is required";
    }

    // Quantity validation
    if (!quoteFormData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    }

    // Phone validation (required)
    if (!quoteFormData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(quoteFormData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Company validation (required)
    if (!quoteFormData.company.trim()) {
      newErrors.company = "Company name is required";
    } else if (quoteFormData.company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
    }

    setQuoteErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuoteInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setQuoteFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (quoteErrors[name]) {
      setQuoteErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors and success state
    setQuoteErrors({});
    setQuoteSubmitError("");
    setQuoteSuccess(false);

    // Validate form before submission
    if (!validateQuoteForm()) {
      return;
    }

    setIsSubmittingQuote(true);

    try {
      const response = await api.submitQuote(quoteFormData);

      if (response.success) {
        setQuoteSuccess(true);
        toast.success(
          "Quote request submitted successfully! We'll get back to you within 24 hours.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        // Reset form
        setQuoteFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          product: product.name,
          quantity: "",
          requirements: "",
        });

        // Close form after 3 seconds
        setTimeout(() => {
          setShowQuoteForm(false);
          setQuoteSuccess(false);
        }, 3000);
      } else {
        const errorMessage =
          response.error || "Failed to submit quote request. Please try again.";
        setQuoteSubmitError(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      setQuoteSubmitError(
        "Network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  return (
    <>
      <SEO
        title={`${
          product?.name || "Product"
        } | TrustGlobe Exports | Premium Export Products`}
        description={`${
          product?.description || "Premium export product"
        } from TrustGlobe Exports. Export quality ${
          product?.category?.toLowerCase() || "product"
        } with full certifications and global delivery.`}
        keywords={`TrustGlobe Exports, ${product?.name || "product"}, ${
          product?.category?.toLowerCase() || "product"
        }, export quality, premium products, bamboo products, jute bags, onion products, garlic products, India exports, global trade`}
        url={`https://trustglobeexports.com/products/${id}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product?.name || "Agricultural Product",
          description: product?.description || "Premium agricultural product",
          category: product?.category || "Agricultural Products",
          brand: {
            "@type": "Brand",
            name: "TRUSTGLOBE EXPORTS",
          },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "USD",
            seller: {
              "@type": "Organization",
              name: "TRUSTGLOBE EXPORTS",
            },
          },
        }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-primary-600">
                Home
              </Link>
              <span>/</span>
              <Link to="/products" className="hover:text-primary-600">
                Products
              </Link>
              <span>/</span>
              <span className="text-gray-900">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-8 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Products</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={`${product.name} by TRUSTGLOBE EXPORTS - Premium ${product.category} for Global Export`}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    console.error(
                      "Image failed to load:",
                      product.images[selectedImage] || product.images[0]
                    );
                    e.currentTarget.src = product.images[0];
                  }}
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex space-x-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-primary-600"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} by TRUSTGLOBE EXPORTS - Image ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover"
                        onError={() => {
                          console.error(
                            "Thumbnail image failed to load:",
                            image
                          );
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">
                    {product.popularity}% Popular
                  </span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-3 py-2 rounded-lg font-medium flex items-center space-x-2"
                    >
                      <Shield className="h-4 w-4" />
                      <span>{cert}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gray-100 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Origin</div>
                      <div className="font-medium">{product.origin}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Min. Order</div>
                      <div className="font-medium">{product.minimumOrder}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Shelf Life</div>
                      <div className="font-medium">{product.shelfLife}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Packaging</div>
                      <div className="font-medium">Customizable</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setQuoteFormData((prev) => ({
                      ...prev,
                      product: product.name,
                    }));
                    setShowQuoteForm(true);
                  }}
                  className="flex-1 bg-primary-600 text-white py-4 px-6 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
                >
                  Request Quote
                </button>
                <Link
                  to="/contact"
                  className="flex-1 border-2 border-primary-600 text-primary-600 py-4 px-6 rounded-lg hover:bg-primary-50 transition-colors font-semibold text-lg text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Specifications */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Specifications
                </h3>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                      >
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium text-gray-900">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Nutritional Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Nutritional Info
                </h3>
                <div className="space-y-4">
                  {Object.entries(product.nutritionalInfo).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                      >
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium text-gray-900">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Storage & Handling */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                  <Package className="h-5 w-5 text-primary-600 mr-2" />
                  Storage & Handling
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                      Storage Conditions
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.storageConditions}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                      Packaging Options
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.packaging}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                      Quality Assurance
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Regular quality checks and third-party testing ensure
                      consistent quality standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={`${relatedProduct.name} by TRUSTGLOBE EXPORTS - Premium ${relatedProduct.category} for Global Export`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-primary-600 font-medium mb-2">
                      {relatedProduct.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {relatedProduct.name}
                    </h3>
                    <Link
                      to={`/products/${relatedProduct.id}`}
                      className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Form Modal */}
        {showQuoteForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Request Quote
              </h3>

              {/* Success Message */}
              {quoteSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium">
                      Quote request submitted successfully!
                    </p>
                    <p className="text-green-600 text-sm">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {quoteSubmitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium">
                      Submission failed
                    </p>
                    <p className="text-red-600 text-sm">{quoteSubmitError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product *
                  </label>
                  <input
                    type="text"
                    name="product"
                    value={quoteFormData.product || product.name}
                    onChange={handleQuoteInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      quoteErrors.product ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Product name"
                  />
                  {quoteErrors.product && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.product}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity Required *
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={quoteFormData.quantity}
                    onChange={handleQuoteInputChange}
                    placeholder="e.g., 5000 kg"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      quoteErrors.quantity
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                  {quoteErrors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.quantity}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={quoteFormData.name}
                    onChange={handleQuoteInputChange}
                    placeholder="Full Name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      quoteErrors.name ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {quoteErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={quoteFormData.email}
                    onChange={handleQuoteInputChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      quoteErrors.email ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {quoteErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={quoteFormData.phone}
                    onChange={handleQuoteInputChange}
                    placeholder="+91 9876543210"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      quoteErrors.phone ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {quoteErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={quoteFormData.company}
                    onChange={handleQuoteInputChange}
                    placeholder="Company Name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      quoteErrors.company ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {quoteErrors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.company}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    name="requirements"
                    value={quoteFormData.requirements}
                    onChange={handleQuoteInputChange}
                    placeholder="Any specific requirements or details..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuoteForm(false);
                      setQuoteErrors({});
                      setQuoteSubmitError("");
                      setQuoteSuccess(false);
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    disabled={isSubmittingQuote}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingQuote || quoteSuccess}
                    className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmittingQuote ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : quoteSuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Submitted!</span>
                      </>
                    ) : (
                      "Submit Quote"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default ProductDetail;
