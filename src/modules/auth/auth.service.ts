import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async login(LoginDto: LoginDto): Promise<any> {
    // find user by email
    const user = await this.userRepository.findOne({
      where: { email: LoginDto.email },
    });
    // throw error if user not found
    if (!user) {
      throw new NotFoundException('Email/Password not match any record in our database.');
    }
    // check if password match
    const isValid = await argon2.verify(user.password_hash, LoginDto.password);
    // throw error if password not match
    if (!isValid) {
      throw new NotFoundException('Email/Password not match any record in our database.');
    }
    // generate token
    var token = await this.signJWT(user);
    // return token
    return token;
  }

  async register(register: RegisterDto): Promise<any> {
    // init user
    var user: User = new User();
    user.email = register.email;
    // hash the password
    user.password_hash = await argon2.hash(register.password);
    try {
      // create user
      var newUser: User = await this.userRepository.save(user);
      // generate token
      var token = await this.signJWT(newUser);
      // delete password_hash
      delete newUser.password_hash;
      // return token
      return Object.assign({}, newUser, token);
    } catch (error) {
      // throw error if email already exist
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exist.');
      }
    }
  }

  async signJWT(user: any): Promise<any> {
    try {
      // payload for jwt
      const payload = {
        id: user.id,
        email: user.email,
        role_id: user.role_id,
      };
      // get secret from config
      const secret = this.config.get('JWT_SECRET');
      // generate jwt token
      let token = await this.jwt.signAsync(payload, {
        expiresIn: '24h',
        secret,
      });
      // return accessToken
      return { token };
    } catch (error) {
      // throw InternalServerError
      throw new HttpException('Failed to generate token', 500);
    }
  }
}
