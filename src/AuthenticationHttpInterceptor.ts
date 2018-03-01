import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { TokenContainer } from './TokenContainer';

@Injectable()
export class AuthenticationHttpInterceptor implements HttpInterceptor {
    constructor(
        private tokenContainer: TokenContainer)
    {
	}

	public intercept(
		request: HttpRequest<any>,
		next: HttpHandler)
	{
		if (this.tokenContainer.token)
			request.headers.append("Authorization", "Bearer " + this.tokenContainer.token);

		return next.handle(request).do(httpEvent => {
			if (httpEvent instanceof HttpResponse) {
				if (httpEvent.status === 401) {
					this.tokenContainer.token = null;
				} else {
					this.tokenContainer.token = httpEvent.headers.get("Token");
				}
			}
		});

	}
}