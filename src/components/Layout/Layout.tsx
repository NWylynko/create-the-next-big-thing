import React from "react";
import { Text, Box } from "ink";

interface LayoutProps {
	children: JSX.Element | JSX.Element[];
	title: string;
	instructions: string;
}

export const Layout = ({ children, title, instructions }: LayoutProps) => {
	return (
		<Box margin={1} flexDirection="column">
			<Text>{title}</Text>
			<Text dimColor>({instructions})</Text>
			<Box margin={1} height={3}>{children}</Box>
		</Box>
	);
};
