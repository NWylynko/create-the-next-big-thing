import React from "react";
import { Text, Box } from "ink";

interface Props {
	children: string;
}

export const ErrorText = ({ children }: Props) => {
	return (
		<Box margin={1} borderStyle="round" borderColor="red" width={`Error: ${children}`.length + 5}>
			<Text color="red">Error: {children}</Text>
		</Box>
	);
};
