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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./lib/config");
const router_1 = require("./lib/router");
const path_1 = __importDefault(require("path"));
const express_1 = __importStar(require("express"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const error_1 = require("./lib/error");
let _beforeStart, _app, _server;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const app = _app;
            const config = config_1.Config;
            const server = _server;
            // run hook beforeStart
            if (_beforeStart) {
                yield _beforeStart(app, server, config);
            }
            // for dev
            app.use(morgan_1.default('dev'));
            // use lib
            app.use(express_1.json());
            // init router
            yield router_1.initRoutes(app, path_1.default.join(config.dirroot, 'routes'));
            // handle Error
            app.use(error_1.handleFesError);
            // start server
            const port = Number(process.env.PORT);
            app.listen(port, () => {
                console.log('Server listen on port', port);
                resolve({ app, server });
            });
        }));
    });
}
function beforeStart(f) {
    _beforeStart = f;
    return { start };
}
function FesServer(config, app, server) {
    _app = app || express_1.default();
    _server = server || http_1.default.createServer(app);
    config_1.setConfig(config);
    Object.assign(process.env, config.env);
    return { beforeStart, start };
}
exports.FesServer = FesServer;
__export(require("./lib/config"));
exports.Mongoose = __importStar(require("./lib/mongoose"));
__export(require("./lib/error"));
//# sourceMappingURL=index.js.map