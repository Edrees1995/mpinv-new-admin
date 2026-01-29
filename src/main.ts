import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import methodOverride from 'method-override';
import type Handlebars from 'handlebars';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable method override for PUT/DELETE from HTML forms via ?_method=PUT
  app.use(methodOverride('_method'));

  // Enable CORS for frontend
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Serve static files from public folder (for uploads)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Set up view engine
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Set default layout
  app.set('view options', { layout: 'layouts/main' });

  // Get the handlebars instance from hbs
  const handlebars = hbs.handlebars;

  // Register Handlebars helpers
  handlebars.registerHelper('eq', function (a: unknown, b: unknown) {
    return a === b;
  });

  handlebars.registerHelper('neq', function (a: unknown, b: unknown) {
    return a !== b;
  });

  handlebars.registerHelper('gt', function (a: number, b: number) {
    return a > b;
  });

  handlebars.registerHelper('lt', function (a: number, b: number) {
    return a < b;
  });

  handlebars.registerHelper('gte', function (a: number, b: number) {
    return a >= b;
  });

  handlebars.registerHelper('lte', function (a: number, b: number) {
    return a <= b;
  });

  handlebars.registerHelper('and', function (a: unknown, b: unknown) {
    return a && b;
  });

  handlebars.registerHelper('or', function (a: unknown, b: unknown) {
    return a || b;
  });

  handlebars.registerHelper('not', function (a: unknown) {
    return !a;
  });

  handlebars.registerHelper('subtract', function (a: number, b: number) {
    return (a || 0) - (b || 0);
  });

  handlebars.registerHelper('add', function (a: number, b: number) {
    return (a || 0) + (b || 0);
  });

  handlebars.registerHelper('multiply', function (a: number, b: number) {
    return (a || 0) * (b || 0);
  });

  handlebars.registerHelper('divide', function (a: number, b: number) {
    if (b === 0) return 0;
    return (a || 0) / b;
  });

  handlebars.registerHelper('min', function (a: number, b: number) {
    return Math.min(a || 0, b || 0);
  });

  handlebars.registerHelper('max', function (a: number, b: number) {
    return Math.max(a || 0, b || 0);
  });

  handlebars.registerHelper('formatDate', function (date: Date | string) {
    if (!date) return 'N/A';
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid Date';
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  });

  handlebars.registerHelper('formatDateTime', function (date: Date | string) {
    if (!date) return 'N/A';
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid Date';
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  });

  handlebars.registerHelper('formatNumber', function (num: number) {
    if (num === null || num === undefined) return '0';
    return num.toLocaleString();
  });

  handlebars.registerHelper('truncate', function (str: string, len: number) {
    if (!str) return '';
    if (str.length <= len) return str;
    return str.substring(0, len) + '...';
  });

  handlebars.registerHelper('substring', function (str: string, start: number, end?: number) {
    if (!str) return '';
    return end !== undefined ? str.substring(start, end) : str.substring(start);
  });

  handlebars.registerHelper('json', function (context: unknown) {
    return JSON.stringify(context, null, 2);
  });

  handlebars.registerHelper('range', function (start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  });

  handlebars.registerHelper('ifCond', function (
    this: unknown,
    v1: unknown,
    operator: string,
    v2: unknown,
    options: Handlebars.HelperOptions,
  ) {
    switch (operator) {
      case '==':
        return v1 == v2 ? options.fn(this) : options.inverse(this);
      case '===':
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case '!=':
        return v1 != v2 ? options.fn(this) : options.inverse(this);
      case '!==':
        return v1 !== v2 ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 as number) < (v2 as number)
          ? options.fn(this)
          : options.inverse(this);
      case '<=':
        return (v1 as number) <= (v2 as number)
          ? options.fn(this)
          : options.inverse(this);
      case '>':
        return (v1 as number) > (v2 as number)
          ? options.fn(this)
          : options.inverse(this);
      case '>=':
        return (v1 as number) >= (v2 as number)
          ? options.fn(this)
          : options.inverse(this);
      case '&&':
        return v1 && v2 ? options.fn(this) : options.inverse(this);
      case '||':
        return v1 || v2 ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
