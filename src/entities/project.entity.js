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
exports.Project = void 0;
var typeorm_1 = require("typeorm");
var developer_entity_1 = require("./developer.entity");
var Project = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('mw_projectlist')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _featured_image_decorators;
    var _featured_image_initializers = [];
    var _featured_image_extraInitializers = [];
    var _list_decorators;
    var _list_initializers = [];
    var _list_extraInitializers = [];
    var _property_decorators;
    var _property_initializers = [];
    var _property_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _trash_decorators;
    var _trash_initializers = [];
    var _trash_extraInitializers = [];
    var _developer_id_decorators;
    var _developer_id_initializers = [];
    var _developer_id_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var _developer_decorators;
    var _developer_initializers = [];
    var _developer_extraInitializers = [];
    var Project = _classThis = /** @class */ (function () {
        function Project_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.featured_image = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _featured_image_initializers, void 0));
            this.list = (__runInitializers(this, _featured_image_extraInitializers), __runInitializers(this, _list_initializers, void 0)); // JSON data
            this.property = (__runInitializers(this, _list_extraInitializers), __runInitializers(this, _property_initializers, void 0)); // JSON data
            this.status = (__runInitializers(this, _property_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.trash = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _trash_initializers, void 0));
            this.developer_id = (__runInitializers(this, _trash_extraInitializers), __runInitializers(this, _developer_id_initializers, void 0));
            this.created_at = (__runInitializers(this, _developer_id_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            // Relations
            this.developer = (__runInitializers(this, _updated_at_extraInitializers), __runInitializers(this, _developer_initializers, void 0));
            __runInitializers(this, _developer_extraInitializers);
        }
        return Project_1;
    }());
    __setFunctionName(_classThis, "Project");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _name_decorators = [(0, typeorm_1.Column)({ length: 250 })];
        _description_decorators = [(0, typeorm_1.Column)({ name: 'short_desc', type: 'text', nullable: true })];
        _featured_image_decorators = [(0, typeorm_1.Column)({ name: 'f_img', type: 'text', nullable: true })];
        _list_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _property_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({ length: 100 })];
        _trash_decorators = [(0, typeorm_1.Column)({ length: 100 })];
        _developer_id_decorators = [(0, typeorm_1.Column)({ name: 'dev_id', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.Column)({ name: 'created', type: 'datetime' })];
        _updated_at_decorators = [(0, typeorm_1.Column)({ name: 'updated', type: 'datetime', nullable: true })];
        _developer_decorators = [(0, typeorm_1.ManyToOne)(function () { return developer_entity_1.Developer; }), (0, typeorm_1.JoinColumn)({ name: 'dev_id' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _featured_image_decorators, { kind: "field", name: "featured_image", static: false, private: false, access: { has: function (obj) { return "featured_image" in obj; }, get: function (obj) { return obj.featured_image; }, set: function (obj, value) { obj.featured_image = value; } }, metadata: _metadata }, _featured_image_initializers, _featured_image_extraInitializers);
        __esDecorate(null, null, _list_decorators, { kind: "field", name: "list", static: false, private: false, access: { has: function (obj) { return "list" in obj; }, get: function (obj) { return obj.list; }, set: function (obj, value) { obj.list = value; } }, metadata: _metadata }, _list_initializers, _list_extraInitializers);
        __esDecorate(null, null, _property_decorators, { kind: "field", name: "property", static: false, private: false, access: { has: function (obj) { return "property" in obj; }, get: function (obj) { return obj.property; }, set: function (obj, value) { obj.property = value; } }, metadata: _metadata }, _property_initializers, _property_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _trash_decorators, { kind: "field", name: "trash", static: false, private: false, access: { has: function (obj) { return "trash" in obj; }, get: function (obj) { return obj.trash; }, set: function (obj, value) { obj.trash = value; } }, metadata: _metadata }, _trash_initializers, _trash_extraInitializers);
        __esDecorate(null, null, _developer_id_decorators, { kind: "field", name: "developer_id", static: false, private: false, access: { has: function (obj) { return "developer_id" in obj; }, get: function (obj) { return obj.developer_id; }, set: function (obj, value) { obj.developer_id = value; } }, metadata: _metadata }, _developer_id_initializers, _developer_id_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, null, _developer_decorators, { kind: "field", name: "developer", static: false, private: false, access: { has: function (obj) { return "developer" in obj; }, get: function (obj) { return obj.developer; }, set: function (obj, value) { obj.developer = value; } }, metadata: _metadata }, _developer_initializers, _developer_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Project = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Project = _classThis;
}();
exports.Project = Project;
