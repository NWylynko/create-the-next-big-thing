import React, { useState } from "react";
import { Text, Box } from "ink";
import TextInput from "ink-text-input";
// import Spinner from "ink-spinner";

interface Props {
	onSubmit: (name: string) => void;
}

export const InputProjectName = ({ onSubmit }: Props) => {
	const [projectName, setProjectName] = useState<string>("");
	// const [loading, setLoading] = useState<boolean>(true);

	return (
		<Box margin={1} flexDirection="column">
			<Text>Whats your new project called?</Text>
			<Text dimColor>(return to confirm)</Text>
			<Box margin={1}>
				<TextInput
					value={projectName}
					onChange={setProjectName}
					showCursor
					onSubmit={onSubmit}
				/>
			</Box>
		</Box>
	);
};
