import { Injectable } from "@angular/core";

@Injectable()
export class TokenContainer {
    private readonly tokenResponseKey = "fluffy-spoon.angular.authentication.jwt.tokenResponse";
    private readonly roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

    public set token(token: string) {
        sessionStorage.setItem(
            this.tokenResponseKey,
            token || '');
    }
    
    public destroyToken(): void {
        sessionStorage.removeItem(this.tokenResponseKey);
    }

    public get isAnonymous() {
        return !this.subject;
    }

    public get token() {
        return sessionStorage.getItem(this.tokenResponseKey) || null;
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
    
    public get username() {
        return <string>this.getClaimValue("fluffy-spoon.authentication.jwt.username");
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
    
    public get IsExpired() {
        let now = new Date();

        let nowInSeconds = now.getTime();
        let expiresInSeconds = this.expiresAt.getTime();
               
        if (nowInSeconds > expiresInSeconds)
            return true;

        return false;
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
        if (!this.token) return null;
        return this.token.split(".");
    }
}
