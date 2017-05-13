import { NgModule, FactoryProvider, Injector, ModuleWithProviders } from '@angular/core';

import { AuthenticationService } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';
import { AuthenticationHttpInterceptor } from './AuthenticationHttpInterceptor';

import { ExtendedHttp, FluffySpoonHttpModule } from 'fluffy-spoon.angular.http';

export class FluffySpoonAuthenticationModule {
    static withJwt(): NgModule
    {
        var authenticationService: AuthenticationService;
        var tokenContainer: TokenContainer;

        var httpInterceptor = new AuthenticationHttpInterceptor(() => tokenContainer);
        return <NgModule>{
            providers: [
                <FactoryProvider>{
                    provide: TokenContainer,
                    useFactory: () =>
                    {
                        if (tokenContainer) return tokenContainer;
                        return tokenContainer = new TokenContainer();
                    }
                },
                <FactoryProvider>{
                    provide: AuthenticationService,
                    useFactory: (
                        http: ExtendedHttp,
                        tokenContainer: TokenContainer) =>
                    {
                        if (authenticationService) return authenticationService;
                        return authenticationService = new AuthenticationService(
                            http,
                            tokenContainer);
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
}