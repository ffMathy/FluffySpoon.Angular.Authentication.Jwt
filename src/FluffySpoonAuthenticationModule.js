"use strict";
const AuthenticationService_1 = require("./AuthenticationService");
const TokenContainer_1 = require("./TokenContainer");
const AuthenticationHttpInterceptor_1 = require("./AuthenticationHttpInterceptor");
const fluffy_spoon_angular_http_1 = require("fluffy-spoon.angular.http");
class FluffySpoonAuthenticationModule {
    static withJwt() {
        var authenticationService;
        var tokenContainer;
        var httpInterceptor = new AuthenticationHttpInterceptor_1.AuthenticationHttpInterceptor(() => tokenContainer);
        return {
            providers: [
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
                        fluffy_spoon_angular_http_1.ExtendedHttp,
                        TokenContainer_1.TokenContainer
                    ]
                }
            ],
            imports: [fluffy_spoon_angular_http_1.FluffySpoonHttpModule.withHttpInterceptor(httpInterceptor)]
        };
    }
}
exports.FluffySpoonAuthenticationModule = FluffySpoonAuthenticationModule;
//# sourceMappingURL=FluffySpoonAuthenticationModule.js.map