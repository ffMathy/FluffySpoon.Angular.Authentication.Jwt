import { NgModule, FactoryProvider, ClassProvider, ModuleWithProviders, InjectionToken } from '@angular/core';

import { AuthenticationService } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';
import { AuthenticationHttpInterceptor } from './AuthenticationHttpInterceptor';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

export const REQUEST_TOKEN_URL: InjectionToken<string> = new InjectionToken<string>('REQUEST_TOKEN_URL');

export let authenticationService: AuthenticationService = null;
export let tokenContainer: TokenContainer = null;

export function getTokenContainer(): TokenContainer {
	return tokenContainer ? tokenContainer : (tokenContainer = new TokenContainer());
}

export function getAuthenticationService(http: HttpClient, tokenContainer: TokenContainer, tokenUrl: string): AuthenticationService {
	return authenticationService ?
		authenticationService :
		(authenticationService = new AuthenticationService(
			http,
			tokenContainer,
			tokenUrl as string));
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
					deps: [TokenContainer],
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
			],
			exports: [
				TokenContainer,
				AuthenticationService
			]
        };
    }
}