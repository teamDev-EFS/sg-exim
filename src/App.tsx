import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import GlobalMarkets from "./pages/GlobalMarkets";
import Partnerships from "./pages/Partnerships";
import Team from "./pages/Team";
import Documents from "./pages/Documents";
import Contact from "./pages/Contact";
import BrandLanding from "./pages/BrandLanding";
import EximIndia from "./pages/EximIndia";
import ScrollToTop from "./components/ScrollToTop";
import FloatingScrollToTop from "./components/FloatingScrollToTop";
import PerformanceOptimizer from "./components/PerformanceOptimizer";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen gradient-bg relative overflow-hidden">
          {/* Premium Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl animate-float"></div>
            <div
              className="absolute top-1/2 -left-40 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-300/20 rounded-full blur-2xl animate-float"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          <ScrollToTop />
          <PerformanceOptimizer />
          <Header />
          <main className="flex-grow relative z-10 pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/global-markets" element={<GlobalMarkets />} />
              <Route path="/partnerships" element={<Partnerships />} />
              <Route path="/team" element={<Team />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/contact" element={<Contact />} />

              {/* Brand Landing Pages */}
              <Route
                path="/trustglobe-exports"
                element={
                  <BrandLanding
                    brandVariant="TrustGlobe Exports"
                    title="TrustGlobe Exports | India's Premier Export Company | Bamboo Products & Agricultural Exports"
                    description="TrustGlobe Exports is India's leading export company, connecting premium bamboo products, jute bags, onion & garlic products, soyabean, and more to global markets with excellence, sustainability, and trust."
                    keywords="TrustGlobe Exports, export company India, bamboo products, jute bags, onion products, garlic products, soyabean, global trade"
                    url="https://trustglobeexports.com/trustglobe-exports"
                  />
                }
              />

              {/* SEO Landing Pages */}
              <Route path="/what-is-exim-in-india" element={<EximIndia />} />
            </Routes>
          </main>
          <Footer />
          <FloatingScrollToTop />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
