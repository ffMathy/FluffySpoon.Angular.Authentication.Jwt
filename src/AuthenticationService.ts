import { Injectable } from '@angular/core';
import { ExtendedHttp, HttpStatusCode } from 'fluffy-spoon.angular.http';
import { TokenContainer } from './TokenContainer';
import { JsonWebTokenResponse } from './JsonWebTokenResponse';

@Injectable()
export class AuthenticationService {
	private _redirectUrl: string;
	private _fetchAnonymousTokenPromise: Promise<string>;

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
        private tokenContainer: TokenContainer,
        private anonymousTokenUrl: string,
        private authenticatedTokenUrl: string,
        private refreshTokenUrl: string)
	{
	}

	public async fetchNewAnonymousToken() {
		if (!this._fetchAnonymousTokenPromise) {
			this._fetchAnonymousTokenPromise = this.fetchAnonymousToken();
		}
        
        this.tokenContainer.token = await this._fetchAnonymousTokenPromise;
	}

	public async signIn(
		username: string,
		password: string)
	{
		username = username
			.toLowerCase()
			.trim();

        var existingAuthenticatedTokenEnvelope = await this.tokenContainer.token;
        if (existingAuthenticatedTokenEnvelope && (this.tokenContainer.isAnonymous || this.tokenContainer.username !== username))
			existingAuthenticatedTokenEnvelope = null;

		var newToken =
			existingAuthenticatedTokenEnvelope ||
			await this.fetchAuthenticatedTokenEnvelope(
				username,
				password);
		if (newToken == null)
			return null;

        this.tokenContainer.token = newToken;
		return this.tokenContainer;
	}

	private async fetchAuthenticatedTokenEnvelope(
		username: string,
		password: string): Promise<string>
	{
        var response = await this.http
            .postAsync(this.authenticatedTokenUrl, {
                body: {
                    username: username,
                    password: password
                }
			});
		if (response) {
			if (response.status === HttpStatusCode.Unauthorized) {
				return null;
			}

			throw new Error("An error occured on the server side.");
		}

        var tokenResponse = <JsonWebTokenResponse>response.json();
        return tokenResponse.access_token;
	}

    private async fetchAnonymousToken(): Promise<string> {
        var response = await this.http.getAsync(this.anonymousTokenUrl);
        var tokenResponse = <JsonWebTokenResponse>response.json();
        return tokenResponse.access_token;
	}

}