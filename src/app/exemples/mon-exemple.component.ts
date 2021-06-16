import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { combineLatest, merge, Observable, Subject, Subscription } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith, tap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'asd-mon-exemple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex-r">
      <mat-form-field>
        <mat-label>Séléctionnez une classe</mat-label>
        <!--        on utilise pas le selectionChange mais on montre la différence avec le procédurale-->
        <!--        <mat-select [formControl]="classeFC" (selectionChange)="classeChange($event)">-->
        <mat-select [formControl]="classeFC">
          <!--          On pourrait accéder à la valeur que l'on souhaite dans le value accessor-->
          <mat-option *ngFor="let classe of classes" [value]="classe">{{
            classe.libelle
          }}</mat-option>
        </mat-select>
      </mat-form-field>
      <!--     Il ne faut pas hésitez à réaliser des petites actions dans le DOM. -->
      <!--    Il faut que celle-ci reste lisible et ne vienne pas surcharger le DOM parce qu'il y a un cout plus important de performance-->
      <button mat-button (click)="addFirstClass$.next(['Kevin', 'Elisabeth'])">
        Ajouter la 1er classe
      </button>
      <button mat-button (click)="onClear$.next([])">Clear</button>
    </div>
    <mat-list>
      <mat-list-item *ngFor="let eleve of selectedEleves$ | async">{{
        eleve
      }}</mat-list-item>
    </mat-list>
  `,
  styles: [
    `
      .flex-r {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class MonExempleComponent implements OnDestroy {
  classes = [
    {
      libelle: '6A',
      eleves: ['Romain', 'Valentin', 'Aurore'],
    },
    { libelle: '6B', eleves: ['Juliette', 'Mathilde', 'Jeremy'] },
  ];
  classeFC = new FormControl();
  // connecté au select et au deux bouton. Permet d'avoir un tableau d'eleves
  selectedEleves$: Observable<string[]>;
  // connecté au DOM. Permet d'emettre un tableau d'eleves
  addFirstClass$ = new Subject<string[]>();
  // connecté au DOM. Permet de remplacer le tableau d'eleves pas un tableau vide
  onClear$ = new Subject<string[]>();
  // Indispensable pour éviter les fuites mémoires lorsqu'on a un subscribe
  sub: Subscription;

  //procédurale
  //selectedEleves: string[]

  constructor() {
    //On utilise l'opérateur merge parce qu'on veut le dernier état du tableau d'eleves peut importe ça provenance
    this.selectedEleves$ = merge(
      this.addFirstClass$,
      this.onClear$,
      // on aurait pu directement emmettre l'attribut élèves. Juste pour montrer qu'on peut acceder à la valeur et en faire ce qu'on veut.. le mieux aurait été [value]="classe.eleves" et ne pas pipe
      this.classeFC.valueChanges.pipe(map((classe) => classe?.eleves))
    ).pipe(
      // on initialise la valeur pour pas avoir de null exception
      startWith([])
    );
    // On crée une variable pour connaitre si le tableau d'eleves est vide
    const selectedElevesEmpty$ = this.selectedEleves$.pipe(
      map((eleves) => eleves?.length === 0)
    );
    // On crée une variable pour savoir si c'est le tableau 1er classes qui est séléctionné
    const firstClassSelected$ = this.selectedEleves$.pipe(
      map((eleves) => eleves?.includes('Kevin'))
    );

    // on crée une variable pour desactivé le select. Si la 1er classes est séléctionné ou si une classe est séléctionné
    // => c'est pour l'exemple comment avec un combineLatest on modifie nos valeurs pour en faire un boolean
    const disableClasseFC$ = combineLatest([
      selectedElevesEmpty$,
      firstClassSelected$,
    ]).pipe(
      map(([selectedElevesEmpty, firstClassSelected]) => {
        return !selectedElevesEmpty || firstClassSelected;
      }),
      tap((canDisable) => {
        if (canDisable && this.classeFC.enabled) {
          this.classeFC.disable();
        }
      })
    );
    // On réactive le select si il n'y a plus de tableau d'eleves
    const enableClasse$ = selectedElevesEmpty$.pipe(
      tap((canEnable) => {
        if (canEnable && this.classeFC.disabled) {
          this.classeFC.enable();
        }
      })
    );
    // Important: on n'est pas obligé de subscrire à chaque élement.
    this.sub = merge(disableClasseFC$, enableClasse$).subscribe();
  }

  // On n'a pas de méthode rattaché au click
  // On évite ainsi le mélange d'évènement. Ici si on veut faire des modifications sur notre tableau il faut avoir conscience qu'il provient de 3 méthode,
  // Idem pour le disable / enable
  // addFirstClasse() {
  //   this.selectedEleves = ['Kevin', 'Elisabeth']
  //   this.classeFC.disable()
  // }

  // onClear() {
  //   this.selectedEleves = [];
  //   this.classeFC.enable();
  // }

  // classeChange(classe: Classes) {
  //   this.selectedEleves = classe.eleves;
  //   this.classeFC.disable();
  // }

  ngOnDestroy() {
    this.sub?.unsubscribe();
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
    MatSelectModule,
    MatListModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class MonExempleModule {}
