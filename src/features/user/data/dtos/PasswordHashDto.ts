
export class PasswordHashDto {

  constructor(public salt: string, public hashedPassword: string){}

}