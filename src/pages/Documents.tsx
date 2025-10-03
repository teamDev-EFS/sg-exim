import { useState } from "react";
import {
  Eye,
  FileText,
  Shield,
  Award,
  CheckCircle,
  Search,
  Calendar,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import DraggableModal from "../components/DraggableModal";
import "../styles/pdf-viewer.css";
import SEO from "../components/SEO";

interface Document {
  id: number;
  title: string;
  category: string;
  type: string;
  size: string;
  date: string;
  description: string;
  filePath: string;
  icon: React.ComponentType<any>;
  tags: string[];
}

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const documentCategories = [
    { id: "all", name: "All Documents", count: 3 },
    { id: "certifications", name: "Certifications", count: 2 },
    { id: "licenses", name: "Licenses", count: 1 },
  ];

  const documents = [
    {
      id: 1,
      title: "TrustGlobe Exports Certificate",
      category: "certifications",
      type: "PDF",
      size: "2.4 MB",
      date: "2024-01-15",
      description:
        "Official TrustGlobe Exports certificate for international trade operations and business registration",
      filePath: "/documents/TRUST GLOBE EXPORTS.pdf",
      icon: Award,
      tags: ["Export", "TrustGlobe", "International Trade"],
    },
    {
      id: 2,
      title: "Udyam Certificate - Shivam Singh Panwar",
      category: "certifications",
      type: "PDF",
      size: "1.8 MB",
      date: "2024-01-20",
      description:
        "Udyam Registration Certificate for micro, small and medium enterprises (MSME) registration",
      filePath:
        "/documents/Print _ Udyam CERTIFICATE UPDATED SHIVAM SINGH PANWAR.pdf",
      icon: Globe,
      tags: ["Udyam", "MSME", "Registration"],
    },
    {
      id: 3,
      title: "Business License - TrustGlobe Exports",
      category: "licenses",
      type: "PDF",
      size: "3.2 MB",
      date: "2024-02-10",
      description:
        "Official business license for TrustGlobe Exports operations and international trade",
      filePath: "/documents/TRUST GLOBE EXPORTS.pdf",
      icon: Shield,
      tags: ["Business", "License", "Trade"],
    },
  ];

  const years = ["all", "2024", "2023", "2022", "2021"];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    const matchesYear =
      selectedYear === "all" || doc.date.startsWith(selectedYear);
    return matchesSearch && matchesCategory && matchesYear;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "certifications":
        return Award;
      case "licenses":
        return Globe;
      case "reports":
        return FileText;
      case "policies":
        return FileText;
      case "compliance":
        return Shield;
      default:
        return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "certifications":
        return "bg-yellow-100 text-yellow-700";
      case "licenses":
        return "bg-blue-100 text-blue-700";
      case "reports":
        return "bg-primary-100 text-primary-700";
      case "policies":
        return "bg-purple-100 text-purple-700";
      case "compliance":
        return "bg-red-100 text-red-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  return (
    <>
      <SEO
        title="Certifications & Documents | TrustGlobe Exports | Udyam, Business Licenses"
        description="View TrustGlobe Exports' official certifications and documents including Udyam registration, business licenses, and export certificates. Trusted export company with full regulatory compliance and quality assurance across bamboo products, jute bags, and agricultural products."
        keywords="TrustGlobe Exports, certifications, documents, Udyam, MSME, licenses, quality certificates, export certificates, India export compliance, bamboo products, jute bags, agricultural products"
        url="https://trustglobeexports.com/documents"
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
                Certifications & Documents - TrustGlobe Exports
              </h1>
              <p className="text-xl text-neutral-600 mb-12 leading-relaxed text-balance">
                Access our official certifications, licenses, and business
                documents. All documents are available for secure preview and
                verification.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-12 bg-white/80 backdrop-blur-sm border-b border-neutral-200/50">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 shadow-soft"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {documentCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-primary-600 text-white shadow-glow"
                        : "bg-white text-neutral-700 hover:bg-primary-50 border border-neutral-200"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === "all" ? "All Years" : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDocuments.map((document, index) => {
                const Icon = getCategoryIcon(document.category);
                return (
                  <motion.div
                    key={document.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card-premium p-6 hover:scale-105 transition-all duration-500 group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-display font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {document.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                              document.category
                            )}`}
                          >
                            {document.category}
                          </span>
                          <span className="text-xs text-neutral-500">
                            {document.type}
                          </span>
                          <span className="text-xs text-neutral-500">
                            {document.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {document.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {document.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(document.date).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedDocument(document)}
                        className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Preview
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredDocuments.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <FileText className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-600 mb-2">
                  No documents found
                </h3>
                <p className="text-neutral-500">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Document Verification */}
        <section className="py-20 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
                Document Verification
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                All our documents are authentic and can be verified through
                official channels. Contact us for any verification requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Authentic Documents",
                  description:
                    "All certificates and licenses are issued by authorized bodies and can be verified online.",
                },
                {
                  icon: CheckCircle,
                  title: "Regular Updates",
                  description:
                    "Documents are regularly updated and renewed to maintain compliance with current standards.",
                },
                {
                  icon: Globe,
                  title: "International Standards",
                  description:
                    "Our certifications meet international standards and are recognized globally.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-glow">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
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
                Need Document Verification?
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed text-balance">
                Contact our compliance team for any document verification
                requirements or additional information.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="btn-secondary text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary-900">
                  Request Verification
                </button>
                <button className="btn-primary text-lg px-8 py-4">
                  Contact Compliance Team
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Draggable PDF Preview Modal */}
        <DraggableModal
          isOpen={!!selectedDocument}
          onClose={() => setSelectedDocument(null)}
          title={selectedDocument?.title || ""}
          documentUrl={selectedDocument?.filePath || ""}
          type={selectedDocument?.type || "PDF"}
          size={selectedDocument?.size || "2.4 MB"}
        />
      </div>
    </>
  );
};

export default Documents;
