import { Injectable } from '@angular/core';
import { Response, Request, RequestOptionsArgs } from '@angular/http';

import { HttpInterceptor, HttpStatusCode } from 'fluffy-spoon.angular.http';
import { TokenContainer } from './TokenContainer';

@Injectable()
export class AuthenticationHttpInterceptor extends HttpInterceptor {
    constructor(
        private tokenContainerFactory: () => TokenContainer)
    {
        super();
    }

    private get tokenContainer() {
        return this.tokenContainerFactory();
    }

    configureRequest(request: Request, options: RequestOptionsArgs) {
        super.configureRequest(request, options);

        var tokenContainer = this.tokenContainerFactory();
        if (tokenContainer && tokenContainer.token) {
            request.headers.append("Authorization", "Bearer " + tokenContainer.token);
        }
    }

    onSuccessfulRequest(response: Response) {
        var token = response.headers.get("Token");
        if (token) {
            this.tokenContainer.token = token;
        }
    }

    onFailedRequest(response: Response) {
        if (response.status === HttpStatusCode.Unauthorized) {
            this.tokenContainer.token = null;
        }
    }
}