import { createNvmFile } from "../../actions/createNvmFile";
import { addPackageJsonEngine } from "../../actions/addPackageJsonEngine";

type Action = (projectDir: string, version: string) => Promise<void>;

export interface Version {
	label: string;
	value: {
		name: string;
		actions?: Action[];
	};
	key?: string;
}

export interface Target {
	label: string;
	value: {
		name: string;
		versions?: Version[];
	};
	key?: string;
}

const NodeJsActions: Action[] = [createNvmFile, addPackageJsonEngine];

const targets: Target[] = [
	{
		label: "Client",
		value: { name: "client" },
		key: "client"
	},
	{
		label: "Node.js",
		value: {
			name: "node",
			versions: [
				...["10", "12", "14"].map((version) => ({
					label: `Node ${version}`,
					value: {
						name: version,
						actions: NodeJsActions,
					},
					key: version
				})),
			],
		},
		key: "node"
	},
];

export default targets;
