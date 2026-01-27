import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set up view engine
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Register partials directory
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  // Register layout
  hbs.registerHelper('extend', function (name: string, context: { fn: (arg0: unknown) => unknown }) {
    const blocks = this._blocks || (this._blocks = {});
    blocks[name] = context.fn(this);
  });

  // Set default layout
  app.set('view options', { layout: 'layouts/main' });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
