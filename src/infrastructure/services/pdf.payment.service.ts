import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PaymentInfo {
  invoiceNumber: string;
  invoiceDate: Date;
  userName: string;
  userAddress?: string;
  userNIF?: string;
  amount: number;
  method: string;
  items: InvoiceItem[];
  subtotal?: number;
  iva?: number;
  irpf?: number;
  total?: number;
}

export class PdfPaymentService {
  private readonly invoicesDir = path.join(__dirname, "../../invoices");
  private readonly logoPath = path.join(__dirname, "../../../public/icon.png");

  private readonly layout = {
    margin: 40,
    tableCols: { concept: 50, qty: 320, price: 380, total: 460 },
    colors: {
      border: "#cccccc",
      rowLine: "#f0f0f0",
    },
  };

  constructor() {
    if (!fs.existsSync(this.invoicesDir)) {
      fs.mkdirSync(this.invoicesDir, { recursive: true });
    }
  }

  public generateInvoice(payment: PaymentInfo): string {
    const doc = this.createDoc();
    const filePath = path.join(this.invoicesDir, `invoice-${payment.invoiceNumber}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    this.drawHeader(doc, payment.invoiceNumber, payment.invoiceDate);
    this.drawClientBox(doc, payment.userName, payment.userAddress, payment.userNIF);
    this.drawTable(doc, payment.items);
    this.drawTotals(doc, payment);

    doc.end();
    return filePath;
  }

  public generateBlankInvoice(invoiceNumber = "0000"): string {
    const doc = this.createDoc();
    const filePath = path.join(this.invoicesDir, `invoice-${invoiceNumber}-blank.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    this.drawHeader(doc, invoiceNumber, new Date());
    this.drawClientBox(doc, "__________________________", "__________________________", "__________");

    const emptyItems: InvoiceItem[] = Array.from({ length: 10 }).map(() => ({
      description: "______________________________",
      quantity: 0,
      unitPrice: 0,
      total: 0,
    }));

    this.drawTable(doc, emptyItems, true);
    this.drawBlankTotals(doc);

    this.drawLogo(doc, 450, 750, 100);
    doc.end();

    return filePath;
  }


  private createDoc() {
    return new PDFDocument({ margin: this.layout.margin, size: "A4" });
  }

  private drawLogo(doc: any, x: number, y: number, width: number) {
    if (fs.existsSync(this.logoPath)) {
      try {
        doc.image(this.logoPath, x, y, { width });
      } catch {
        /* ignore invalid image */
      }
    }
  }

  // --------------------
  // 🔹 Header & Client Box
  // --------------------
  private drawHeader(doc: any, invoiceNumber: string, invoiceDate: Date) {
    const logoWidth = 50;
    const logoY = 40;

    this.drawLogo(doc, 50, logoY, logoWidth);

    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text("FACTURA", 50 + logoWidth + 15, logoY + 10, { align: "left" });

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(`Fecha: ${invoiceDate.toLocaleDateString()}`, 400, logoY + 5, { align: "right" })
      .text(`Número: ${invoiceNumber}`, 400, logoY + 20, { align: "right" });

    doc
      .moveTo(50, logoY + 65)
      .lineTo(545, logoY + 65)
      .strokeColor(this.layout.colors.border)
      .stroke();

    doc.moveDown(3);
  }

  private drawClientBox(doc: any, name?: string, address?: string, nif?: string) {
    const startY = doc.y;
    doc.rect(50, startY, 450, 60).stroke(this.layout.colors.border);
    doc
      .fontSize(11)
      .font("Helvetica")
      .text(`Cliente: ${name || ""}`, 60, startY + 8)
      .text(`Domicilio: ${address || ""}`, 60, startY + 26)
      .text(`NIF/DNI: ${nif || ""}`, 60, startY + 44);
    doc.moveDown(4);
  }

  // --------------------
  // 🔹 Table
  // --------------------
  private drawTable(doc: any, items: InvoiceItem[], isBlank = false) {
    const { concept, qty, price, total } = this.layout.tableCols;
    const tableTop = doc.y + 10;

    doc.font("Helvetica-Bold").fontSize(10);
    doc.text("CONCEPTO", concept, tableTop);
    doc.text("CANTIDAD", qty, tableTop);
    doc.text("PRECIO", price, tableTop);
    doc.text("TOTAL", total, tableTop);

    doc.font("Helvetica").fontSize(10);
    let y = tableTop + 20;

    for (const item of items) {
      doc.text(item.description, concept, y, { width: 250 });
      doc.text(isBlank ? "" : item.quantity || "", qty, y, { width: 40, align: "right" });
      doc.text(isBlank ? "" : item.unitPrice ? `$${item.unitPrice.toFixed(2)}` : "", price, y, {
        width: 60,
        align: "right",
      });
      doc.text(isBlank ? "" : item.total ? `$${item.total.toFixed(2)}` : "", total, y, {
        width: 70,
        align: "right",
      });

      doc.moveTo(50, y + 15).lineTo(545, y + 15).strokeColor(this.layout.colors.rowLine).stroke();
      y += 24;
    }

    doc.y = y + 6;
  }

  // --------------------
  // 🔹 Totals
  // --------------------
  private getTotals(payment: PaymentInfo) {
    const subtotal = payment.subtotal ?? payment.items.reduce((acc, i) => acc + i.total, 0);
    const iva = payment.iva ?? subtotal * 0.21;
    const irpf = payment.irpf ?? subtotal * 0.15;
    const total = payment.total ?? subtotal + iva - irpf;
    return { subtotal, iva, irpf, total };
  }

  private drawTotals(doc: any, payment: PaymentInfo) {
    const { subtotal, iva, irpf, total } = this.getTotals(payment);
    const rightX = 350;
    const y = doc.y + 400;

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`FORMA DE PAGO :   ${payment.method}`, 50, y)
      .text(`SUBTOTAL:   $${subtotal.toFixed(2)}`, rightX, y)
      .text(`IVA (21%):   $${iva.toFixed(2)}`, rightX, y + 14)
      .text(`IRPF (15%):   $${irpf.toFixed(2)}`, rightX, y + 28)
      .font("Helvetica-Bold")
      .text(`TOTAL A PAGAR:   $${total.toFixed(2)}`, rightX, y + 48);
  }

  private drawBlankTotals(doc: any) {
    const leftX = 50;
    const rightX = 350;
    const y = doc.y + 15;

    doc.fontSize(10).font("Helvetica");
    doc.text("FORMA DE PAGO:     ____________________", leftX, y);
    doc.text("SUBTOTAL: ____________________", rightX, y);
    doc.text("IVA (21%): ____________________", rightX, y + 14);
    doc.text("IRPF (15%): ____________________", rightX, y + 28);
    doc.font("Helvetica-Bold").text("TOTAL A PAGAR: ____________________", rightX, y + 48);
  }
}
