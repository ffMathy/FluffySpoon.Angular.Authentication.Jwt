import { NgModule, FactoryProvider, Injector } from '@angular/core';

export class FluffySpoonAuthenticationModule {
    static withUrls(
      anonymousTokenUrl: string,
      authenticatedTokenUrl: string,
      refreshTokenUrl: string): NgModule
    {
        return {
            providers: [
                <FactoryProvider>{
                    provide: HttpInterceptor,
                    useFactory: interceptorType
                },
                <FactoryProvider>{
                    provide: Http,
                    useFactory: (
                        connectionBackend: ConnectionBackend,
                        httpInterceptor: HttpInterceptor) =>
                    {
                        return new ExtendedHttp(
                            connectionBackend,
                            new RequestOptions(),
                            httpInterceptor);
                    },
                    deps: [
                        ConnectionBackend,
                        HttpInterceptor
                    ]
                }
            ]
        }
    }

    static withDefaultUrls() {
        return FluffySpoonAuthenticationModule.withUrls(
            "/api/token/anonymous",
            "/api/token/authenticated",
            "/api/token/refresh");
    }
}