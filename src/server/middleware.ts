import {Express} from 'express'
import {isDev} from '../common/lib'
import * as express from 'express'
import session = require('express-session')
import {SESSION_SECRET} from '../common/config'
import {configurePassport} from './passport'
import bodyParser = require('body-parser')

const mongoose = require('mongoose')
const connectMongo = require('connect-mongo')
const Bundler = require('parcel-bundler')
const MongoStore = connectMongo(session)

export function initMiddleware(app: Express) {
    const bundler = new Bundler('./src/client/index.ts', {
        outDir: 'static/dist',
        publicUrl: '/dist',
        contentHash: false,
        sourceMaps: isDev()
    })
    app.use(bundler.middleware())
    app.use(express.static('static'))
    app.use(session({
        secret: SESSION_SECRET,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'sessions'
        }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: !isDev()
        }
    }))
    app.use(bodyParser.urlencoded({
        extended: true // use https://www.npmjs.com/package/qs#readme parsing library
    }))
    configurePassport(app)
}
