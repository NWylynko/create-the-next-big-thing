import runner from "../utils/runner";

export const initPackageManager = (directory: string, cli: string, init: string[]) => {
  return runner(cli, init, { cwd: directory })
}