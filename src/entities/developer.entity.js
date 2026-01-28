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
exports.Developer = void 0;
var typeorm_1 = require("typeorm");
var project_entity_1 = require("./project.entity");
var Developer = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('mw_developers')];
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
    var _logo_decorators;
    var _logo_initializers = [];
    var _logo_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _is_trash_decorators;
    var _is_trash_initializers = [];
    var _is_trash_extraInitializers = [];
    var _website_decorators;
    var _website_initializers = [];
    var _website_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _featured_decorators;
    var _featured_initializers = [];
    var _featured_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _show_on_home_decorators;
    var _show_on_home_initializers = [];
    var _show_on_home_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _projects_decorators;
    var _projects_initializers = [];
    var _projects_extraInitializers = [];
    var Developer = _classThis = /** @class */ (function () {
        function Developer_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.logo = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _logo_initializers, void 0));
            this.status = (__runInitializers(this, _logo_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.is_trash = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _is_trash_initializers, void 0));
            this.website = (__runInitializers(this, _is_trash_extraInitializers), __runInitializers(this, _website_initializers, void 0));
            this.slug = (__runInitializers(this, _website_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.featured = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _featured_initializers, void 0));
            this.priority = (__runInitializers(this, _featured_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
            this.phone = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            this.email = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.address = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.show_on_home = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _show_on_home_initializers, void 0));
            this.created_at = (__runInitializers(this, _show_on_home_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            // Relations
            this.projects = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _projects_initializers, void 0));
            __runInitializers(this, _projects_extraInitializers);
        }
        return Developer_1;
    }());
    __setFunctionName(_classThis, "Developer");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)({ name: 'developer_id' })];
        _name_decorators = [(0, typeorm_1.Column)({ name: 'developer_name', length: 250 })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _logo_decorators = [(0, typeorm_1.Column)({ length: 250, nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: ['A', 'I'], default: 'A' })];
        _is_trash_decorators = [(0, typeorm_1.Column)({ name: 'isTrash', type: 'enum', enum: ['0', '1'], default: '0' })];
        _website_decorators = [(0, typeorm_1.Column)({ name: 'link_url', length: 250, nullable: true })];
        _slug_decorators = [(0, typeorm_1.Column)({ length: 250, nullable: true })];
        _featured_decorators = [(0, typeorm_1.Column)({ length: 1, nullable: true })];
        _priority_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _phone_decorators = [(0, typeorm_1.Column)({ length: 20, nullable: true })];
        _email_decorators = [(0, typeorm_1.Column)({ length: 150, nullable: true })];
        _address_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _show_on_home_decorators = [(0, typeorm_1.Column)({ name: 'show_home', length: 1, nullable: true })];
        _created_at_decorators = [(0, typeorm_1.Column)({ name: 'added_date', type: 'timestamp' })];
        _projects_decorators = [(0, typeorm_1.OneToMany)(function () { return project_entity_1.Project; }, function (project) { return project.developer; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _logo_decorators, { kind: "field", name: "logo", static: false, private: false, access: { has: function (obj) { return "logo" in obj; }, get: function (obj) { return obj.logo; }, set: function (obj, value) { obj.logo = value; } }, metadata: _metadata }, _logo_initializers, _logo_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _is_trash_decorators, { kind: "field", name: "is_trash", static: false, private: false, access: { has: function (obj) { return "is_trash" in obj; }, get: function (obj) { return obj.is_trash; }, set: function (obj, value) { obj.is_trash = value; } }, metadata: _metadata }, _is_trash_initializers, _is_trash_extraInitializers);
        __esDecorate(null, null, _website_decorators, { kind: "field", name: "website", static: false, private: false, access: { has: function (obj) { return "website" in obj; }, get: function (obj) { return obj.website; }, set: function (obj, value) { obj.website = value; } }, metadata: _metadata }, _website_initializers, _website_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _featured_decorators, { kind: "field", name: "featured", static: false, private: false, access: { has: function (obj) { return "featured" in obj; }, get: function (obj) { return obj.featured; }, set: function (obj, value) { obj.featured = value; } }, metadata: _metadata }, _featured_initializers, _featured_extraInitializers);
        __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _show_on_home_decorators, { kind: "field", name: "show_on_home", static: false, private: false, access: { has: function (obj) { return "show_on_home" in obj; }, get: function (obj) { return obj.show_on_home; }, set: function (obj, value) { obj.show_on_home = value; } }, metadata: _metadata }, _show_on_home_initializers, _show_on_home_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _projects_decorators, { kind: "field", name: "projects", static: false, private: false, access: { has: function (obj) { return "projects" in obj; }, get: function (obj) { return obj.projects; }, set: function (obj, value) { obj.projects = value; } }, metadata: _metadata }, _projects_initializers, _projects_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Developer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Developer = _classThis;
}();
exports.Developer = Developer;
