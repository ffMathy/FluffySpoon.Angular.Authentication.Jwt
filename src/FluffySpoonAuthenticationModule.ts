import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthenticationService, REQUEST_TOKEN_URL } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';
import { AuthenticationHttpInterceptor } from './AuthenticationHttpInterceptor';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

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
				{
					provide: REQUEST_TOKEN_URL, 
					useValue: requestTokenUrl 
				},
				TokenContainer,
				{
					provide: HTTP_INTERCEPTORS,
					useClass: AuthenticationHttpInterceptor,
					deps: [TokenContainer],
					multi: true
				},
				{
					provide: AuthenticationService,
					useClass: AuthenticationService,
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