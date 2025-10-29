import { EmailService } from "../../infrastructure/services";
import { CustomError } from "../errors/custom.error"; 

export class SendSalaryNotificationUseCase {

  static async execute(to: string, amount: number, paymentDate: Date): Promise<void> {
    const emailService = new EmailService();

    if (!to) {
      throw CustomError.badRequest("Recipient email is required");
    }

    const subject = "Notificación de pago de sueldo";
    const text = `Tu sueldo de $${amount} ha sido acreditado el ${paymentDate.toLocaleDateString()}.`;
    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">¡Sueldo acreditado!</h1>
          </div>
          <div style="padding: 20px; color: #333;">
            <p style="font-size: 16px; margin: 0 0 10px;">Hola,</p>
            <p style="font-size: 16px; margin: 0 0 20px;">
              Tu sueldo de <strong>$${amount}</strong> ha sido acreditado con éxito el <strong>${paymentDate.toLocaleDateString()}</strong>.
            </p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; text-align: center; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 18px; font-weight: bold;">Monto: $${amount}</p>
              <p style="margin: 5px 0 0; font-size: 14px; color: #666;">Fecha de acreditación: ${paymentDate.toLocaleDateString()}</p>
            </div>
            <p style="font-size: 16px; margin: 0;">¡Gracias por tu dedicación!</p>
          </div>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #999;">
            Esta es una notificación automática. Por favor, no respondas a este correo.
          </div>
        </div>
      </div>
    `;

    try {
      await emailService.sendEmail(to, subject, text, html);
    } catch (error) {
      throw CustomError.internalServer("Failed to send salary notification email");
    }
  }
}
