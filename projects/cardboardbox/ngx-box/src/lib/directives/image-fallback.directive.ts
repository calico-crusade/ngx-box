import { Directive, HostBinding, Input, HostListener } from "@angular/core";
import { HttpService } from "../services";

@Directive({
    selector: 'img[fallback]'
})
export class ImageFallbackDirective {

    @HostBinding('src') @Input() src?: string;

    @Input('fallback') default?: string;
    @Input('group') group: string = 'fallback';
    @Input('referer') referer?: string;

    constructor(
        private http: HttpService
    ) { }

    @HostListener('error')
    update() {
        this.src = this.default || this.http.fallback(this.src || '', this.group, this.referer);
    }
}

