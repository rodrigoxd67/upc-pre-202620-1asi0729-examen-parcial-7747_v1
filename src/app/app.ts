import { Component, signal } from '@angular/core';
import { Layout } from './shared/presentation/components/layout/layout';

/**
 * root component of the application
 * @author rodrigo andree saavedra flores
 */
@Component({
  imports: [Layout],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ea7747u20241d811');
}
