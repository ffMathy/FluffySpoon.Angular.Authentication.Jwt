import { NgModule, FactoryProvider, ClassProvider, Injector, ModuleWithProviders } from '@angular/core';

import { AuthenticationService } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';
import { AuthenticationHttpInterceptor } from './AuthenticationHttpInterceptor';

import { Http } from '@angular/http';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

export class FluffySpoonAuthenticationModule {
    static withJwt(): NgModule
    {
        var authenticationService: AuthenticationService;
        var tokenContainer: TokenContainer;
		
        return <NgModule>{
			providers: [
				<ClassProvider>{
					provide: HTTP_INTERCEPTORS,
					useClass: AuthenticationHttpInterceptor,
					multi: true
				},
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
                        http: Http,
                        tokenContainer: TokenContainer) =>
                    {
                        if (authenticationService) return authenticationService;
                        return authenticationService = new AuthenticationService(
                            http,
                            tokenContainer);
                    },
                    deps: [
                        Http,
                        TokenContainer
                    ]
                }
			],
			imports: [HttpClientModule]
        };
    }
}