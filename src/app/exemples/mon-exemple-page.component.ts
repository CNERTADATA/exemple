import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { VisualisationComplete } from './state/visualisation-complete.model';

@Component({
  selector: 'asd-mon-exemple-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--    On affiche libelle du plan et de toutes les fiches le composant-->
    <mat-list>
      <strong>{{ visualisationComplete?.libellePlan }}</strong>
      <mat-list-item
        *ngFor="let libelleFiche of visualisationComplete?.libelleFiches"
        >{{ libelleFiche }}</mat-list-item
      >
      <mat-list-item *ngIf="visualisationComplete?.libelleFiches?.length === 0"
        >Aucune fiche n'est associé à ce plan.</mat-list-item
      >
    </mat-list>
  `,
  styles: [],
})
export class MonExemplePageComponent {
  @Input() visualisationComplete: VisualisationComplete | null = null;

  constructor() {}
}

@NgModule({
  declarations: [MonExemplePageComponent],
  exports: [MonExemplePageComponent],
  imports: [CommonModule, MatListModule],
})
export class MonExemplePageModule {}
