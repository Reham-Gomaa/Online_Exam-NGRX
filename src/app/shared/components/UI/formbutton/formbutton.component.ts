import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-formbutton',
  imports: [],
  templateUrl: './formbutton.component.html',
  styleUrls: ['./formbutton.component.scss']
})
export class FormbuttonComponent {
  text :InputSignal<string> = input('');
}
