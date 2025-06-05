// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Configuração básica do TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres', // ou mysql, maria, etc.
      host: 'localhost',
      port: 5432, // porta do Postgres
      username: 'seu_usuario', // ajuste para seu DB
      password: 'sua_senha',
      database: 'ifruita_db', // crie este banco antes
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // No dev, true; em produção, false.
    }),
    UsersModule, // nosso módulo de usuários
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
