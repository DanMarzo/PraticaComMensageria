"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardModule = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_service_1 = require("./auth-guard.service");
const jwt_1 = require("@nestjs/jwt");
let AuthGuardModule = class AuthGuardModule {
};
exports.AuthGuardModule = AuthGuardModule;
exports.AuthGuardModule = AuthGuardModule = __decorate([
    (0, common_1.Module)({
        providers: [auth_guard_service_1.AuthGuardService],
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    global: true,
                    secret: process.env.SECRET_KEY,
                }),
            }),
        ],
        exports: [auth_guard_service_1.AuthGuardService],
    })
], AuthGuardModule);
//# sourceMappingURL=auth-guard.module.js.map