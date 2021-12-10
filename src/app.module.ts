import * as Joi from 'joi'
import { join } from 'path'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

import { JwtAuthGuard } from './modules/auth/jwt_auth.guard'

import { AuthModule } from './modules/auth/auth.module'
import { TokenModule } from './modules/token/token.module'
import { UserModule } from './modules/user/user.module'
import { RoleModule } from './modules/role/role.module'
import { ViewModule } from './modules/view/view.module'

@Module( {
    imports: [
        ConfigModule.forRoot( {
            validationSchema: Joi.object( {
                PORT                                           : Joi.number(),
                DB_HOST                                        : Joi.string().required(),
                DB_PORT                                        : Joi.number().required(),
                DB_DATABASE                                    : Joi.string().required(),
                DB_USERNAME                                    : Joi.string().required(),
                DB_PASSWORD                                    : Joi.string().required(),
                JWT_TOKEN_SECRET                               : Joi.string().required(),
                JWT_ACCESS_TOKEN_EXPIRATION_TIME_IN_HOURS      : Joi.number().required(),
                JWT_REFRESH_TOKEN_EXPIRATION_TIME_IN_HOURS     : Joi.number().required(),
                CHANGE_PASSWORD_TOKEN_EXPIRATION_TIME_IN_HOURS : Joi.number().required(),
                SMTP_USER                                      : Joi.string().required(),
                SMTP_USER_PASS                                 : Joi.string().required(),
                SMTP_HOST                                      : Joi.string().required(),
                SMTP_PORT                                      : Joi.number().required(),
                APP_URL                                        : Joi.string().required(),
            } ),

            isGlobal: true,
        } ),

        GraphQLModule.forRoot( {
            autoSchemaFile : join(process.cwd(), 'src/schema.gql'),
            context        : ( { req } ) => ( { req } ),
            playground     : process.env.NODE_ENV !== 'production',
        } ),

        TypeOrmModule.forRoot( {
            type     : 'mongodb',
            host     : process.env.DB_HOST,
            port     : parseInt(process.env.DB_PORT),
            database : process.env.DB_DATABASE,
            username : process.env.DB_USERNAME,
            password : process.env.DB_PASSWORD,
            entities : [
                join(__dirname, './**/*.entity{.ts,.js}'),
            ],
        
            migrations: [
                join(__dirname, './../migrations/*{.ts,.js}'),
            ],
        
            migrationsRun      : true,
            synchronize        : process.env.NODE_ENV !== 'production',
            useNewUrlParser    : true,
            logging            : true,
            useUnifiedTopology : true,
            authSource         : 'admin',
        } ),

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
