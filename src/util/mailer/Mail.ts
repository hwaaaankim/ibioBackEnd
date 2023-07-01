
export abstract class Mail {

  protected senderEmail = 'ermitsegebu@gmail.com'

  protected senderPassword= '781227xx'

  abstract send(to: any, subject: string, text: string, html: any, file: File): any;

}