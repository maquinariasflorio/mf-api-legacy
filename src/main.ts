import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import * as bodyParser from 'body-parser'

async function bootstrap() {

    const app = await NestFactory.create(AppModule)
    const port = process.env.PORT || 9090
    app.enableCors()
    app.use(bodyParser.json( { limit: '5mb' } ) )
    app.use(bodyParser.urlencoded( { limit: '5mb', extended: true } ) )
    await app.listen(port)
    Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap')

}
bootstrap()
