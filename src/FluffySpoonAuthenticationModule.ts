import { NgModule, FactoryProvider, ClassProvider, Injector, ModuleWithProviders } from '@angular/core';

import { AuthenticationService } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';
import { AuthenticationHttpInterceptor } from './AuthenticationHttpInterceptor';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

export function withJwt(requestTokenUrl: string) {
	var authenticationService: AuthenticationService;
	var tokenContainer: TokenContainer;
	return [
		<ClassProvider>{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationHttpInterceptor,
			multi: true
		},
		<FactoryProvider>{
			provide: TokenContainer,
			useFactory: () => {
				if (tokenContainer) return tokenContainer;
				return tokenContainer = new TokenContainer();
			}
		},
		<FactoryProvider>{
			provide: AuthenticationService,
			useFactory: (
				http: HttpClient,
				tokenContainer: TokenContainer) => {
				if (authenticationService) return authenticationService;
				return authenticationService = new AuthenticationService(
					http,
					tokenContainer,
					requestTokenUrl);
			},
			deps: [
				HttpClient,
				TokenContainer
			]
		}
	];
}