import React, { useState } from "react";
import { Text, Box } from "ink";
import SelectInput from "ink-select-input";

import ErrorText from "../../components/ErrorText";

import targets from "./targets";
import { addTask } from "../../jobQueue";
import { PageProps } from "../types";
import { useDataStore } from "../../AppDataStore";

export const SelectTarget = ({ onFinish }: PageProps) => {
	const [showSecondSelection, setShowSecondSelection] = useState(false);

	const { target, setTarget, setVersion, projectDir } = useDataStore();

	if (targets.length === 0) {
		return <ErrorText>no targets available</ErrorText>;
	}

	return (
		<Box margin={1} flexDirection="column">
			<Text>Please select the target for the project</Text>
			<Text dimColor>(use arrows to go up/down, return to select)</Text>
			<Box margin={1}>
				<SelectInput
					isFocused={!showSecondSelection}
					items={targets}
					onSelect={(selectedTarget) => {
						setTarget(selectedTarget);
						if (selectedTarget.value.versions !== undefined) {
							setShowSecondSelection(true);
						} else {
							onFinish();
						}
					}}
				/>
				{showSecondSelection && (
					<SelectInput
						isFocused={showSecondSelection}
						items={target?.value.versions}
						onSelect={(version) => {
							setVersion(version);
							version.value.actions?.forEach((action) => {
								addTask(() => action(projectDir, version.value.name))
							})
							onFinish();
						}}
					/>
				)}
			</Box>
		</Box>
	);
};
