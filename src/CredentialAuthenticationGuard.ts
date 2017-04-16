import { Injectable } from '@angular/core';
import {
	CanActivate,
	CanActivateChild,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from './AuthenticationService';

@Injectable()
export class CredentialAuthenticationGuard implements CanActivate, CanActivateChild  {
	constructor(
		private authenticationService: AuthenticationService,
		private router: Router) {
	}

	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.checkLogin(state.url);
	}

	public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}

	private checkLogin(url: string): boolean {
		if (this.authenticationService.isSignedIn) {
			return true;
		}
		
		this.authenticationService.redirectUrl = url;
		this.router.navigate(['/login']);
		return false;
	}
}