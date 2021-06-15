import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


@Component({
  selector: 'asd-mon-exemple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Works !</div>
  `,
  styles: []
})
export class MonExempleComponent implements OnInit {


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
