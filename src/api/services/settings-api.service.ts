import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../../entities';

@Injectable()
export class SettingsApiService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
  ) {}

  /** Convert Buffer option_value to string */
  private val(setting: Setting | null | undefined): string {
    if (!setting) return '';
    const v = setting.option_value;
    return v instanceof Buffer ? v.toString('utf8') : String(v || '');
  }

  /** Fetch all settings as flat key-value map */
  private async getAllSettings(): Promise<Record<string, string>> {
    const settings = await this.settingRepository.find();
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.option_key] = this.val(s);
    }
    return map;
  }

  /** Fetch settings for a category as key-value map */
  private async getCategorySettings(category: string): Promise<Record<string, string>> {
    const settings = await this.settingRepository.find({ where: { category } });
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.option_key] = this.val(s);
    }
    return map;
  }

  // ──── Meta Tag Endpoints ────
  // Frontend expects: { home_title, home_description, home_keywords } for home
  // or { meta_title, meta_description, meta_keywords } for others

  async homeMetaTags() {
    const map = await this.getCategorySettings('home');
    return {
      home_title: map['home_title'] || map['meta_title'] || '',
      home_description: map['home_description'] || map['meta_description'] || '',
      home_keywords: map['home_keywords'] || map['meta_keywords'] || '',
    };
  }

  async forSaleMetaTags() {
    const map = await this.getCategorySettings('forsale');
    return {
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
    };
  }

  async offplanListingsMetaTags() {
    const map = await this.getCategorySettings('offplan');
    return {
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
    };
  }

  async featuredProjectsMetaTags() {
    const map = await this.getCategorySettings('featured_projects');
    return {
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
    };
  }

  async faqsMetaTags() {
    const map = await this.getCategorySettings('faqs');
    return {
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
    };
  }

  async guideMetaTags() {
    const map = await this.getCategorySettings('guide');
    return {
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
    };
  }

  async blogMetaTags() {
    const map = await this.getCategorySettings('blog');
    return {
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
    };
  }

  async developersMetaTags() {
    const map = await this.getCategorySettings('developers');
    return {
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
    };
  }

  async careerMetaTags() {
    const map = await this.getCategorySettings('career');
    return {
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
    };
  }

  async rentalYieldCalculatorMetaTags() {
    const map = await this.getCategorySettings('rental_yield_calculator');
    return {
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
    };
  }

  async areasMetaTags() {
    const map = await this.getCategorySettings('areas');
    return {
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
    };
  }

  // ──── Footer Variables ────
  // Frontend expects: flat { facebook, twitter, phone, email, ... }
  async footerVariables() {
    return this.getAllSettings();
  }

  // ──── Contact Variables ────
  // Frontend expects: flat { phone, email, headerTitle, sub_title, banner, address, ... }
  async contactVariables() {
    return this.getCategorySettings('contact');
  }

  // ──── ROI Variables ────
  async getRoiVariables() {
    return this.getCategorySettings('roi');
  }

  // ──── Page Content ────
  // Frontend expects: { banner, headerTitle, content, ... }
  private async getPageContent(category: string) {
    const map = await this.getCategorySettings(category);
    return {
      banner: map['banner'] || '',
      headerTitle: map['header_title'] || map['title'] || '',
      content: map['content'] || '',
      meta_title: map['meta_title'] || '',
      meta_description: map['meta_description'] || '',
      meta_keywords: map['meta_keywords'] || '',
      ...map,
    };
  }

  async privacyPolicy() {
    return this.getPageContent('privacy_policy');
  }

  async cookiesPolicy() {
    return this.getPageContent('cookies_policy');
  }

  async termsAndConditions() {
    return this.getPageContent('terms_and_conditions');
  }

  async investorZonePageDetail() {
    return this.getPageContent('investor_zone');
  }

  // ──── Masterpiece Sections ────
  async masterpieceSections() {
    const categories = ['about', 'mission', 'vision', 'about_us'];
    const result: Record<string, Record<string, string>> = {};
    for (const cat of categories) {
      result[cat] = await this.getCategorySettings(cat);
    }
    return result;
  }

  // ──── List Property Variables ────
  async listPropertyVariable() {
    return this.getCategorySettings('list_property');
  }

  // ──── Currency Preference ────
  async currencyPreferenceFetchInfo() {
    return this.getCategorySettings('currency');
  }
}
