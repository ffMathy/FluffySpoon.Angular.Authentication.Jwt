var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import { HttpResponse } from '@angular/common/http';
import { TokenContainer } from './TokenContainer';
var AuthenticationHttpInterceptor = /** @class */ (function () {
    function AuthenticationHttpInterceptor(tokenContainer) {
        this.tokenContainer = tokenContainer;
        console.log('Interceptor instantiated');
    }
    AuthenticationHttpInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        console.log('Intercept request', request);
        if (this.tokenContainer.token)
            request.headers.append("Authorization", "Bearer " + this.tokenContainer.token);
        return next.handle(request).do(function (httpEvent) {
            if (httpEvent instanceof HttpResponse) {
                console.log('Intercept response', httpEvent);
                if (httpEvent.status === 401) {
                    _this.tokenContainer.token = null;
                }
                else {
                    _this.tokenContainer.token = httpEvent.headers.get("Token");
                }
            }
        });
    };
    AuthenticationHttpInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TokenContainer])
    ], AuthenticationHttpInterceptor);
    return AuthenticationHttpInterceptor;
}());
export { AuthenticationHttpInterceptor };
//# sourceMappingURL=AuthenticationHttpInterceptor.js.map