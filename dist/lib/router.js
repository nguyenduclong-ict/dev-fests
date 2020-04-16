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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function initRoutes(app, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const routes = yield getEntryRoutes(path, '/');
        routes.forEach((route) => {
            app.use(route.routePath, route.i.default);
        });
        return true;
    });
}
exports.initRoutes = initRoutes;
function getMappedRoutes(path, parent = '/') {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = fs_1.default.lstatSync(path);
        if (stats.isDirectory()) {
            const dir = fs_1.default.readdirSync(path);
            const children = yield Promise.all(dir
                .map((fileName) => path_1.default.join(path, fileName))
                .filter(isValidFile)
                .map((filePath) => getMappedRoutes(filePath, path_1.default.join(parent, path_1.default.parse(filePath).name.split('.').shift()))));
            return {
                routePath: parent,
                children,
            };
        }
        else if (stats.isFile()) {
            const route = yield Promise.resolve().then(() => __importStar(require(path)));
            return {
                routePath: parent.replace('//index$/', '/'),
                i: route,
            };
        }
    });
}
function isValidFile(path) {
    const validRegex = [/\.route\.js$/];
    const stats = fs_1.default.statSync(path);
    const file = path_1.default.parse(path);
    return (stats.isDirectory() || validRegex.every((regex) => regex.test(file.base)));
}
function getEntryRoutes(path, parent = '/') {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const stats = fs_1.default.lstatSync(path);
        if (stats.isDirectory()) {
            const dir = fs_1.default.readdirSync(path);
            const arr = yield Promise.all(dir
                .map((fileName) => path_1.default.join(path, fileName))
                .filter(isValidFile)
                .map((filePath) => getEntryRoutes(filePath, path_1.default.join(parent, path_1.default.parse(filePath).name.split('.').shift()))));
            arr.forEach((routes) => {
                result.push(...routes);
            });
        }
        else if (stats.isFile()) {
            const route = yield Promise.resolve().then(() => __importStar(require(path)));
            result.push({
                routePath: parent.replace(/\/index$/, ''),
                i: route,
            });
        }
        return result;
    });
}
function entriesRoute(module) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        if (module.i) {
            result.push({
                routePath: module.routePath,
                i: module.i,
            });
        }
        if (module.children) {
            const ms = yield Promise.all(module.children.map((m) => entriesRoute(m)));
            ms.forEach((m) => result.push(...m));
        }
        return result;
    });
}
//# sourceMappingURL=router.js.map