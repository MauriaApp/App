

export type MauriaNoteType = {
  code: string;
  coefficient: string;
  date: string;
  epreuve: string;
  note: string;
};

export type MauriaNoteStatsType = {
  code: string;
  average: number;
  minimum: number;
  quartile1: number;
  median: number;
  quartile3: number;
  maximum: number;
  standardDeviation: number;
  sampleSize: number;
  myGrade: number;
  myRank: number;
};
