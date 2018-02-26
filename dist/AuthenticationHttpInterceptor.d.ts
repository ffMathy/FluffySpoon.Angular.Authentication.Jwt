import { Response, Request, RequestOptionsArgs } from '@angular/http';
import { HttpInterceptor } from 'fluffy-spoon.angular.http';
import { TokenContainer } from './TokenContainer';
export declare class AuthenticationHttpInterceptor extends HttpInterceptor {
    private tokenContainerFactory;
    constructor(tokenContainerFactory: () => TokenContainer);
    private readonly tokenContainer;
    configureRequest(request: Request, options: RequestOptionsArgs): void;
    onSuccessfulRequest(response: Response): void;
    onFailedRequest(response: Response): void;
}
