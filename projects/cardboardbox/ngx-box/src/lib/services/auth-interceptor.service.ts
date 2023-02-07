import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigurationService } from "./config.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private config: ConfigurationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.config.token;

        for(const url of this.config.SkipAuthUrls) {
            if (req.url.indexOf(url) !== -1)
                return next.handle(req);
        }

        let headers = req.headers;

        if (token) {
            headers = headers.set('authorization', `Bearer ${token}`);
        }

        const r = req.clone({ headers });

        return next.handle(r);
    }
}