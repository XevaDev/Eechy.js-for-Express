import type { Express } from "express";
declare class Eechy {
    private app;
    private libsFolder?;
    private logs;
    private accessControlAllowOrigin;
    private autorizedClientPath?;
    constructor(app: Express, libsFolder?: string, logs?: boolean);
    runAllLibs(): void;
    run(route: string, params: string[], run: (...args: any[]) => Promise<object>): Promise<void>;
    autorizeAccessControlAllowOrigin(value: boolean, autorizedClientPath?: string): void;
}
export = Eechy;
