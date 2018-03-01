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
		console.log('Interceptor instantiated');
	}

	public intercept(
		request: HttpRequest<any>,
		next: HttpHandler)
	{
		console.log('Intercept request', request, this.tokenContainer.token);

		var newRequest = request;
		if (this.tokenContainer.token) {
			newRequest = request.clone({
				headers: request.headers.append("Authorization", "Bearer " + this.tokenContainer.token)
			});
		}
			
		return next.handle(newRequest).do(httpEvent => {
			if (httpEvent instanceof HttpResponse) {
				if (httpEvent.status === 401) {
					this.tokenContainer.token = null;
				} else {
					this.tokenContainer.token = httpEvent.headers.get("Token");
				}
				console.log('Intercept response', httpEvent, this.tokenContainer.token);
			}
		});

	}
}