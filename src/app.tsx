import React, { useState } from "react";
import { Text, Box } from "ink";
import { ListedItem } from "ink-multi-select";

import { Route, usePage } from "./PageManager";

import SelectPackageManager from "./pages/SelectPackageManager";
import InputProjectName from "./pages/InputProjectName";
import SelectLanguage from "./pages/SelectLanguage";
import SelectTarget from "./pages/SelectTarget";

export interface AppProps {
	javascript?: boolean;
	typescript?: boolean;
	npm?: boolean;
	yarn?: boolean;
}

const App = (_props: AppProps) => {
	const { setLocation } = usePage();

	const [projectName, setProjectName] = useState<string>();
	const [packageManager, setPackageManger] = useState<ListedItem>();
	const [target, setTarget] = useState<ListedItem>();
	const [language, setLanguage] = useState<ListedItem>();

	const values = [projectName, packageManager?.label, target?.label, language?.label];

	return (
		<>
			<Box marginTop={1} marginLeft={2} flexDirection="row">
				<Text color="green"> / </Text>
				<BreadCrumbs values={values} />
			</Box>
			<Route path="project-name">
				<InputProjectName
					onSubmit={(name) => {
						setProjectName(name);
						setLocation("package-manager");
					}}
				/>
			</Route>
			<Route path="package-manager">
				<SelectPackageManager
					onSubmit={(pm) => {
						setPackageManger(pm);
						setLocation('target');
					}}
				/>
			</Route>
			<Route path="target">
				<SelectTarget onSubmit={(target) => {
					setTarget(target);
					setLocation('language');
				}}/>
			</Route>
			<Route path="language">
				<SelectLanguage onSubmit={(lang) => {
					setLanguage(lang)
				}} />
			</Route>
		</>
	);
};

const BreadCrumbs = ({ values }: { values: (string | undefined)[] }) => {
	return (
		<>
			{values.map((value, i) => {
				if (value !== undefined) {
					return (
						<Box key={i}>
							<Text dimColor>{`${value}`}</Text>
							<Text color="green"> / </Text>
						</Box>
					);
				}

				return <Box key={i} />;
			})}
		</>
	);
};

export default App;
