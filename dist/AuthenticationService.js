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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const fluffy_spoon_angular_http_1 = require("fluffy-spoon.angular.http");
const TokenContainer_1 = require("./TokenContainer");
let AuthenticationService = class AuthenticationService {
    constructor(http, tokenContainer) {
        this.http = http;
        this.tokenContainer = tokenContainer;
        this._tokenUrl = "/api/token";
    }
    get redirectUrl() {
        return this._redirectUrl;
    }
    set redirectUrl(value) {
        if (value != null && value.indexOf('/') !== 0) {
            throw new Error("The redirect URL must be relative for security reasons.");
        }
        this._redirectUrl = value;
    }
    get isSignedIn() {
        var token = this.tokenContainer.token;
        if (!token) {
            throw new Error("A token has not been initialized yet.");
        }
        return !this.tokenContainer.isAnonymous;
    }
    waitForAnonymousAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._anonymousRequestPromise) {
                this._anonymousRequestPromise = this.anonymousRequest();
            }
            yield this._anonymousRequestPromise;
        });
    }
    signIn(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            username = username
                .toLowerCase()
                .trim();
            var existingAuthenticatedTokenEnvelope = yield this.tokenContainer.token;
            if (existingAuthenticatedTokenEnvelope && (this.tokenContainer.isAnonymous || this.tokenContainer.username !== username))
                existingAuthenticatedTokenEnvelope = null;
            if (existingAuthenticatedTokenEnvelope)
                return;
            yield this.authenticate(username, password);
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var credentials = {
                Username: username,
                Password: password
            };
            var headers = new http_1.Headers();
            headers.append("Authorization", "FluffySpoon " + btoa(JSON.stringify(credentials)));
            var response = yield this.http
                .postAsync(this._tokenUrl, {
                headers: headers
            });
            if (response && response.status !== fluffy_spoon_angular_http_1.HttpStatusCode.Unauthorized) {
                throw new Error("An error occured on the server side.");
            }
        });
    }
    anonymousRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.http.getAsync(this._tokenUrl);
        });
    }
};
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [fluffy_spoon_angular_http_1.ExtendedHttp,
        TokenContainer_1.TokenContainer])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map