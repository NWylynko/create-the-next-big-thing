import React from "react";
import SelectInput from "ink-select-input";

import { useDataStore } from "../../AppDataStore"

import ErrorText from "../../components/ErrorText";
import Layout from "../../components/Layout";
import { PageProps } from "../types"

import languages from "./languages";

export const SelectLanguage = ({ onFinish }: PageProps) => {

	const { setLanguage } = useDataStore();

	if (languages.length === 0) {
		return <ErrorText>no languages available</ErrorText>;
	}

	return (
		<Layout
			title="Please select a language to use for the project"
			instructions="use arrows to go up/down, return to select"
		>
			<SelectInput items={languages} onSelect={(language) => {
				setLanguage(language)
				onFinish()
			}} />
		</Layout>
	);
};
