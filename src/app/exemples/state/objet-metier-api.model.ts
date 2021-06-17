//On représente ici les objet brut reçu par l'api dans l"idéal ceux-ci sont directement généré par l'openApi

export interface PlanApi {
  dateModification: Date;
  utilisateurModifiacationId: string;
  dateCreation: Date;
  utilisateurCreationId: string;
  id: number;
  uai: number;
  periodeId: number;
  libelleLong: string;
  architectureEvaluationId: number;
  archivage?: any;
  duree: number;
  statutId: number;
  planSessionExamen: number;
  formationCertificationId: number;
  actif: boolean;
  planLibelle: string;
  formationCertificationLibelleCourt: string;
  formationCertificationLibelleLong: string;
  supportsFormationLibelleCourt: string[];
  supportsFormation: number[];
  architectureEvaluationLibelleLong: string;
  libelleLongStatut: string;
  libelleCourtStatut: string;
  codeStatut: string;
  couleurStatut: string;
  archivageAuteur?: any;
  archivageDate?: any;
  auteurCreation?: any;
  auteurModification?: any;
}

export interface CapacitesRang1Api {
  idCapaRang1: number;
  modeAttribution: string;
}

export interface FicheApi {
  dateModification: Date;
  utilisateurModifiacationId: string;
  dateCreation: Date;
  utilisateurCreationId: string;
  id: number;
  planId: number;
  libelleLongPlan: string;
  libelleCourt: string;
  libelleLong: string;
  commentaire: string;
  epreuveReglementaireRefeaId: number;
  epreuveReglementaireRefeaLibelleLong: string;
  epreuveDiplomeRefeaId: number;
  epreuveDiplomeRefeaLibelleLong: string;
  actif: boolean;
  typeNote: number;
  libelleCourtTypeNote: string;
  modeCalculMoyenne?: any;
  libelleCourtCalculMoyenne?: any;
  typeEpreuve: number;
  libelleCourtTypeEpreuve: string;
  modeCalculPoint: number;
  libelleCourtModeCalculPoint: string;
  coefficient: number;
  capacitesRang1: CapacitesRang1Api[];
  supportsLibelles: string[];
  nbECCF: number;
}
