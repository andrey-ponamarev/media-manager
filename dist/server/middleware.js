"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var path = __importStar(require("path"));
var lib_1 = require("../common/lib");
var env_1 = require("./env");
var passport_1 = require("./passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var connectMongo = require('connect-mongo');
var MongoStore = connectMongo(session);
function initMiddleware(app) {
    app.use(express.static(path.resolve(__dirname, '../static')));
    app.use(session({
        secret: env_1.SESSION_SECRET,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'sessions'
        }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: !lib_1.isDev()
        }
    }));
    app.use(bodyParser.json());
    passport_1.configurePassport(app);
}
exports.initMiddleware = initMiddleware;
//# sourceMappingURL=middleware.js.map