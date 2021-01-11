import runner from "./runner";

export const isAvailable = async (program: string): Promise<boolean> => {
	try {
		return (await runner("which", [program])) ? true : false;
	} catch (error) {
		return false;
	}
};
