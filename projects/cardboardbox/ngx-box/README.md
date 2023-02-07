# @cardboard-box/ngx-box
A collection of useful directives, components and services for angular

## Install
You can install this package via NPM (or your favourite npm compatible installer)

> npm install @cardboard-box/ngx-box

Add the two modules into your project:
```typescript
import { NgModule } from '@angular/core';
import { MagicCircleModule, NgxBoxModule } from '@cardboard-box/ngx-box';

@NgModule({
    declarations: [
        ...
    ],
    imports: [
        ...
        NgxBoxModule, //This is for all default components and directives
        MagicCircleModule //This is JUST for the magic-circle components
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage - Containers
There is a default container that handles things like loading circles, error states, and content states. 
This can be useful for handling different component states, scrolling components, and standardization of error messages.

You can use it like so:
```html
<box-container
    [loading]="true"
    loading-text="This text is shown on the loading circle"
    error="Some error has occurred"
    handle-scroll
    >
    <!--Your component content-->
</box-container>
```

* `loading` - Whether or not the component is in a loading state. (true / false)
* `loading-text` - The text to show on the loading circle (string / undefined)
* `error` - This is an error message to show if in an error state. If undefined, the component isn't in an error state (string / undefined)
* `handle-scroll` - Whether or not to handle scrolling within the content, otherwise it hides any overflow.

You need to ensure that the parent element of the component has `position` of `relative`, `absolute`, or `fixed`.

## Usage - Icons
A way of handling google material icons without needing to include the material libraries.
You will need to include the material icons CDN into your index.html for them to showup. 
You can use this CDN reference:
```html
<head>
    ...
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Kolker+Brush&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>
```

You can use it like so:
```html
<box-icon 
    font-size="24px" 
    [unsize]="false" 
    [fill]="false" 
    [spin]
    >
    warning
</box-icon>
```

* `font-size` - The size of the font to use for the icon. (string / undefined)
* `unsize` - Whether or not to remove explicit sizing and use the `inherit` option for most properties
* `fill` - Whether or not to fill the icon in. This might not work for all icons. (boolean / undefined)
* `spin` - Whether or not to have the icon spin. (boolean / undefined)
