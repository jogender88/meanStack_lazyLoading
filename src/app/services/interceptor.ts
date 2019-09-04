import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private authenticationService:AuthenticationService){}
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (localStorage.getItem('token') != null) {
            const token = localStorage.getItem('token');
            // if the token is  stored in localstorage add it to http header
            const headers = new HttpHeaders().set('token', token);
            //clone http to the custom AuthRequest and send it to the server 
            const AuthRequest = request.clone({ headers: headers });
            return next.handle(AuthRequest).pipe(catchError(err => {
                if (err.status === 401) {
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    location.reload(true);
                }
                const error = err.error.message || err.statusText;
                return throwError(error);
            }))
        }
        else {
            return next.handle(request)
        }
    }
}