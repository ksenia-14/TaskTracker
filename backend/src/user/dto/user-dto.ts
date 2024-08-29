import { Expose } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class UserDto {
  @Expose()
  @IsNotEmpty()
  id: number

  @Expose()
  @IsNotEmpty()
  login: string

  @Expose()
  @IsNotEmpty()
  name: string

  @Expose()
  roles: string
}
