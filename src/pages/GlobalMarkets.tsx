import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Globe,
  Package,
  ArrowRight,
  Star,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../services/api";
import SEO from "../components/SEO";

const GlobalMarkets = () => {
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

  const regions = [
    {
      id: "middle-east",
      name: "Middle East",
      flag: "🇦🇪",
      countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain"],
      description: "Premium agricultural products for luxury food markets",
      marketSize: "$2.5B",
      growth: "+12%",
      products: ["Rice", "Spices", "Jaggery", "Premium Vegetables"],
    },
    {
      id: "europe",
      name: "Europe",
      flag: "🇪🇺",
      countries: ["Germany", "Netherlands", "UK", "France", "Italy"],
      description:
        "Organic and sustainable products for health-conscious consumers",
      marketSize: "$4.2B",
      growth: "+8%",
      products: ["Organic Rice", "Natural Sweeteners", "Premium Spices"],
    },
    {
      id: "asia-pacific",
      name: "Asia Pacific",
      flag: "🌏",
      countries: ["Singapore", "Malaysia", "Japan", "Australia", "New Zealand"],
      description: "Diverse product range for growing Asian markets",
      marketSize: "$3.8B",
      growth: "+15%",
      products: ["Traditional Rice", "Spices", "Lifestyle Products"],
    },
    {
      id: "africa",
      name: "Africa",
      flag: "🌍",
      countries: ["South Africa", "Nigeria", "Kenya", "Egypt", "Morocco"],
      description: "Essential food products for growing populations",
      marketSize: "$1.9B",
      growth: "+18%",
      products: ["Staple Rice", "Basic Spices", "Essential Vegetables"],
    },
  ];

  const validateQuoteForm = () => {
    const newErrors: Record<string, string> = {};

    if (!quoteFormData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!quoteFormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(quoteFormData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!quoteFormData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (quoteFormData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    if (!quoteFormData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!quoteFormData.product.trim()) {
      newErrors.product = "Product is required";
    }

    if (!quoteFormData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
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
      console.error("Error submitting quote:", error);
      setQuoteSubmitError(
        "Network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  const keyMarkets = [
    {
      country: "United Arab Emirates",
      code: "UAE",
      description: "Rice, Jaggery, Premium Agro Products",
      marketShare: "25%",
      growth: "+15%",
      products: ["Basmati Rice", "Natural Jaggery", "Premium Spices"],
      image: "/src/assets/images/Middle-East-Map.jpg",
    },
    {
      country: "Saudi Arabia",
      code: "SA",
      description: "Strong Basmati & Spices Demand",
      marketShare: "20%",
      growth: "+12%",
      products: ["Premium Rice", "Traditional Spices", "Natural Sweeteners"],
      image: "/src/assets/images/Middle-East-Map.jpg",
    },
    {
      country: "Qatar",
      code: "QA",
      description: "Luxury Food Segment",
      marketShare: "15%",
      growth: "+18%",
      products: ["Premium Rice", "Organic Products", "Luxury Spices"],
      image: "/src/assets/images/Middle-East-Map.jpg",
    },
    {
      country: "Kuwait",
      code: "KW",
      description: "Traditional Indian Staples",
      marketShare: "12%",
      growth: "+10%",
      products: ["Traditional Rice", "Authentic Spices", "Cultural Foods"],
      image: "/src/assets/images/Middle-East-Map.jpg",
    },
  ];

  const tradeRoutes = [
    {
      from: "India",
      to: "Middle East",
      duration: "7-10 days",
      volume: "500+ containers/month",
      products: ["Rice", "Spices", "Jaggery"],
    },
    {
      from: "Middle East",
      to: "Europe",
      duration: "12-15 days",
      volume: "200+ containers/month",
      products: ["Premium Rice", "Organic Spices"],
    },
    {
      from: "India",
      to: "Asia Pacific",
      duration: "10-14 days",
      volume: "300+ containers/month",
      products: ["Traditional Rice", "Lifestyle Products"],
    },
  ];

  const stats = [
    { label: "Countries Served", value: "25+", icon: Globe },
    { label: "Years Experience", value: "15+", icon: TrendingUp },
    { label: "Monthly Shipments", value: "1000+", icon: Package },
    { label: "Client Satisfaction", value: "98%", icon: Star },
  ];

  return (
    <>
      <SEO
        title="Global Market Presence of TrustGlobe Exports | International Trade & Export Markets"
        description="Explore TrustGlobe Exports' global market presence across Middle East, Europe, and Asia. Leading export company with strategic partnerships and international trade excellence across diverse product categories."
        keywords="TrustGlobe Exports, global market presence, international trade, export markets, Middle East exports, Europe exports, bamboo products, jute bags, onion products, garlic products, global trade partnerships"
        url="https://trustglobeexports.com/global-markets"
      />
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-accent-600/5"></div>
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-gradient mb-8 text-balance">
                Global Market Presence of TRUSTGLOBE EXPORTS
              </h1>
              <p className="text-xl text-neutral-600 mb-12 leading-relaxed text-balance">
                Serving premium agricultural products to key international
                markets across the Middle East, Europe, and Asia Pacific with
                excellence and reliability.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white/80 backdrop-blur-sm border-b border-neutral-200/50">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 premium-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-glow">
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-3">
                    {stat.value}
                  </div>
                  <div className="text-neutral-700 font-semibold text-lg">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Markets Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                Key Markets
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Our strategic presence in major international markets ensures
                reliable supply and exceptional service.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {keyMarkets.map((market, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-premium p-8 hover:scale-105 transition-all duration-500 group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {market.code}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {market.country}
                      </h3>
                      <p className="text-neutral-600 mb-4 leading-relaxed">
                        {market.description}
                      </p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-sm">
                          <span className="text-neutral-500">
                            Market Share:{" "}
                          </span>
                          <span className="font-semibold text-primary-600">
                            {market.marketShare}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-neutral-500">Growth: </span>
                          <span className="font-semibold text-success-600">
                            {market.growth}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {market.products.map((product, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Markets */}
        <section className="py-20 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                Regional Markets
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Explore our presence across different regions and understand
                market dynamics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {regions.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-premium p-6 hover:scale-105 transition-all duration-500 group cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{region.flag}</div>
                    <h3 className="text-xl font-display font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {region.name}
                    </h3>
                    <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
                      {region.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">Market Size:</span>
                        <span className="font-semibold text-primary-600">
                          {region.marketSize}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-500">Growth:</span>
                        <span className="font-semibold text-success-600">
                          {region.growth}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {region.countries.join(", ")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Trade Routes */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                  Strategic Trade Routes
                </h2>
                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  Our optimized logistics network ensures efficient delivery
                  across global markets with real-time tracking and monitoring.
                </p>
                <div className="space-y-4">
                  {tradeRoutes.map((route, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <ArrowRight className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900">
                          {route.from} → {route.to}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {route.duration} • {route.volume}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-hard">
                  {/* Static Map Placeholder */}
                  <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Global Trade Network
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Connecting India with Middle East, Europe & Asia-Pacific
                      </p>
                      <div className="flex justify-center space-x-4">
                        <a
                          href="https://maps.google.com/?q=25.2048,55.2708"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          View Global Map
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
                      <h3 className="text-xl font-display font-bold text-neutral-900 mb-2">
                        Global Logistics Network
                      </h3>
                      <p className="text-neutral-600">
                        India → Middle East → Europe
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/90 to-accent-600/90"></div>
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6 text-balance">
                Ready to Explore Global Trade Opportunities?
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed text-balance">
                Join hands with India's trusted export partner and take your
                business to new international heights.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="btn-secondary text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary-900"
                >
                  Request a Quote
                </button>
                <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                  Contact Our Team
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quote Form Modal */}
        {showQuoteForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Request a Quote
                  </h3>
                  <button
                    onClick={() => setShowQuoteForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </div>

              <form onSubmit={handleQuoteSubmit} className="p-6 space-y-6">
                {quoteSubmitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-800 font-medium">Error</h4>
                      <p className="text-red-700 text-sm mt-1">
                        {quoteSubmitError}
                      </p>
                    </div>
                  </div>
                )}

                {quoteSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-green-800 font-medium">Success!</h4>
                      <p className="text-green-700 text-sm mt-1">
                        Your quote request has been submitted successfully.
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={quoteFormData.name}
                      onChange={handleQuoteInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        quoteErrors.name ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {quoteErrors.name && (
                      <p className="text-red-600 text-sm mt-1">
                        {quoteErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={quoteFormData.email}
                      onChange={handleQuoteInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        quoteErrors.email ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {quoteErrors.email && (
                      <p className="text-red-600 text-sm mt-1">
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        quoteErrors.phone ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {quoteErrors.phone && (
                      <p className="text-red-600 text-sm mt-1">
                        {quoteErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={quoteFormData.company}
                      onChange={handleQuoteInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        quoteErrors.company
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your company name"
                    />
                    {quoteErrors.company && (
                      <p className="text-red-600 text-sm mt-1">
                        {quoteErrors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product of Interest *
                    </label>
                    <select
                      name="product"
                      value={quoteFormData.product}
                      onChange={handleQuoteInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        quoteErrors.product
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a product</option>
                      <option value="Rice">Rice</option>
                      <option value="Spices">Spices</option>
                      <option value="Jaggery">Jaggery</option>
                      <option value="Makhana">Makhana</option>
                      <option value="Onion & Garlic">Onion & Garlic</option>
                      <option value="Scented Candles">Scented Candles</option>
                      <option value="Other">Other</option>
                    </select>
                    {quoteErrors.product && (
                      <p className="text-red-600 text-sm mt-1">
                        {quoteErrors.product}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={quoteFormData.quantity}
                      onChange={handleQuoteInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        quoteErrors.quantity
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="e.g., 1000 kg, 50 tons"
                    />
                    {quoteErrors.quantity && (
                      <p className="text-red-600 text-sm mt-1">
                        {quoteErrors.quantity}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    name="requirements"
                    value={quoteFormData.requirements}
                    onChange={handleQuoteInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Tell us about your specific requirements, packaging preferences, delivery timeline, etc."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
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

export default GlobalMarkets;
