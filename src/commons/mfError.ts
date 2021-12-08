export class MfError {

    statusCode: number;
    code: string;
    message: string;
    stack: string;

    constructor( { statusCode, code, message }: { statusCode?: number, code: string, message: string } ) {

        this.statusCode = statusCode || null
        this.code = code
        this.message = message
        this.stack = new Error().stack
    
    }

}
