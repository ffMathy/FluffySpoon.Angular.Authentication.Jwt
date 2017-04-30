import { Injectable } from '@angular/core';
import { InterceptedHttp, HttpStatusCode } from 'fluffy-spoon.angular.http';
import { TokenContainer } from './TokenContainer';

@Injectable()
export class AuthenticationService {
	private _redirectUrl: string;
	private _fetchAnonymousTokenPromise: Promise<AccessTokenResponseViewModel>;

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
        var token = this.tokenContainer.accessToken;
		if (!token) {
			throw new Error("A token has not been initialized yet.");
		}

        return this.tokenContainer.roles.length > 0;
	}

	constructor(
		private http: InterceptedHttp,
		private tokenContainer: TokenContainer)
	{
	}

	public async fetchNewAnonymousToken() {
		if (!this._fetchAnonymousTokenPromise) {
			this._fetchAnonymousTokenPromise = this.fetchAnonymousTokenEnvelope();
		}

		var newTokenEnvelope = await this._fetchAnonymousTokenPromise;
		this.tokenContainer.setToken(newTokenEnvelope);
	}

	public async signIn(
		email: string,
		password: string)
	{
		email = email
			.toLowerCase()
			.trim();

		var existingAuthenticatedTokenEnvelope = await this.tokenContainer.getToken();
		if (existingAuthenticatedTokenEnvelope && (!existingAuthenticatedTokenEnvelope.user || existingAuthenticatedTokenEnvelope.user.email !== email))
			existingAuthenticatedTokenEnvelope = null;

		var tokenEnvelope =
			existingAuthenticatedTokenEnvelope ||
			await this.fetchAuthenticatedTokenEnvelope(
				email,
				password);
		if (tokenEnvelope == null)
			return null;

		this.tokenContainer.setToken(tokenEnvelope);

		return tokenEnvelope.user;
	}

	private async fetchAuthenticatedTokenEnvelope(
		username: string,
		password: string)
	{
		var response = await this.http
			.post('/api/authentication/login', {
				username: username,
				password: password
			});
		if (response.) {
			if (response.statusCode === HttpStatusCode.Unauthorized) {
				return null;
			}

			throw new Error("An error occured on the server side.");
		}

		return response.body;
	}

	private async fetchAnonymousTokenEnvelope() {
		var response = await this.http.get<AccessTokenResponseViewModel>('/api/authentication/token');
		return response.body;
	}

}