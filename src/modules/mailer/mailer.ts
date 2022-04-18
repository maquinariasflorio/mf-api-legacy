import fs from 'fs'
import path from 'path'
import * as nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import { google } from 'googleapis'

const createTransporter = async () => {

    const oAuth2Client = new google.auth.OAuth2(process.env.SMTP_CLIENT_ID, process.env.SMTP_CLIENT_SECRET, process.env.SMTP_REDIRECT_URL)
    oAuth2Client.setCredentials( { refresh_token: process.env.SMTP_REFRESH_TOKEN } )
  
    const accessToken: any = await await new Promise( (resolve, reject) => {

        oAuth2Client.getAccessToken( (err, token) => {

            if (err)
                reject()
          
            resolve(token)
        
        } )
    
    } )
  
    const transporter = nodemailer.createTransport( {
        service : "gmail",
        auth    : {
            type         : "OAuth2",
            user         : process.env.SMTP_USER,
            accessToken  : accessToken,
            clientId     : process.env.SMTP_CLIENT_ID,
            clientSecret : process.env.SMTP_CLIENT_SECRET,
            refreshToken : process.env.SMTP_REFRESH_TOKEN,
        },
    } )
  
    return transporter

}
  
export const sendMail = async (emailOptions) => {

    const emailTransporter = await createTransporter()

    let htmlToSend = emailOptions.html || emailOptions.text || ''
    if (!emailOptions.html && emailOptions.template) {

        const emailTemplateSource = fs.readFileSync(path.join(process.cwd(), "/src/templates/", emailOptions.template, ".hbs"), "utf8")
        const template = handlebars.compile(emailTemplateSource)
        htmlToSend = template(emailOptions.context || {} )

        delete emailOptions.template
        delete emailOptions.context
    
    }

    await emailTransporter.sendMail( {
        from : `"no-reply" <${process.env.SMTP_USER}>`,
        ...emailOptions,
        html : htmlToSend,
    } )

}
