import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Clock,
  Star,
  TrendingUp,
  Users,
  Award,
  Leaf,
  X,
} from "lucide-react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { api } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counters, setCounters] = useState({
    countries: 0,
    experience: 0,
    clients: 0,
    success: 0,
  });
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
  const [quoteErrors, setQuoteErrors] = useState<Record<string, string>>({});
  const [quoteSubmitError, setQuoteSubmitError] = useState("");
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const heroSlides = [
    {
      title: "Connecting India's Finest Products to Global Markets",
      subtitle:
        "Excellence, Sustainability, and Unwavering Commitment to Quality",
      image: "/images/globalfoods.jpg",
      cta1: "Explore Products",
      cta2: "Partner With Us",
    },
    {
      title: "Premium Export Quality from Source to Your Doorstep",
      subtitle:
        "ISO Certified • Global Excellence • Sustainable Trade Solutions",
      image: "/images/jasmine-rice.jpg",
      cta1: "View Products",
      cta2: "Get Quote",
    },
    {
      title: "Trusted by Importers Worldwide",
      subtitle: "20+ Years of Excellence in International Trade",
      image: "/images/Middle-East-Map.jpg",
      cta1: "Global Markets",
      cta2: "Join Us",
    },
  ];

  const achievements = [
    { label: "Countries Served", value: 25, suffix: "+", icon: Globe },
    { label: "Years Experience", value: 20, suffix: "+", icon: Award },
    { label: "Happy Clients", value: 100, suffix: "+", icon: Users },
    { label: "Success Rate", value: 95, suffix: "%", icon: TrendingUp },
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Superior Quality",
      description:
        "Premium international-standard products with rigorous quality control and certifications.",
      features: ["ISO Certified", "FSSAI Approved", "International Standards"],
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description:
        "Reliable logistics network ensuring your products reach global destinations on schedule.",
      features: ["Global Logistics", "Real-time Tracking", "On-time Guarantee"],
    },
    {
      icon: Star,
      title: "Global Satisfaction",
      description:
        "Trusted by importers worldwide with a proven track record of excellence.",
      features: ["95% Success Rate", "Worldwide Trust", "Customer Support"],
    },
  ];

  const featuredProducts = [
    {
      name: "Bamboo Furniture Collection",
      category: "Bamboo Products",
      image: "/images/bamboo furniture.webp",
      description:
        "Elegant and sustainable bamboo furniture including chairs, tables, and storage solutions",
      certifications: ["Eco-Friendly", "Sustainable", "Handcrafted"],
      href: "/products?category=bamboo",
    },
    {
      name: "Jute Bags Collection",
      category: "Jute Bags",
      image: "/images/Bamboo Jute Bag.webp",
      description:
        "Eco-friendly jute bags in various sizes and designs for daily use",
      certifications: ["Eco-Friendly", "Durable", "Biodegradable"],
      href: "/products?category=jute",
    },
    {
      name: "Fresh Onion & Garlic",
      category: "Onion & Garlic Products",
      image: "/images/Fresh onion.jpeg",
      description: "Premium quality fresh onions and garlic for global markets",
      certifications: ["Fresh", "Export Quality", "Premium"],
      href: "/products?category=onion",
    },
    {
      name: "Soyabean Products",
      category: "Soyabean",
      image: "/images/Soyabean.jpg",
      description: "High protein soyabean and soyachunks for food processing",
      certifications: ["High Protein", "Export Quality", "Premium"],
      href: "/products?category=soyabean",
    },
    {
      name: "Green Chillies",
      category: "Green Chillies",
      image: "/images/Green Chillies.jpeg",
      description:
        "Fresh green chillies with perfect spice level and vibrant color",
      certifications: ["Fresh", "Export Quality", "Spicy"],
      href: "/products?category=chillies",
    },
    {
      name: "Mud Bottles",
      category: "Mud Products",
      image: "/images/Mud Bottles.jpg",
      description:
        "Traditional clay mud bottles for storing water and maintaining temperature",
      certifications: ["Traditional", "Natural", "Eco-Friendly"],
      href: "/products?category=mud",
    },
    {
      name: "Bamboo Tableware",
      category: "Bamboo Products",
      image: "/images/bamboo tableware.webp",
      description:
        "Beautiful bamboo tableware including plates, bowls, and serving dishes",
      certifications: ["Food Safe", "Eco-Friendly", "Biodegradable"],
      href: "/products?category=bamboo",
    },
    {
      name: "Bamboo Kitchen Accessories",
      category: "Bamboo Products",
      image: "/images/Bamboo Wiker Kitchen Basket.webp",
      description:
        "Functional bamboo kitchen accessories and storage containers",
      certifications: ["Natural", "Durable", "Food Safe"],
      href: "/products?category=bamboo",
    },
    {
      name: "Dehydrated Onion Products",
      category: "Onion Products",
      image: "/images/Dehydrated Onoin flakes.jpg",
      description:
        "High-quality dehydrated onion flakes and powder for food processing",
      certifications: ["Dehydrated", "Long Shelf Life", "Quality"],
      href: "/products?category=onion",
    },
    {
      name: "Pooja Items Collection",
      category: "Pooja Items",
      image: "/images/Pooja Items.jpg",
      description:
        "Traditional pooja items and religious artifacts for spiritual purposes",
      certifications: ["Traditional", "Religious", "Quality"],
      href: "/products?category=pooja",
    },
  ];

  const sustainabilityStats = [
    { value: "5,000+", label: "Farmers Supported", icon: Users },
    { value: "100%", label: "Chemical-Free Sourcing", icon: Leaf },
    { value: "15+", label: "Global Certifications", icon: Award },
    { value: "25+", label: "Years of Excellence", icon: Star },
  ];

  // Counter animation
  useEffect(() => {
    const animateCounter = (target: number, key: keyof typeof counters) => {
      let start = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCounters((prev: typeof counters) => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounters((prev: typeof counters) => ({
            ...prev,
            [key]: Math.floor(start),
          }));
        }
      }, 50);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(15, "countries");
          animateCounter(25, "experience");
          animateCounter(100, "clients");
          animateCounter(95, "success");
        }
      });
    });

    const achievementsSection = document.getElementById("achievements");
    if (achievementsSection) {
      observer.observe(achievementsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Quote form validation
  const validateQuoteForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!quoteFormData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!quoteFormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(quoteFormData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!quoteFormData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Company validation
    if (!quoteFormData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    // Product validation
    if (!quoteFormData.product.trim()) {
      newErrors.product = "Product selection is required";
    }

    // Quantity validation
    if (!quoteFormData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    }

    setQuoteErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Quote form input change handler
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
      setQuoteErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Quote form submission
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        toast.success("Quote request submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Reset form
        setQuoteFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          product: "",
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
      console.error("Quote submission error:", error);
      const errorMessage = "Failed to submit quote request. Please try again.";
      setQuoteSubmitError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  // Auto slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <>
      <SEO
        title="TrustGlobe Exports | India's Premier Export Company | Bamboo Products & Agricultural Exports"
        description="TrustGlobe Exports is a leading export company from India, connecting premium bamboo products, jute bags, onion & garlic products, soyabean, and more to global markets with excellence, sustainability, and trust."
        keywords="TrustGlobe Exports, export company India, bamboo products, jute bags, onion products, garlic products, soyabean, green chillies, mud bottles, pooja items, global trade, India exports, international trade, premium products"
        url="https://trustglobeexports.com"
      />
      <div className="relative">
        {/* Hero Section with Carousel */}
        <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden flex items-center">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-accent-900/80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="relative z-10 h-full flex items-center">
                <div className="container-custom text-center text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="max-w-5xl mx-auto"
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 lg:mb-8 leading-tight text-balance">
                      {index === 0
                        ? "TrustGlobe Exports – India's Global Export Leader"
                        : slide.title}
                    </h1>
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 text-white/90 leading-relaxed max-w-4xl mx-auto text-balance"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                      <Link
                        to="/products"
                        className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2 group"
                      >
                        <span>{slide.cta1}</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/partnerships"
                        className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary-900 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        {slide.cta2}
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white shadow-glow scale-125"
                    : "bg-white/50 hover:bg-white/70 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section
          id="achievements"
          className="section-padding gradient-bg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50"></div>
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="w-20 h-20 premium-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:shadow-glow-lg transition-all duration-300 group-hover:scale-110">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-5xl lg:text-6xl font-display font-bold text-gradient mb-3">
                      {achievement.label === "Countries Served"
                        ? counters.countries
                        : achievement.label === "Years Experience"
                        ? counters.experience
                        : achievement.label === "Happy Clients"
                        ? counters.clients
                        : counters.success}
                      <span className="text-3xl lg:text-4xl">
                        {achievement.suffix}
                      </span>
                    </div>
                    <div className="text-neutral-700 font-semibold text-lg">
                      {achievement.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-white relative">
          <div className="container-custom">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-4xl lg:text-6xl font-display font-bold text-gradient mb-8 text-balance">
                  Why Choose TrustGlobe Exports?
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed text-balance">
                  We combine decades of experience with cutting-edge technology
                  to deliver exceptional bamboo products, jute bags, and
                  agricultural products to global markets.
                </p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="card-premium p-8 h-full hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-20 h-20 premium-gradient rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-glow">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                      {item.description}
                    </p>
                    <ul className="space-y-3">
                      {item.features.map((feature, fIndex) => (
                        <li
                          key={fIndex}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                          <span className="text-neutral-700 font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our premium range of agricultural and lifestyle
                products, carefully selected and quality-assured for global
                markets.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={`${product.name} by TRUSTGLOBE EXPORTS - Premium ${product.category} for Global Export`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.certifications.map((cert, cIndex) => (
                        <span
                          key={cIndex}
                          className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        to={product.href}
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center font-medium"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => {
                          setQuoteFormData((prev) => ({
                            ...prev,
                            product: product.name,
                          }));
                          setShowQuoteForm(true);
                        }}
                        className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
              >
                <span>View All Products</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Global Market Presence */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Global Market Presence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Serving premium agricultural products to key international
                markets across the Middle East and Europe.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Markets
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
                    <div className="w-12 h-8 bg-primary-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">UAE</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        United Arab Emirates
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Rice, Jaggery, Premium Agro Products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
                    <div className="w-12 h-8 bg-primary-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">SA</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Saudi Arabia
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Strong Basmati & Spices Demand
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
                    <div className="w-12 h-8 bg-primary-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">QA</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Qatar</h4>
                      <p className="text-gray-600 text-sm">
                        Luxury Food Segment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
                    <div className="w-12 h-8 bg-primary-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">KW</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Kuwait</h4>
                      <p className="text-gray-600 text-sm">
                        Traditional Indian Staples
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/globalfoods.jpg"
                  alt="TRUSTGLOBE EXPORTS Global Trade Network - Premium Products Export to International Markets"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-primary-600/20 rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Strategic Trade Route
                    </h4>
                    <p className="text-gray-600 text-sm">
                      India → Middle East → Europe
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability & Ethics */}
        <section className="py-20 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Sustainability & Ethics
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Committed to ethical sourcing, sustainable practices, and
                supporting farming communities for a better tomorrow.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {sustainabilityStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-700 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="text-center">
              <div className="inline-flex items-center space-x-8 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">
                    100% Ethical Sourcing
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">
                    Zero Harmful Chemicals
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">
                    Fair Trade Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Explore Global Trade Opportunities?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join hands with India's trusted export partner and take your
              business to new international heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                Request a Quote
              </Link>
              <Link
                to="/partnerships"
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold text-lg"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full mx-2 sm:mx-0 p-4 sm:p-6 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Request Quote
              </h3>
              <button
                onClick={() => {
                  setShowQuoteForm(false);
                  setQuoteErrors({});
                  setQuoteSubmitError("");
                  setQuoteSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {quoteSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Quote Request Submitted!
                </h4>
                <p className="text-gray-600">
                  Thank you for your interest. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleQuoteSubmit}
                className="space-y-3 sm:space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={quoteFormData.name}
                    onChange={handleQuoteInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                      quoteErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {quoteErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={quoteFormData.email}
                    onChange={handleQuoteInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                      quoteErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {quoteErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={quoteFormData.phone}
                    onChange={handleQuoteInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                      quoteErrors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {quoteErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={quoteFormData.company}
                    onChange={handleQuoteInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                      quoteErrors.company ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your company name"
                  />
                  {quoteErrors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product *
                  </label>
                  <input
                    type="text"
                    name="product"
                    value={quoteFormData.product}
                    onChange={handleQuoteInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                      quoteErrors.product ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Product name"
                    readOnly
                  />
                  {quoteErrors.product && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.product}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={quoteFormData.quantity}
                    onChange={handleQuoteInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                      quoteErrors.quantity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="e.g., 1000 kg, 50 tons"
                  />
                  {quoteErrors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {quoteErrors.quantity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Requirements
                  </label>
                  <textarea
                    name="requirements"
                    value={quoteFormData.requirements}
                    onChange={handleQuoteInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    placeholder="Any specific requirements or questions..."
                  />
                </div>

                {quoteSubmitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{quoteSubmitError}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuoteForm(false);
                      setQuoteErrors({});
                      setQuoteSubmitError("");
                      setQuoteSuccess(false);
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingQuote}
                    className="flex-1 bg-primary-600 text-white py-2 sm:py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmittingQuote ? "Submitting..." : "Submit Quote"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
