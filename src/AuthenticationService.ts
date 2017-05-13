import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ExtendedHttp, HttpStatusCode } from 'fluffy-spoon.angular.http';
import { TokenContainer } from './TokenContainer';

@Injectable()
export class AuthenticationService {
    private _redirectUrl: string;
    private _tokenUrl: string;

    private _anonymousRequestPromise: Promise<void>;

    public get redirectUrl() {
        return this._redirectUrl;
    }

    public set redirectUrl(value: string) {
        if (value != null && value.indexOf('/') !== 0) {
            throw new Error("The redirect URL must be relative for security reasons.");
        }

        this._redirectUrl = value;
    }

    public get isSignedIn() {
        var token = this.tokenContainer.token;
        if (!token) {
            throw new Error("A token has not been initialized yet.");
        }

        return !this.tokenContainer.isAnonymous;
    }

    constructor(
        private http: ExtendedHttp,
        private tokenContainer: TokenContainer)
    {
        this._tokenUrl = "/api/token";
    }

    public async waitForAnonymousAuthentication() {
        if (!this._anonymousRequestPromise) {
            this._anonymousRequestPromise = this.anonymousRequest();
        }

        await this._anonymousRequestPromise;
    }

    public async signIn(
        username: string,
        password: string) {
        username = username
            .toLowerCase()
            .trim();

        var existingAuthenticatedTokenEnvelope = await this.tokenContainer.token;
        if (existingAuthenticatedTokenEnvelope && (this.tokenContainer.isAnonymous || this.tokenContainer.username !== username))
            existingAuthenticatedTokenEnvelope = null;

        if (existingAuthenticatedTokenEnvelope)
            return;

        await this.authenticate(
            username,
            password);
    }

    private async authenticate(
        username: string,
        password: string): Promise<void>
    {
        var credentials = {
            Username: username,
            Password: password
        };

        var headers = new Headers();
        headers.append("Authorization", "FluffySpoon " + btoa(JSON.stringify(credentials)));

        var response = await this.http
            .postAsync(this._tokenUrl, {
                headers: headers
            });
        if (response && response.status !== HttpStatusCode.Unauthorized) {
            throw new Error("An error occured on the server side.");
        }
    }

    private async anonymousRequest(): Promise<void> {
        await this.http.getAsync(this._tokenUrl);
    }

}