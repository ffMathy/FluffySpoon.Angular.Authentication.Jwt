"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationService_1 = require("./AuthenticationService");
const TokenContainer_1 = require("./TokenContainer");
const AuthenticationHttpInterceptor_1 = require("./AuthenticationHttpInterceptor");
const http_1 = require("@angular/http");
const http_2 = require("@angular/common/http");
class FluffySpoonAuthenticationModule {
    static withJwt() {
        var authenticationService;
        var tokenContainer;
        return {
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
            ],
            imports: [http_2.HttpClientModule]
        };
    }
}
exports.FluffySpoonAuthenticationModule = FluffySpoonAuthenticationModule;
//# sourceMappingURL=FluffySpoonAuthenticationModule.js.map