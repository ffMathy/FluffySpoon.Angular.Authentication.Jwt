import { HttpClient } from '@angular/common/http';
import { TokenContainer } from './TokenContainer';
export declare class AuthenticationService {
    private http;
    private tokenContainer;
    private _redirectUrl;
    private _tokenUrl;
    private _anonymousRequestPromise;
    redirectUrl: string;
    readonly isSignedIn: boolean;
    constructor(http: HttpClient, tokenContainer: TokenContainer);
    waitForAnonymousAuthentication(): Promise<void>;
    signIn(username: string, password: string): Promise<void>;
    private authenticate(username, password);
    private anonymousRequest();
}
