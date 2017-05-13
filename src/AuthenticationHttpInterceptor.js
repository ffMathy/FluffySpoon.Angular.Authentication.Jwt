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
const core_1 = require("@angular/core");
const fluffy_spoon_angular_http_1 = require("fluffy-spoon.angular.http");
let AuthenticationHttpInterceptor = class AuthenticationHttpInterceptor extends fluffy_spoon_angular_http_1.HttpInterceptor {
    constructor(tokenContainerFactory) {
        super();
        this.tokenContainerFactory = tokenContainerFactory;
    }
    get tokenContainer() {
        return this.tokenContainerFactory();
    }
    configureRequest(request, options) {
        super.configureRequest(request, options);
        var tokenContainer = this.tokenContainerFactory();
        if (tokenContainer && tokenContainer.token) {
            request.headers.append("Authorization", "Bearer " + tokenContainer.token);
        }
    }
    onSuccessfulRequest(response) {
        var token = response.headers.get("Token");
        if (token) {
            this.tokenContainer.token = token;
        }
    }
    onFailedRequest(response) {
        if (response.status === fluffy_spoon_angular_http_1.HttpStatusCode.Unauthorized) {
            this.tokenContainer.token = null;
        }
    }
};
AuthenticationHttpInterceptor = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Function])
], AuthenticationHttpInterceptor);
exports.AuthenticationHttpInterceptor = AuthenticationHttpInterceptor;
//# sourceMappingURL=AuthenticationHttpInterceptor.js.map