import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule,
    FileModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      logging: true,
      database: process.env.POSTGRESS_DB,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
