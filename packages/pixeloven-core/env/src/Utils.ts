import { Mode, Name, Target, UtilOptions } from "./types";

/**
 * Get utils returns an object of functions abstracting common environment variables for conditional statements.
 * @param options
 */
export function getUtils<T extends UtilOptions>(options: T) {
    function ifType<Y, N>(isType: boolean, value?: Y, alternate?: N) {
        const tValue = value || false;
        const tAlternate = alternate || false;
        if (tValue) {
            return isType ? tValue : tAlternate;
        }
        return isType;
    }
    function ifClient(): boolean;
    function ifClient<Y>(value: Y): Y | false;
    function ifClient<Y, N>(value: Y, alternate: N): Y | N;
    function ifClient<Y, N>(value?: Y, alternate?: N) {
        const isClient = options.name === Name.client;
        return ifType(isClient, value, alternate);
    }
    function ifNotClient(): boolean;
    function ifNotClient<Y>(value: Y): Y | false;
    function ifNotClient<Y, N>(value: Y, alternate: N): Y | N;
    function ifNotClient<Y, N>(value?: Y, alternate?: N) {
        const isNotClient = options.name !== Name.client;
        return ifType(isNotClient, value, alternate);
    }
    function ifLibrary(): boolean;
    function ifLibrary<Y>(value: Y): Y | false;
    function ifLibrary<Y, N>(value: Y, alternate: N): Y | N;
    function ifLibrary<Y, N>(value?: Y, alternate?: N) {
        const isLibrary = options.name === Name.library;
        return ifType(isLibrary, value, alternate);
    }
    function ifNotLibrary(): boolean;
    function ifNotLibrary<Y>(value: Y): Y | false;
    function ifNotLibrary<Y, N>(value: Y, alternate: N): Y | N;
    function ifNotLibrary<Y, N>(value?: Y, alternate?: N) {
        const isNotLibrary = options.name !== Name.library;
        return ifType(isNotLibrary, value, alternate);
    }
    function ifServer(): boolean;
    function ifServer<Y>(value: Y): Y | false;
    function ifServer<Y, N>(value: Y, alternate: N): Y | N;
    function ifServer<Y, N>(value?: Y, alternate?: N) {
        const isServer = options.name === Name.server;
        return ifType(isServer, value, alternate);
    }
    function ifDevelopment(): boolean;
    function ifDevelopment<Y>(value: Y): Y | false;
    function ifDevelopment<Y, N>(value: Y, alternate: N): Y | N;
    function ifDevelopment<Y, N>(value?: Y, alternate?: N) {
        const isDevelopment = options.mode === Mode.development;
        return ifType(isDevelopment, value, alternate);
    }
    function ifProduction(): boolean;
    function ifProduction<Y>(value: Y): Y | false;
    function ifProduction<Y, N>(value: Y, alternate: N): Y | N;
    function ifProduction<Y, N>(value?: Y, alternate?: N) {
        const isProduction = options.mode === Mode.production;
        return ifType(isProduction, value, alternate);
    }
    function ifNode(): boolean;
    function ifNode<Y>(value: Y): Y | false;
    function ifNode<Y, N>(value: Y, alternate: N): Y | N;
    function ifNode<Y, N>(value?: Y, alternate?: N) {
        const isNode = options.target === Target.node;
        return ifType(isNode, value, alternate);
    }
    function ifWeb(): boolean;
    function ifWeb<Y>(value: Y): Y | false;
    function ifWeb<Y, N>(value: Y, alternate: N): Y | N;
    function ifWeb<Y, N>(value?: Y, alternate?: N) {
        const isWeb = options.target === Target.web;
        return ifType(isWeb, value, alternate);
    }
    return {
        ifClient,
        ifDevelopment,
        ifLibrary,
        ifNode,
        ifNotClient,
        ifNotLibrary,
        ifProduction,
        ifServer,
        ifWeb,
    };
}
