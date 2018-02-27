"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const AuthenticationService_1 = require("./AuthenticationService");
const TokenContainer_1 = require("./TokenContainer");
const AuthenticationHttpInterceptor_1 = require("./AuthenticationHttpInterceptor");
const http_1 = require("@angular/http");
const http_2 = require("@angular/common/http");
let FluffySpoonAuthenticationModule = FluffySpoonAuthenticationModule_1 = class FluffySpoonAuthenticationModule {
    static withJwt() {
        var authenticationService;
        var tokenContainer;
        return {
            ngModule: FluffySpoonAuthenticationModule_1,
            providers: [
                {
                    provide: http_2.HTTP_INTERCEPTORS,
                    useClass: AuthenticationHttpInterceptor_1.AuthenticationHttpInterceptor,
                    multi: true
                },
                {
                    provide: TokenContainer_1.TokenContainer,
                    useFactory: () => {
                        if (tokenContainer)
                            return tokenContainer;
                        return tokenContainer = new TokenContainer_1.TokenContainer();
                    }
                },
                {
                    provide: AuthenticationService_1.AuthenticationService,
                    useFactory: (http, tokenContainer) => {
                        if (authenticationService)
                            return authenticationService;
                        return authenticationService = new AuthenticationService_1.AuthenticationService(http, tokenContainer);
                    },
                    deps: [
                        http_1.Http,
                        TokenContainer_1.TokenContainer
                    ]
                }
            ]
        };
    }
};
FluffySpoonAuthenticationModule = FluffySpoonAuthenticationModule_1 = __decorate([
    core_1.NgModule({
        declarations: [],
        exports: []
    })
], FluffySpoonAuthenticationModule);
exports.FluffySpoonAuthenticationModule = FluffySpoonAuthenticationModule;
var FluffySpoonAuthenticationModule_1;
//# sourceMappingURL=FluffySpoonAuthenticationModule.js.map