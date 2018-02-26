import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './AuthenticationService';
import { TokenContainer } from './TokenContainer';
export declare class AnonymousAuthenticationGuard implements CanActivate {
    private authenticationService;
    private tokenContainer;
    constructor(authenticationService: AuthenticationService, tokenContainer: TokenContainer);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>;
}
