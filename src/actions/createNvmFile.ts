import fs from "fs/promises"
import path from "path"

export const createNvmFile = (directory: string, nodeJsVersion: string) => {
  return fs.writeFile(path.resolve(process.cwd(), directory, '.nvmrc'), nodeJsVersion);
}