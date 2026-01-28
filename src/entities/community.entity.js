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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Community = void 0;
var typeorm_1 = require("typeorm");
var sub_community_entity_1 = require("./sub-community.entity");
var Community = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('mw_community')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _stateid_decorators;
    var _stateid_initializers = [];
    var _stateid_extraInitializers = [];
    var _district_id_decorators;
    var _district_id_initializers = [];
    var _district_id_extraInitializers = [];
    var _city_id_decorators;
    var _city_id_initializers = [];
    var _city_id_extraInitializers = [];
    var _has_sub_communities_decorators;
    var _has_sub_communities_initializers = [];
    var _has_sub_communities_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _meta_title_decorators;
    var _meta_title_initializers = [];
    var _meta_title_extraInitializers = [];
    var _meta_description_decorators;
    var _meta_description_initializers = [];
    var _meta_description_extraInitializers = [];
    var _highend_decorators;
    var _highend_initializers = [];
    var _highend_extraInitializers = [];
    var _featured_decorators;
    var _featured_initializers = [];
    var _featured_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _image_decorators;
    var _image_initializers = [];
    var _image_extraInitializers = [];
    var _image2_decorators;
    var _image2_initializers = [];
    var _image2_extraInitializers = [];
    var _subCommunities_decorators;
    var _subCommunities_initializers = [];
    var _subCommunities_extraInitializers = [];
    var Community = _classThis = /** @class */ (function () {
        function Community_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.stateid = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _stateid_initializers, void 0));
            this.district_id = (__runInitializers(this, _stateid_extraInitializers), __runInitializers(this, _district_id_initializers, void 0));
            this.city_id = (__runInitializers(this, _district_id_extraInitializers), __runInitializers(this, _city_id_initializers, void 0));
            this.has_sub_communities = (__runInitializers(this, _city_id_extraInitializers), __runInitializers(this, _has_sub_communities_initializers, void 0));
            this.slug = (__runInitializers(this, _has_sub_communities_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.meta_title = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _meta_title_initializers, void 0));
            this.meta_description = (__runInitializers(this, _meta_title_extraInitializers), __runInitializers(this, _meta_description_initializers, void 0));
            this.highend = (__runInitializers(this, _meta_description_extraInitializers), __runInitializers(this, _highend_initializers, void 0));
            this.featured = (__runInitializers(this, _highend_extraInitializers), __runInitializers(this, _featured_initializers, void 0));
            this.priority = (__runInitializers(this, _featured_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
            this.image = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _image_initializers, void 0));
            this.image2 = (__runInitializers(this, _image_extraInitializers), __runInitializers(this, _image2_initializers, void 0));
            // Relations
            this.subCommunities = (__runInitializers(this, _image2_extraInitializers), __runInitializers(this, _subCommunities_initializers, void 0));
            __runInitializers(this, _subCommunities_extraInitializers);
        }
        return Community_1;
    }());
    __setFunctionName(_classThis, "Community");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)({ name: 'community_id' })];
        _name_decorators = [(0, typeorm_1.Column)({ name: 'community_name', length: 250 })];
        _stateid_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _district_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _city_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _has_sub_communities_decorators = [(0, typeorm_1.Column)({ name: 'HaveSubComm', length: 5, default: '0' })];
        _slug_decorators = [(0, typeorm_1.Column)({ length: 250, nullable: true })];
        _meta_title_decorators = [(0, typeorm_1.Column)({ length: 150, nullable: true })];
        _meta_description_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _highend_decorators = [(0, typeorm_1.Column)({ length: 1, nullable: true })];
        _featured_decorators = [(0, typeorm_1.Column)({ length: 1, nullable: true })];
        _priority_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _image_decorators = [(0, typeorm_1.Column)({ length: 150, nullable: true })];
        _image2_decorators = [(0, typeorm_1.Column)({ length: 150, nullable: true })];
        _subCommunities_decorators = [(0, typeorm_1.OneToMany)(function () { return sub_community_entity_1.SubCommunity; }, function (sub) { return sub.community; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _stateid_decorators, { kind: "field", name: "stateid", static: false, private: false, access: { has: function (obj) { return "stateid" in obj; }, get: function (obj) { return obj.stateid; }, set: function (obj, value) { obj.stateid = value; } }, metadata: _metadata }, _stateid_initializers, _stateid_extraInitializers);
        __esDecorate(null, null, _district_id_decorators, { kind: "field", name: "district_id", static: false, private: false, access: { has: function (obj) { return "district_id" in obj; }, get: function (obj) { return obj.district_id; }, set: function (obj, value) { obj.district_id = value; } }, metadata: _metadata }, _district_id_initializers, _district_id_extraInitializers);
        __esDecorate(null, null, _city_id_decorators, { kind: "field", name: "city_id", static: false, private: false, access: { has: function (obj) { return "city_id" in obj; }, get: function (obj) { return obj.city_id; }, set: function (obj, value) { obj.city_id = value; } }, metadata: _metadata }, _city_id_initializers, _city_id_extraInitializers);
        __esDecorate(null, null, _has_sub_communities_decorators, { kind: "field", name: "has_sub_communities", static: false, private: false, access: { has: function (obj) { return "has_sub_communities" in obj; }, get: function (obj) { return obj.has_sub_communities; }, set: function (obj, value) { obj.has_sub_communities = value; } }, metadata: _metadata }, _has_sub_communities_initializers, _has_sub_communities_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _meta_title_decorators, { kind: "field", name: "meta_title", static: false, private: false, access: { has: function (obj) { return "meta_title" in obj; }, get: function (obj) { return obj.meta_title; }, set: function (obj, value) { obj.meta_title = value; } }, metadata: _metadata }, _meta_title_initializers, _meta_title_extraInitializers);
        __esDecorate(null, null, _meta_description_decorators, { kind: "field", name: "meta_description", static: false, private: false, access: { has: function (obj) { return "meta_description" in obj; }, get: function (obj) { return obj.meta_description; }, set: function (obj, value) { obj.meta_description = value; } }, metadata: _metadata }, _meta_description_initializers, _meta_description_extraInitializers);
        __esDecorate(null, null, _highend_decorators, { kind: "field", name: "highend", static: false, private: false, access: { has: function (obj) { return "highend" in obj; }, get: function (obj) { return obj.highend; }, set: function (obj, value) { obj.highend = value; } }, metadata: _metadata }, _highend_initializers, _highend_extraInitializers);
        __esDecorate(null, null, _featured_decorators, { kind: "field", name: "featured", static: false, private: false, access: { has: function (obj) { return "featured" in obj; }, get: function (obj) { return obj.featured; }, set: function (obj, value) { obj.featured = value; } }, metadata: _metadata }, _featured_initializers, _featured_extraInitializers);
        __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
        __esDecorate(null, null, _image_decorators, { kind: "field", name: "image", static: false, private: false, access: { has: function (obj) { return "image" in obj; }, get: function (obj) { return obj.image; }, set: function (obj, value) { obj.image = value; } }, metadata: _metadata }, _image_initializers, _image_extraInitializers);
        __esDecorate(null, null, _image2_decorators, { kind: "field", name: "image2", static: false, private: false, access: { has: function (obj) { return "image2" in obj; }, get: function (obj) { return obj.image2; }, set: function (obj, value) { obj.image2 = value; } }, metadata: _metadata }, _image2_initializers, _image2_extraInitializers);
        __esDecorate(null, null, _subCommunities_decorators, { kind: "field", name: "subCommunities", static: false, private: false, access: { has: function (obj) { return "subCommunities" in obj; }, get: function (obj) { return obj.subCommunities; }, set: function (obj, value) { obj.subCommunities = value; } }, metadata: _metadata }, _subCommunities_initializers, _subCommunities_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Community = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Community = _classThis;
}();
exports.Community = Community;
