import {
  Controller,
  Get,
  Post,
  All,
  Req,
  Res,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { SettingsApiService } from './services/settings-api.service';
import { ReferenceApiService } from './services/reference-api.service';
import { ContentApiService } from './services/content-api.service';
import { ListingsApiService } from './services/listings-api.service';
import { FormsApiService } from './services/forms-api.service';

@Controller('api/site')
export class ApiController {
  constructor(
    private readonly settingsApi: SettingsApiService,
    private readonly referenceApi: ReferenceApiService,
    private readonly contentApi: ContentApiService,
    private readonly listingsApi: ListingsApiService,
    private readonly formsApi: FormsApiService,
  ) {}

  // ════════════════════════════════════════════════════════════
  //  PHASE 1: Settings / Meta Tags
  // ════════════════════════════════════════════════════════════

  @Get('homeMetaTags')
  homeMetaTags() {
    return this.settingsApi.homeMetaTags();
  }

  @Get('ForesaleMetaTags')
  forSaleMetaTags() {
    return this.settingsApi.forSaleMetaTags();
  }

  @Get('OffplanlistingsMetaTags')
  offplanListingsMetaTags() {
    return this.settingsApi.offplanListingsMetaTags();
  }

  @Get('FeaturedProjectsMetaTags')
  featuredProjectsMetaTags() {
    return this.settingsApi.featuredProjectsMetaTags();
  }

  @Get('FaqsMetaTags')
  faqsMetaTags() {
    return this.settingsApi.faqsMetaTags();
  }

  @Get('GuideMetaTags')
  guideMetaTags() {
    return this.settingsApi.guideMetaTags();
  }

  @Get('BlogMetaTags')
  blogMetaTags() {
    return this.settingsApi.blogMetaTags();
  }

  @Get('DevelopersMetaTags')
  developersMetaTags() {
    return this.settingsApi.developersMetaTags();
  }

  @Get('CareerMetaTags')
  careerMetaTags() {
    return this.settingsApi.careerMetaTags();
  }

  @Get('RentalYieldCalculatorMetaTags')
  rentalYieldCalculatorMetaTags() {
    return this.settingsApi.rentalYieldCalculatorMetaTags();
  }

  @Get('AreasMetaTags')
  areasMetaTags() {
    return this.settingsApi.areasMetaTags();
  }

  @Get('footer_variables')
  footerVariables() {
    return this.settingsApi.footerVariables();
  }

  @Get('contact_variable')
  contactVariables() {
    return this.settingsApi.contactVariables();
  }

  @Get('getRoi_variables')
  getRoiVariables() {
    return this.settingsApi.getRoiVariables();
  }

  @Get('privacy_policy')
  privacyPolicy() {
    return this.settingsApi.privacyPolicy();
  }

  @Get('cookies_policy')
  cookiesPolicy() {
    return this.settingsApi.cookiesPolicy();
  }

  @Get('terms_and_conditions')
  termsAndConditions() {
    return this.settingsApi.termsAndConditions();
  }

  @Get('investorzone_page_detail')
  investorZonePageDetail() {
    return this.settingsApi.investorZonePageDetail();
  }

  @Get('MasterpieceSections')
  masterpieceSections() {
    return this.settingsApi.masterpieceSections();
  }

  @Get('list_property_variable/lang/en')
  listPropertyVariable() {
    return this.settingsApi.listPropertyVariable();
  }

  @Get('currency_preference_fetch_info')
  currencyPreferenceFetchInfo() {
    return this.settingsApi.currencyPreferenceFetchInfo();
  }

  // ════════════════════════════════════════════════════════════
  //  PHASE 2: Reference Data
  // ════════════════════════════════════════════════════════════

  @Get('developers__list')
  developersList() {
    return this.referenceApi.developersList();
  }

  @Get('developers_all')
  developersAll() {
    return this.referenceApi.developersAll();
  }

  @Get('community__list')
  communityList() {
    return this.referenceApi.communityList();
  }

  @Get('Highend_locations')
  highendLocations() {
    return this.referenceApi.highendLocations();
  }

  @Get('form_values')
  formValues() {
    return this.referenceApi.formValues();
  }

  @Get('form_offplan_values')
  formOffplanValues() {
    return this.referenceApi.formOffplanValues();
  }

  @Get('fetch_types2')
  fetchTypes2() {
    return this.referenceApi.fetchTypes2();
  }

  @Get('listing_category')
  listingCategory() {
    return this.referenceApi.listingCategory();
  }

  @Get('listing_designation')
  listingDesignation() {
    return this.referenceApi.listingDesignation();
  }

  // ════════════════════════════════════════════════════════════
  //  PHASE 2: Content Endpoints
  // ════════════════════════════════════════════════════════════

  @Get('blogs')
  blogs(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.contentApi.blogs(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
    );
  }

  @Get('blogs_list')
  blogsList(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('type') type?: string,
  ) {
    return this.contentApi.blogsList(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
      type,
    );
  }

  @Get('article_detail/slug/:slug')
  articleDetail(@Param('slug') slug: string) {
    return this.contentApi.articleDetail(slug);
  }

  @Get('guides_list')
  guidesList(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.contentApi.guidesList(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
    );
  }

  @Get('faq_items')
  faqItems() {
    return this.contentApi.faqItems();
  }

  @Get('testimonial__list')
  testimonialList() {
    return this.contentApi.testimonialList();
  }

  @Get('home_slides')
  homeSlides() {
    return this.contentApi.homeSlides();
  }

  @Get('social_stories')
  socialStories() {
    return this.contentApi.socialStories();
  }

  @Get('social_posts')
  socialPosts() {
    return this.contentApi.socialPosts();
  }

  // ════════════════════════════════════════════════════════════
  //  PHASE 3: Listings
  // ════════════════════════════════════════════════════════════

  @Get('offplan_home')
  offplanHome() {
    return this.listingsApi.offplanHome();
  }

  @Get('offplanlistings')
  offplanListingsRoot(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.listingsApi.offplanListings(
      '',
      page ? Number(page) : 1,
      limit ? Number(limit) : 12,
      sort,
    );
  }

  @Get('offplanlistings/*filters')
  offplanListings(
    @Param('filters') filters: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.listingsApi.offplanListings(
      filters || '',
      page ? Number(page) : 1,
      limit ? Number(limit) : 12,
      sort,
    );
  }

  @Get('offplan_detail/slug/:slug')
  offplanDetail(@Param('slug') slug: string) {
    return this.listingsApi.offplanDetail(slug);
  }

  @Get('listings/sect/1')
  saleListingsRoot(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.listingsApi.saleListings(
      '',
      page ? Number(page) : 1,
      limit ? Number(limit) : 12,
      sort,
    );
  }

  @Get('listings/sect/1/*filters')
  saleListings(
    @Param('filters') filters: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
  ) {
    return this.listingsApi.saleListings(
      filters || '',
      page ? Number(page) : 1,
      limit ? Number(limit) : 12,
      sort,
    );
  }

  @Get('detail/slug/:slug')
  propertyDetail(@Param('slug') slug: string) {
    return this.listingsApi.propertyDetail(slug);
  }

  @Get('detail_area/slug/:slug')
  detailArea(@Param('slug') slug: string) {
    return this.listingsApi.detailArea(slug);
  }

  @Get('areaguide_detail/slug/:id')
  areaguideDetail(@Param('id') id: string) {
    return this.listingsApi.areaguideDetail(id);
  }

  @Get('similar_listings/property/:id')
  similarListings(@Param('id') id: string) {
    return this.listingsApi.similarListings(Number(id));
  }

  @Get('property__list')
  propertyList() {
    return this.listingsApi.propertyList();
  }

  // ════════════════════════════════════════════════════════════
  //  PHASE 4: Form Submissions (POST)
  // ════════════════════════════════════════════════════════════

  @Post('send_contact')
  sendContact(@Body() body: any) {
    return this.formsApi.sendContact(body);
  }

  @Post('send_enquiry')
  sendEnquiry(@Body() body: any) {
    return this.formsApi.sendEnquiry(body);
  }

  @Post('registration_interest')
  registrationInterest(@Body() body: any) {
    return this.formsApi.registrationInterest(body);
  }

  @Post('save_view_booking')
  saveViewBooking(@Body() body: any) {
    return this.formsApi.saveViewBooking(body);
  }

  @Post('save_service_enquiry_response')
  saveServiceEnquiryResponse(@Body() body: any) {
    return this.formsApi.saveServiceEnquiryResponse(body);
  }

  @Post('brochure_request')
  brochureRequest(@Body() body: any) {
    return this.formsApi.brochureRequest(body);
  }

  @Post('other_request')
  otherRequest(@Body() body: any) {
    return this.formsApi.otherRequest(body);
  }

  @Post('send_list_your_property')
  sendListYourProperty(@Body() body: any) {
    return this.formsApi.sendListYourProperty(body);
  }

  @Post('upload_property_file')
  uploadPropertyFile(@Body() body: any) {
    return this.formsApi.uploadPropertyFile(body);
  }

  @Post('send_property_details')
  sendPropertyDetails(@Body() body: any) {
    return this.formsApi.sendPropertyDetails(body);
  }

  @Post('landing_registrations')
  landingRegistrations(@Body() body: any) {
    return this.formsApi.landingRegistrations(body);
  }

  @Post('subscribe_newsletter')
  subscribeNewsletter(@Body() body: any) {
    return this.formsApi.subscribeNewsletter(body);
  }

  @Post('career')
  career(@Body() body: any) {
    return this.formsApi.career(body);
  }

  @Post('rental_yield_calculator')
  rentalYieldCalculator(@Body() body: any) {
    return this.formsApi.rentalYieldCalculator(body);
  }

  // ════════════════════════════════════════════════════════════
  //  FALLBACK: Proxy unmatched routes to old admin
  // ════════════════════════════════════════════════════════════

  @All('*path')
  async proxyToOldAdmin(@Req() req: Request, @Res() res: Response) {
    const oldAdminBase = 'https://admin.mpinv.cloud/api/site/';
    const fullPath = req.originalUrl.replace(/^\/api\/site\/?/, '');
    const [path, qs] = fullPath.includes('?') ? fullPath.split('?', 2) : [fullPath, ''];
    const url = qs ? `${oldAdminBase}${path}?${qs}` : `${oldAdminBase}${path}`;
    console.log(`[API Proxy Fallback] ${req.method} ${req.originalUrl} -> ${url}`);

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
