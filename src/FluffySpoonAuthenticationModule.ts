import { NgModule, FactoryProvider, ClassProvider, Injector, ModuleWithProviders, InjectionToken } from '@angular/core';

import { AuthenticationService } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';
import { AuthenticationHttpInterceptor } from './AuthenticationHttpInterceptor';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

export const REQUEST_TOKEN_URL = new InjectionToken<string>('REQUEST_TOKEN_URL');

export let authenticationService: AuthenticationService = null;
export let tokenContainer: TokenContainer = null;

export function getTokenContainer() {
	return tokenContainer ? tokenContainer : (tokenContainer = new TokenContainer());
}

export function getAuthenticationService(http: HttpClient, tokenContainer: TokenContainer, tokenUrl: string) {
	return authenticationService ?
		authenticationService :
		(authenticationService = new AuthenticationService(
			http,
			tokenContainer,
			tokenUrl));
}

@NgModule({
	declarations: [],
	exports: []
})
export class FluffySpoonAuthenticationModule {
	static forRoot(requestTokenUrl: string): ModuleWithProviders
	{		
		return {
			ngModule: FluffySpoonAuthenticationModule,
			providers: [
				{ provide: REQUEST_TOKEN_URL, useValue: requestTokenUrl },
				<ClassProvider>{
					provide: HTTP_INTERCEPTORS,
					useClass: AuthenticationHttpInterceptor,
					multi: true
				},
                <FactoryProvider>{
					provide: TokenContainer,
					useFactory: getTokenContainer
                },
                <FactoryProvider>{
					provide: AuthenticationService,
					useFactory: getAuthenticationService,
                    deps: [
                        HttpClient,
						TokenContainer,
						REQUEST_TOKEN_URL
                    ]
                }
			]
        };
    }
}