export interface InvoiceDocumentItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface InvoiceDocumentData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string | null;
  status: string;
  clientName: string;
  clientEmail: string | null;
  clientAddress: string | null;
  companyName: string | null;
  companyEmail: string | null;
  companyAddress: string | null;
  notes: string | null;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  items: InvoiceDocumentItem[];
}
