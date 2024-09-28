"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_guard_service_1 = require("./modules/auth/auth-guard/auth-guard.service");
const auth_service_1 = require("./modules/auth/auth.service");
const sales_service_1 = require("./modules/sales/sales.service");
const sales_module_1 = require("./modules/sales/sales.module");
const auth_module_1 = require("./modules/auth/auth.module");
const auth_guard_module_1 = require("./modules/auth/auth-guard/auth-guard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get('CONNECT_MONGO'),
                }),
            }),
            sales_module_1.SalesModule,
            auth_guard_module_1.AuthGuardModule,
            auth_module_1.AuthModule,
        ],
        controllers: [],
        providers: [auth_guard_service_1.AuthGuardService, auth_service_1.AuthService, sales_service_1.SalesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map