import {
  Component,
  EventEmitter,
  Input,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-button',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss'],
})
export class SidebarButtonComponent {
  text: InputSignal<string> = input('');
  link: InputSignal<string> = input('');
  @Input() action?: () => void;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.action?.(); // run optional function (like logout)
    this.clicked.emit(); // notify parent to close modal
  }
}
