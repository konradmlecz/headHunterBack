import { config } from './config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export = {
  transport: {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  },
  defaults: {
    from: config.emailFrom,
  },
  template: {
    dir: './templates/email',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
