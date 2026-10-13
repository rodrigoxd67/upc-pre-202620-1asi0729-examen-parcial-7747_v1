import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * home view with the platform summary and the outdoor centers section
 * @author rodrigo andree saavedra flores
 */
@Component({
  selector: 'app-home',
  imports: [TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
