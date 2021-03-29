import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class MailProvider implements IMailProvider {
  public async sendMail(to: string, body: string): Promise<void> {}
}
