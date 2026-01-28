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
exports.ListingUser = void 0;
var typeorm_1 = require("typeorm");
var ListingUser = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('mw_listing_users')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _company_decorators;
    var _company_initializers = [];
    var _company_extraInitializers = [];
    var _avatar_decorators;
    var _avatar_initializers = [];
    var _avatar_extraInitializers = [];
    var _bio_decorators;
    var _bio_initializers = [];
    var _bio_extraInitializers = [];
    var _user_type_decorators;
    var _user_type_initializers = [];
    var _user_type_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _is_verified_decorators;
    var _is_verified_initializers = [];
    var _is_verified_extraInitializers = [];
    var _verification_token_decorators;
    var _verification_token_initializers = [];
    var _verification_token_extraInitializers = [];
    var _password_reset_token_decorators;
    var _password_reset_token_initializers = [];
    var _password_reset_token_extraInitializers = [];
    var _last_login_decorators;
    var _last_login_initializers = [];
    var _last_login_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var ListingUser = _classThis = /** @class */ (function () {
        function ListingUser_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.phone = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            this.company = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _company_initializers, void 0));
            this.avatar = (__runInitializers(this, _company_extraInitializers), __runInitializers(this, _avatar_initializers, void 0));
            this.bio = (__runInitializers(this, _avatar_extraInitializers), __runInitializers(this, _bio_initializers, void 0));
            this.user_type = (__runInitializers(this, _bio_extraInitializers), __runInitializers(this, _user_type_initializers, void 0)); // agent, owner, developer
            this.status = (__runInitializers(this, _user_type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.is_verified = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _is_verified_initializers, void 0));
            this.verification_token = (__runInitializers(this, _is_verified_extraInitializers), __runInitializers(this, _verification_token_initializers, void 0));
            this.password_reset_token = (__runInitializers(this, _verification_token_extraInitializers), __runInitializers(this, _password_reset_token_initializers, void 0));
            this.last_login = (__runInitializers(this, _password_reset_token_extraInitializers), __runInitializers(this, _last_login_initializers, void 0));
            this.created_at = (__runInitializers(this, _last_login_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
            __runInitializers(this, _updated_at_extraInitializers);
        }
        return ListingUser_1;
    }());
    __setFunctionName(_classThis, "ListingUser");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _name_decorators = [(0, typeorm_1.Column)({ length: 100 })];
        _email_decorators = [(0, typeorm_1.Column)({ length: 255 })];
        _password_decorators = [(0, typeorm_1.Column)({ length: 255 })];
        _phone_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true })];
        _company_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _avatar_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _bio_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _user_type_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({ type: 'tinyint', default: 1 })];
        _is_verified_decorators = [(0, typeorm_1.Column)({ type: 'tinyint', default: 0 })];
        _verification_token_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _password_reset_token_decorators = [(0, typeorm_1.Column)({ length: 255, nullable: true })];
        _last_login_decorators = [(0, typeorm_1.Column)({ type: 'datetime', nullable: true })];
        _created_at_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updated_at_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _company_decorators, { kind: "field", name: "company", static: false, private: false, access: { has: function (obj) { return "company" in obj; }, get: function (obj) { return obj.company; }, set: function (obj, value) { obj.company = value; } }, metadata: _metadata }, _company_initializers, _company_extraInitializers);
        __esDecorate(null, null, _avatar_decorators, { kind: "field", name: "avatar", static: false, private: false, access: { has: function (obj) { return "avatar" in obj; }, get: function (obj) { return obj.avatar; }, set: function (obj, value) { obj.avatar = value; } }, metadata: _metadata }, _avatar_initializers, _avatar_extraInitializers);
        __esDecorate(null, null, _bio_decorators, { kind: "field", name: "bio", static: false, private: false, access: { has: function (obj) { return "bio" in obj; }, get: function (obj) { return obj.bio; }, set: function (obj, value) { obj.bio = value; } }, metadata: _metadata }, _bio_initializers, _bio_extraInitializers);
        __esDecorate(null, null, _user_type_decorators, { kind: "field", name: "user_type", static: false, private: false, access: { has: function (obj) { return "user_type" in obj; }, get: function (obj) { return obj.user_type; }, set: function (obj, value) { obj.user_type = value; } }, metadata: _metadata }, _user_type_initializers, _user_type_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _is_verified_decorators, { kind: "field", name: "is_verified", static: false, private: false, access: { has: function (obj) { return "is_verified" in obj; }, get: function (obj) { return obj.is_verified; }, set: function (obj, value) { obj.is_verified = value; } }, metadata: _metadata }, _is_verified_initializers, _is_verified_extraInitializers);
        __esDecorate(null, null, _verification_token_decorators, { kind: "field", name: "verification_token", static: false, private: false, access: { has: function (obj) { return "verification_token" in obj; }, get: function (obj) { return obj.verification_token; }, set: function (obj, value) { obj.verification_token = value; } }, metadata: _metadata }, _verification_token_initializers, _verification_token_extraInitializers);
        __esDecorate(null, null, _password_reset_token_decorators, { kind: "field", name: "password_reset_token", static: false, private: false, access: { has: function (obj) { return "password_reset_token" in obj; }, get: function (obj) { return obj.password_reset_token; }, set: function (obj, value) { obj.password_reset_token = value; } }, metadata: _metadata }, _password_reset_token_initializers, _password_reset_token_extraInitializers);
        __esDecorate(null, null, _last_login_decorators, { kind: "field", name: "last_login", static: false, private: false, access: { has: function (obj) { return "last_login" in obj; }, get: function (obj) { return obj.last_login; }, set: function (obj, value) { obj.last_login = value; } }, metadata: _metadata }, _last_login_initializers, _last_login_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListingUser = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListingUser = _classThis;
}();
exports.ListingUser = ListingUser;
