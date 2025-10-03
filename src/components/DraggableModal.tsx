import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, GripVertical, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DraggableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  documentUrl: string;
  type?: string;
  size?: string;
}

const DraggableModal: React.FC<DraggableModalProps> = ({
  isOpen,
  onClose,
  title,
  documentUrl,
  type = "PDF",
  size = "2.4 MB",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [pdfViewer, setPdfViewer] = useState<"direct" | "google" | "mozilla">(
    "direct"
  );
  const [showPreview, setShowPreview] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Reset position when modal opens
  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 });
      setHasError(false);
      // Reset states
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setPdfViewer(mobile ? "google" : "direct");
      setIframeKey((prev) => prev + 1);

      // Show preview on desktop, actions on mobile
      if (mobile) {
        setShowPreview(false); // Mobile: show action buttons
        setIsLoading(false);
      } else {
        setShowPreview(true); // Desktop: show preview
        setIsLoading(true);
      }
    }
  }, [isOpen]);

  // Handle window resize to re-render iframe
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIframeKey((prev) => prev + 1);

      // Adjust preview/actions based on screen size
      if (mobile && showPreview) {
        setShowPreview(false); // Switch to actions on mobile
        setIsLoading(false);
      } else if (!mobile && !showPreview) {
        setShowPreview(true); // Switch to preview on desktop
        setIsLoading(true);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [showPreview]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only allow dragging from the header area
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
      e.preventDefault();
      setIsDragging(true);
      const rect = modalRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && modalRef.current) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const modalWidth = modalRef.current.offsetWidth;
        const modalHeight = modalRef.current.offsetHeight;

        // Constrain to viewport bounds
        const constrainedX = Math.max(
          0,
          Math.min(newX, viewportWidth - modalWidth)
        );
        const constrainedY = Math.max(
          0,
          Math.min(newY, viewportHeight - modalHeight)
        );

        setPosition({ x: constrainedX, y: constrainedY });
      }
    },
    [isDragging, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch drag handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Only allow dragging from the header area
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
      e.preventDefault();
      setIsDragging(true);
      const touch = e.touches[0];
      const rect = modalRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        });
      }
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging && modalRef.current) {
        e.preventDefault();
        const touch = e.touches[0];
        const newX = touch.clientX - dragOffset.x;
        const newY = touch.clientY - dragOffset.y;

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const modalWidth = modalRef.current.offsetWidth;
        const modalHeight = modalRef.current.offsetHeight;

        // Constrain to viewport bounds
        const constrainedX = Math.max(
          0,
          Math.min(newX, viewportWidth - modalWidth)
        );
        const constrainedY = Math.max(
          0,
          Math.min(newY, viewportHeight - modalHeight)
        );

        setPosition({ x: constrainedX, y: constrainedY });
      }
    },
    [isDragging, dragOffset]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Handle iframe load
  const handleIframeLoad = () => {
    console.log("PDF iframe loaded successfully");
    // Add a small delay to ensure content is fully loaded
    setTimeout(() => {
      setIsLoading(false);
      setHasError(false);
    }, 500);
  };

  const handleIframeError = () => {
    console.error(
      "PDF iframe error for URL:",
      documentUrl,
      "Viewer:",
      pdfViewer
    );

    // For mobile, show download option immediately
    if (isMobile) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    // For desktop, try different viewers
    if (pdfViewer === "direct") {
      setPdfViewer("google");
      setIsLoading(true);
      setIframeKey((prev) => prev + 1);
    } else if (pdfViewer === "google") {
      setPdfViewer("mozilla");
      setIsLoading(true);
      setIframeKey((prev) => prev + 1);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  // Download PDF function
  const downloadPdf = () => {
    const fullUrl = documentUrl.startsWith("http")
      ? documentUrl
      : window.location.origin + documentUrl;

    const link = document.createElement("a");
    link.href = fullUrl;
    link.download = title + ".pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open PDF in new tab
  const openInNewTab = () => {
    const fullUrl = documentUrl.startsWith("http")
      ? documentUrl
      : window.location.origin + documentUrl;
    window.open(fullUrl, "_blank");
  };

  // Fallback loading with timeout
  useEffect(() => {
    if (isOpen && isLoading) {
      const timeout = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          setHasError(true);
        }
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    }
  }, [isOpen, isLoading]);

  // Generate PDF URL with mobile optimization
  const getPdfUrl = (url: string) => {
    console.log("PDF URL:", url, "Viewer:", pdfViewer, "Mobile:", isMobile);

    const fullUrl = window.location.origin + url;

    // For mobile, always use Google Docs viewer for better compatibility
    if (isMobile) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(
        fullUrl
      )}&embedded=true&chrome=false&disablekb=true&disableprint=true&disablesave=true`;
    }

    // For desktop, try different viewers
    switch (pdfViewer) {
      case "google":
        return `https://docs.google.com/gview?url=${encodeURIComponent(
          fullUrl
        )}&embedded=true`;
      case "mozilla":
        return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(
          fullUrl
        )}`;
      default:
        return fullUrl;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999] flex items-center justify-center px-2 sm:px-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`bg-white rounded-xl shadow-2xl w-full flex flex-col relative draggable-modal ${
            isMobile
              ? "max-w-[90vw] h-[60vh] max-h-[60vh]"
              : "max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[70vh] max-h-[85vh] sm:max-h-[80vh] md:max-h-[75vh] lg:max-h-[70vh]"
          } overflow-hidden`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            cursor: isDragging ? "grabbing" : "default",
          }}
        >
          {/* Draggable Header */}
          <div
            ref={headerRef}
            className={`flex items-center justify-between p-3 sm:p-4 border-b border-neutral-200 bg-white select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ touchAction: "none" }}
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <GripVertical className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-neutral-900 truncate">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500">
                  {type} • {size}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={downloadPdf}
                className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition-colors"
                title="Download PDF"
              >
                Download
              </button>
              <button
                onClick={openInNewTab}
                className="px-2 py-1 text-xs bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200 transition-colors"
                title="Open in new tab"
              >
                Open
              </button>
              <button
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-100 hover:bg-neutral-200 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 touch-manipulation"
                aria-label="Close document preview"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>

          {/* Document Content */}
          <div className="flex-1 relative bg-white overflow-hidden">
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                <div className="text-center px-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 animate-pulse">
                    <GripVertical className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-neutral-700 mb-1">
                    Loading Document...
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Please wait while we load the document
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {hasError && (
              <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                <div className="text-center max-w-xs sm:max-w-sm mx-auto p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-neutral-700 mb-2">
                    {isMobile
                      ? "Mobile Preview Not Available"
                      : "Preview Not Available"}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 mb-4">
                    {isMobile
                      ? "PDF preview is optimized for desktop browsers. Please download or open in a new tab to view the document."
                      : "Unable to load the document preview. Please try downloading or opening in a new tab."}
                  </p>
                  <div className="flex flex-col gap-3 justify-center">
                    <div className="flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={downloadPdf}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                      >
                        Download PDF
                      </button>
                      <button
                        onClick={openInNewTab}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Open in New Tab
                      </button>
                    </div>
                    {!isMobile && (
                      <div className="flex gap-2 justify-center flex-wrap">
                        <button
                          onClick={() => {
                            setPdfViewer("direct");
                            setIsLoading(true);
                            setHasError(false);
                            setIframeKey((prev) => prev + 1);
                          }}
                          className="px-3 py-2 bg-neutral-600 text-white rounded-lg text-xs font-medium hover:bg-neutral-700 transition-colors"
                        >
                          Try Direct
                        </button>
                        <button
                          onClick={() => {
                            setPdfViewer("google");
                            setIsLoading(true);
                            setHasError(false);
                            setIframeKey((prev) => prev + 1);
                          }}
                          className="px-3 py-2 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
                        >
                          Try Google Docs
                        </button>
                      </div>
                    )}
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Document Content - Show actions or preview */}
            {!showPreview ? (
              // Action buttons interface
              <div className="w-full h-full relative flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-6">
                    {isMobile
                      ? "PDF preview is optimized for desktop browsers. Download or open in a new tab to view the document."
                      : "Choose how you'd like to view this document:"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={downloadPdf}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Download PDF
                    </button>
                    <button
                      onClick={openInNewTab}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="h-4 w-4 rotate-45" />
                      Open in New Tab
                    </button>
                  </div>
                  {!isMobile && (
                    <div className="mt-4">
                      <p className="text-xs text-neutral-400 mb-2">
                        Or try preview:
                      </p>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            setPdfViewer("direct");
                            setShowPreview(true);
                            setIsLoading(true);
                            setHasError(false);
                            setIframeKey((prev) => prev + 1);
                          }}
                          className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded text-xs hover:bg-neutral-200 transition-colors"
                        >
                          Direct Preview
                        </button>
                        <button
                          onClick={() => {
                            setPdfViewer("google");
                            setShowPreview(true);
                            setIsLoading(true);
                            setHasError(false);
                            setIframeKey((prev) => prev + 1);
                          }}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
                        >
                          Google Docs
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Iframe preview
              <div className="w-full h-full relative">
                <iframe
                  key={iframeKey}
                  src={getPdfUrl(documentUrl)}
                  className="w-full h-full border-0"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title={title}
                  allow="fullscreen"
                  style={{
                    background: "#ffffff",
                    width: "100%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                  }}
                />
                {/* Back to actions button */}
                <div className="absolute top-2 left-2">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="px-3 py-1 bg-black/70 text-white text-xs rounded hover:bg-black/80 transition-colors"
                  >
                    ← Back to Actions
                  </button>
                </div>
                {/* Viewer Status Indicator */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {pdfViewer === "direct"
                    ? "Direct"
                    : pdfViewer === "google"
                    ? "Google Docs"
                    : "Mozilla PDF.js"}
                  {isMobile && " • Mobile"}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DraggableModal;
