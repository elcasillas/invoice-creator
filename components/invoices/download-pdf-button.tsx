"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";

const SUPPORTED_PDF_IMAGE_TYPES = /image\/(png|jpe?g)/i;

function getImageMimeType(imageUrl: string) {
  const normalizedUrl = imageUrl.split("?")[0]?.toLowerCase() ?? "";

  if (normalizedUrl.endsWith(".png")) {
    return "image/png";
  }

  if (normalizedUrl.endsWith(".jpg") || normalizedUrl.endsWith(".jpeg")) {
    return "image/jpeg";
  }

  return null;
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Failed to convert image data for PDF export."));
    };

    reader.onerror = () => {
      reject(new Error("Failed to read image data for PDF export."));
    };

    reader.readAsDataURL(blob);
  });
}

async function normalizeImageForPdf(imageUrl: string) {
  if (!imageUrl || imageUrl.startsWith("data:")) {
    return imageUrl;
  }

  const response = await fetch(imageUrl, {
    mode: "cors",
    credentials: "omit",
    cache: "force-cache"
  });

  if (!response.ok) {
    throw new Error(`Failed to load company logo (${response.status}).`);
  }

  const blob = await response.blob();
  const inferredType = blob.type || getImageMimeType(imageUrl) || "";

  if (!SUPPORTED_PDF_IMAGE_TYPES.test(inferredType)) {
    throw new Error("Company logo must be a PNG or JPEG image for PDF export.");
  }

  const normalizedBlob = blob.type ? blob : blob.slice(0, blob.size, inferredType);
  return blobToDataUrl(normalizedBlob);
}

export function DownloadPdfButton({
  targetId,
  invoiceNumber,
  companyName,
  className
}: {
  targetId: string;
  invoiceNumber: string;
  companyName?: string | null;
  className?: string;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function buildPdfFilename() {
    const normalizedCompanyName = (companyName ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (normalizedCompanyName) {
      return `${normalizedCompanyName}-invoice-${invoiceNumber || "draft"}.pdf`;
    }

    return `invoice-${invoiceNumber || "draft"}.pdf`;
  }

  const handleDownload = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const element = document.getElementById(targetId);

      if (!element) {
        throw new Error("Invoice preview could not be found.");
      }

      const originalImages = Array.from(element.querySelectorAll("img"));
      const normalizedImages = await Promise.all(
        originalImages.map(async (image) => {
          const src = image.currentSrc || image.src || "";

          if (!src) {
            return null;
          }

          try {
            return await normalizeImageForPdf(src);
          } catch (error) {
            console.warn("Invoice PDF logo normalization failed.", error);
            return null;
          }
        })
      );

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        onclone: (clonedDocument) => {
          const clonedElement = clonedDocument.getElementById(targetId);

          if (!clonedElement) {
            return;
          }

          const clonedImages = Array.from(clonedElement.querySelectorAll("img"));

          clonedImages.forEach((image, index) => {
            const normalizedImage = normalizedImages[index];

            if (normalizedImage) {
              image.setAttribute("src", normalizedImage);
            }
          });
        }
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let remainingHeight = imageHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imageWidth, imageHeight);
      remainingHeight -= pageHeight;

      while (remainingHeight > 0) {
        position = remainingHeight - imageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imageWidth, imageHeight);
        remainingHeight -= pageHeight;
      }

      pdf.save(buildPdfFilename());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        disabled={isGenerating}
        onClick={handleDownload}
        className={className}
      >
        {isGenerating ? "Generating PDF..." : "Download PDF"}
      </Button>
      {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}
    </div>
  );
}
