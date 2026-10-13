import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { OutdoorCentersStore } from '../../../../outdoor-centers/application/outdoor-centers.store';
import { OutdoorCenterSummary } from '../../../../outdoor-centers/presentation/components/outdoor-center-summary/outdoor-center-summary';

/**
 * home view with the platform summary and the outdoor centers section
 * @author rodrigo andree saavedra flores
 */
@Component({
  selector: 'app-home',
  imports: [MatGridListModule, MatProgressSpinner, MatError, TranslatePipe, OutdoorCenterSummary],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly store = inject(OutdoorCentersStore);
  #breakpointObserver = inject(BreakpointObserver);

  readonly columns = toSignal(
    this.#breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => (result.matches ? 1 : 2))),
    { initialValue: 2 },
  );
}
