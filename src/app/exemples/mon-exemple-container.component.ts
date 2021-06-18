import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ObjetMetierRepository } from './state/objet-metier-repository.service';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { VisualisationComplete } from './state/visualisation-complete.model';
import { MatListModule } from '@angular/material/list';
import { MonExemplePageModule } from './mon-exemple-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlanApi } from './state/objet-metier-api.model';

@Component({
  selector: 'asd-mon-exemple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--    on utilise le pipe async pour manager le subscribe ainsi que le else pour afficher un spinner lors du chargement puis on transfmet l'information une fois chargé-->
    <asd-mon-exemple-page
      *ngIf="
        visualisationComplete$ | async as visualisationCmplete;
        else loading
      "
      [visualisationComplete]="visualisationCmplete"
    ></asd-mon-exemple-page>
    <ng-template #loading>
      <div class="center">
        <mat-spinner [diameter]="25"></mat-spinner>
      </div>
    </ng-template>
    <div class="center" *ngIf="(visualisationComplete$ | async)?.error">
      {{ (visualisationComplete$ | async)?.error }}
    </div>
  `,
  styles: [
    `
      .center {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class MonExempleContainerComponent {
  // Observable contenant notre objet que l'on souhaite exploité
  visualisationComplete$: Observable<VisualisationComplete>;

  constructor(private _objetMetierRepository: ObjetMetierRepository) {
    // L'initialisation de la variable qui accueille notre objet final.
    // On sépare la logique avec la création de méthode afin d'avoir un code plus simple a lire et la possibilité de le réutiliser si besoin

    // Il faut voir l'enchainement des switchMap comme un remplacement de la donnée dans le stream.
    // On part avec la récupération du plan => switchMap + map = on a maintenant dans le deuxieme switchMap un objet contenant le plan et les ids des fiches utilisées.
    this.visualisationComplete$ = this._objetMetierRepository
      .getPlan('23')
      .pipe(
        switchMap((plan) => this.getUsedFicheIds(plan)),
        // On utilise du destruring d'objet afin de manipuler les propriétés plus simplement. Ce n'est pas spécialement utile dans un cas comme celui-ci
        switchMap(({ plan, usedFicheIds }) =>
          this.getFiches(plan, usedFicheIds)
        ),
        // Ici le destruring nous permet d'avoir un niveau d'abstraction en moins et ainsi d'avoir un peu plus de clarté
        map(({ plan, fiches }) => ({
          libellePlan: plan.libelleLong,
          libelleFiches: fiches?.map((fiche) => fiche.libelleLong),
        })),
        catchError(() =>
          of({ error: 'Une erreur est survenue lors du chargement du plan' })
        ),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }

  /**
   * On récupère les ids des fiches utilisées dans un plan et on renvoi un objet contenant le plan et les ids des fiches utilisées dans un plan
   * @param plan récupéré de l'appel précédent avec un type lié au retour de l'API
   */
  getUsedFicheIds(plan: PlanApi) {
    return this._objetMetierRepository.getUsedFicheIds(plan.id).pipe(
      map((usedFicheIds) => ({ plan, usedFicheIds })),
      catchError(() =>
        of({
          plan,
          usedFicheIds: null,
          error:
            'Une erreur est survenue lors du chargement des fiches utilisées',
        })
      )
    );
  }

  /**
   * On récupère toutes les fiches dans la bdd ccf et on renvoi un objet avec le plan et les fiches filtrés avec les ids des fiches utilises
   * @param plan récupéré du map précédent avec un type lié au retour de l'API
   * @param usedFicheIds récupéré de l'appel précédent avec un type lié au retour de l'API
   */
  getFiches(plan: PlanApi, usedFicheIds: number[] | null) {
    return this._objetMetierRepository.getFiches().pipe(
      map((fiches) => ({
        plan,
        fiches: fiches?.filter((fiche) =>
          usedFicheIds?.includes(fiche.epreuveReglementaireRefeaId)
        ),
      })),
      catchError(() =>
        of({
          plan,
          fiches: null,
          error:
            'Une erreur est survenu lors du chargement des fiches liés au plan',
        })
      )
    );
  }
}

const routes: Routes = [
  {
    path: '',
    component: MonExempleContainerComponent,
  },
];

@NgModule({
  declarations: [MonExempleContainerComponent],
  exports: [MonExempleContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    MonExemplePageModule,
    MatProgressSpinnerModule,
  ],
})
export class MonExempleModule {}
