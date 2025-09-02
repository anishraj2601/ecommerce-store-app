import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repo";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { createError } from "../middlewares/error.middleware";
import config from "../config";
import type { CreateUserDTO, LoginDTO } from "../types";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: CreateUserDTO) {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw createError("User with this email already exists", 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(
      userData.password,
      config.BCRYPT_ROUNDS
    );

    // Create user
    const user = await this.userRepository.create({
      email: userData.email,
      passwordHash,
      name: userData.name,
    });

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async login(credentials: LoginDTO) {
    // Find user by email
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw createError("Invalid email or password", 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw createError("Invalid email or password", 401);
    }

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      const payload = verifyRefreshToken(refreshToken);

      if (
        typeof payload !== "object" ||
        payload === null ||
        !("userId" in payload)
      ) {
        throw new Error("Invalid token payload");
      }

      const user = await this.userRepository.findById((payload as any).userId);
      if (!user) {
        throw createError("User not found", 404);
      }

      // Generate new tokens
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = generateAccessToken(tokenPayload);
      const newRefreshToken = generateRefreshToken(tokenPayload);

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        tokens: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      };
    } catch (error) {
      throw createError("Invalid or expired refresh token", 401);
    }
  }
}
