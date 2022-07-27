import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { config } from '../config/config';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, config.jwtSecret, {
      expiresIn,
    });
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOne({
        where: { currentTokenId: token },
      });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await User.findOne({
        where: {
          email: req.email,
        },
      });

      if (user && (await bcrypt.compare(req.pwd, user.pwd))) {
        const token = this.createToken(await this.generateToken(user));

        return res
          .cookie('jwt', token.accessToken, {
            secure: false,
            domain: 'localhost',
            httpOnly: true,
          })
          .json({
            isSuccess: true,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
          });
      }

      return res.json({ error: 'Invalid login data!' });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });
      return res.json({ isSuccess: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
