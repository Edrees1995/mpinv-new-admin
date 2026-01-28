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
exports.Setting = void 0;
var typeorm_1 = require("typeorm");
var Setting = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('mw_option')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _option_key_decorators;
    var _option_key_initializers = [];
    var _option_key_extraInitializers = [];
    var _option_value_decorators;
    var _option_value_initializers = [];
    var _option_value_extraInitializers = [];
    var _option_group_decorators;
    var _option_group_initializers = [];
    var _option_group_extraInitializers = [];
    var _option_type_decorators;
    var _option_type_initializers = [];
    var _option_type_extraInitializers = [];
    var _label_decorators;
    var _label_initializers = [];
    var _label_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _sort_order_decorators;
    var _sort_order_initializers = [];
    var _sort_order_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var Setting = _classThis = /** @class */ (function () {
        function Setting_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.option_key = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _option_key_initializers, void 0));
            this.option_value = (__runInitializers(this, _option_key_extraInitializers), __runInitializers(this, _option_value_initializers, void 0));
            this.option_group = (__runInitializers(this, _option_value_extraInitializers), __runInitializers(this, _option_group_initializers, void 0)); // general, social, contact, seo
            this.option_type = (__runInitializers(this, _option_group_extraInitializers), __runInitializers(this, _option_type_initializers, void 0)); // text, textarea, image, boolean
            this.label = (__runInitializers(this, _option_type_extraInitializers), __runInitializers(this, _label_initializers, void 0));
            this.description = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.sort_order = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _sort_order_initializers, void 0));
            this.created_at = (__runInitializers(this, _sort_order_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
        return Setting_1;
    }());
    __setFunctionName(_classThis, "Setting");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _option_key_decorators = [(0, typeorm_1.Column)({ length: 100 })];
        _option_value_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _option_group_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true })];
        _option_type_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true })];
        _label_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _sort_order_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0 })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _option_key_decorators, { kind: "field", name: "option_key", static: false, private: false, access: { has: function (obj) { return "option_key" in obj; }, get: function (obj) { return obj.option_key; }, set: function (obj, value) { obj.option_key = value; } }, metadata: _metadata }, _option_key_initializers, _option_key_extraInitializers);
        __esDecorate(null, null, _option_value_decorators, { kind: "field", name: "option_value", static: false, private: false, access: { has: function (obj) { return "option_value" in obj; }, get: function (obj) { return obj.option_value; }, set: function (obj, value) { obj.option_value = value; } }, metadata: _metadata }, _option_value_initializers, _option_value_extraInitializers);
        __esDecorate(null, null, _option_group_decorators, { kind: "field", name: "option_group", static: false, private: false, access: { has: function (obj) { return "option_group" in obj; }, get: function (obj) { return obj.option_group; }, set: function (obj, value) { obj.option_group = value; } }, metadata: _metadata }, _option_group_initializers, _option_group_extraInitializers);
        __esDecorate(null, null, _option_type_decorators, { kind: "field", name: "option_type", static: false, private: false, access: { has: function (obj) { return "option_type" in obj; }, get: function (obj) { return obj.option_type; }, set: function (obj, value) { obj.option_type = value; } }, metadata: _metadata }, _option_type_initializers, _option_type_extraInitializers);
        __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: function (obj) { return "label" in obj; }, get: function (obj) { return obj.label; }, set: function (obj, value) { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _sort_order_decorators, { kind: "field", name: "sort_order", static: false, private: false, access: { has: function (obj) { return "sort_order" in obj; }, get: function (obj) { return obj.sort_order; }, set: function (obj, value) { obj.sort_order = value; } }, metadata: _metadata }, _sort_order_initializers, _sort_order_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Setting = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Setting = _classThis;
}();
exports.Setting = Setting;
