import {ChangeDetectionStrategy, Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderModule} from './header.component';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'asd-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <asd-header></asd-header>
    <mat-card class="m-20">
      <router-outlet></router-outlet>
    </mat-card>
  `,
  styles: [`
    .m-20 {
      margin: 20px;
    }
  `]
})
export class PageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [PageComponent],
  exports: [PageComponent],
  imports: [CommonModule, HeaderModule, MatCardModule, RouterModule,]
})
export class PageModule {}
