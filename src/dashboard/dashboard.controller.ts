import { Controller, Get, Render } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Render('dashboard')
  async getDashboard() {
    const stats = await this.dashboardService.getStats();
    const recentProperties = await this.dashboardService.getRecentProperties(5);
    const recentProjects = await this.dashboardService.getRecentProjects(5);
    const recentContacts = await this.dashboardService.getRecentContacts(5);

    return {
      title: 'Dashboard',
      stats,
      recentProperties,
      recentProjects,
      recentContacts,
    };
  }

  @Get('api/stats')
  async getStats() {
    return this.dashboardService.getStats();
  }

  @Get('api/time')
  getTime() {
    const now = new Date();
    return `<p class="text-green-600 font-medium">Server Time: ${now.toLocaleString()}</p>`;
  }
}
