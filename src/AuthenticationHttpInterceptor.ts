import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

import { HttpInterceptor, HttpHandler, HttpRequest, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { TokenContainer } from './TokenContainer';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationHttpInterceptor implements HttpInterceptor {
    constructor(
		private tokenContainer: TokenContainer,
		private router: Router)
	{
	}

	public intercept(
		request: HttpRequest<any>,
		next: HttpHandler)
	{
		let clonedRequest;
		if (this.isSignedIn) {
			if (this.tokenContainer.isExpired)
				this.router.navigateByUrl('/login');
			else {
				let token = this.tokenContainer.token;

				clonedRequest = request.clone({
					reportProgress: true,
					headers: request.headers.set('Authorization', "Bearer " + token)
				});
			}
		} else {
			clonedRequest = request.clone({
				reportProgress: true
			});
		}

		clonedRequest.headers.append('Content-Type', 'application/json; charset=utf-8');

        return next.handle(clonedRequest).pipe(tap(event => this.handleResponseHeader(event)));

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