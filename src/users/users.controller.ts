// src/users/users.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * POST /users/register
   * Recebe name, email, password.
   * Se válido, chama o service para criar.
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Validamos via pipes (class-validator já faz automaticamente,
    // desde que o ValidationPipe global esteja habilitado no main.ts).
    try {
      const newUser = await this.usersService.create(createUserDto);
      return {
        statusCode: 201,
        message: 'Usuário cadastrado com sucesso.',
        data: newUser,
      };
    } catch (error) {
      // Se for ConflictException, já será tratado como 409 automaticamente.
      // Caso queira customizar a mensagem:
      if (error.status === 409) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
