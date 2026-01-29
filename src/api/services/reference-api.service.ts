import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Developer,
  Community,
  SubCommunity,
  Category,
  Subcategory,
  Setting,
  OffplanProject,
} from '../../entities';

function settingVal(s: Setting | null | undefined): string {
  if (!s) return '';
  const v = s.option_value;
  return v instanceof Buffer ? v.toString('utf8') : String(v || '');
}

@Injectable()
export class ReferenceApiService {
  constructor(
    @InjectRepository(Developer)
    private developerRepo: Repository<Developer>,
    @InjectRepository(Community)
    private communityRepo: Repository<Community>,
    @InjectRepository(SubCommunity)
    private subCommunityRepo: Repository<SubCommunity>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepo: Repository<Subcategory>,
    @InjectRepository(Setting)
    private settingRepo: Repository<Setting>,
    @InjectRepository(OffplanProject)
    private projectRepo: Repository<OffplanProject>,
  ) {}

  // ──── Developers List ────
  // Frontend expects: { data: { title, sub_title, banner_image, developers: [{slug, name, logo}] } }
  async developersList() {
    const bannerSetting = await this.settingRepo.findOne({
      where: { category: 'developers', option_key: 'banner' },
    });
    const titleSetting = await this.settingRepo.findOne({
      where: { category: 'developers', option_key: 'header_title' },
    });
    const subTitleSetting = await this.settingRepo.findOne({
      where: { category: 'developers', option_key: 'sub_title' },
    });
    const bannerImageSetting = await this.settingRepo.findOne({
      where: { category: 'developers', option_key: 'banner_image' },
    });

    const developers = await this.developerRepo.find({
      where: { is_trash: '0', status: 'A' },
      order: { priority: 'ASC', name: 'ASC' },
    });

    return {
      data: {
        title: settingVal(titleSetting) || 'Real Estate Developers',
        sub_title: settingVal(subTitleSetting) || '',
        banner_image: settingVal(bannerImageSetting) || settingVal(bannerSetting) || '',
        developers: developers.map((d) => ({
          slug: d.slug || '',
          name: d.name,
          logo: d.logo || '',
        })),
      },
    };
  }

  // ──── All Developers (simple list) ────
  async developersAll() {
    const developers = await this.developerRepo.find({
      where: { is_trash: '0' },
      order: { name: 'ASC' },
    });

    return developers.map((d) => ({
      developer_id: d.id,
      developer_name: d.name,
      slug: d.slug,
      logo: d.logo || '',
    }));
  }

  // ──── Community List ────
  async communityList() {
    const communities = await this.communityRepo.find({
      relations: ['subCommunities'],
      order: { priority: 'ASC', name: 'ASC' },
    });

    return communities.map((c) => ({
      community_id: c.id,
      community_name: c.name,
      slug: c.slug,
      image: c.image || '',
      image2: c.image2 || '',
      meta_title: c.meta_title,
      meta_description: c.meta_description,
      highend: c.highend,
      featured: c.featured,
      priority: c.priority,
      sub_communities: (c.subCommunities || []).map((sc) => ({
        sub_community_id: sc.id,
        sub_community_name: sc.name,
        slug: sc.slug,
      })),
    }));
  }

  // ──── High-end Locations ────
  async highendLocations() {
    const communities = await this.communityRepo.find({
      where: { highend: '1' },
      order: { priority: 'ASC', name: 'ASC' },
    });

    const result: Array<Record<string, any>> = [];
    for (const c of communities) {
      const projectCount = await this.projectRepo.count({
        where: { community_id: c.id, is_trash: '0', status: 'A' },
      });
      result.push({
        community_id: c.id,
        community_name: c.name,
        slug: c.slug,
        image: c.image || '',
        project_count: projectCount,
      });
    }

    return result;
  }

