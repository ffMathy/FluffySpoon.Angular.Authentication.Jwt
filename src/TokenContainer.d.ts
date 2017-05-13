export declare class TokenContainer {
    private readonly tokenResponseKey;
    private readonly roleKey;
    token: string;
    readonly isAnonymous: boolean;
    readonly roles: string[];
    readonly issuedAt: Date;
    readonly expiresAt: Date;
    readonly username: string;
    readonly subject: string;
    readonly identifier: string;
    readonly validSince: Date;
    readonly issuer: string;
    readonly audience: string;
    readonly claims: {
        [key: string]: any;
    };
    getClaimValue(key: string): any;
    getClaimValues(key: string): any[];
    private getClaimTimestamp(key);
    private getDataPayload();
    private getPayloads();
}
