/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
import * as Joi from 'joi'
import { join } from 'path'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { MONGO_URI, MONGO_OPTIONS } from '../mongo.config'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

import { JwtAuthGuard } from './modules/auth/jwt_auth.guard'

import { AuthModule } from './modules/auth/auth.module'
import { TokenModule } from './modules/token/token.module'
import { UserModule } from './modules/user/user.module'
import { RoleModule } from './modules/role/role.module'
import { ViewModule } from './modules/view/view.module'
import { ClientModule } from './modules/client/client.module';

@Module( {
    imports: [
        ConfigModule.forRoot( {
            validationSchema: Joi.object( {
                PORT                                           : Joi.number(),
                DB_HOST                                        : Joi.string(),
                DB_PORT                                        : Joi.number(),
                DB_DATABASE                                    : Joi.string(),
                DB_USERNAME                                    : Joi.string(),
                DB_PASSWORD                                    : Joi.string(),
                JWT_TOKEN_SECRET                               : Joi.string().required(),
                JWT_ACCESS_TOKEN_EXPIRATION_TIME_IN_HOURS      : Joi.number().required(),
                JWT_REFRESH_TOKEN_EXPIRATION_TIME_IN_HOURS     : Joi.number().required(),
                CHANGE_PASSWORD_TOKEN_EXPIRATION_TIME_IN_HOURS : Joi.number().required(),
                SMTP_USER                                      : Joi.string().required(),
                SMTP_USER_PASS                                 : Joi.string().required(),
                SMTP_HOST                                      : Joi.string().required(),
                SMTP_PORT                                      : Joi.number().required(),
            } ),

            isGlobal: true,
        } ),

        GraphQLModule.forRoot( {
            autoSchemaFile : join(process.cwd(), 'src/schema.gql'),
            context        : ( { req } ) => ( { req } ),
            playground     : process.env.NODE_ENV !== 'production',
            subscriptions  : {
                'graphql-ws': true,
            },
        } ),

        MongooseModule.forRoot(MONGO_URI, MONGO_OPTIONS),

        MailerModule.forRoot( {
            transport: {
                host       : process.env.SMTP_HOST,
                port       : Number(process.env.SMTP_PORT),
                ignoreTLS  : false,
                requireTLS : true,
                secure     : false,
                auth       : {
                    user : process.env.SMTP_USER,
                    pass : process.env.SMTP_USER_PASS,
                },

                tls: {
                    ciphers: 'SSLv3',
                },
            },

            defaults: {
                from: `"no-reply" <${process.env.SMTP_USER}>`,
            },

            preview  : false,
            template : {
                dir     : process.cwd() + '/src/templates/',
                adapter : new HandlebarsAdapter(),
                options : {
                    strict: true,
                },
            },
        } ),

        AuthModule,
        TokenModule,
        UserModule,
        RoleModule,
        ViewModule,
        ClientModule,
    ],

    controllers : [],
    providers   : [
        {
            provide  : APP_GUARD,
            useClass : JwtAuthGuard,
        },
    ],
} )
export class AppModule {}
