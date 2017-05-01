import { NgModule, FactoryProvider, Injector } from '@angular/core';

import { AuthenticationService } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';
import { AuthenticationHttpInterceptor } from './AuthenticationHttpInterceptor';

import { ExtendedHttp, FluffySpoonHttpModule } from 'fluffy-spoon.angular.http';

export class FluffySpoonAuthenticationModule {
    static withUrls(
      anonymousTokenUrl: string,
      authenticatedTokenUrl: string,
      refreshTokenUrl: string): NgModule
    {
        var authenticationService: AuthenticationService;

        var httpInterceptor = new AuthenticationHttpInterceptor();

        return {
            providers: [
                <FactoryProvider>{
                    provide: AuthenticationService,
                    useFactory: (
                        http: ExtendedHttp,
                        tokenContainer: TokenContainer) =>
                    {
                        if (authenticationService) return authenticationService;
                        return authenticationService = new AuthenticationService(
                            http,
                            tokenContainer,
                            anonymousTokenUrl,
                            authenticatedTokenUrl,
                            refreshTokenUrl);
                    },
                    deps: [
                        ExtendedHttp,
                        TokenContainer
                    ]
                }
            ],
            imports: [FluffySpoonHttpModule.withHttpInterceptor(httpInterceptor)]
        };
    }

    static withDefaultUrls() {
        return FluffySpoonAuthenticationModule.withUrls(
            "/api/token/anonymous",
            "/api/token/authenticated",
            "/api/token/refresh");
    }
}