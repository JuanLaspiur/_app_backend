import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface PaymentInfo {
  invoiceNumber: string;
  invoiceDate: Date;
  userName: string;
  amount: number;
  method: string;
  items: InvoiceItem[];
}

export class PdfPaymentService {
  private invoicesDir = path.join(__dirname, "../../invoices");

  constructor() {
    if (!fs.existsSync(this.invoicesDir)) {
      fs.mkdirSync(this.invoicesDir, { recursive: true });
    }
  }

  public generateInvoice(payment: PaymentInfo): string {
    const doc = new PDFDocument({ margin: 50 });
    const filePath = path.join(this.invoicesDir, `invoice-${payment.invoiceNumber}.pdf`);

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text(`Factura #${payment.invoiceNumber}`, { align: "center" });
    doc.moveDown();

    doc.fontSize(12)
      .text(`Usuario: ${payment.userName}`)
      .text(`Fecha: ${payment.invoiceDate.toLocaleDateString()}`)
      .text(`Método de pago: ${payment.method}`)
      .moveDown();

    doc.text("Detalle de pago:", { underline: true });
    payment.items.forEach((item, i) => {
      doc.text(`${i + 1}. ${item.description} | Cantidad: ${item.quantity} | Unit: $${item.unitPrice} | Total: $${item.total}`);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Monto total: $${payment.amount}`, { align: "right" });

    doc.end();

    return filePath;
  }
}
