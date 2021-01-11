import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import MultiSelect, { ListedItem } from "ink-multi-select";
import Spinner from "ink-spinner";

import packageManagers from "./packageManagers.json";
import { isAvailable } from "../../utils/isAvailable";

interface Props {
	onSubmit: (item: ListedItem) => void;
}

export const SelectPackageManager = ({ onSubmit }: Props) => {
	const [item, setItem] = useState<ListedItem>();
	const [items, setItems] = useState<ListedItem[] | undefined>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			const packageManagersWithAvailability = await Promise.all(
				packageManagers.map(async (packageManager) => ({
					...packageManager,
					isAvailable: await isAvailable(packageManager.name),
				}))
			);

			let i: ListedItem[] = [];

			packageManagersWithAvailability.forEach(({ isAvailable, label, name }) => {
				if (isAvailable) {
					i.push({
						label,
						value: name,
					});
				}
			});

			if (i.length !== 0) {
				setItems(i);
				const firstItem: ListedItem = i[0] || {
					label: "Error: no package manager installed",
					value: "error",
				};
				setItem(firstItem);
			}

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

	if (!item) {
		return (
			<Box margin={2}>
				<Text color="red">Error: no package manager installed</Text>
			</Box>
		);
	}

	return (
		<Box margin={1} flexDirection="column">
			<Text>Please select a Package Manager to use for the project</Text>
			<Text dimColor>
				(use arrows to go up/down, space to select, return to confirm)
			</Text>
			<Box margin={1}>
				<MultiSelect
					items={items}
					onSelect={setItem}
					selected={[item]}
					onSubmit={(items) => {
						if (items && items[0]) {
							onSubmit(items[0]);
						}
					}}
				/>
			</Box>
		</Box>
	);
};
