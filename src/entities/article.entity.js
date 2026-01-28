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
exports.Article = void 0;
var typeorm_1 = require("typeorm");
var Article = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('mw_article')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _excerpt_decorators;
    var _excerpt_initializers = [];
    var _excerpt_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _featured_image_decorators;
    var _featured_image_initializers = [];
    var _featured_image_extraInitializers = [];
    var _author_id_decorators;
    var _author_id_initializers = [];
    var _author_id_extraInitializers = [];
    var _category_id_decorators;
    var _category_id_initializers = [];
    var _category_id_extraInitializers = [];
    var _tags_decorators;
    var _tags_initializers = [];
    var _tags_extraInitializers = [];
    var _views_decorators;
    var _views_initializers = [];
    var _views_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _featured_decorators;
    var _featured_initializers = [];
    var _featured_extraInitializers = [];
    var _published_at_decorators;
    var _published_at_initializers = [];
    var _published_at_extraInitializers = [];
    var _meta_title_decorators;
    var _meta_title_initializers = [];
    var _meta_title_extraInitializers = [];
    var _meta_description_decorators;
    var _meta_description_initializers = [];
    var _meta_description_extraInitializers = [];
    var _meta_keywords_decorators;
    var _meta_keywords_initializers = [];
    var _meta_keywords_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var Article = _classThis = /** @class */ (function () {
        function Article_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.slug = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.excerpt = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _excerpt_initializers, void 0));
            this.content = (__runInitializers(this, _excerpt_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.featured_image = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _featured_image_initializers, void 0));
            this.author_id = (__runInitializers(this, _featured_image_extraInitializers), __runInitializers(this, _author_id_initializers, void 0));
            this.category_id = (__runInitializers(this, _author_id_extraInitializers), __runInitializers(this, _category_id_initializers, void 0));
            this.tags = (__runInitializers(this, _category_id_extraInitializers), __runInitializers(this, _tags_initializers, void 0)); // JSON array
            this.views = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _views_initializers, void 0));
            this.status = (__runInitializers(this, _views_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.featured = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _featured_initializers, void 0));
            this.published_at = (__runInitializers(this, _featured_extraInitializers), __runInitializers(this, _published_at_initializers, void 0));
            this.meta_title = (__runInitializers(this, _published_at_extraInitializers), __runInitializers(this, _meta_title_initializers, void 0));
            this.meta_description = (__runInitializers(this, _meta_title_extraInitializers), __runInitializers(this, _meta_description_initializers, void 0));
            this.meta_keywords = (__runInitializers(this, _meta_description_extraInitializers), __runInitializers(this, _meta_keywords_initializers, void 0));
            this.created_at = (__runInitializers(this, _meta_keywords_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
        return Article_1;
    }());
    __setFunctionName(_classThis, "Article");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _title_decorators = [(0, typeorm_1.Column)({ length: 255 })];
        _slug_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _excerpt_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _content_decorators = [(0, typeorm_1.Column)({ type: 'longtext', nullable: true })];
        _featured_image_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _author_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _category_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _tags_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _views_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'tinyint', default: 1 })];
        _featured_decorators = [(0, typeorm_1.Column)({ type: 'tinyint', default: 0 })];
        _published_at_decorators = [(0, typeorm_1.Column)({ type: 'datetime', nullable: true })];
        _meta_title_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _meta_description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _meta_keywords_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _excerpt_decorators, { kind: "field", name: "excerpt", static: false, private: false, access: { has: function (obj) { return "excerpt" in obj; }, get: function (obj) { return obj.excerpt; }, set: function (obj, value) { obj.excerpt = value; } }, metadata: _metadata }, _excerpt_initializers, _excerpt_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _featured_image_decorators, { kind: "field", name: "featured_image", static: false, private: false, access: { has: function (obj) { return "featured_image" in obj; }, get: function (obj) { return obj.featured_image; }, set: function (obj, value) { obj.featured_image = value; } }, metadata: _metadata }, _featured_image_initializers, _featured_image_extraInitializers);
        __esDecorate(null, null, _author_id_decorators, { kind: "field", name: "author_id", static: false, private: false, access: { has: function (obj) { return "author_id" in obj; }, get: function (obj) { return obj.author_id; }, set: function (obj, value) { obj.author_id = value; } }, metadata: _metadata }, _author_id_initializers, _author_id_extraInitializers);
        __esDecorate(null, null, _category_id_decorators, { kind: "field", name: "category_id", static: false, private: false, access: { has: function (obj) { return "category_id" in obj; }, get: function (obj) { return obj.category_id; }, set: function (obj, value) { obj.category_id = value; } }, metadata: _metadata }, _category_id_initializers, _category_id_extraInitializers);
        __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: function (obj) { return "tags" in obj; }, get: function (obj) { return obj.tags; }, set: function (obj, value) { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
        __esDecorate(null, null, _views_decorators, { kind: "field", name: "views", static: false, private: false, access: { has: function (obj) { return "views" in obj; }, get: function (obj) { return obj.views; }, set: function (obj, value) { obj.views = value; } }, metadata: _metadata }, _views_initializers, _views_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _featured_decorators, { kind: "field", name: "featured", static: false, private: false, access: { has: function (obj) { return "featured" in obj; }, get: function (obj) { return obj.featured; }, set: function (obj, value) { obj.featured = value; } }, metadata: _metadata }, _featured_initializers, _featured_extraInitializers);
        __esDecorate(null, null, _published_at_decorators, { kind: "field", name: "published_at", static: false, private: false, access: { has: function (obj) { return "published_at" in obj; }, get: function (obj) { return obj.published_at; }, set: function (obj, value) { obj.published_at = value; } }, metadata: _metadata }, _published_at_initializers, _published_at_extraInitializers);
        __esDecorate(null, null, _meta_title_decorators, { kind: "field", name: "meta_title", static: false, private: false, access: { has: function (obj) { return "meta_title" in obj; }, get: function (obj) { return obj.meta_title; }, set: function (obj, value) { obj.meta_title = value; } }, metadata: _metadata }, _meta_title_initializers, _meta_title_extraInitializers);
        __esDecorate(null, null, _meta_description_decorators, { kind: "field", name: "meta_description", static: false, private: false, access: { has: function (obj) { return "meta_description" in obj; }, get: function (obj) { return obj.meta_description; }, set: function (obj, value) { obj.meta_description = value; } }, metadata: _metadata }, _meta_description_initializers, _meta_description_extraInitializers);
        __esDecorate(null, null, _meta_keywords_decorators, { kind: "field", name: "meta_keywords", static: false, private: false, access: { has: function (obj) { return "meta_keywords" in obj; }, get: function (obj) { return obj.meta_keywords; }, set: function (obj, value) { obj.meta_keywords = value; } }, metadata: _metadata }, _meta_keywords_initializers, _meta_keywords_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Article = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Article = _classThis;
}();
exports.Article = Article;
