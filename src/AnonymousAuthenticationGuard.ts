import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanActivateChild,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';

import { AuthenticationService } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';

@Injectable()
export class AnonymousAuthenticationGuard implements CanActivate  {
	constructor(
		private authenticationService: AuthenticationService,
		private tokenContainer: TokenContainer) {
	}

	public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!this.tokenContainer.getToken()) {
			await this.authenticationService.fetchNewAnonymousToken();

			if (!this.tokenContainer.getToken()) {
				throw new Error("Could not wait for anonymous token properly.");
			}
		}

		return true;
	}
}