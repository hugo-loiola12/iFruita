// src/users/users.service.ts
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Registra um novo usuário.
   * - Checa se já existe email cadastrado.
   * - Faz hash da senha antes de salvar.
   */
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { name, email, password } = createUserDto;

    // 1) Verificar se já existe usuário com email
    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Endereço de e-mail já cadastrado.');
    }

    // 2) Gerar hash da senha (bcrypt)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3) Criar a entidade
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    try {
      const saved = await this.usersRepository.save(user);
      // Retornar o usuário sem o campo password
      // Podemos usar object destructuring para não expor o hash
      const { password: _, ...userWithoutPassword } = saved;
      return userWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar usuário no banco.',
      );
    }
  }

  /** Método auxiliar: buscar usuário por email */
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
