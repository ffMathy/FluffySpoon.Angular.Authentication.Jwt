var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { AuthenticationService } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';
import { AuthenticationHttpInterceptor } from './AuthenticationHttpInterceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
var FluffySpoonAuthenticationModule = /** @class */ (function () {
    function FluffySpoonAuthenticationModule() {
    }
    FluffySpoonAuthenticationModule_1 = FluffySpoonAuthenticationModule;
    FluffySpoonAuthenticationModule.withJwt = function () {
        var authenticationService;
        var tokenContainer;
        return {
            ngModule: FluffySpoonAuthenticationModule_1,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthenticationHttpInterceptor,
                    multi: true
                },
                {
                    provide: TokenContainer,
                    useFactory: function () {
                        if (tokenContainer)
                            return tokenContainer;
                        return tokenContainer = new TokenContainer();
                    }
                },
                {
                    provide: AuthenticationService,
                    useFactory: function (http, tokenContainer) {
                        if (authenticationService)
                            return authenticationService;
                        return authenticationService = new AuthenticationService(http, tokenContainer);
                    },
                    deps: [
                        HttpClient,
                        TokenContainer
                    ]
                }
            ]
        };
    };
    FluffySpoonAuthenticationModule = FluffySpoonAuthenticationModule_1 = __decorate([
        NgModule({
            declarations: [],
            exports: []
        })
    ], FluffySpoonAuthenticationModule);
    return FluffySpoonAuthenticationModule;
    var FluffySpoonAuthenticationModule_1;
}());
export { FluffySpoonAuthenticationModule };
//# sourceMappingURL=FluffySpoonAuthenticationModule.js.map