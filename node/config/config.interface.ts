export const VALID_ENVIRONMENTS = [
  "development",
  "staging",
  "production",
] as const;

export type Environments = (typeof VALID_ENVIRONMENTS)[number];

export interface BaseInterface {
  environment: Environments;
}
