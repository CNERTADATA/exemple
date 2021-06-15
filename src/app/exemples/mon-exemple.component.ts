import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormComponent,
  ReactiveFormModule,
} from './reactive-form.component';

@Component({
  selector: 'asd-mon-exemple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!--    On peut utiliser directement l'instance de reactiveForm directement dans le template-->
    <button mat-button (click)="reactiveForm.elevesFG.reset()">Clear</button>
    <button mat-button (click)="updateData()">Ajouter un nom</button>
<!--On déclare une instance de reactiveForm avec le #un_nom-->
    <asd-reactive-form
      #reactiveForm
      [classes]="classes"
      (emitEleves)="log($event)"
    ></asd-reactive-form>
  `,
  styles: [],
})
export class MonExempleComponent{
  // le décorateur viewChild permet de récupérer un éléments du dom, on associe au type du component pour récupérer les variables et méthodes facilement.
  // Avoir une variable peut également permettre de récupérer cette information dans un parent et ainsi avoir un parent qui gère les information de l'enfant de l'enfant
  @ViewChild('reactiveForm') reactiveForm: ReactiveFormComponent | undefined;
  classes = ['6A', '6B', '6C'];
  constructor() {}

  /**
   * On modifie les valeurs du formulaire enfant
   */
  updateData() {
    this.reactiveForm?.elevesFG?.patchValue({
      classe: '6A',
      name: 'John',
    });
  }

  /**
   * On affiche directement les informations renvoyer par le formulaire dans la console
   * @param eleve information brut des valeurs du formulaire
   */
  log(eleve: { classe: string; name: string }) {
    console.log(eleve);
  }
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
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    ReactiveFormModule,
  ],
})
export class MonExempleModule {}
