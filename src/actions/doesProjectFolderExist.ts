import fs from "fs/promises";
import path from "path"

export const doesProjectFolderExist = async (projectFolder: string) => {
  try {
    await fs.readdir(path.resolve(process.cwd(), projectFolder))
    return true
  } catch (error) {
    return false
  }
}
