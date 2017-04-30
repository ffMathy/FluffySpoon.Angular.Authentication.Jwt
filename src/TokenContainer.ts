import { Injectable } from "@angular/core";

import { JsonWebTokenResponse } from "./JsonWebTokenResponse";

@Injectable()
export class TokenContainer {
    private readonly tokenResponseKey = "fluffy-spoon.angular.authentication.jwt.tokenResponse";
    private readonly roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    
    public get accessToken(): string {
        if (!this.storedToken) return null;
        return this.storedToken.access_token;
    }

    public get roles() {
        return <string[]>this.getClaimValues(this.roleKey);
    }

    public get issuedAt() {
        return this.getClaimTimestamp("iat");
    }

    public get expiresAt() {
        return this.getClaimTimestamp("exp");
    }

    public get subject() {
        return <string>this.getClaimValue("sub");
    }

    public get identifier() {
        return <string>this.getClaimValue("jti");
    }

    public get validSince() {
        return this.getClaimTimestamp("nbf");
    }

    public get issuer() {
        return <string>this.getClaimValue("iss");
    }

    public get audience() {
        return <string>this.getClaimValue("aud");
    }

    public get claims(): { [key: string]: any } {
        var dataPayload = this.getDataPayload();
        if (!dataPayload) return null;

        return <Object>JSON.parse(btoa(dataPayload));
    }

    public getClaimValue(key: string) {
        if (!this.claims) return null;
        return this.claims[key];
    }

    public getClaimValues(key: string) {
        if (!this.claims) return [];

        var values = this.claims[key];
        if (!values) {
            return [];
        }

        if (Array.isArray(values)) {
            return values;
        }

        return [values];
    }

    private getClaimTimestamp(key: string) {
        var timestamp = <number>this.getClaimValue(key);
        return new Date(timestamp * 1000);
    }

    private getDataPayload() {
        var payloads = this.getPayloads();
        if (!payloads) return null;

        return payloads[1];
    }

    private getPayloads() {
        if (!this.accessToken) return null;
        return this.accessToken.split(".");
    }

    public setToken(token: JsonWebTokenResponse) {
		sessionStorage.setItem(
			this.tokenResponseKey,
			JSON.stringify(token));
    }

    private get storedToken() {
        return <JsonWebTokenResponse>JSON.parse(sessionStorage.getItem(this.tokenResponseKey));
    }
}