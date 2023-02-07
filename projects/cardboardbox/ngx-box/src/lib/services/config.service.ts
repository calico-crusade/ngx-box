import { Injectable } from "@angular/core";

@Injectable()
export class ConfigurationService {
    private _token = new LocalStorageVar<string | undefined>('', 'auth-token');
    
    get apiUrl() { return ''; }
    get isProd() { return true; }

    get token() { return this._token.value; }
    set token(value: string | undefined) { this._token.value = value; }

    get SkipAuthUrls(): string[] { return []; }

    get corsFallback(): string { return ''; }
}

export interface IStorageVar<T> {
    get value(): T;
    set value(item: T | undefined);
}

export class LocalStorageVar<T> implements IStorageVar<T> {
    private _value?: T;

    constructor(
        public defValue: T,
        public name: string,
        public fun?: (val?: T) => void
    ) { }

    get value(): T { 
        if (this._value !== undefined) return this._value;
        const val = localStorage.getItem(this.name);
        return this._value = <any>this.convertType(val); 
    }
    set value(item: T | undefined) { 
        this._value = item;
        if (item !== undefined) localStorage.setItem(this.name, <any>item);
        else localStorage.removeItem(this.name);
        if (this.fun) this.fun(item);
    }

    convertType(value?: string | null) {
        if (value === undefined || value === null) {
            return this.defValue;
        }
        if (typeof this.defValue === 'number') {
            return Number(value);
        }
        if (typeof this.defValue === 'boolean') {
            return value === 'true';
        }

        return value;
    }
}