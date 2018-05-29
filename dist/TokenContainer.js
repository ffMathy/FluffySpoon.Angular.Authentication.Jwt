var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
var TokenContainer = /** @class */ (function () {
    function TokenContainer() {
        this.tokenResponseKey = "fluffy-spoon.angular.authentication.jwt.tokenResponse";
        this.roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    }
    Object.defineProperty(TokenContainer.prototype, "token", {
        get: function () {
            return sessionStorage.getItem(this.tokenResponseKey) || null;
        },
        set: function (token) {
            sessionStorage.setItem(this.tokenResponseKey, token || '');
        },
        enumerable: true,
        configurable: true
    });
    TokenContainer.prototype.destroyToken = function () {
        sessionStorage.removeItem(this.tokenResponseKey);
    };
    Object.defineProperty(TokenContainer.prototype, "isAnonymous", {
        get: function () {
            return !this.subject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenContainer.prototype, "roles", {
        get: function () {
            return this.getClaimValues(this.roleKey);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenContainer.prototype, "issuedAt", {
        get: function () {
            return this.getClaimTimestamp("iat");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenContainer.prototype, "expiresAt", {
        get: function () {
            return this.getClaimTimestamp("exp");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenContainer.prototype, "subject", {
        get: function () {
            return this.getClaimValue("sub");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenContainer.prototype, "identifier", {
        get: function () {
            return this.getClaimValue("jti");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenContainer.prototype, "validSince", {
        get: function () {
            return this.getClaimTimestamp("nbf");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenContainer.prototype, "issuer", {
        get: function () {
            return this.getClaimValue("iss");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenContainer.prototype, "audience", {
        get: function () {
            return this.getClaimValue("aud");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenContainer.prototype, "isExpired", {
        get: function () {
            var now = new Date();
            var nowInSeconds = now.getTime();
            var expiresInSeconds = this.expiresAt.getTime();
            return nowInSeconds > expiresInSeconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenContainer.prototype, "claims", {
        get: function () {
            var dataPayload = this.getDataPayload();
            if (!dataPayload)
                return null;
            return JSON.parse(btoa(dataPayload));
        },
        enumerable: true,
        configurable: true
    });
    TokenContainer.prototype.getClaimValue = function (key) {
        if (!this.claims)
            return null;
        return this.claims[key];
    };
    TokenContainer.prototype.getClaimValues = function (key) {
        if (!this.claims)
            return [];
        var values = this.claims[key];
        if (!values) {
            return [];
        }
        if (Array.isArray(values)) {
            return values;
        }
        return [values];
    };
    TokenContainer.prototype.getClaimTimestamp = function (key) {
        var timestamp = this.getClaimValue(key);
        return new Date(timestamp * 1000);
    };
    TokenContainer.prototype.getDataPayload = function () {
        var payloads = this.getPayloads();
        if (!payloads)
            return null;
        return payloads[1];
    };
    TokenContainer.prototype.getPayloads = function () {
        if (!this.token)
            return null;
        return this.token.split(".");
    };
    TokenContainer = __decorate([
        Injectable()
    ], TokenContainer);
    return TokenContainer;
}());
export { TokenContainer };
//# sourceMappingURL=TokenContainer.js.map