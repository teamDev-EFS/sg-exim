import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  X,
  CheckCircle,
} from "lucide-react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
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

  const topProducts = [
    {
      name: "Bamboo Furniture",
      emoji: "🪑",
      href: "/products?category=bamboo",
    },
    {
      name: "Jute Bags",
      emoji: "👜",
      href: "/products?category=jute",
    },
    { name: "Fresh Onion", emoji: "🧅", href: "/products?category=onion" },
    {
      name: "Whole Garlic",
      emoji: "🧄",
      href: "/products?category=garlic",
    },
    {
      name: "Soyabean",
      emoji: "🫘",
      href: "/products?category=soyabean",
    },
    {
      name: "Green Chillies",
      emoji: "🌶️",
      href: "/products?category=chillies",
    },
    {
      name: "Mud Bottles",
      emoji: "🏺",
      href: "/products?category=mud",
    },
    {
      name: "Bamboo Tableware",
      emoji: "🍽️",
      href: "/products?category=bamboo",
    },
    {
      name: "Bamboo Bags",
      emoji: "🎒",
      href: "/products?category=bamboo",
    },
    {
      name: "Pooja Items",
      emoji: "🕉️",
      href: "/products?category=pooja",
    },
  ];

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

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-neutral-900 to-accent-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

      {/* Main Footer */}
      <div className="container-responsive py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center golden-gradient rounded-lg shadow-golden-glow">
                  <span className="text-white font-bold text-xl sm:text-2xl">
                    T
                  </span>
                </div>
              </div>
            </div>
            <p className="text-neutral-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg">
              TrustGlobe Exports - Your trusted partner for premium bamboo
              products, jute bags, onion & garlic products, soyabean, and more.
              Connecting India's finest products to global markets with
              excellence and sustainability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-primary-300">
              Quick Links
            </h4>
            <nav className="space-y-2 sm:space-y-3">
              <Link
                to="/"
                className="block text-gray-300 hover:text-primary-400 transition-colors text-sm sm:text-base"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block text-gray-300 hover:text-primary-400 transition-colors text-sm sm:text-base"
              >
                Products
              </Link>
              <Link
                to="/global-markets"
                className="block text-gray-300 hover:text-primary-400 transition-colors text-sm sm:text-base"
              >
                Global Markets
              </Link>
              <Link
                to="/team"
                className="block text-gray-300 hover:text-primary-400 transition-colors text-sm sm:text-base"
              >
                Our Team
              </Link>
              <Link
                to="/partnerships"
                className="block text-gray-300 hover:text-primary-400 transition-colors text-sm sm:text-base"
              >
                Partnerships
              </Link>
              <Link
                to="/contact"
                className="block text-gray-300 hover:text-primary-400 transition-colors text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Top Products */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-primary-300">
              Top Products
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {topProducts.map((product, index) => (
                <Link
                  key={index}
                  to={product.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors group"
                >
                  <span className="text-xs sm:text-sm">{product.emoji}</span>
                  <span className="text-xs sm:text-sm">{product.name}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-primary-300">
              Contact Information
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    Address 37: Shree Sampada Colony
                    <br />
                    Chota Bangarda, Indore, 452005
                    <br />
                    Madhya Pradesh, India
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400" />
                <a
                  href="tel:+917247211741"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-xs sm:text-sm"
                >
                  +91 7247211741
                </a>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400" />
                <a
                  href="mailto:shivambanna1304@gmail.com"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-xs sm:text-sm"
                >
                  shivambanna1304@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 sm:mt-8">
              <h5 className="font-semibold text-primary-400 mb-3 sm:mb-4 text-sm sm:text-base">
                Follow Us
              </h5>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <a
                  href="https://www.instagram.com/trustglobeexports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/trustglobe-exports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@TrustGlobeExports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label="Follow us on YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/trustglobeexports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 p-4 bg-primary-600/20 rounded-lg border border-primary-600/30">
              <h5 className="font-semibold text-primary-400 mb-2">
                Ready to explore global trade?
              </h5>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setQuoteFormData((prev) => ({
                      ...prev,
                      product: "General Inquiry",
                    }));
                    setShowQuoteForm(true);
                  }}
                  className="text-sm bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors text-center"
                >
                  Request Quote
                </button>
                <Link
                  to="/partnerships"
                  className="text-sm border border-primary-600 text-primary-400 px-4 py-2 rounded hover:bg-primary-600/10 transition-colors text-center"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-responsive py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} TrustGlobe Exports. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              <Link
                to="/privacy"
                className="hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/documents"
                className="hover:text-primary-400 transition-colors"
              >
                Certifications
              </Link>
            </div>
          </div>
        </div>
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
    </footer>
  );
};

export default Footer;
