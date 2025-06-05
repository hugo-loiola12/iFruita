// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Configuração básica do TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql', // ou mysql, maria, etc.
      host: 'localhost',
      port: 3306, // porta do MySQL
      username: 'ifruta', // ajuste para seu DB
      password: 'laele',
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
