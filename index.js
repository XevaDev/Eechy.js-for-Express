"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs_1 = require("fs");
class Eechy {
    constructor(app, libsFolder, logs) {
        this.app = app;
        this.libsFolder = libsFolder;
        this.logs = logs || false;
    }
    runAllLibs() {
        let parsePath = __dirname.split("/");
        parsePath.pop();
        parsePath.pop();
        parsePath.push("libs");
        parsePath = parsePath.join("/");
        let files = (0, fs_1.readdirSync)(this.libsFolder || parsePath, "utf-8");
        files.forEach((file) => {
            if (file.endsWith(".js")) {
                let data = require(`${this.libsFolder || parsePath}/${file}`);
                let run = data.run;
                let route = data.route;
                let params = data.params;
                if (data.default) {
                    run = data.default.run;
                    params = data.default.params;
                    route = data.default.route;
                }
                else {
                    run = data.run;
                    params = data.params;
                    route = data.route;
                }
                this.run(route, params, run);
            }
        });
    }
    run(route, params, run) {
        let pParsed = "";
        params.forEach((param) => {
            pParsed += `/:${param}`;
        });
        this.app.get(`${route}${pParsed}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let resx;
            let args = [];
            params.forEach((param) => {
                if (Object.keys(req.params).length > 0) {
                    // @ts-ignore
                    args.push(req.params[param]);
                }
            });
            try {
                if (args.length > 0) {
                    resx = run(...args);
                }
                else {
                    resx = run();
                }
                if (this.logs) {
                    let valueParsed = "";
                    args.forEach((arg) => {
                        valueParsed += `/${arg}`;
                    });
                    console.log(`${route}${valueParsed} was called.`);
                }
            }
            catch (e) {
                resx = {
                    // @ts-ignore
                    error: e.message,
                };
            }
            res.json(resx);
        }));
        if (this.logs) {
            console.log(`${route}${pParsed} was added.`);
        }
    }
}
module.exports = Eechy;
