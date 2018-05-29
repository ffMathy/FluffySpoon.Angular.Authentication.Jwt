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
import { tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { TokenContainer } from './TokenContainer';
var AuthenticationHttpInterceptor = /** @class */ (function () {
    function AuthenticationHttpInterceptor(tokenContainer) {
        this.tokenContainer = tokenContainer;
    }
    AuthenticationHttpInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var newRequest = request.clone();
        if (this.tokenContainer.token) {
            newRequest = newRequest.clone({
                headers: request.headers.set("Authorization", "Bearer " + this.tokenContainer.token)
            });
        }
        return next.handle(newRequest).pipe(tap(function (httpEvent) {
            if (httpEvent instanceof HttpResponse) {
                if (httpEvent.status === 401) {
                    _this.tokenContainer.token = null;
                }
                else {
                    _this.tokenContainer.token = httpEvent.headers.get("Token");
                }
            }
            return httpEvent;
        }));
    };
    AuthenticationHttpInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TokenContainer])
    ], AuthenticationHttpInterceptor);
    return AuthenticationHttpInterceptor;
}());
export { AuthenticationHttpInterceptor };
//# sourceMappingURL=AuthenticationHttpInterceptor.js.map