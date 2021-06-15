import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'asd-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<asd-page></asd-page>`,
  styles: []
})
export class AppComponent {

}
