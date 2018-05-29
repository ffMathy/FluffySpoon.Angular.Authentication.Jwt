import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

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
		var newRequest = request.clone();
		if (this.tokenContainer.token) {
			newRequest = newRequest.clone({
				headers: request.headers.set("Authorization", "Bearer " + this.tokenContainer.token)
			});
		}
		
		return next.handle(newRequest).pipe(tap(httpEvent => {
			if (httpEvent instanceof HttpResponse) {
				if (httpEvent.status === 401) {
					this.tokenContainer.token = null;
				} else {
					this.tokenContainer.token = httpEvent.headers.get("Token");
				}
			}

			return httpEvent;
		}));

	}
}