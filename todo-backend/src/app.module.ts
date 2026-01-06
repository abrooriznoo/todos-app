import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [TodosModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('todos'); // apply ke semua route /todos
  }
}
// export class AppModule {}
