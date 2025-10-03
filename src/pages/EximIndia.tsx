import { useState } from "react";
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
  Package,
  Truck,
  FileText,
  Building,
} from "lucide-react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

const EximIndia = () => {
  const achievements = [
    { label: "Countries Served", value: 15, suffix: "+", icon: Globe },
    { label: "Years Experience", value: 25, suffix: "+", icon: Award },
    { label: "Happy Clients", value: 100, suffix: "+", icon: Users },
    { label: "Success Rate", value: 95, suffix: "%", icon: TrendingUp },
  ];

  const eximBenefits = [
    {
      icon: Building,
      title: "Economic Growth",
      description:
        "EXIM trade contributes significantly to India's GDP and economic development.",
      features: [
        "Foreign Exchange Earnings",
        "Job Creation",
        "Industrial Growth",
      ],
    },
    {
      icon: Globe,
      title: "Global Market Access",
      description:
        "EXIM enables Indian businesses to access international markets and customers.",
      features: [
        "Market Diversification",
        "Brand Recognition",
        "Competitive Advantage",
      ],
    },
    {
      icon: TrendingUp,
      title: "Technology Transfer",
      description:
        "Import of advanced technology and equipment enhances domestic capabilities.",
      features: ["Modern Equipment", "Best Practices", "Innovation"],
    },
  ];

  const featuredProducts = [
    {
      name: "Premium Basmati Rice ST24/ST25",
      category: "Rice",
      image: "/images/jasmine-rice.jpg",
      description:
        "Export quality premium basmati rice varieties with superior taste and distinctive aroma",
      certifications: ["APEDA", "FSSAI", "ISO"],
      href: "/products?category=rice",
    },
    {
      name: "Natural Jaggery Blocks",
      category: "Sweeteners",
      image: "/images/pure-jaggery.jpg",
      description: "Pure, chemical-free jaggery in small and large blocks",
      certifications: ["Organic", "FSSAI", "Natural"],
      href: "/products?product=jaggery",
    },
    {
      name: "Premium Spices Collection",
      category: "Spices",
      image: "/images/premium_spices.jpg",
      description: "Cumin, Fenugreek, and authentic Indian spices",
      certifications: ["Pure", "FSSAI", "Traditional"],
      href: "/products?category=spices",
    },
  ];

  return (
    <>
      <SEO
        title="What is EXIM in India? | The 11 Exim Overseas | Export Import Trade Guide"
        description="Learn what EXIM (Export-Import) means in India with The 11 Exim Overseas. Comprehensive guide to India's export-import trade, regulations, benefits, and opportunities for global business growth."
        keywords="what is EXIM in India, EXIM trade India, export import India, India EXIM policy, EXIM benefits, export import regulations, India trade, global business, The 11 Exim Overseas"
        url="https://the11eximoverseas.com/what-is-exim-in-india"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What is EXIM in India? | The 11 Exim Overseas",
          description:
            "Learn what EXIM (Export-Import) means in India with The 11 Exim Overseas. Comprehensive guide to India's export-import trade, regulations, benefits, and opportunities.",
          author: {
            "@type": "Organization",
            name: "The 11 Exim Overseas",
          },
          publisher: {
            "@type": "Organization",
            name: "The 11 Exim Overseas",
            logo: {
              "@type": "ImageObject",
              url: "https://the11eximoverseas.com/images/11eximoverseas-logo.png",
            },
          },
          datePublished: "2024-01-15",
          dateModified: "2024-01-15",
        }}
      />
      <div className="relative">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url('/images/globalfoods.jpg')` }}
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
                  What is EXIM in India? | The 11 Exim Overseas Guide
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 text-white/90 leading-relaxed max-w-4xl mx-auto text-balance"
                >
                  EXIM (Export-Import) trade is the backbone of India's economic
                  growth. Learn how The 11 Exim Overseas leads India's
                  agro-export sector with 25+ years of excellence.
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
                    <span>Explore Our Products</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/contact"
                    className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary-900 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Get Expert Consultation
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What is EXIM Section */}
        <section className="section-padding bg-white relative">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl lg:text-6xl font-display font-bold text-gradient mb-8 text-balance">
                  Understanding EXIM Trade in India
                </h2>
                <p className="text-xl text-neutral-600 leading-relaxed text-balance">
                  EXIM (Export-Import) trade refers to the international
                  exchange of goods and services between India and other
                  countries. It's a crucial component of India's economic
                  strategy.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-bold text-neutral-900 mb-6">
                    What is Export (EX)?
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Export refers to selling goods and services produced in
                    India to foreign countries. This includes:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-neutral-700">
                        Agricultural products like rice, spices, jaggery
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-neutral-700">
                        Manufactured goods and textiles
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-neutral-700">
                        Services like IT, consulting, and tourism
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-neutral-700">
                        Raw materials and commodities
                      </span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-bold text-neutral-900 mb-6">
                    What is Import (IM)?
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Import refers to buying goods and services from foreign
                    countries for use in India. This includes:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-neutral-700">
                        Technology and machinery
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-neutral-700">
                        Raw materials not available domestically
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-neutral-700">
                        Consumer goods and electronics
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                      <span className="text-neutral-700">
                        Energy resources like oil and gas
                      </span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits of EXIM Section */}
        <section className="section-padding bg-gray-50 relative">
          <div className="container-custom">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-4xl lg:text-6xl font-display font-bold text-gradient mb-8 text-balance">
                  Benefits of EXIM Trade for India
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed text-balance">
                  EXIM trade brings numerous advantages to India's economy and
                  businesses.
                </p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {eximBenefits.map((item, index) => {
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

        {/* The 11 Exim Overseas Excellence */}
        <section className="section-padding bg-white relative">
          <div className="container-custom">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-4xl lg:text-6xl font-display font-bold text-gradient mb-8 text-balance">
                  The 11 Exim Overseas: Leading India's EXIM Trade
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed text-balance">
                  With 25+ years of experience, The 11 Exim Overseas has been at
                  the forefront of India's agricultural export sector.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
                      {achievement.value}
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

            <div className="bg-primary-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-6">
                    Our EXIM Success Story
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                    The 11 Exim Overseas has successfully exported premium
                    agricultural products to 15+ countries, establishing India
                    as a reliable supplier of quality agro-products in global
                    markets.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        FSSAI, APEDA, and ISO certified operations
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        Strategic partnerships with global importers
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0" />
                      <span className="text-neutral-700">
                        Sustainable and ethical sourcing practices
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <img
                    src="/images/globalfoods.jpg"
                    alt="The 11 Exim Overseas Global Trade"
                    className="w-full h-96 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-primary-600/20 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Premium Export Products
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover the range of agricultural products that The 11 Exim
                Overseas exports to global markets.
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
                      alt={`${product.name} export by The 11 Exim Overseas`}
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
                    <Link
                      to={product.href}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center font-medium inline-block"
                    >
                      View Details
                    </Link>
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

        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your EXIM Journey?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Partner with The 11 Exim Overseas and leverage our expertise in
              India's EXIM trade for your business success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
              >
                Get Expert Consultation
              </Link>
              <Link
                to="/partnerships"
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold text-lg"
              >
                Explore Partnerships
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EximIndia;
