export interface Language {
	label: string;
	value: {
		name: string;
		devDependencies?: string[];
	};
	key?: string;
}

const languages: Language[] = [
	{
		label: "Javascript",
		value: { name: "javascript" },
		key: "js"
	},
	{
		label: "Typescript",
		value: {
			name: "typescript",
			devDependencies: ["typescript"],
		},
		key: "ts"
	},
];

export default languages;
