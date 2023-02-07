import { NgModule } from '@angular/core';
import { IconComponent } from './components/icon/icon.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './components/container/container.component';
import { MagicCircleModule } from './components/magic-circle';
import { 
    MarkdownDirective, 
    ObserverDirective, 
    ImageFallbackDirective, 
    ImageProxyDirective 
} from './directives';

const DECLARATIONS = [
    IconComponent,
    ContainerComponent,
    MarkdownDirective,
    ObserverDirective,
    ImageFallbackDirective,
    ImageProxyDirective
]

@NgModule({
    declarations: [
        ...DECLARATIONS,
        ImageProxyDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        MagicCircleModule
    ],
    exports: [
        ...DECLARATIONS
    ]
})
export class NgxBoxModule { }
