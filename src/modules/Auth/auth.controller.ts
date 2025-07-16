
import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { catchError } from "../../utils/catchError";

export const register = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.registerService(req.body);
    res.status(result?.statusCode).json(result?.data);
});

export const activatedAccount = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.activateAccountService({ activationCode: req.params.activationCode });
    res.status(result?.statusCode || 500).json(result?.data || {});
});

export const login = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.loginService(req.body);
    res.status(result?.statusCode).json(result?.data);
});

export const sendForgetPassword = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.forgetPasswordService(req.body.email);
    res.status(result?.statusCode).json(result?.data);
});

export const resetPassword = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.resetPasswordService(req.body);
    res.status(result?.statusCode).json(result?.data);
});
export const getUser = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.getUserService((req as any).user);
    res.status(result?.statusCode).json(result?.data);
});
export const logout = catchError(async (req: Request, res: Response) => {
    const result = await AuthService.logoutService((req as any).user);
    res.status(result?.statusCode).json(result?.data);
});
