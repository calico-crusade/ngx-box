import { Directive, HostBinding, Input } from "@angular/core";
import { HttpService } from "../services";

@Directive({
    selector: 'img[proxy]'
})
export class ImageProxyDirective {

    @HostBinding('src') @Input() src?: string;

    @Input() group: string = 'anime';

    @Input() referer?: string;

    @Input() 
    set proxy(value: string | undefined | null) {
        if (!value) return;

        this.src = this.http.fallback(value, this.group, this.referer);
    }

    constructor(
        private http: HttpService
    ) { }
}