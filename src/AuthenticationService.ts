import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenContainer } from './TokenContainer';

@Injectable()
export class AuthenticationService {
    private _redirectUrl: string;

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
        

        return !this.tokenContainer.isExpired && !this.tokenContainer.isAnonymous;
    }

    constructor(
        private http: HttpClient,
		private tokenContainer: TokenContainer,
		private tokenUrl: string)
    {
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
			
		if (this.tokenContainer.token && (this.tokenContainer.isAnonymous || this.tokenContainer.subject !== username))
			this.tokenContainer.token = null;

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

		var response = await this.http.get(this.tokenUrl, {
			observe: 'response',
			responseType: 'text',
			headers: new HttpHeaders({
				Authorization: "FluffySpoon " + btoa(JSON.stringify(credentials))
			})
		}).toPromise();
		if (response && !response.ok && response.status !== 401) {
            throw new Error("An error occured on the server side.");
        }
    }

	private async anonymousRequest(): Promise<void> {
		await this.http.get(this.tokenUrl, {
			observe: 'response',
			responseType: 'text',
			headers: new HttpHeaders({
				Authorization: "FluffySpoon"
			})
		}).toPromise();
    }

}
