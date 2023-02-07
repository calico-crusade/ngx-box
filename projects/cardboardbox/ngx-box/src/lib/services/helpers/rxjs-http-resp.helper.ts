import { catchError, lastValueFrom, Observable, of, tap } from "rxjs";

export class RxjsHttpResp<T> {

    url!: string;
    observable!: Observable<T>;
    rawObservable!: Observable<T>;

    get promise() { return lastValueFrom(this.observable); }

    constructor(
        _observable: Observable<T>,
        _url: string,
        private _isProd: boolean
    ) { 
        this.url = _url;
        this.observable = _observable;
        this.rawObservable = _observable;
    }

    error(handler: (err: any) => void, def?: T) {
        this.observable = <any>this.observable
            .pipe(
                catchError(err => {
                    console.error('Error occurred during XHR: ', {
                        url: this.url,
                        error: err,
                        default: def
                    });
                    handler(err);
                    return of(def);
                })
            );
        return this;
    }

    tap(handler: (item: T) => void) {
        this.observable = this.observable.pipe(tap(t => handler(t)));
        return this;
    }

    subscribe(handler: (item: T) => void) { 
        return this.observable.subscribe(t => {
            if (!this._isProd)
                console.log('XHR Request Result', {
                    url: this.url,
                    results: t
                });
            handler(t);
        });
    }
}