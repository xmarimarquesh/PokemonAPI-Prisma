import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto-js";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma.ts";

dotenv.config();

class AuthController {
    static async register(req: Request, res: Response): Promise<any> {
        const { name, email, password } = req.body;
        try {
            const encryptedPassword = crypto.AES.encrypt(password, process.env.SECRET as string).toString();

            const user = await prisma.user.create({
                data: { name, email, password: encryptedPassword },
            });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar usuário", error });
        }
    }

    static async login(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(400).send({ message: "Invalid Email or Password" });
            }

            const bytes = crypto.AES.decrypt(user.password, process.env.SECRET as string);
            const passwordDecrypted = bytes.toString(crypto.enc.Utf8);

            if (password !== passwordDecrypted) {
                return res.status(400).send({ message: "Invalid Email or Password" });
            }

            const secret = process.env.SECRET;
            if (secret) {
                const token = jwt.sign(
                    {
                        id: user.id, 
                    },
                    secret,
                    {
                        expiresIn: '2 days',
                    }
                );
                return res.status(200).send({ token });
            }
        } catch (error) {
            return res.status(500).json({ message: "Erro no login", error });
        }
    }
}

export default AuthController;
