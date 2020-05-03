import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 

import { TokenStorageService } from './token-storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private tokenStorage: TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenStorage.getToken();
        if (token != null) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer_' + token
                },
            });
        }

        // console.log(req.headers.get('Authorization'));

        // use refresh token here
        return next.handle(req);
    }
}
