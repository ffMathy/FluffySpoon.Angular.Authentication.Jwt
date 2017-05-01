import { NgModule, FactoryProvider, Injector } from '@angular/core';

export class FluffySpoonAuthenticationModule {
    static withHttpInterceptor(
        interceptorType: { new (): HttpInterceptor }): NgModule
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

    static withoutHttpInterceptor() {
        this.withHttpInterceptor(HttpInterceptor);
    }
}