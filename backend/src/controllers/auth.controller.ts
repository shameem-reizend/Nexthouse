import { NextFunction, Request, Response } from "express";
import { login, registerUser } from "../services/auth.service";
import { instanceToPlain } from "class-transformer";
import { ApiError } from "../utils/apiError";
import { generateAccessToken, verifyRefreshToken } from "../utils/token";


export const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, phone_number } = req.body;

    const user = await registerUser(name, email, password, phone_number);

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user:instanceToPlain(user)
        ,
    });
  } catch (error) {
    next(error);
  }
};

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const loginUser = await login(email, password);

    const {
      tokens: { refreshToken },
    } = loginUser;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    res.json({
      success: true,
      message: "Login Successful",
      data: {
        user: instanceToPlain( loginUser.userFound),
        token: loginUser.tokens.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new ApiError("No refreshtoken found", 409);
    }
    const verifiedUser = verifyRefreshToken(refreshToken);
    if (verifiedUser) {
      const accessToken = generateAccessToken(verifiedUser);
      return res.status(201).json({
        success: true,
        message: "Token sent succesfully",
        data: {
          token: accessToken,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
