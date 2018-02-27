import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { TokenContainer } from './TokenContainer';
export declare class AuthenticationHttpInterceptor implements HttpInterceptor {
    private tokenContainerFactory;
    constructor(tokenContainerFactory: () => TokenContainer);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private readonly tokenContainer;
}
