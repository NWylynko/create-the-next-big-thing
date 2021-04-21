import React, { createContext, useState, useContext } from "react";
import path from "path"

import type { Language, PackageManager, Target, Version } from "./pages/types"

interface Store {
	projectName?: string;
	setProjectName: React.Dispatch<React.SetStateAction<string | undefined>>;
	projectDir: string;
	packageManager?: PackageManager;
	setPackageManager: React.Dispatch<React.SetStateAction<PackageManager | undefined>>;
	target?: Target;
	setTarget: React.Dispatch<React.SetStateAction<Target | undefined>>;
	version?: Version;
	setVersion: React.Dispatch<React.SetStateAction<Version | undefined>>;
	language?: Language;
	setLanguage: React.Dispatch<React.SetStateAction<Language | undefined>>;
	breadCrumbsArray: (string | undefined)[];
}

const StoreContext = createContext({} as Store);

export const useDataStore = () => useContext(StoreContext);

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const DataStoreProvider = ({ children }: Props): JSX.Element => {
	const [projectName, setProjectName] = useState<string>();
	const [packageManager, setPackageManager] = useState<PackageManager>();
	const [target, setTarget] = useState<Target>();
	const [version, setVersion] = useState<Version>();
	const [language, setLanguage] = useState<Language>();

	const store: Store = {
		projectName,
    setProjectName,
    projectDir: path.resolve(process.cwd(), projectName || "/"),
		packageManager,
		setPackageManager,
		target,
		setTarget,
		version,
		setVersion,
		language,
		setLanguage,
		breadCrumbsArray: [
			projectName,
			packageManager?.label,
			target?.label,
			version?.label,
			language?.label,
		],
	};

	return (
		<>
			<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
		</>
	);
};
