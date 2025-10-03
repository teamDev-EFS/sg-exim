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
} from "lucide-react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

interface BrandLandingProps {
  brandVariant: string;
  title: string;
  description: string;
  keywords: string;
  url: string;
}

const BrandLanding = ({
  brandVariant,
  title,
  description,
  keywords,
  url,
}: BrandLandingProps) => {
  const achievements = [
    { label: "Countries Served", value: 15, suffix: "+", icon: Globe },
    { label: "Years Experience", value: 25, suffix: "+", icon: Award },
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
        title={title}
        description={description}
        keywords={keywords}
        url={url}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: brandVariant,
          alternateName: [
            "The 11 Exim Overseas",
            "11 Exim Overseas",
            "Exim Overseas India",
          ],
          url: "https://the11eximoverseas.com",
          logo: "https://the11eximoverseas.com/images/11eximoverseas-logo.png",
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
                  {brandVariant} – India's Global Agro Export Leader
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 text-white/90 leading-relaxed max-w-4xl mx-auto text-balance"
                >
                  {brandVariant} (also known as The 11 Exim Overseas) is a
                  leading agro-export company from India, connecting premium
                  agricultural products to global markets with excellence,
                  sustainability, and trust.
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
                    <span>Explore Products</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/partnerships"
                    className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary-900 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Partner With Us
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="section-padding gradient-bg relative overflow-hidden">
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
                  Why Choose {brandVariant}?
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed text-balance">
                  We combine decades of experience with cutting-edge technology
                  to deliver exceptional agricultural products to global
                  markets.
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
                Featured Products by {brandVariant}
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
                      alt={`${product.name} by ${brandVariant}`}
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
              Ready to Partner with {brandVariant}?
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
    </>
  );
};

export default BrandLanding;
