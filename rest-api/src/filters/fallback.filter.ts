import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter{

  catch(exception: any, host: ArgumentsHost): any {

    console.log("fallback exception handler triggered", JSON.stringify(exception));

  }

}
