import bcrypt from "bcryptjs";
import crypto from "crypto";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";
import { signUpTemp, forgetCodeTemp } from "../../utils/generateHTML";
// import { User } from "./auth.model";
// import { Token } from "../models/token.model";
// import log from "utils/log";
// import { Token } from "../../models/token.model";
import { log } from "../../utils/logger";
import { prisma } from "../../config/db";


export async function registerService({
    userName,
    email,
    password,
}: {
    userName: string;
    email: string;
    password: string;
}) {
    const isUser = await prisma.user.findUnique({
        where: { email }
    });
    //check if user exists
    if (isUser) {
        //check if user is confirmed
        if (isUser.isConfirmed) {
            return {
                statusCode: 400,
                data: { message: "User already exists" },
            };
        }
        isUser.password = bcrypt.hashSync(
            password,
            Number(process.env.SALT_ROUNDS)
        );
        isUser.activationCode = crypto.randomBytes(64).toString("hex");
        await prisma.user.update({
            where: { id: isUser.id },
            data: {
                password: isUser.password,
                activationCode: isUser.activationCode
            }
        });

        const link = `${process.env.ENVIROMENT === "development"
            ? process.env.DEV_URL
            : process.env.PRODUCTION_URL
            }/auth/confirmEmail/${isUser.activationCode}`;
        const isEmailSent = await sendEmail({
            to: email,
            subject: "Confirmation Email",
            html: signUpTemp(link),
        });

        if (!isEmailSent) {
            return {
                statusCode: 500,
                data: {
                    success: false,
                    message: "Please try again later or contact support",
                },
            };
        }

        return {
            statusCode: 200,
            data: { success: true, message: "Check your email" },
        };
    }

    const hashedPassword = bcrypt.hashSync(
        password,
        Number(process.env.SALT_ROUNDS)
    );
    const activationCode = crypto.randomBytes(64).toString("hex");

    const user = await prisma.user.create({
        data: {
            userName,
            email,
            password: hashedPassword,
            activationCode,
        },
    });

    const link = `${process.env.ENVIROMENT === "development"
        ? process.env.DEV_DOMAIN
        : process.env.PRODUCTION_DOMAIN
        }/auth/confirmEmail/${activationCode}`;
    const isEmailSent = await sendEmail({
        to: email,
        subject: "Confirmation Email",
        html: signUpTemp(link),
    });

    if (!isEmailSent) {
        return {
            statusCode: 500,
            data: {
                success: false,
                message: "Please try again later or contact support",
            },
        };
    }
    return {
        statusCode: 201,
        data: { success: true, message: "Activate your account", user },
    };
}
export async function activateAccountService({
    activationCode,
}: {
    activationCode: string;
}) {
    const user = await prisma.user.updateMany({
        where: { activationCode },
        data: {
            isConfirmed: true,
            activationCode: null,
        },
    });
    if (!user) {
        return {
            statusCode: 404,
            data: { message: "User not found" },
        };
    }
}
export async function loginService({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        await log("error", "User not found");
        return {
            statusCode: 404,
            data: { message: "User not found" },
        };
    }
    if (!user.isConfirmed) {
        await log("error", "Please activate your account");
        return {
            statusCode: 401,
            data: { message: "Please activate your account" },
        };
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        await log("error", "Incorrect password");
        return {
            statusCode: 401,
            data: { message: "Incorrect password" },
        };
    }
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );
    await log("info", `Login successful for user ${user.id}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Login successful", token },
    };
}
export async function forgetPasswordService({
    email
}: { email: string }) {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        log("error", "User not found");
        return {
            statusCode: 404,
            data: { message: "User not found" },
        };
    }
    const code = randomstring.generate({
        length: 6,
        charset: "numeric",
    })
    await prisma.user.update({
        where: { id: user.id },
        data: { forgetCode: code }
    });
    const isEmailSent = await sendEmail({
        to: email,
        subject: "Forget Password",
        html: forgetCodeTemp(code),
    });
    if (!isEmailSent) {
        log("error", "Error sending email");
        return {
            statusCode: 500,
            data: {
                success: false,
                message: "Please try again later or contact support",
            }
        }
    }
    await log("info", `Forget password code sent to ${email}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Check your email" },
    }
}
export async function resetPasswordService({
    forgetCode, password
}: { forgetCode: string, password: string }) {
    const user = await prisma.user.findFirst({
        where: { forgetCode },
        select: {
            id: true,
            forgetCode: true
        }
    });
    if (!user) {
        await log("error", "Code invalid");
        return {
            statusCode: 404,
            data: { message: "Code invalid" },
        };
    }
    const hashedPassword = bcrypt.hashSync(
        password,
        Number(process.env.SALT_ROUNDS)
    );

    // ✅ تحديث كلمة المرور في قاعدة البيانات
    await prisma.user.update({
        where: { id: user?.id },
        data: { password: hashedPassword },
    });

    // ✅ حذف كل التوكنات المرتبطة بالمستخدم
    await prisma.token.deleteMany({
        where: {
            userId: user?.id
        }
    });

    // ✅ تسجيل العملية في اللوج
    await log("info", `Password changed for user ${user?.id}`);

    return {
        statusCode: 200,
        data: { success: true, message: "Password changed successfully" },
    }
}
export async function getUserService({
    userId
}: { userId: string }) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    await log("info", "Logout successful");
    return {
        statusCode: 200,
        data: { success: true, message: "Logout successful", user },
    }
}
export async function logoutService({
    userId
}: { userId: string }) {
    await prisma.token.deleteMany({
        where: {
            userId: userId
        }
    });
    await log("info", `Logout successful for user ${userId}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Logout successful" },
    }
}