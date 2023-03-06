import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { saveAs } from "file-saver";
import { ConfigurationService } from "./config.service";
import { RxjsHttpResp } from './helpers/rxjs-http-resp.helper';
import { HttpOptions } from './helpers/http-options.helper';

@Injectable({ providedIn: 'root' })
export class HttpService {

    constructor(
        public http: HttpClient,
        public config: ConfigurationService
    ) { }

    fallback(url: string, group: string = 'fallback', referer?: string) {
        var path = encodeURIComponent(url);
        let uri = `${this.config.corsFallback}/proxy?path=${path}&group=${group}`;

        if (referer) uri += `&referer=${encodeURIComponent(referer)}`;

        return uri;
    }

    formatUrl(url: string) {
        if (url.indexOf('https://') !== -1 ||
            url.indexOf('http://') !== -1) return url;

        if (url.startsWith('/'))
            url = url.substring(1);

        return `${this.config.apiUrl}/${url}`;
    }

    get<T>(url: string, options?: HttpOptions) {
        let req = this.http.get<T>(
            this.formatUrl(url),
            options
        );
        return new RxjsHttpResp<T>(req, url, this.config.isProd);
    }

    post<T>(url: string, body: any, options?: HttpOptions) {
        let req = this.http.post<T>(
            this.formatUrl(url),
            body,
            options
        );
        return new RxjsHttpResp<T>(req, url, this.config.isProd);
    }

    put<T>(url: string, body: any, options?: HttpOptions) {
        let req = this.http.put<T>(
            this.formatUrl(url),
            body,
            options
        );
        return new RxjsHttpResp<T>(req, url, this.config.isProd);
    }

    delete<T>(url: string, options?: HttpOptions) {
        let req = this.http.delete<T>(this.formatUrl(url), options);
        return new RxjsHttpResp<T>(req, url, this.config.isProd);
    }

    download(url: string): Observable<HttpResponse<Blob>>;
    download(url: string, body: any): Observable<HttpResponse<Blob>>;
    download(url: string, body?: any) {
        const u = this.formatUrl(url);
        const req = body ? 
            this.http.post(u, body, { observe: 'response', responseType: 'blob' }) : 
            this.http.get(u, { observe: 'response', responseType: 'blob' });
        return req.pipe(
            tap(t => {
                const filename = t.headers.get('content-disposition')
                    ?.split(';')[1]
                    .split('filename')[1]
                    .split('=')[1]
                    .trim();

                if (t.body) saveAs(t.body, filename);
            })
        )
    }
}