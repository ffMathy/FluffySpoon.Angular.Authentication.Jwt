import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';

import { HttpInterceptor, HttpHandler, HttpRequest, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { TokenContainer } from './TokenContainer';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationHttpInterceptor implements HttpInterceptor {
    constructor(
		private tokenContainer: TokenContainer)
	{
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
	{
		let clonedRequest;
		if (this.isSignedIn) {
			let token = this.tokenContainer.token;

			clonedRequest = request.clone({
				reportProgress: true,
				headers: request.headers.set('Authorization', "Bearer " + token)
			});
		} else {
			clonedRequest = request.clone({
				reportProgress: true
			});
		}

		clonedRequest.headers.append('Content-Type', 'application/json; charset=utf-8');

        return next.handle(clonedRequest).do(event => this.handleResponseHeader(event as any));

	}

	private handleResponseHeader(event: HttpEvent<any>) {
        if (event.type === HttpEventType.Response) {
			let ev = event as HttpResponse<any>;

            let token = ev.headers.get("Token");
            if (token !== null)
                this.tokenContainer.token = token;
        }
	}
	
	// Hack method
	private get isSignedIn() {
        if (!this.tokenContainer.token) {
            return false;
		}

		return true;
    }
}
