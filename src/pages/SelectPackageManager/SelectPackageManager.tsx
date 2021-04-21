import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import Spinner from "ink-spinner";
import SelectInput from "ink-select-input";

import { isAvailable } from "../../utils/isAvailable";
import { addTask } from "../../jobQueue";
import { initPackageManager } from "../../actions";
import ErrorText from "../../components/ErrorText";
import Layout from "../../components/Layout";

import { useDataStore } from "../../AppDataStore"
import { PageProps } from "../types"

import packageManagers from "./packageManagers";
import type { PackageManager } from "./packageManagers"

export const SelectPackageManager = ({ onFinish }: PageProps) => {
	const [items, setItems] = useState<PackageManager[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const { projectDir, setPackageManager } = useDataStore()

	useEffect(() => {
		(async () => {
			const packageManagersWithAvailability = await Promise.all(
				packageManagers.map(async (packageManager) => ({
					...packageManager,
					isAvailable: await addTask(() => isAvailable(packageManager.value.name)),
				}))
			);

			let i: PackageManager[] = [];

			packageManagersWithAvailability.forEach((packageManager) => {
				if (packageManager.isAvailable) {
					i.push(packageManager);
				}
			});

			setItems(i);
			setLoading(false);
		})();
	}, []);

	if (loading) {
		return (
			<Box margin={2}>
				<Spinner type="pong" />
				<Text>Checking for installed Package Managers...</Text>
			</Box>
		);
	}

	if (items.length === 0) {
		return <ErrorText>no package manager installed</ErrorText>;
	}

	return (
		<Layout
			title="Please select a Package Manager to use for the project"
			instructions="use arrows to go up/down, return to select"
		>
			<SelectInput
				items={items}
				onSelect={(pm) => {
					const packageManager:
						| PackageManager
						| undefined = packageManagers.find(
						({ label }) => label === pm.label
					);

					if (packageManager === undefined) {
						return;
					}

					const { name, use } = packageManager.value

					addTask(() => initPackageManager(projectDir, name, use.init));

					setPackageManager(pm)

					onFinish()
				}}
			/>
		</Layout>
	);
};
