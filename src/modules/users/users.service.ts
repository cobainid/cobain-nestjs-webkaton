import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // create new user from createUserDto
      const user: User = await this.userRepository.create(createUserDto);
      // return data from database
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // throw error duplicate data
        throw new ConflictException('Data already exist.');
      } else {
        // throw error if something else
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // find user by id
    const user = await this.userRepository.findOne({ where: { id } });
    // throw if not found
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    try {
      // update user
      this.userRepository.update(id, updateUserDto);
      // return updated user
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // throw error duplicate data
        throw new ConflictException('Data already exist.');
      } else {
        // throw error if something else
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      // throw unexpected error
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMe(user: any): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: user.id },
    });
  }
}
