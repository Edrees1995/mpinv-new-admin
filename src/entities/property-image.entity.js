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
exports.PropertyImage = void 0;
var typeorm_1 = require("typeorm");
var PropertyImage = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('mw_ad_image')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _ad_id_decorators;
    var _ad_id_initializers = [];
    var _ad_id_extraInitializers = [];
    var _image_decorators;
    var _image_initializers = [];
    var _image_extraInitializers = [];
    var _thumbnail_decorators;
    var _thumbnail_initializers = [];
    var _thumbnail_extraInitializers = [];
    var _alt_text_decorators;
    var _alt_text_initializers = [];
    var _alt_text_extraInitializers = [];
    var _sort_order_decorators;
    var _sort_order_initializers = [];
    var _sort_order_extraInitializers = [];
    var _is_featured_decorators;
    var _is_featured_initializers = [];
    var _is_featured_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var PropertyImage = _classThis = /** @class */ (function () {
        function PropertyImage_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.ad_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _ad_id_initializers, void 0));
            this.image = (__runInitializers(this, _ad_id_extraInitializers), __runInitializers(this, _image_initializers, void 0));
            this.thumbnail = (__runInitializers(this, _image_extraInitializers), __runInitializers(this, _thumbnail_initializers, void 0));
            this.alt_text = (__runInitializers(this, _thumbnail_extraInitializers), __runInitializers(this, _alt_text_initializers, void 0));
            this.sort_order = (__runInitializers(this, _alt_text_extraInitializers), __runInitializers(this, _sort_order_initializers, void 0));
            this.is_featured = (__runInitializers(this, _sort_order_extraInitializers), __runInitializers(this, _is_featured_initializers, void 0));
            this.created_at = (__runInitializers(this, _is_featured_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            __runInitializers(this, _created_at_extraInitializers);
        }
        return PropertyImage_1;
    }());
    __setFunctionName(_classThis, "PropertyImage");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _ad_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _image_decorators = [(0, typeorm_1.Column)({ length: 255 })];
        _thumbnail_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _alt_text_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _sort_order_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _is_featured_decorators = [(0, typeorm_1.Column)({ type: 'tinyint', default: 0 })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _ad_id_decorators, { kind: "field", name: "ad_id", static: false, private: false, access: { has: function (obj) { return "ad_id" in obj; }, get: function (obj) { return obj.ad_id; }, set: function (obj, value) { obj.ad_id = value; } }, metadata: _metadata }, _ad_id_initializers, _ad_id_extraInitializers);
        __esDecorate(null, null, _image_decorators, { kind: "field", name: "image", static: false, private: false, access: { has: function (obj) { return "image" in obj; }, get: function (obj) { return obj.image; }, set: function (obj, value) { obj.image = value; } }, metadata: _metadata }, _image_initializers, _image_extraInitializers);
        __esDecorate(null, null, _thumbnail_decorators, { kind: "field", name: "thumbnail", static: false, private: false, access: { has: function (obj) { return "thumbnail" in obj; }, get: function (obj) { return obj.thumbnail; }, set: function (obj, value) { obj.thumbnail = value; } }, metadata: _metadata }, _thumbnail_initializers, _thumbnail_extraInitializers);
        __esDecorate(null, null, _alt_text_decorators, { kind: "field", name: "alt_text", static: false, private: false, access: { has: function (obj) { return "alt_text" in obj; }, get: function (obj) { return obj.alt_text; }, set: function (obj, value) { obj.alt_text = value; } }, metadata: _metadata }, _alt_text_initializers, _alt_text_extraInitializers);
        __esDecorate(null, null, _sort_order_decorators, { kind: "field", name: "sort_order", static: false, private: false, access: { has: function (obj) { return "sort_order" in obj; }, get: function (obj) { return obj.sort_order; }, set: function (obj, value) { obj.sort_order = value; } }, metadata: _metadata }, _sort_order_initializers, _sort_order_extraInitializers);
        __esDecorate(null, null, _is_featured_decorators, { kind: "field", name: "is_featured", static: false, private: false, access: { has: function (obj) { return "is_featured" in obj; }, get: function (obj) { return obj.is_featured; }, set: function (obj, value) { obj.is_featured = value; } }, metadata: _metadata }, _is_featured_initializers, _is_featured_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PropertyImage = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PropertyImage = _classThis;
}();
exports.PropertyImage = PropertyImage;
