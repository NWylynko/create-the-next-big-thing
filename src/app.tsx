import React, { useState } from "react";
import { Text, Box } from "ink";
import { ListedItem } from "ink-multi-select";

import SelectPackageManager from "./pages/SelectPackageManager";
import InputProjectName from "./pages/InputProjectName";

interface Props {
	javascript?: boolean;
	typescript?: boolean;
	npm?: boolean;
	yarn?: boolean;
}

const App = (_props: Props) => {
	const [pageCounter, setPageCounter] = useState(0);

	const nextPage = () => setPageCounter((s) => s + 1);

	const [projectName, setProjectName] = useState<string>();
	const [packageManager, setPackageManger] = useState<ListedItem>();

	const values = [projectName, packageManager?.label];

	return (
		<>
			<Box marginTop={1} marginLeft={2} flexDirection="row">
				<Text color="green"> / </Text>
				<BreadCrumbs values={values} />
			</Box>
			{pageCounter === 0 && (
				<InputProjectName
					onSubmit={(name) => {
						setProjectName(name);
						nextPage();
					}}
				/>
			)}
			{pageCounter === 1 && (
				<SelectPackageManager
					onSubmit={(pm) => {
						setPackageManger(pm);
						nextPage();
					}}
				/>
			)}
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
