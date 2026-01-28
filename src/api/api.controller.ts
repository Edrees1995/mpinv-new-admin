import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api/site')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // Offplan Projects Home
  @Get('offplan_home')
  async offplanHome() {
    return this.apiService.getOffplanHome();
  }

  // Offplan Project Detail
  @Get('offplan_detail')
  async offplanDetail(@Query('slug') slug: string) {
    return this.apiService.getOffplanDetail(slug);
  }

  // Developers List
  @Get('developers__list')
  async developersList() {
    return this.apiService.getDevelopersList();
  }

  // Community List
  @Get('community__list')
  async communityList() {
    return this.apiService.getCommunityList();
  }

  // Footer Variables
  @Get('footer_variables')
  async footerVariables() {
    return this.apiService.getFooterVariables();
  }

  // Contact Variables
  @Get('contact_variable')
  async contactVariables() {
    return this.apiService.getContactVariables();
  }

  // FAQ Items
  @Get('faq_items')
  async faqItems() {
    return this.apiService.getFaqItems();
  }

  // Testimonials
  @Get('testimonial__list')
  async testimonialList() {
    return this.apiService.getTestimonialList();
  }

  // Blogs List
  @Get('blogs_list')
  async blogsList(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.apiService.getBlogsList(
      parseInt(page || '1'),
      parseInt(limit || '10'),
    );
  }

  // Article Detail
  @Get('article_detail')
  async articleDetail(@Query('slug') slug: string) {
    return this.apiService.getArticleDetail(slug);
  }

  // Home Slides
  @Get('home_slides')
  async homeSlides() {
    return this.apiService.getHomeSlides();
  }

  // Submit Contact
  @Post('contact_submit')
  async contactSubmit(
    @Body() body: {
      name: string;
      email: string;
      phone?: string;
      subject?: string;
      message: string;
    },
  ) {
    return this.apiService.submitContact(body);
  }

  // Alias endpoints for compatibility
  @Get('footer_info')
  async footerInfo() {
    return this.apiService.getFooterVariables();
  }

  @Get('property__list')
  async propertyList() {
    // Return offplan projects as properties for now
    return this.apiService.getOffplanHome();
  }
}
