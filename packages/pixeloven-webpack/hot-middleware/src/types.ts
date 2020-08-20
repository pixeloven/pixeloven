/* tslint:disable no-any */

export type LogFunction = (message?: any, ...optionalParams: any[]) => void;

export type ModuleId = string | number;

export interface Options {
    ansiColors: object;
    autoConnect: boolean;
    heartbeat: number;
    log: LogFunction | false;
    name: string;
    overlay: boolean;
    overlayStyles: object;
    overlayWarnings: boolean;
    path: string;
    reload: boolean;
    timeout: number;
    warn: boolean;
}

export interface ClientOverlayOptions {
    ansiColors?: object;
    overlayStyles?: object;
}
