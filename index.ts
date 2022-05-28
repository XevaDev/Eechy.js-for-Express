import type { Express } from "express";
import { readdirSync } from "fs";
import bodyParser from "body-parser";

class Eechy {
  private app: Express;
  private libsFolder?: string;
  private logs: boolean;

  constructor(app: Express, libsFolder?: string, logs?: boolean) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    this.app = app;
    this.libsFolder = libsFolder;
    this.logs = logs || false;
  }

  runAllLibs() {
    // Get the path of the libs folder in the workspace of the user.
    if (this.libsFolder === undefined) {
      this.libsFolder = process.cwd() + "/libs";
    }

    let files = readdirSync(this.libsFolder, "utf-8");
    files.forEach((file) => {
      if (file.endsWith(".js")) {
        let data = require(`${this.libsFolder}/${file}`);

        if (!data.run) throw new Error(`${file} is not a valid lib.`);
        if (!data.route) throw new Error(`${file} is not a valid lib.`);
        if (!data.params) throw new Error(`${file} is not a valid lib.`);

        let run: (...args: any[]) => Promise<object> = data.run;
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

  async run(
    route: string,
    params: string[],
    run: (...args: any[]) => Promise<object>
  ) {
    let pParsed: string = "";
    params.forEach((param) => {
      pParsed += `/:${param}`;
    });

    this.app.get(`${route}${pParsed}`, async (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");

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
          resx = await run(...args);
        } else {
          resx = await run();
        }

        if (this.logs) {
          let valueParsed: string = "";
          args.forEach((arg) => {
            valueParsed += `/${arg}`;
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
