import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './AuthenticationService';
export declare class CredentialAuthenticationGuard implements CanActivate, CanActivateChild {
    private authenticationService;
    private router;
    constructor(authenticationService: AuthenticationService, router: Router);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean;
    private checkLogin(url);
}
