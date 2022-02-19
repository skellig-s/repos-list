import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private obj: Omit<{a: string, b: string }, 'b'>;
  title = 'repos-list';
  selectedDate = new FormControl(new Date());
}
