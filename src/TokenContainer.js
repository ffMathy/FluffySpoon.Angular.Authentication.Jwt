"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
let TokenContainer = class TokenContainer {
    constructor() {
        this.tokenResponseKey = "fluffy-spoon.angular.authentication.jwt.tokenResponse";
        this.roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    }
    set token(token) {
        sessionStorage.setItem(this.tokenResponseKey, token);
    }
    get isAnonymous() {
        return this.getClaimValue("fluffy-spoon.authentication.jwt.anonymous") === "true";
    }
    get token() {
        return sessionStorage.getItem(this.tokenResponseKey);
    }
    get roles() {
        return this.getClaimValues(this.roleKey);
    }
    get issuedAt() {
        return this.getClaimTimestamp("iat");
    }
    get expiresAt() {
        return this.getClaimTimestamp("exp");
    }
    get username() {
        return this.getClaimValue("fluffy-spoon.authentication.jwt.username");
    }
    get subject() {
        return this.getClaimValue("sub");
    }
    get identifier() {
        return this.getClaimValue("jti");
    }
    get validSince() {
        return this.getClaimTimestamp("nbf");
    }
    get issuer() {
        return this.getClaimValue("iss");
    }
    get audience() {
        return this.getClaimValue("aud");
    }
    get claims() {
        var dataPayload = this.getDataPayload();
        if (!dataPayload)
            return null;
        return JSON.parse(btoa(dataPayload));
    }
    getClaimValue(key) {
        if (!this.claims)
            return null;
        return this.claims[key];
    }
    getClaimValues(key) {
        if (!this.claims)
            return [];
        var values = this.claims[key];
        if (!values) {
            return [];
        }
        if (Array.isArray(values)) {
            return values;
        }
        return [values];
    }
    getClaimTimestamp(key) {
        var timestamp = this.getClaimValue(key);
        return new Date(timestamp * 1000);
    }
    getDataPayload() {
        var payloads = this.getPayloads();
        if (!payloads)
            return null;
        return payloads[1];
    }
    getPayloads() {
        if (!this.token)
            return null;
        return this.token.split(".");
    }
};
TokenContainer = __decorate([
    core_1.Injectable()
], TokenContainer);
exports.TokenContainer = TokenContainer;
//# sourceMappingURL=TokenContainer.js.map