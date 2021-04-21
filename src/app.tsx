import React from "react";
import { Text, Box } from "ink";

import { Route, usePage } from "./PageManager";
import { ProgressBar } from "./ProgressBar";
import { useDataStore } from "./AppDataStore"

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

	return (
		<>
			<Box marginTop={1} marginLeft={2} flexDirection="row">
				<Text color="green"> / </Text>
				<BreadCrumbs />
			</Box>
			<Route path="project-name">
				<InputProjectName
					onSubmit={() => {
						setLocation("package-manager");
					}}
				/>
			</Route>
			<Route path="package-manager">
				<SelectPackageManager
					onFinish={() => {
						setLocation("target");
					}}
				/>
			</Route>
			<Route path="target">
				<SelectTarget
					onFinish={() => {
						setLocation("language");
					}}
				/>
			</Route>
			<Route path="language">
				<SelectLanguage
					onFinish={() => {
						// 
					}}
				/>
			</Route>
			<Box borderStyle="round" borderColor="red">
				<ProgressBar left={1} right={1} />
			</Box>
		</>
	);
};

const BreadCrumbs = () => {

	const { breadCrumbsArray } = useDataStore()

	return (
		<>
			{breadCrumbsArray.map((value, i) => {
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
