import fs from "fs/promises";
import path from "path";

export const createProjectFolder = async (projectFolder: string) => {
	try {
		await fs.mkdir(path.resolve(process.cwd(), projectFolder));
	} catch (error) {}
};
