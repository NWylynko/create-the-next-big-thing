export interface PageProps {
  onFinish: () => void;
}

export type { Language } from "./SelectLanguage"
export type { PackageManager } from "./SelectPackageManager";
export type { Target, Version } from "./SelectTarget"