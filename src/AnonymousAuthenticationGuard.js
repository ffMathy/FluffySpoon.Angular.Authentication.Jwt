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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const core_1 = require("@angular/core");
const AuthenticationService_1 = require("./AuthenticationService");
const TokenContainer_1 = require("./TokenContainer");
let AnonymousAuthenticationGuard = class AnonymousAuthenticationGuard {
    constructor(authenticationService, tokenContainer) {
        this.authenticationService = authenticationService;
        this.tokenContainer = tokenContainer;
    }
    canActivate(route, state) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tokenContainer.token) {
                yield this.authenticationService.waitForAnonymousAuthentication();
                if (!this.tokenContainer.token) {
                    throw new Error("Could not wait for anonymous token properly.");
                }
            }
            return true;
        });
    }
};
AnonymousAuthenticationGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [AuthenticationService_1.AuthenticationService,
        TokenContainer_1.TokenContainer])
], AnonymousAuthenticationGuard);
exports.AnonymousAuthenticationGuard = AnonymousAuthenticationGuard;
//# sourceMappingURL=AnonymousAuthenticationGuard.js.map