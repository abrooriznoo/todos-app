import { IsString, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @MinLength(1)
  title: string;
}
