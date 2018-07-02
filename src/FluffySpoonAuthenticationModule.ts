import { NgModule, FactoryProvider, ClassProvider, Injector, ModuleWithProviders, InjectionToken } from '@angular/core';

import { AuthenticationService } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';
import { AuthenticationHttpInterceptor } from './AuthenticationHttpInterceptor';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

export const REQUEST_TOKEN_URL = new InjectionToken<string>('REQUEST_TOKEN_URL');

let authenticationService: AuthenticationService;
let tokenContainer: TokenContainer;

export function getTokenContainer() {
	if (tokenContainer) return tokenContainer;
	return tokenContainer = new TokenContainer();
}

export function getAuthenticationService(http: HttpClient, tokenContainer: TokenContainer, tokenUrl: string) {
	if (authenticationService) return authenticationService;
	return authenticationService = new AuthenticationService(
		http,
		tokenContainer,
		tokenUrl);
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