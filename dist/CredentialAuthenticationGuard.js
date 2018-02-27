var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './AuthenticationService';
var CredentialAuthenticationGuard = /** @class */ (function () {
    function CredentialAuthenticationGuard(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
    }
    CredentialAuthenticationGuard.prototype.canActivate = function (route, state) {
        return this.checkLogin(state.url);
    };
    CredentialAuthenticationGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    CredentialAuthenticationGuard.prototype.checkLogin = function (url) {
        if (this.authenticationService.isSignedIn) {
            return true;
        }
        this.authenticationService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    };
    CredentialAuthenticationGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthenticationService,
            Router])
    ], CredentialAuthenticationGuard);
    return CredentialAuthenticationGuard;
}());
export { CredentialAuthenticationGuard };
//# sourceMappingURL=CredentialAuthenticationGuard.js.map