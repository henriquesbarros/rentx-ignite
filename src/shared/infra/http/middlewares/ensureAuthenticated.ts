import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { AppError } from "@shared/errors/AppError";

interface IPlayload {
    sub: string;
}

export async function ensuredAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing!", 401);
    }

    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPlayload;

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
