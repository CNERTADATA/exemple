import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'asd-reactive-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [formGroup]="elevesFG">
      <mat-form-field>
        <mat-select formControlName="classe">
<!--          Il ne faut pas oublier le value acceccor. On peut imaginer afficher et renvoyer des éléments différents. [value]="classe.id"-->
          <mat-option *ngFor="let classe of classes" [value]="classe">{{
            classe
          }}</mat-option>
        </mat-select>
        <mat-error>Ce champ est obligatoire</mat-error>
      </mat-form-field>
      <mat-form-field
        ><input matInput type="text" formControlName="name"
      /></mat-form-field>
    </ng-container>
  `,
  styles: [],
})
export class ReactiveFormComponent {
  //On récupere les info du parent
  @Input() classes: string[] | null = null;
  //On renvoie les informations au parent (on peut imaginer mettre un pipe(map(value => value....)) pour renvoyer un éléments transformé etc..)
  @Output() emitEleves: Observable<{ classe: string; name: string }>;

  //On ajoute un validator pour comprendre le comportement par defaut.
  // Ici on ajoute juste un mat-error dans un mat-form-field pas besoin d'autre information pour qu'Angular gère l'affichage
  elevesFG = new FormGroup({
    classe: new FormControl(null, Validators.required),
    name: new FormControl(),
  });

  constructor() {
    //On instancie l'output dans le constructor pour respecter les bonnes pratiques mise en place par Angular
    // - les décorateurs déclarer en 1er
    // - Une initialisation dans le constructor pour faciliter la création des prochaines étapes
    this.emitEleves = this.elevesFG.valueChanges;
  }
}

@NgModule({
  declarations: [ReactiveFormComponent],
  exports: [ReactiveFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
})
export class ReactiveFormModule {}
