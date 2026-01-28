"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var PropertiesService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PropertiesService = _classThis = /** @class */ (function () {
        function PropertiesService_1(propertyRepository, propertyImageRepository, propertyAmenityRepository, categoryRepository, subcategoryRepository, communityRepository) {
            this.propertyRepository = propertyRepository;
            this.propertyImageRepository = propertyImageRepository;
            this.propertyAmenityRepository = propertyAmenityRepository;
            this.categoryRepository = categoryRepository;
            this.subcategoryRepository = subcategoryRepository;
            this.communityRepository = communityRepository;
        }
        PropertiesService_1.prototype.findAll = function () {
            return __awaiter(this, arguments, void 0, function (page, limit, filters) {
                var skip, where, _a, data, total, error_1;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                if (filters === void 0) { filters = {}; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            skip = (page - 1) * limit;
                            where = {};
                            // Apply filters
                            if (filters.search) {
                                where.title = (0, typeorm_1.Like)("%".concat(filters.search, "%"));
                            }
                            if (filters.category_id) {
                                where.category_id = filters.category_id;
                            }
                            if (filters.subcategory_id) {
                                where.subcategory_id = filters.subcategory_id;
                            }
                            if (filters.community_id) {
                                where.city = filters.community_id;
                            }
                            if (filters.purpose) {
                                where.purpose = filters.purpose;
                            }
                            if (filters.status) {
                                where.status = filters.status;
                            }
                            // Exclude trashed properties
                            where.is_trash = '0';
                            return [4 /*yield*/, this.propertyRepository.findAndCount({
                                    where: where,
                                    relations: ['category', 'community'],
                                    order: { priority: 'DESC', created_at: 'DESC' },
                                    skip: skip,
                                    take: limit,
                                })];
                        case 1:
                            _a = _b.sent(), data = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: data,
                                    total: total,
                                    page: page,
                                    limit: limit,
                                    totalPages: Math.ceil(total / limit),
                                }];
                        case 2:
                            error_1 = _b.sent();
                            console.error('Error fetching properties:', error_1);
                            return [2 /*return*/, {
                                    data: [],
                                    total: 0,
                                    page: page,
                                    limit: limit,
                                    totalPages: 0,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PropertiesService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.propertyRepository.findOne({
                                    where: { id: id },
                                    relations: ['category', 'community'],
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_2 = _a.sent();
                            console.error('Error fetching property:', error_2);
                            return [2 /*return*/, null];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PropertiesService_1.prototype.getPropertyImages = function (propertyId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.propertyImageRepository.find({
                                    where: { ad_id: propertyId },
                                    order: { sort_order: 'ASC', is_featured: 'DESC' },
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_3 = _a.sent();
                            console.error('Error fetching property images:', error_3);
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PropertiesService_1.prototype.getPropertyAmenities = function (propertyId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.propertyAmenityRepository.find({
                                    where: { ad_id: propertyId },
                                    relations: ['amenity'],
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_4 = _a.sent();
                            console.error('Error fetching property amenities:', error_4);
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PropertiesService_1.prototype.getCategories = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.categoryRepository.find({
                                    where: { status: 1 },
                                    order: { sort_order: 'ASC', name: 'ASC' },
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_5 = _a.sent();
                            console.error('Error fetching categories:', error_5);
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PropertiesService_1.prototype.getSubcategories = function (categoryId) {
            return __awaiter(this, void 0, void 0, function () {
                var where, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            where = { status: 1 };
                            if (categoryId) {
                                where.category_id = categoryId;
                            }
                            return [4 /*yield*/, this.subcategoryRepository.find({
                                    where: where,
                                    order: { sort_order: 'ASC', name: 'ASC' },
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_6 = _a.sent();
                            console.error('Error fetching subcategories:', error_6);
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PropertiesService_1.prototype.getCommunities = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.communityRepository.find({
                                    order: { priority: 'DESC', name: 'ASC' },
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_7 = _a.sent();
                            console.error('Error fetching communities:', error_7);
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PropertiesService_1.prototype.count = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.propertyRepository.count({
                                    where: { is_trash: '0' },
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_8 = _a.sent();
                            console.error('Error counting properties:', error_8);
                            return [2 /*return*/, 0];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PropertiesService_1.prototype.formatPrice = function (price) {
            if (!price)
                return 'Price on Request';
            return new Intl.NumberFormat('en-AE', {
                style: 'currency',
                currency: 'AED',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(price);
        };
        PropertiesService_1.prototype.getPurposeLabel = function (purpose) {
            switch (purpose) {
                case 'S':
                    return 'For Sale';
                case 'R':
                    return 'For Rent';
                default:
                    return purpose || 'Unknown';
            }
        };
        PropertiesService_1.prototype.getStatusLabel = function (status) {
            switch (status) {
                case 'A':
                    return 'Active';
                case 'I':
                    return 'Inactive';
                default:
                    return status || 'Unknown';
            }
        };
        return PropertiesService_1;
    }());
    __setFunctionName(_classThis, "PropertiesService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PropertiesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PropertiesService = _classThis;
}();
exports.PropertiesService = PropertiesService;
