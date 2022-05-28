import type { Express } from "express";
declare class Eechy {
    private app;
    private libsFolder?;
    private logs;
    constructor(app: Express, libsFolder?: string, logs?: boolean);
    runAllLibs(): void;
    run(route: string, params: string[], run: (...args: any[]) => Promise<object>): Promise<void>;
}
export = Eechy;
