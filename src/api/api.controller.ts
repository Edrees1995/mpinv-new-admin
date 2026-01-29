import {
  Controller,
  All,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('api/site')
export class ApiController {
  // Proxy all frontend API calls to old admin for now.
  // The new admin API service returns different response formats
  // than what the frontend expects, so we proxy everything until
  // the new admin API responses are aligned with the frontend.
  @All('*path')
  async proxyToOldAdmin(@Req() req: Request, @Res() res: Response) {
    const oldAdminBase = 'https://admin.mpinv.cloud/api/site/';
    // Extract the path after /api/site/
    const fullPath = req.originalUrl.replace(/^\/api\/site\/?/, '');
    const [path, qs] = fullPath.includes('?') ? fullPath.split('?', 2) : [fullPath, ''];
    const url = qs ? `${oldAdminBase}${path}?${qs}` : `${oldAdminBase}${path}`;
    console.log(`[API Proxy] ${req.method} ${req.originalUrl} -> ${url}`);

    try {
      const response = await fetch(url, {
        method: req.method,
        headers: { 'Content-Type': 'application/json' },
        ...(req.method === 'POST' ? { body: JSON.stringify(req.body) } : {}),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch {
      res.status(502).json({ error: 'Failed to proxy to old admin' });
    }
  }
}
