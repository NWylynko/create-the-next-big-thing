import React, { useState } from "react";
import path from "path"
import { Text, Box } from "ink";
import TextInput from "ink-text-input";
// import Spinner from "ink-spinner";

import { addTask } from "../../jobQueue";
import { doesProjectFolderExist, createProjectFolder } from "../../actions";


interface Props {
	onSubmit: (name: string) => void;
}

export const InputProjectName = ({ onSubmit }: Props) => {
	const [projectName, setProjectName] = useState<string>("");
	const [folderExists, setFolderExists] = useState(true);

	const onChange = async (newProjectName: string) => {
		setProjectName(newProjectName);
		setFolderExists(
			await addTask(() => doesProjectFolderExist(newProjectName))
		);
	};

	return (
		<Box margin={1} flexDirection="column">
			<Text>Whats your new project called?</Text>
			<Text dimColor>(return to confirm)</Text>
			<Box
				borderColor={folderExists ? "red" : "green"}
				marginX={1}
				borderStyle="round"
				width={Math.max(projectName.length + 5, 20)}
			>
				<TextInput
					value={projectName}
					onChange={onChange}
					showCursor
					onSubmit={(PN) => {
						addTask(() => createProjectFolder(PN));
						onSubmit(PN);
					}}
				/>
			</Box>
			<Text dimColor>{path.resolve(process.cwd(), projectName)}</Text>
		</Box>
	);
};
