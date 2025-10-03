import {
  Linkedin as LinkedinIcon,
  Mail,
  Award,
  Users,
  Target,
  Heart,
  Star,
  Instagram,
  Facebook,
  Youtube,
  X,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SEO from "../components/SEO";

const Team = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    subject: "Team Contact Inquiry",
    inquiryType: "General",
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>(
    {}
  );
  const [contactSubmitError, setContactSubmitError] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const teamMembers = [
    {
      name: "Deepanshu Patel",
      position: "Founder & Director",
      image: "/images/Deepanshu Patel.png",
      bio: "Visionary leader with extensive experience in international trade and export operations. Passionate about connecting India's finest bamboo products, jute bags, and agricultural products to global markets and building sustainable business relationships.",
      experience: "15+ years",
      expertise: [
        "International Trade",
        "Export Operations",
        "Business Development",
        "Bamboo Products",
        "Agricultural Exports",
        "Supply Chain Management",
      ],
      linkedin: "https://www.linkedin.com/in/deepanshu-patel-trustglobe",
      instagram: "https://www.instagram.com/trustglobeexports",
      youtube: "https://www.youtube.com/@TrustGlobeExports",
      facebook: "https://www.facebook.com/trustglobeexports",
      twitter: "https://www.twitter.com/trustglobeexports",
      email: "deepanshu@trustglobeexports.com",
      achievements: [
        "Established global trade network for bamboo products",
        "Led successful export operations across multiple product categories",
        "Industry leadership recognition in sustainable exports",
        "Built strong supplier relationships",
        "Expanded market reach to 20+ countries",
      ],
    },
    {
      name: "Shivam Singh Panwar",
      position: "Co-Founder & Operations Director",
      image: "/images/Shivam Singh Panwar.png",
      bio: "Operations expert with deep knowledge in agricultural products, onion & garlic processing, and quality control. Committed to maintaining the highest standards in product quality and customer satisfaction across all export operations.",
      experience: "12+ years",
      expertise: [
        "Agricultural Exports",
        "Quality Control",
        "Operations Management",
        "Onion & Garlic Processing",
        "Product Development",
        "Customer Relations",
      ],
      linkedin: "https://www.linkedin.com/in/shivam-singh-panwar-trustglobe",
      instagram: "https://www.instagram.com/trustglobeexports",
      youtube: "https://www.youtube.com/@TrustGlobeExports",
      facebook: "https://www.facebook.com/trustglobeexports",
      twitter: "https://www.twitter.com/trustglobeexports",
      email: "shivam@trustglobeexports.com",
      achievements: [
        "Developed quality control systems for agricultural products",
        "Led operations for onion and garlic processing",
        "Established strong customer relationships",
        "Implemented sustainable farming partnerships",
        "Achieved 99% customer satisfaction rate",
      ],
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our business, from product quality to customer service.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description:
        "We conduct business with honesty, transparency, and ethical practices in all our dealings.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and collaboration to achieve common goals and success.",
    },
    {
      icon: Award,
      title: "Innovation",
      description:
        "We continuously innovate and adapt to meet the evolving needs of global markets.",
    },
  ];

  const stats = [
    { label: "Team Members", value: "2", icon: Users },
    { label: "Years Experience", value: "15+", icon: Award },
    { label: "Countries Served", value: "20+", icon: Target },
    { label: "Client Satisfaction", value: "99%", icon: Star },
  ];

  // Contact form validation
  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};

    if (!contactFormData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!contactFormData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactFormData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!contactFormData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!contactFormData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!contactFormData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Contact form input change handler
  const handleContactInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (contactErrors[name]) {
      setContactErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactErrors({});
    setContactSubmitError("");
    setContactSuccess(false);

    if (!validateContactForm()) {
      return;
    }

    setIsSubmittingContact(true);

    try {
      const response = await api.submitContact(contactFormData);

      if (response.success) {
        setContactSuccess(true);
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setContactFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          subject: "Team Contact Inquiry",
          inquiryType: "General",
        });

        setTimeout(() => {
          setShowContactModal(false);
          setContactSuccess(false);
        }, 3000);
      } else {
        const errorMessage =
          response.error || "Failed to send message. Please try again.";
        setContactSubmitError(errorMessage);
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
      console.error("Contact submission error:", error);
      const errorMessage = "Failed to send message. Please try again.";
      setContactSubmitError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <>
      <SEO
        title="Meet Our Team | TrustGlobe Exports | Leadership & Expertise"
        description="Meet Deepanshu Patel and Shivam Singh Panwar, the leadership team of TrustGlobe Exports. Learn about our experienced leadership driving India's premier export company to global success across bamboo products, jute bags, and agricultural products."
        keywords="TrustGlobe Exports, team, leadership, Deepanshu Patel, Shivam Singh Panwar, export team, India export leadership, bamboo products, jute bags, agricultural products"
        url="https://trustglobeexports.com/team"
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
                Meet Our Team at TrustGlobe Exports
              </h1>
              <p className="text-xl text-neutral-600 mb-12 leading-relaxed text-balance">
                Our experienced leadership brings together decades of expertise
                in international trade, export operations, and global market
                development to deliver exceptional results across bamboo
                products, jute bags, and agricultural products.
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

        {/* Leadership Team */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                Leadership Team
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Meet the visionary leaders who drive our success and shape the
                future of international trade.
              </p>
            </div>

            <div className="grid grid-cols-1 max-w-2xl mx-auto gap-12">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card-premium p-8 hover:scale-105 transition-all duration-500 group"
                >
                  <div className="text-center">
                    <div className="w-40 h-40 rounded-3xl overflow-hidden mx-auto mb-6 shadow-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-semibold text-lg mb-4">
                      {member.position}
                    </p>
                    <p className="text-neutral-600 leading-relaxed mb-6 text-base">
                      {member.bio}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <LinkedinIcon className="h-5 w-5" />
                      </a>
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                        aria-label={`${member.name} Instagram`}
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a
                        href={member.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                        aria-label={`${member.name} YouTube`}
                      >
                        <Youtube className="h-5 w-5" />
                      </a>
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                        aria-label={`${member.name} Facebook`}
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                Our Values
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                The principles that guide our team and shape our company
                culture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-glow">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
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
                Ready to Work With Our Team?
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed text-balance">
                Connect with our experts and discover how we can help grow your
                business in international markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="btn-secondary text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary-900"
                >
                  Contact Our Team
                </button>
                <Link
                  to="/contact"
                  className="btn-primary text-lg px-8 py-4 text-center"
                >
                  Schedule a Meeting
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full mx-2 sm:mx-0 p-4 sm:p-6 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Contact Our Team
                </h3>
                <button
                  onClick={() => {
                    setShowContactModal(false);
                    setContactErrors({});
                    setContactSubmitError("");
                    setContactSuccess(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {contactSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-600">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                        contactErrors.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {contactErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {contactErrors.name}
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
                      value={contactFormData.email}
                      onChange={handleContactInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                        contactErrors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {contactErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {contactErrors.email}
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
                      value={contactFormData.phone}
                      onChange={handleContactInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                        contactErrors.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {contactErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {contactErrors.phone}
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
                      value={contactFormData.company}
                      onChange={handleContactInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                        contactErrors.company
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your company name"
                    />
                    {contactErrors.company && (
                      <p className="text-red-500 text-sm mt-1">
                        {contactErrors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={contactFormData.message}
                      onChange={handleContactInputChange}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 ${
                        contactErrors.message
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Tell us how we can help you..."
                    />
                    {contactErrors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {contactErrors.message}
                      </p>
                    )}
                  </div>

                  {contactSubmitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">
                        {contactSubmitError}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowContactModal(false);
                        setContactErrors({});
                        setContactSubmitError("");
                        setContactSuccess(false);
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingContact}
                      className="flex-1 bg-primary-600 text-white py-2 sm:py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      {isSubmittingContact ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Team;
