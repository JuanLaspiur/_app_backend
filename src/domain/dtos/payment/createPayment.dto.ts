export class CreatePaymentDto {
  constructor(
    public readonly userId: string,
    public readonly amount: number,
    public readonly method: "Credit Card" | "PayPal" | "Bank Transfer" | "Cash" = "Credit Card",
    public readonly status: "Paid" | "Pending" | "Failed" = "Pending",
    public readonly description: string = "",
    public readonly date: Date = new Date()
  ) {}

  static create(object: any): [string?, CreatePaymentDto?] {
    if (!object) return ["No data provided"];

    const { userId, amount, method, status, description, date } = object;
   
    if (!userId) return ["Missing field: userId"];
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
      return ["Invalid amount value"];
    if (method && !["Credit Card", "PayPal", "Bank Transfer", "Cash"].includes(method))
      return ["Invalid payment method"];
    if (status && !["Paid", "Pending", "Failed"].includes(status))
      return ["Invalid payment status (Failed, Pending, Paid ) "];

    const paymentDto = new CreatePaymentDto(
      userId,
      Number(amount),
      method || "Credit Card",
      status || "Pending",
      description || "",
      date ? new Date(date) : new Date()
    );

    return [undefined, paymentDto];
  }
}
