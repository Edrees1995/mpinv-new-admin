import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../../entities';

@Injectable()
export class FormsApiService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
  ) {}

  /** Create a contact entry with common fields */
  private async createContact(data: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    property_id?: number;
    contact_type: string;
    type?: number;
    city?: string;
    url?: string;
  }) {
    const contact = this.contactRepo.create({
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      message: data.message || '',
      property_id: data.property_id || undefined,
      contact_type: data.contact_type as any,
      type: data.type || 1,
      city: data.city || '',
      url: data.url || '',
      date: new Date(),
      is_read: '0',
    });

    await this.contactRepo.save(contact);

    return { status: 'success', message: 'Submitted successfully' };
  }

  // ──── Contact Form ────

  async sendContact(body: any) {
    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.subject ? `${body.subject}: ${body.message}` : body.message,
      contact_type: 'CONTACT',
      type: 1,
    });
  }

  // ──── Enquiry Form (property-specific) ────

  async sendEnquiry(body: any) {
    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      property_id: body.ad_id ? Number(body.ad_id) : undefined,
      contact_type: 'ENQUIRY',
      type: 2,
    });
  }

  // ──── Registration of Interest (offplan) ────

  async registrationInterest(body: any) {
    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message || `Registration of Interest - Project: ${body.project_name || body.ad_id || ''}`,
      property_id: body.ad_id ? Number(body.ad_id) : undefined,
      contact_type: 'ENQUIRY',
      type: 3,
    });
  }

  // ──── View/Booking Request ────

  async saveViewBooking(body: any) {
    const parts = [
      body.message || 'View Booking Request',
      body.preferred_date ? `Date: ${body.preferred_date}` : '',
      body.preferred_time ? `Time: ${body.preferred_time}` : '',
    ].filter(Boolean);

    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: parts.join(' | '),
      property_id: body.ad_id ? Number(body.ad_id) : undefined,
      contact_type: 'ENQUIRY',
      type: 4,
    });
  }

  // ──── Service Enquiry ────

  async saveServiceEnquiryResponse(body: any) {
    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.service_type
        ? `Service: ${body.service_type} - ${body.message || ''}`
        : body.message,
      contact_type: 'ENQUIRY',
      type: 5,
    });
  }

  // ──── Brochure Request ────

  async brochureRequest(body: any) {
    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: `Brochure Request - Project ID: ${body.project_id || body.ad_id || ''}`,
      property_id: body.project_id ? Number(body.project_id) : (body.ad_id ? Number(body.ad_id) : undefined),
      contact_type: 'ENQUIRY',
      type: 6,
    });
  }

  // ──── Other Request ────

  async otherRequest(body: any) {
    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      contact_type: 'CONTACT',
      type: 7,
    });
  }

  // ──── List Your Property ────

  async sendListYourProperty(body: any) {
    const details = [
      body.message || 'List Property Request',
      body.property_type ? `Type: ${body.property_type}` : '',
      body.location ? `Location: ${body.location}` : '',
      body.bedrooms ? `Bedrooms: ${body.bedrooms}` : '',
      body.price ? `Price: ${body.price}` : '',
    ].filter(Boolean);

    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: details.join(' | '),
      contact_type: 'CONTACT',
      type: 8,
    });
  }

  // ──── Upload Property File (stub - file handling requires Multer) ────

  async uploadPropertyFile(body: any, file?: any) {
    // File upload would need Multer middleware.
    // For now, store reference in message.
    return this.createContact({
      name: body.name || '',
      email: body.email || '',
      phone: body.phone || '',
      message: `Property File Upload - ${file?.originalname || 'no file'}`,
      contact_type: 'CONTACT',
      type: 9,
    });
  }

  // ──── Send Property Details ────

  async sendPropertyDetails(body: any) {
    const details = [
      body.message || 'Property Details Submission',
      body.property_type ? `Type: ${body.property_type}` : '',
      body.category ? `Category: ${body.category}` : '',
      body.location ? `Location: ${body.location}` : '',
      body.bedrooms ? `Bedrooms: ${body.bedrooms}` : '',
      body.bathrooms ? `Bathrooms: ${body.bathrooms}` : '',
      body.size ? `Size: ${body.size}` : '',
      body.price ? `Price: ${body.price}` : '',
      body.description ? `Description: ${body.description}` : '',
    ].filter(Boolean);

    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: details.join(' | '),
      contact_type: 'CONTACT',
      type: 10,
    });
  }

  // ──── Landing Page Registrations ────

  async landingRegistrations(body: any) {
    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message || `Landing page registration - Source: ${body.source || body.utm_source || ''}`,
      url: body.source || body.utm_source || body.page_url || '',
      contact_type: 'CONTACT',
      type: 11,
    });
  }

  // ──── Newsletter ────

  async subscribeNewsletter(body: any) {
    return this.createContact({
      email: body.email,
      message: 'Newsletter Subscription',
      contact_type: 'CONTACT',
      type: 12,
    });
  }

  // ──── Career Application ────

  async career(body: any, file?: any) {
    const details = [
      'Career Application',
      body.position ? `Position: ${body.position}` : '',
      body.message || '',
      file?.originalname ? `Resume: ${file.originalname}` : '',
    ].filter(Boolean);

    return this.createContact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: details.join(' | '),
      contact_type: 'CONTACT',
      type: 13,
    });
  }

  // ──── Rental Yield Calculator ────

  async rentalYieldCalculator(body: any) {
    const purchasePrice = Number(body.purchase_price) || 0;
    const annualRent = Number(body.annual_rent) || 0;
    const annualCharges = Number(body.annual_charges) || 0;

    const grossYield = purchasePrice > 0 ? (annualRent / purchasePrice) * 100 : 0;
    const netYield = purchasePrice > 0
      ? ((annualRent - annualCharges) / purchasePrice) * 100
      : 0;

    return {
      status: 'success',
      data: {
        purchase_price: purchasePrice,
        annual_rent: annualRent,
        annual_charges: annualCharges,
        gross_yield: Math.round(grossYield * 100) / 100,
        net_yield: Math.round(netYield * 100) / 100,
      },
    };
  }
}
