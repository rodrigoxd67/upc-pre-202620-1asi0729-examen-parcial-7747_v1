import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';
import { OutdoorCenterSummary as Summary } from '../../../domain/model/outdoor-center-summary';

/**
 * card with the reservations and capacity indicators of an outdoor center
 * @author rodrigo andree saavedra flores
 */
@Component({
  selector: 'app-outdoor-center-summary',
  imports: [MatCardModule, MatListModule, MatIconModule, MatDividerModule, TranslatePipe],
  templateUrl: './outdoor-center-summary.html',
  styleUrl: './outdoor-center-summary.css',
})
export class OutdoorCenterSummary {
  readonly summary = input.required<Summary>();
}
