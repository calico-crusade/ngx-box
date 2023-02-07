import { Component, OnDestroy } from "@angular/core";
import { SubscriptionHandler } from "../services";

@Component({ template: '' })
export abstract class Subscribable implements OnDestroy {

    public subs = new SubscriptionHandler();

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}