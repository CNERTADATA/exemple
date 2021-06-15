import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { groupBy } from 'lodash-es'


@Component({
  selector: 'asd-mon-exemple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Works !</div>
  `,
  styles: []
})
export class MonExempleComponent implements OnInit {

  /**
   * On récupère tous les élèves de la 6ème
   */
  eleves = [
    {class: '6A', name: 'John'},
    {class: '6A', name: 'Marie'},
    {class: '6A', name: 'Elise'},
    {class: '6A', name: 'Bob'},
    {class: '6B', name: 'Sophie'},
    {class: '6B', name: 'Alexandre'},
    {class: '6B', name: 'Romain'},
  ];

  constructor() {
  }


  ngOnInit(): void {
  }


}

const routes: Routes = [
  {
    path: '',
    component: MonExempleComponent
  }
];


@NgModule({
  declarations: [MonExempleComponent],
  exports: [MonExempleComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class MonExempleModule {
}
