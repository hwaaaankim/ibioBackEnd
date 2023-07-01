import { Mail } from './Mail';
import { createTransport } from 'nodemailer';

export class MailerImp extends Mail {
  private transporter: any;

  constructor() {
    super();
    this.transporter = createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      // enable_starttls_auto: true,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: this.senderEmail, // email user
        pass: this.senderPassword, // email password
      },
    });
  }

  async send(
    message: string,
    to?: string,
    subject?: string,
    html?: string,
    file?: File,
  ): Promise<any> {
    await this.transporter.sendMail(
      {
        from: `${this.senderEmail}`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: message, // act
        attachments: file,
        html: html, // html body
      },
      (error, info) => {
        if (error) {
          console.log(error);
          return 'Check your internet connection';
        } else {
          console.log(info);
          return 'sent';
        }
      },
    );
  }
}
