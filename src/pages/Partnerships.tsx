import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

const Partnerships = () => {
  const [selectedPartnership, setSelectedPartnership] =
    useState("distributors");

  const partnershipTypes = [
    {
      id: "distributors",
      title: "Distributors",
      description:
        "Expand your product range with our premium agricultural portfolio",
      icon: Users,
      benefits: [
        "Exclusive regional distribution rights",
        "Competitive pricing and margins",
        "Marketing support and materials",
        "Regular product training",
        "Dedicated account management",
      ],
    },
    {
      id: "importers",
      title: "Importers",
      description: "Reliable supply chain partner for your import business",
      icon: Globe,
      benefits: [
        "Consistent product quality",
        "Flexible payment terms",
        "Custom packaging solutions",
        "Regulatory compliance support",
        "Real-time order tracking",
      ],
    },
    {
      id: "retailers",
      title: "Retailers",
      description: "Premium products for your retail outlets and online stores",
      icon: Award,
      benefits: [
        "Wholesale pricing advantages",
        "Brand marketing support",
        "Product display materials",
        "Staff training programs",
        "Cooperative advertising",
      ],
    },
  ];

  const successStories = [
    {
      company: "Global Food Distributors",
      location: "Dubai, UAE",
      partnership: "5+ years",
      growth: "+250%",
      testimonial:
        "The11EximOverSeas has been our trusted partner for premium rice and spices. Their quality and reliability are unmatched.",
      image: "/images/globalfoods.jpg",
    },
    {
      company: "European Import Co.",
      location: "Amsterdam, Netherlands",
      partnership: "3+ years",
      growth: "+180%",
      testimonial:
        "Excellent product quality and on-time delivery. They've helped us establish a strong presence in the European market.",
      image: "/images/asia-pacific.png",
    },
    {
      company: "Asia Pacific Foods",
      location: "Singapore",
      partnership: "7+ years",
      growth: "+320%",
      testimonial:
        "Their commitment to quality and sustainability aligns perfectly with our brand values. Highly recommended partner.",
      image: "/images/Middle-East-Map.jpg",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "ISO certified products with rigorous quality control processes",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description:
        "Reliable logistics network ensuring on-time delivery worldwide",
    },
    {
      icon: TrendingUp,
      title: "Growth Support",
      description: "Marketing support and business development assistance",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "24/7 customer support and dedicated account management",
    },
  ];

  const requirements = [
    {
      category: "Business Requirements",
      items: [
        "Valid business license and registration",
        "Minimum 2 years in food/agriculture business",
        "Established distribution network",
        "Financial stability and creditworthiness",
      ],
    },
    {
      category: "Operational Requirements",
      items: [
        "Warehouse and storage facilities",
        "Cold storage for perishable products",
        "Quality control processes",
        "Compliance with local regulations",
      ],
    },
    {
      category: "Market Requirements",
      items: [
        "Target market analysis",
        "Marketing and promotion capabilities",
        "Customer base in target region",
        "Competitive pricing strategy",
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Partnerships & Business Opportunities | TrustGlobe Exports | Global Trade Partners"
        description="Join TrustGlobe Exports as a distributor, importer, or retailer. Explore exclusive partnership opportunities with India's leading export company for global market expansion across diverse product categories."
        keywords="TrustGlobe Exports, partnerships, business opportunities, distributors, importers, retailers, global trade partners, export partnerships, bamboo products, jute bags, onion products, garlic products"
        url="https://trustglobeexports.com/partnerships"
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
                Partnership Opportunities with TrustGlobe Exports
              </h1>
              <p className="text-xl text-neutral-600 mb-12 leading-relaxed text-balance">
                Join our global network of trusted partners and grow your
                business with premium agricultural products. Together, we can
                achieve mutual success in international markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="btn-primary text-lg px-8 py-4">
                  Become a Partner
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  Download Brochure
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                Partnership Types
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Choose the partnership model that best fits your business needs
                and growth objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {partnershipTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`card-premium p-8 hover:scale-105 transition-all duration-500 cursor-pointer ${
                    selectedPartnership === type.id
                      ? "ring-2 ring-primary-500"
                      : ""
                  }`}
                  onClick={() => setSelectedPartnership(type.id)}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <type.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-neutral-900 mb-3">
                      {type.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {type.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {type.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                        <span className="text-neutral-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                Why Partner With Us?
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                We provide comprehensive support to help our partners succeed in
                competitive global markets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 premium-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-glow">
                    <benefit.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Hear from our partners about their journey and success with
                The11EximOverSeas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card-premium p-8 hover:scale-105 transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-neutral-900">
                        {story.company}
                      </h3>
                      <p className="text-neutral-600">{story.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-sm">
                      <span className="text-neutral-500">Partnership: </span>
                      <span className="font-semibold text-primary-600">
                        {story.partnership}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-neutral-500">Growth: </span>
                      <span className="font-semibold text-success-600">
                        {story.growth}
                      </span>
                    </div>
                  </div>

                  <blockquote className="text-neutral-700 italic leading-relaxed">
                    "{story.testimonial}"
                  </blockquote>

                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-20 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                Partnership Requirements
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                To ensure mutual success, we look for partners who meet our
                quality and business standards.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {requirements.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card-premium p-8"
                >
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-6">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                How to Apply
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Follow these simple steps to start your partnership journey with
                us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Submit Application",
                  description:
                    "Fill out our partnership application form with your business details",
                },
                {
                  step: "02",
                  title: "Initial Review",
                  description:
                    "Our team reviews your application and business credentials",
                },
                {
                  step: "03",
                  title: "Business Meeting",
                  description:
                    "Schedule a meeting to discuss partnership terms and conditions",
                },
                {
                  step: "04",
                  title: "Partnership Agreement",
                  description:
                    "Sign the agreement and start your successful partnership journey",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-glow">
                    <span className="text-white font-bold text-xl">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {step.description}
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
                Ready to Start Your Partnership Journey?
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed text-balance">
                Join our network of successful partners and grow your business
                with premium agricultural products.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="btn-secondary text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary-900"
                >
                  Apply Now
                </Link>
                <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Partnerships;
