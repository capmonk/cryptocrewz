import { AuthenticationOptions, AuthenticationResult, VenlyConnect } from '@venly/connect/dist/src/connect/connect';
import { Account } from '@venly/connect/dist/src/models/Account';
import { Provider } from 'ethereum-types';
import { SecretType } from '@venly/connect';
declare class VenlySubProvider {
    private venlyConnect?;
    private rpcSubProvider;
    private nonceSubProvider;
    private signedVersionedTypedDataSubProvider;
    private subProvider?;
    private engine?;
    connect(): VenlyConnect | undefined;
    changeSecretType(secretType?: SecretType): Promise<Provider | undefined>;
    hasSubProvider(): boolean;
    checkAuthenticated(): Promise<AuthenticationResult>;
    authenticate(authenticationOptions?: AuthenticationOptions): Promise<Account | {}>;
    createProviderEngine(options: VenlySubProviderOptions): Promise<Provider>;
    private getConnectionDetails;
    private startEngine;
}
export interface VenlySubProviderOptions {
    clientId: string;
    environment?: string;
    /** Deprecated, use windowMode instead */
    signMethod?: string;
    windowMode?: string;
    bearerTokenProvider?: () => string;
    secretType?: SecretType;
    authenticationOptions?: AuthenticationOptions;
    skipAuthentication: boolean;
    pollingInterval?: number;
}
export declare const Venly: VenlySubProvider;
export {};
