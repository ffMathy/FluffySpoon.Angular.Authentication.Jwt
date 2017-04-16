import { Injectable } from "@angular/core";

@Injectable()
export class TokenContainer {
	public getToken(): AccessTokenResponseViewModel {
		return <AccessTokenResponseViewModel>JSON.parse(sessionStorage.getItem('accessTokenEnvelope'));
	}

	public setToken(token: AccessTokenResponseViewModel) {
		sessionStorage.setItem(
			'accessTokenEnvelope',
			JSON.stringify(token));
	}
}