import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * root component of the application
 * @author rodrigo andree saavedra flores
 */
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ea7747u20241d811');
}
