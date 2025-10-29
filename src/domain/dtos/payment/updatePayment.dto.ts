export class UpdatePaymentDto {
  constructor(
    public readonly id: string,
    public readonly userId?: string,
    public readonly amount?: number,
    public readonly method?: "Credit Card" | "PayPal" | "Bank Transfer" | "Cash",
    public readonly status?: "Paid" | "Pending" | "Failed",
    public readonly description?: string,
    public readonly date?: Date
  ) {}

  static create(object: any): [string?, UpdatePaymentDto?] {
    if (!object) return ["No data provided"];

    const { id, userId, amount, method, status, description, date } = object;

    // Validaciones
    if (!id) return ["Payment ID is required"];
    if (amount !== undefined && (isNaN(Number(amount)) || Number(amount) <= 0))
      return ["Invalid amount value"];
    if (method && !["Credit Card", "PayPal", "Bank Transfer", "Cash"].includes(method))
      return ["Invalid payment method"];
    if (status && !["Paid", "Pending", "Failed"].includes(status))
      return ["Invalid payment status (Failed, Pending, Paid )"];

    const dto = new UpdatePaymentDto(
      id,
      userId,
      amount !== undefined ? Number(amount) : undefined,
      method,
      status,
      description,
      date ? new Date(date) : undefined
    );

    return [undefined, dto];
  }
}
