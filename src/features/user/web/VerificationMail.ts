import { MailerImp } from './../../../util/mailer/MailerImp';

export class VerificationMail {

  static async send(email: string, verificationCode: string): Promise<any> {
    const mailer = new MailerImp()
    const mailed = await mailer.send(`Verification code for Kulfinet is ${verificationCode}`, email, '', null, null)
    return mailed
  }

}