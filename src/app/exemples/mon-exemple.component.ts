import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { groupBy } from 'lodash-es';
import { MatListModule } from '@angular/material/list';

interface Eleves {
  class: string;
  name: string;
}
interface Class extends Map<string, Eleves[]> {
  key: Eleves[];
}

@Component({
  selector: 'asd-mon-exemple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--    On utilise le pipe keyvalue qui permet de parcourir un objet et on utilise .key et .value pour accéder au éléments-->
    <mat-list *ngFor="let class of elevesByClass | keyvalue">
      <strong>Classe : {{ class.key }}</strong>
      <mat-list-item *ngFor="let eleve of class.value">{{
        eleve.name
      }}</mat-list-item>
    </mat-list>
  `,
  styles: [],
})
export class MonExempleComponent implements OnInit {
  /**
   * On récupère tous les élèves de la 6ème d'une api
   */
  eleves: Eleves[] = [
    { class: '6A', name: 'John' },
    { class: '6A', name: 'Marie' },
    { class: '6A', name: 'Elise' },
    { class: '6A', name: 'Bob' },
    { class: '6B', name: 'Sophie' },
    { class: '6B', name: 'Alexandre' },
    { class: '6B', name: 'Romain' },
  ];
  elevesByClass: Class;

  constructor() {
    // on crée un objet qui regroupe les élèves en fonction de la classe. On a un objet avec comme propriété le nom de la classe et un tableau des élèves
    //@ts-ignore
    this.elevesByClass = groupBy(this.eleves, 'class');
  }

  ngOnInit(): void {}
}

const routes: Routes = [
  {
    path: '',
    component: MonExempleComponent,
  },
];

@NgModule({
  declarations: [MonExempleComponent],
  exports: [MonExempleComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatListModule],
})
export class MonExempleModule {}
