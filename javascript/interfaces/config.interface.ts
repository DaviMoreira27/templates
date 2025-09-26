export type Environments = "development" | "staging" | "production";

export interface BaseInterface {
  environment: Environments;
}
