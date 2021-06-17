import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FicheApi, PlanApi } from './objet-metier-api.model';

@Injectable({
  providedIn: 'root',
})
export class ObjetMetierRepository {
  url = 'https://api.dev.ccf.asd.leuville-objects.info';
  planUrl = '/api/plans';
  usedFichesUrl = '/api/fiches-epr/epr-utilisees-plan';
  ficheUrl = '/api/fiches-epr';
  headers = {
    'asd-uai-id-current': '5000000003506',
    'asd-periode-id-current': '25',
  };

  constructor(private _http: HttpClient) {}

  /**
   * Permet de récupérer les information du plan renseigné
   * @param idPlan récupérer dans l'url dans la majorité des cas mais ici mis en dure =)
   */
  getPlan(idPlan: string) {
    return this._http.get<PlanApi>(`${this.url}${this.planUrl}/${idPlan}`, {
      headers: this.headers,
    });
  }

  /**
   * Permet de récuperer les id lié à un plan renseigné
   * @param idPlan récupérer dans l'url dans la majorité des cas mais ici mis en dure =)
   */
  getUsedFicheIds(idPlan: number) {
    return this._http.get<number[]>(`${this.url}${this.usedFichesUrl}`, {
      headers: this.headers,
      params: { idPlan },
    });
  }

  /**
   * Permet de récupérer toutes les fiches dans la bdd ccf
   */
  getFiches() {
    return this._http.get<FicheApi[]>(`${this.url}${this.ficheUrl}`, {
      headers: this.headers,
    });
  }
}