  // ──── Form Values (property filter dropdowns) ────
  // Frontend expects: { propertyTypes: { commercial, residential }, minBeds, minPrice, maxPrice }
  async formValues() {
    const categories = await this.categoryRepo.find({
      where: { is_trash: '0', status: 'A' },
      order: { priority: 'ASC', name: 'ASC' },
    });

    const communities = await this.communityRepo.find({
      order: { name: 'ASC' },
    });

    const subCommunities = await this.subCommunityRepo.find({
      order: { name: 'ASC' },
    });

    // Build property types grouped by listing_type
    const residential: Record<string, string> = {};
    const commercial: Record<string, string> = {};
    for (const c of categories) {
      const key = c.slug || c.name.toLowerCase().replace(/\s+/g, '-');
      if (c.listing_type === 'C') {
        commercial[key] = c.name;
      } else {
        residential[key] = c.name;
      }
    }

    return {
      propertyTypes: { residential, commercial },
      minBeds: { '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7+' },
      minPrice: {
        forsale: {
          '200000': 200000, '400000': 400000, '600000': 600000,
          '800000': 800000, '1000000': 1000000, '2000000': 2000000,
          '3000000': 3000000, '5000000': 5000000, '10000000': 10000000,
        },
        rentprice: {
          '20000': 20000, '40000': 40000, '60000': 60000,
          '80000': 80000, '100000': 100000, '150000': 150000,
          '200000': 200000, '300000': 300000, '500000': 500000,
        },
      },
      maxPrice: {
        forsale: {
          '500000': 500000, '1000000': 1000000, '2000000': 2000000,
          '3000000': 3000000, '5000000': 5000000, '10000000': 10000000,
          '20000000': 20000000, '50000000': 50000000,
        },
        rentprice: {
          '50000': 50000, '80000': 80000, '100000': 100000,
          '150000': 150000, '200000': 200000, '300000': 300000,
          '500000': 500000, '1000000': 1000000,
        },
      },
      communities: communities.map((c) => ({
        community_id: c.id,
        community_name: c.name,
        slug: c.slug,
      })),
      sub_communities: subCommunities.map((sc) => ({
        sub_community_id: sc.id,
        sub_community_name: sc.name,
        community_id: sc.community_id,
        slug: sc.slug,
      })),
    };
  }

  // ──── Offplan Form Values ────
  async formOffplanValues() {
    const categories = await this.categoryRepo.find({
      where: { is_trash: '0', status: 'A' },
      order: { priority: 'ASC', name: 'ASC' },
    });

    const communities = await this.communityRepo.find({
      order: { name: 'ASC' },
    });

    const developers = await this.developerRepo.find({
      where: { is_trash: '0', status: 'A' },
      order: { name: 'ASC' },
    });

    return {
      categories: categories.map((c) => ({
        category_id: c.id,
        category_name: c.name,
        slug: c.slug,
      })),
      communities: communities.map((c) => ({
        community_id: c.id,
        community_name: c.name,
        slug: c.slug,
      })),
      developers: developers.map((d) => ({
        developer_id: d.id,
        developer_name: d.name,
        slug: d.slug,
      })),
    };
  }

  // ──── Fetch Types ────
  async fetchTypes2() {
    const categories = await this.categoryRepo.find({
      where: { is_trash: '0', status: 'A' },
      order: { priority: 'ASC' },
    });

    const subcategories = await this.subcategoryRepo.find({
      where: { is_trash: '0', status: 'A' },
      order: { priority: 'ASC' },
    });

    return {
      categories: categories.map((c) => ({
        category_id: c.id,
        category_name: c.name,
        slug: c.slug,
        short_name: c.short_name,
        listing_type: c.listing_type,
        icon: c.icon,
      })),
      subcategories: subcategories.map((sc) => ({
        sub_category_id: sc.id,
        sub_category_name: sc.name,
        category_id: sc.category_id,
        slug: sc.slug,
      })),
    };
  }

  // ──── Listing Category ────
  async listingCategory() {
    const categories = await this.categoryRepo.find({
      where: { is_trash: '0', status: 'A' },
      order: { priority: 'ASC', name: 'ASC' },
    });

    return categories.map((c) => ({
      category_id: c.id,
      category_name: c.name,
      slug: c.slug,
      short_name: c.short_name,
    }));
  }

  // ──── Listing Designation ────
  async listingDesignation() {
    const settings = await this.settingRepo.find({
      where: { category: 'career' },
    });
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.option_key] = settingVal(s);
    }
    const raw = map['designations'] || map['positions'] || '';
    let designations: string[] = [];
    try {
      designations = JSON.parse(raw);
    } catch {
      designations = raw ? raw.split(',').map((s) => s.trim()) : [];
    }
    return designations;
  }
}
