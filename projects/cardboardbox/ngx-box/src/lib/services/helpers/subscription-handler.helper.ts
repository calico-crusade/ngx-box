import { catchError, Observable, of, Subscription } from "rxjs";

export class SubscriptionHandler {
    subscriptions: Subscription[] = [];

    subscribe<T>(obs: Observable<T>, handler: (item: T) => void, error?: (error: any) => void) {
        let o: Observable<T | undefined> = obs;
        if (error) {
            o = obs.pipe(
                catchError(err => {
                    console.error('An Error occurred', { err });
                    error(err);
                    return of(undefined)
                })
            );
        }

        const sub = o.subscribe(t => handler(<any>t));
        this.subscriptions.push(sub);
        return this;
    }

    unsubscribe() {
        for(let sub of this.subscriptions) sub.unsubscribe();
        this.subscriptions = [];
    }
}