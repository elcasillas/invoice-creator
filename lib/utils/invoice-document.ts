import { InvoiceFormValues } from "@/lib/validation/invoice";
import { calculateInvoiceTotals, calculateLineTotal } from "@/lib/utils/invoice";
import { InvoiceWithItems } from "@/types/invoice";
import { InvoiceDocumentData } from "@/types/invoice-document";

export function mapInvoiceToDocument(invoice: InvoiceWithItems): InvoiceDocumentData {
  return {
    invoiceNumber: invoice.invoice_number,
    invoiceDate: invoice.invoice_date,
    dueDate: invoice.due_date,
    status: invoice.status,
    clientName: invoice.client_name,
    clientEmail: invoice.client_email,
    clientAddress: invoice.client_address,
    companyName: invoice.company_name,
    companyEmail: invoice.company_email,
    companyAddress: invoice.company_address,
    notes: invoice.notes,
    subtotal: invoice.subtotal,
    taxRate: invoice.tax_rate,
    taxAmount: invoice.tax_amount,
    total: invoice.total,
    items: invoice.invoice_items.map((item) => ({
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      lineTotal: item.line_total
    }))
  };
}

export function mapFormValuesToDocument(values: InvoiceFormValues): InvoiceDocumentData {
  const totals = calculateInvoiceTotals(values);

  return {
    invoiceNumber: values.invoiceNumber || "DRAFT",
    invoiceDate: values.invoiceDate,
    dueDate: values.dueDate || null,
    status: values.status,
    clientName: values.clientName || "Client name",
    clientEmail: values.clientEmail || null,
    clientAddress: values.clientAddress || null,
    companyName: values.companyName || null,
    companyEmail: values.companyEmail || null,
    companyAddress: values.companyAddress || null,
    notes: values.notes || null,
    subtotal: totals.subtotal,
    taxRate: values.taxRate,
    taxAmount: totals.taxAmount,
    total: totals.total,
    items: values.items.map((item, index) => ({
      id: `${index}`,
      description: item.description || "Line item",
      quantity: Number(item.quantity) || 0,
      unitPrice: Number(item.unitPrice) || 0,
      lineTotal: calculateLineTotal(Number(item.quantity) || 0, Number(item.unitPrice) || 0)
    }))
  };
}
