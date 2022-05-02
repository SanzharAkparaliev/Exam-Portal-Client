import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


@Injectable()
export class AuthInterceptop implements HttpInterceptor{
    constructor(private login:LoginService){};
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.login.getToken();
        if(token != null){
                authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${token}`},})
        }
        return next.handle(authReq);
    }
}
export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptop,
        multi:true,
    },
];