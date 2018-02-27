"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
require("rxjs/add/operator/do");
const http_1 = require("@angular/common/http");
let AuthenticationHttpInterceptor = class AuthenticationHttpInterceptor {
    constructor(tokenContainerFactory) {
        this.tokenContainerFactory = tokenContainerFactory;
    }
    intercept(request, next) {
        if (this.tokenContainer.token)
            request.headers.append("Authorization", "Bearer " + this.tokenContainer.token);
        return next.handle(request).do(httpEvent => {
            if (httpEvent instanceof http_1.HttpResponse) {
                if (httpEvent.status === 401) {
                    this.tokenContainer.token = null;
                }
                else {
                    this.tokenContainer.token = httpEvent.headers.get("Token");
                }
            }
        });
    }
    get tokenContainer() {
        return this.tokenContainerFactory();
    }
};
AuthenticationHttpInterceptor = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Function])
], AuthenticationHttpInterceptor);
exports.AuthenticationHttpInterceptor = AuthenticationHttpInterceptor;
//# sourceMappingURL=AuthenticationHttpInterceptor.js.map