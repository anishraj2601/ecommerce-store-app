import { Request, Response } from "express";
declare class PaymentController {
    createPaymentIntent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    confirmPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: PaymentController;
export default _default;
//# sourceMappingURL=payment.controller.d.ts.map