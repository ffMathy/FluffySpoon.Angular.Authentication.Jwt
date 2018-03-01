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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenContainer } from './TokenContainer';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, tokenContainer) {
        this.http = http;
        this.tokenContainer = tokenContainer;
        this._tokenUrl = "/api/token";
    }
    Object.defineProperty(AuthenticationService.prototype, "redirectUrl", {
        get: function () {
            return this._redirectUrl;
        },
        set: function (value) {
            if (value != null && value.indexOf('/') !== 0) {
                throw new Error("The redirect URL must be relative for security reasons.");
            }
            this._redirectUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "isSignedIn", {
        get: function () {
            var token = this.tokenContainer.token;
            if (!token) {
                throw new Error("A token has not been initialized yet.");
            }
            return !this.tokenContainer.isAnonymous;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.waitForAnonymousAuthentication = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._anonymousRequestPromise) {
                            this._anonymousRequestPromise = this.anonymousRequest();
                        }
                        return [4 /*yield*/, this._anonymousRequestPromise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationService.prototype.signIn = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var existingAuthenticatedTokenEnvelope;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = username
                            .toLowerCase()
                            .trim();
                        return [4 /*yield*/, this.tokenContainer.token];
                    case 1:
                        existingAuthenticatedTokenEnvelope = _a.sent();
                        if (existingAuthenticatedTokenEnvelope && (this.tokenContainer.isAnonymous || this.tokenContainer.username !== username))
                            existingAuthenticatedTokenEnvelope = null;
                        if (existingAuthenticatedTokenEnvelope)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.authenticate(username, password)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationService.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, headers, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        credentials = {
                            Username: username,
                            Password: password
                        };
                        headers = new HttpHeaders();
                        headers.append("Authorization", "FluffySpoon " + btoa(JSON.stringify(credentials)));
                        return [4 /*yield*/, this.http.get(this._tokenUrl, { observe: 'response', headers: headers }).toPromise()];
                    case 1:
                        response = _a.sent();
                        if (response && response.status !== 401) {
                            throw new Error("An error occured on the server side.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationService.prototype.anonymousRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this._tokenUrl).toPromise()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            TokenContainer])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=AuthenticationService.js.map