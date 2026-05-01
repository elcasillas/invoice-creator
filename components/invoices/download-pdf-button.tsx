"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";

export function DownloadPdfButton({
  targetId,
  invoiceNumber,
  className
}: {
  targetId: string;
  invoiceNumber: string;
  className?: string;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const element = document.getElementById(targetId);

      if (!element) {
        throw new Error("Invoice preview could not be found.");
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true
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

      pdf.save(`invoice-${invoiceNumber || "draft"}.pdf`);
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
