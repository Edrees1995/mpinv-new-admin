"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.PropertiesController = void 0;
var common_1 = require("@nestjs/common");
var PropertiesController = function () {
    var _classDecorators = [(0, common_1.Controller)('properties')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _list_decorators;
    var _view_decorators;
    var PropertiesController = _classThis = /** @class */ (function () {
        function PropertiesController_1(propertiesService) {
            this.propertiesService = (__runInitializers(this, _instanceExtraInitializers), propertiesService);
        }
        PropertiesController_1.prototype.list = function (page, limit, search, categoryId, subcategoryId, communityId, purpose, status) {
            return __awaiter(this, void 0, void 0, function () {
                var filters, _a, result, categories, subcategories, communities, properties, paginationRange;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            filters = {
                                search: search,
                                category_id: categoryId ? parseInt(categoryId, 10) : undefined,
                                subcategory_id: subcategoryId ? parseInt(subcategoryId, 10) : undefined,
                                community_id: communityId ? parseInt(communityId, 10) : undefined,
                                purpose: purpose,
                                status: status,
                            };
                            return [4 /*yield*/, Promise.all([
                                    this.propertiesService.findAll(page, limit, filters),
                                    this.propertiesService.getCategories(),
                                    this.propertiesService.getSubcategories(),
                                    this.propertiesService.getCommunities(),
                                ])];
                        case 1:
                            _a = _b.sent(), result = _a[0], categories = _a[1], subcategories = _a[2], communities = _a[3];
                            properties = result.data.map(function (property) { return (__assign(__assign({}, property), { formattedPrice: _this.propertiesService.formatPrice(Number(property.price)), purposeLabel: _this.propertiesService.getPurposeLabel(property.purpose), statusLabel: _this.propertiesService.getStatusLabel(property.status), isActive: property.status === 'A' })); });
                            paginationRange = this.generatePaginationRange(result.page, result.totalPages);
                            return [2 /*return*/, {
                                    title: 'Properties',
                                    properties: properties,
                                    pagination: __assign(__assign({}, result), { hasPrev: page > 1, hasNext: page < result.totalPages, prevPage: page - 1, nextPage: page + 1, range: paginationRange }),
                                    filters: {
                                        search: search || '',
                                        category_id: categoryId || '',
                                        subcategory_id: subcategoryId || '',
                                        community_id: communityId || '',
                                        purpose: purpose || '',
                                        status: status || '',
                                    },
                                    categories: categories,
                                    subcategories: subcategories,
                                    communities: communities,
                                    bitrixNote: 'Properties are synced from Bitrix24 XML feeds. This is a read-only view.',
                                }];
                    }
                });
            });
        };
        PropertiesController_1.prototype.view = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var property, _a, images, amenities, formattedProperty, featuredImage;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.propertiesService.findOne(id)];
                        case 1:
                            property = _b.sent();
                            if (!property) {
                                return [2 /*return*/, {
                                        title: 'Property Not Found',
                                        error: 'The requested property was not found.',
                                        property: null,
                                    }];
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.propertiesService.getPropertyImages(id),
                                    this.propertiesService.getPropertyAmenities(id),
                                ])];
                        case 2:
                            _a = _b.sent(), images = _a[0], amenities = _a[1];
                            formattedProperty = __assign(__assign({}, property), { formattedPrice: this.propertiesService.formatPrice(Number(property.price)), purposeLabel: this.propertiesService.getPurposeLabel(property.purpose), statusLabel: this.propertiesService.getStatusLabel(property.status), isActive: property.status === 'A', formattedDate: property.created_at
                                    ? new Date(property.created_at).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })
                                    : 'N/A' });
                            featuredImage = images.find(function (img) { return img.is_featured === 1; }) || images[0];
                            return [2 /*return*/, {
                                    title: property.title,
                                    property: formattedProperty,
                                    images: images,
                                    featuredImage: featuredImage,
                                    amenities: amenities.map(function (pa) { return pa.amenity; }).filter(Boolean),
                                    bitrixNote: 'This property is synced from Bitrix24. Editing is disabled.',
                                }];
                    }
                });
            });
        };
        PropertiesController_1.prototype.generatePaginationRange = function (currentPage, totalPages) {
            var range = [];
            var delta = 2;
            for (var i = 1; i <= totalPages; i++) {
                if (i === 1 ||
                    i === totalPages ||
                    (i >= currentPage - delta && i <= currentPage + delta)) {
                    range.push({ page: i, isCurrent: i === currentPage });
                }
                else if (range.length > 0 && !('isEllipsis' in range[range.length - 1])) {
                    range.push({ isEllipsis: true });
                }
            }
            return range;
        };
        return PropertiesController_1;
    }());
    __setFunctionName(_classThis, "PropertiesController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _list_decorators = [(0, common_1.Get)(), (0, common_1.Render)('properties/list')];
        _view_decorators = [(0, common_1.Get)(':id'), (0, common_1.Render)('properties/view')];
        __esDecorate(_classThis, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: function (obj) { return "list" in obj; }, get: function (obj) { return obj.list; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _view_decorators, { kind: "method", name: "view", static: false, private: false, access: { has: function (obj) { return "view" in obj; }, get: function (obj) { return obj.view; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PropertiesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PropertiesController = _classThis;
}();
exports.PropertiesController = PropertiesController;
