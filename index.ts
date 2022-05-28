import type { Express } from "express";
import { readdirSync } from "fs";

class Eechy {
  private app: Express;
  private libsFolder?: string;
  private logs: boolean;

  constructor(app: Express, libsFolder?: string, logs?: boolean) {
    this.app = app;
    this.libsFolder = libsFolder;
    this.logs = logs || false;
  }

  runAllLibs() {
    let parsePath: string | string[] = __dirname.split("/");
    parsePath.pop();
    parsePath.pop();
    parsePath.push("libs");
    parsePath = parsePath.join("/");

    let files = readdirSync(this.libsFolder || parsePath, "utf-8");
    files.forEach((file) => {
      if (file.endsWith(".js")) {
        let data = require(`${this.libsFolder || parsePath}/${file}`);
        let run: (...args: any[]) => object = data.run;
        let route: string = data.route;
        let params: string[] = data.params;

        if (data.default) {
          run = data.default.run;
          params = data.default.params;
          route = data.default.route;
        } else {
          run = data.run;
          params = data.params;
          route = data.route;
        }

        this.run(route, params, run);
      }
    });
  }

  run(route: string, params: string[], run: (...args: any[]) => object) {
    let pParsed: string = "";
    params.forEach((param) => {
      pParsed += `/:${param}`;
    });

    this.app.get(`${route}${pParsed}`, async (req, res) => {
      let resx: object;

      let args: string[] = [];
      params.forEach((param) => {
        if (Object.keys(req.params).length > 0) {
          // @ts-ignore
          args.push(req.params[param]);
        }
      });

      try {
        if (args.length > 0) {
          resx = run(...args);
        } else {
          resx = run();
        }

        if (this.logs) {
          let valueParsed: string = "";
          args.forEach((arg) => {
            valueParsed += `/:${arg}`;
          });
          console.log(`${route}${valueParsed} was called.`);
        }
      } catch (e) {
        resx = {
          // @ts-ignore
          error: e.message,
        };
      }

      res.json(resx);
    });

    if (this.logs) {
      console.log(`${route}${pParsed} was added.`);
    }
  }
}

export = Eechy;
