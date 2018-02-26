"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const AuthenticationService_1 = require("./AuthenticationService");
let CredentialAuthenticationGuard = class CredentialAuthenticationGuard {
    constructor(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
    }
    canActivate(route, state) {
        return this.checkLogin(state.url);
    }
    canActivateChild(route, state) {
        return this.canActivate(route, state);
    }
    checkLogin(url) {
        if (this.authenticationService.isSignedIn) {
            return true;
        }
        this.authenticationService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
};
CredentialAuthenticationGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [AuthenticationService_1.AuthenticationService,
        router_1.Router])
], CredentialAuthenticationGuard);
exports.CredentialAuthenticationGuard = CredentialAuthenticationGuard;
//# sourceMappingURL=CredentialAuthenticationGuard.js.map