import { Component, Input } from '@angular/core';
import { PropBoolean } from '../../services';

@Component({
  selector: 'box-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
    @Input('font-size') size?: string; 
    @Input('unsize') unsize: PropBoolean = false;
    @Input('fill') fill: PropBoolean = false;
    @Input('spin') spin: PropBoolean = false;
}
