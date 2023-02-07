import { Component, Input } from '@angular/core';
import { PropBoolean } from '../../services';

@Component({
  selector: 'lib-container',
  templateUrl: './container.component.html',
  styleUrls: [ './../../styles/flex.scss', './container.component.scss']
})
export class ContainerComponent {
    @Input() loading: PropBoolean = false;
    @Input('loading-text') loadingText?: string;
    @Input() error?: string;
    @Input('handle-scroll') handleScroll: PropBoolean = false;
}
