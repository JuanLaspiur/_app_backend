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
  private invoicesDir = path.join(__dirname, "../../invoices");
  private logoPath = path.join(__dirname, "../../../public/icon.png");
 

  constructor() {
    if (!fs.existsSync(this.invoicesDir)) {
      fs.mkdirSync(this.invoicesDir, { recursive: true });
    }
  }


  public generateInvoice(payment: PaymentInfo): string {
    const doc = new PDFDocument({ margin: 40, size: "A4" });
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
    const doc = new PDFDocument({ margin: 40, size: "A4" });
    const filePath = path.join(this.invoicesDir, `invoice-${invoiceNumber}-blank.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    this.drawHeader(doc, invoiceNumber, new Date());
    this.drawClientBox(doc, "__________________________", "__________________________", "__________");
    // Dibujar filas vacías en la tabla (ej. 10 filas)
    const emptyItems: InvoiceItem[] = Array.from({ length: 10 }).map(() => ({
      description: "______________________________",
      quantity: 0,
      unitPrice: 0,
      total: 0,
    }));
    this.drawTable(doc, emptyItems, true);
    // Totales en blanco
    doc.moveDown(1.5);
    const leftX = 50;
    const rightX = 350;
    const y = doc.y;
    doc.fontSize(10).text("FORMA DE PAGO:     ____________________", leftX, y);
    doc.text("SUBTOTAL: ____________________", rightX, y);
    doc.text("IVA (21%): ____________________", rightX, y + 14);
    doc.text("IRPF (15%): ____________________", rightX, y + 28);
    doc.font("Helvetica-Bold").text("TOTAL A PAGAR: ____________________", rightX, y + 48);

    // Footer / logo (opcional)
    if (fs.existsSync(this.logoPath)) {
      try {
        doc.image(this.logoPath, 450, 750, { width: 100 });
      } catch (_) {}
    }

    doc.end();
    return filePath;
  }


private drawHeader(doc: any, invoiceNumber: string, invoiceDate: Date) {
  const logoWidth = 50;
  const logoY = 40;


  if (fs.existsSync(this.logoPath)) {
    try {
      doc.image(this.logoPath, 50, logoY, { width: logoWidth });
    } catch (_) {
    
    }
  }


  doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .text("FACTURA", 50 + logoWidth + 15, logoY + 10, { align: "left" });

 
  doc
    .font("Helvetica")
    .fontSize(10)
    .text(`Fecha: ${invoiceDate.toLocaleDateString()}`, 400, logoY + 5, { align: "right" });
  doc.text(`Número: ${invoiceNumber}`, 400, logoY + 20, { align: "right" });

 
  doc
    .moveTo(50, logoY + 65)
    .lineTo(545, logoY + 65)
    .strokeColor("#cccccc")
    .stroke();


  doc.moveDown(3);
}


  private drawClientBox(doc: any, name?: string, address?: string, nif?: string) {
    const startY = doc.y;
    doc.rect(50, startY, 450, 60).stroke("#cccccc");
    doc.fontSize(11).font("Helvetica").text(`Cliente: ${name || ""}`, 60, startY + 8);
    doc.fontSize(11).text(`Domicilio: ${address || ""}`, 60, startY + 26);
    doc.fontSize(11).text(`NIF/DNI: ${nif || ""}`, 60, startY + 44);
    doc.moveDown(4);
  }

  private drawTable(doc: any, items: InvoiceItem[], isBlank = false) {
    const tableTop = doc.y + 10;
    const colX = { concept: 50, qty: 320, price: 380, total: 460 };

    doc.font("Helvetica-Bold").fontSize(10);
    doc.text("CONCEPTO", colX.concept, tableTop);
    doc.text("CANTIDAD", colX.qty, tableTop);
    doc.text("PRECIO", colX.price, tableTop);
    doc.text("TOTAL", colX.total, tableTop);
    doc.moveDown(1);

    doc.font("Helvetica").fontSize(10);
    let y = tableTop + 20;
    items.forEach((item, i) => {

      doc.text(item.description, colX.concept, y, { width: 250 });
      doc.text(isBlank ? " " : (item.quantity ? String(item.quantity) : ""), colX.qty, y, { width: 40, align: "right" });
      doc.text(isBlank ? " " : (item.unitPrice ? `$${item.unitPrice.toFixed(2)}` : ""), colX.price, y, { width: 60, align: "right" });
      doc.text(isBlank ? " " : (item.total ? `$${item.total.toFixed(2)}` : ""), colX.total, y, { width: 70, align: "right" });

      doc.moveTo(50, y + 15).lineTo(545, y + 15).strokeColor("#f0f0f0").stroke();
      y += 452;
    });

    doc.y = y + 6;
  }

  private drawTotals(doc: any, payment: PaymentInfo) {
    const subtotal = payment.subtotal ?? payment.items.reduce((acc, i) => acc + i.total, 0);
    const iva = payment.iva ?? subtotal * 0.21;
    const irpf = payment.irpf ?? subtotal * 0.15;
    const total = payment.total ?? subtotal + iva - irpf;

    const rightX = 350;
    const y = doc.y + 10;

    doc.fontSize(10).font("Helvetica").text(`FORMA DE PAGO :   ${payment.method}`, 50, y);
    doc.fontSize(10).text(`SUBTOTAL:   $${subtotal.toFixed(2)}`, rightX, y);
    doc.text(`IVA (21%):   $${iva.toFixed(2)}`, rightX, y + 14);
    doc.text(`IRPF (15%):   $${irpf.toFixed(2)}`, rightX, y + 28);
    doc.font("Helvetica-Bold").text(`TOTAL A PAGAR:   $${total.toFixed(2)}`, rightX, y + 48);
  }
}

