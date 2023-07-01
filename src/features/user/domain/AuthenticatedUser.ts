
export class AuthenticatedUser {

  private static user =  new AuthenticatedUser()
  public userId: string
  public fullName: string
  public email: string
  public role: string
  public shopId: string

  private constructor() {
    // in-accessible constructor a.k.a singelton
  }

  static getInstance(): AuthenticatedUser {
    return this.user
  }

}