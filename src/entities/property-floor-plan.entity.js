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
exports.PropertyFloorPlan = void 0;
var typeorm_1 = require("typeorm");
var PropertyFloorPlan = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('mw_ad_floor_plan')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _ad_id_decorators;
    var _ad_id_initializers = [];
    var _ad_id_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _image_decorators;
    var _image_initializers = [];
    var _image_extraInitializers = [];
    var _bedrooms_decorators;
    var _bedrooms_initializers = [];
    var _bedrooms_extraInitializers = [];
    var _bathrooms_decorators;
    var _bathrooms_initializers = [];
    var _bathrooms_extraInitializers = [];
    var _area_decorators;
    var _area_initializers = [];
    var _area_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _sort_order_decorators;
    var _sort_order_initializers = [];
    var _sort_order_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var PropertyFloorPlan = _classThis = /** @class */ (function () {
        function PropertyFloorPlan_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.ad_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _ad_id_initializers, void 0));
            this.title = (__runInitializers(this, _ad_id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.image = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _image_initializers, void 0));
            this.bedrooms = (__runInitializers(this, _image_extraInitializers), __runInitializers(this, _bedrooms_initializers, void 0));
            this.bathrooms = (__runInitializers(this, _bedrooms_extraInitializers), __runInitializers(this, _bathrooms_initializers, void 0));
            this.area = (__runInitializers(this, _bathrooms_extraInitializers), __runInitializers(this, _area_initializers, void 0));
            this.price = (__runInitializers(this, _area_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.sort_order = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _sort_order_initializers, void 0));
            this.created_at = (__runInitializers(this, _sort_order_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            __runInitializers(this, _created_at_extraInitializers);
        }
        return PropertyFloorPlan_1;
    }());
    __setFunctionName(_classThis, "PropertyFloorPlan");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _ad_id_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _title_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _image_decorators = [(0, typeorm_1.Column)({ length: 255 })];
        _bedrooms_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _bathrooms_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _area_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true })];
        _price_decorators = [(0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true })];
        _sort_order_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _ad_id_decorators, { kind: "field", name: "ad_id", static: false, private: false, access: { has: function (obj) { return "ad_id" in obj; }, get: function (obj) { return obj.ad_id; }, set: function (obj, value) { obj.ad_id = value; } }, metadata: _metadata }, _ad_id_initializers, _ad_id_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _image_decorators, { kind: "field", name: "image", static: false, private: false, access: { has: function (obj) { return "image" in obj; }, get: function (obj) { return obj.image; }, set: function (obj, value) { obj.image = value; } }, metadata: _metadata }, _image_initializers, _image_extraInitializers);
        __esDecorate(null, null, _bedrooms_decorators, { kind: "field", name: "bedrooms", static: false, private: false, access: { has: function (obj) { return "bedrooms" in obj; }, get: function (obj) { return obj.bedrooms; }, set: function (obj, value) { obj.bedrooms = value; } }, metadata: _metadata }, _bedrooms_initializers, _bedrooms_extraInitializers);
        __esDecorate(null, null, _bathrooms_decorators, { kind: "field", name: "bathrooms", static: false, private: false, access: { has: function (obj) { return "bathrooms" in obj; }, get: function (obj) { return obj.bathrooms; }, set: function (obj, value) { obj.bathrooms = value; } }, metadata: _metadata }, _bathrooms_initializers, _bathrooms_extraInitializers);
        __esDecorate(null, null, _area_decorators, { kind: "field", name: "area", static: false, private: false, access: { has: function (obj) { return "area" in obj; }, get: function (obj) { return obj.area; }, set: function (obj, value) { obj.area = value; } }, metadata: _metadata }, _area_initializers, _area_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _sort_order_decorators, { kind: "field", name: "sort_order", static: false, private: false, access: { has: function (obj) { return "sort_order" in obj; }, get: function (obj) { return obj.sort_order; }, set: function (obj, value) { obj.sort_order = value; } }, metadata: _metadata }, _sort_order_initializers, _sort_order_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PropertyFloorPlan = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PropertyFloorPlan = _classThis;
}();
exports.PropertyFloorPlan = PropertyFloorPlan;
