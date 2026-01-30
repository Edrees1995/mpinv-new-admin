import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../entities';

export interface CategorySummary {
  category: string;
  label: string;
  count: number;
}

export interface SettingItem {
  category: string;
  key: string;
  value: string;
  isSerialized: boolean;
  lastUpdated: Date;
}

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
  ) {}

  private val(setting: Setting): string {
    if (!setting.option_value) return '';
    if (Buffer.isBuffer(setting.option_value)) {
      return setting.option_value.toString('utf8');
    }
    return String(setting.option_value);
  }

  private categoryLabel(category: string): string {
    const labels: Record<string, string> = {
      'system.common': 'General Settings',
      'system.meta': 'SEO & Meta Tags',
      'system.urls': 'URL Configuration',
      'system.license': 'License',
      'system.cron.send_campaigns': 'Campaign Cron',
      'system.cron.process_delivery_bounce': 'Bounce Processing',
      'system.campaign.attachments': 'Campaign Attachments',
      'system.campaign.template_tags': 'Campaign Template Tags',
      'system.common.version_update': 'Version Updates',
      'system.email_blacklist': 'Email Blacklist',
      'system.email_templates': 'Email Templates',
      'system.exporter': 'Data Exporter',
      'system.importer': 'Data Importer',
      'system.theme.backend': 'Backend Theme',
      'system.theme.frontend': 'Frontend Theme',
      'system.extension.backup-manager': 'Backup Manager',
      'system.extension.backup-manager.data': 'Backup Manager Data',
      'system.extension.ckeditor': 'CKEditor',
      'system.extension.ckeditor.data': 'CKEditor Data',
      'system.extension.propspace_xml': 'Propspace XML',
      'system.extension.propspace_xml.data': 'Propspace XML Data',
      'system.extension.xml': 'XML Extension',
      'system.extension.xml.data': 'XML Extension Data',
      'system.extension.zen_xml': 'Zen XML',
      'system.extension.blog': 'Blog Extension',
      'system.extension.translate': 'Translation',
      'system.extension.translate.data': 'Translation Data',
    };
    return labels[category] || category.replace(/^system\./, '').replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  async getCategories(): Promise<CategorySummary[]> {
    const results = await this.settingRepository
      .createQueryBuilder('s')
      .select('s.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('s.category')
      .orderBy('s.category', 'ASC')
      .getRawMany();

    return results.map(r => ({
      category: r.category,
      label: this.categoryLabel(r.category),
      count: parseInt(r.count, 10),
    }));
  }

  async getCategorySettings(
    category: string,
    search?: string,
  ): Promise<SettingItem[]> {
    const qb = this.settingRepository
      .createQueryBuilder('s')
      .where('s.category = :category', { category });

    if (search) {
      qb.andWhere('s.option_key LIKE :search', { search: `%${search}%` });
    }

    qb.orderBy('s.option_key', 'ASC');
    const settings = await qb.getMany();

    return settings.map(s => ({
      category: s.category,
      key: s.option_key,
      value: this.val(s),
      isSerialized: s.is_serialized === 1,
      lastUpdated: s.last_updated,
    }));
  }

  async getSetting(category: string, key: string): Promise<SettingItem> {
    const setting = await this.settingRepository.findOne({
      where: { category, option_key: key },
    });
    if (!setting) {
      throw new NotFoundException(
        `Setting "${key}" in category "${category}" not found`,
      );
    }
    return {
      category: setting.category,
      key: setting.option_key,
      value: this.val(setting),
      isSerialized: setting.is_serialized === 1,
      lastUpdated: setting.last_updated,
    };
  }

  async updateSetting(
    category: string,
    key: string,
    value: string,
  ): Promise<void> {
    const setting = await this.settingRepository.findOne({
      where: { category, option_key: key },
    });
    if (!setting) {
      throw new NotFoundException(
        `Setting "${key}" in category "${category}" not found`,
      );
    }
    setting.option_value = Buffer.from(value, 'utf8');
    setting.last_updated = new Date();
    await this.settingRepository.save(setting);
  }

  async createSetting(
    category: string,
    key: string,
    value: string,
  ): Promise<void> {
    const existing = await this.settingRepository.findOne({
      where: { category, option_key: key },
    });
    if (existing) {
      throw new Error(`Setting "${key}" already exists in "${category}"`);
    }
    const setting = this.settingRepository.create({
      category,
      option_key: key,
      option_value: Buffer.from(value, 'utf8'),
      is_serialized: 0,
      date_added: new Date(),
      last_updated: new Date(),
    });
    await this.settingRepository.save(setting);
  }

  async removeSetting(category: string, key: string): Promise<void> {
    const setting = await this.settingRepository.findOne({
      where: { category, option_key: key },
    });
    if (!setting) {
      throw new NotFoundException(
        `Setting "${key}" in category "${category}" not found`,
      );
    }
    await this.settingRepository.remove(setting);
  }

  getCategoryLabel(category: string): string {
    return this.categoryLabel(category);
  }
}
