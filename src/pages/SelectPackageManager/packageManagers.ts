export interface PackageManager {
	label: string;
	value: {
		name: string;
		use: {
			add: string[];
			"add-dev": string[];
			init: string[];
		};
	};
	key?: string;
}

const packageManagers: PackageManager[] = [
	{
		label: "NPM",
		value: {
			name: "npm",
			use: {
				add: ["install"],
				"add-dev": ["install", "--save-dev"],
				init: ["init", "--yes"],
			},
		},
	},
	{
		label: "Yarn 1",
		value: {
			name: "yarn",
			use: {
				add: ["add"],
				"add-dev": ["add", "--dev"],
				init: ["init", "--yes"],
			},
		},
		key: "yarn1",
	},
	{
		label: "Yarn 2",
		value: {
			name: "yarn",
			use: {
				add: ["add"],
				"add-dev": ["add", "--dev"],
				init: ["init", "-2"],
			},
		},
		key: "yarn2",
	},
];

export default packageManagers;
