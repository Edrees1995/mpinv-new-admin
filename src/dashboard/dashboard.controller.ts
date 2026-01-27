import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class DashboardController {
  @Get()
  @Render('dashboard')
  getDashboard() {
    return {
      title: 'Dashboard',
    };
  }

  @Get('api/time')
  getTime() {
    const now = new Date();
    return `<p class="text-green-600 font-medium">Server Time: ${now.toLocaleString()}</p>`;
  }
}
