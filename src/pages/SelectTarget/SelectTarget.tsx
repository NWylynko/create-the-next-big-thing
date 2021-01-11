import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import MultiSelect, { ListedItem } from "ink-multi-select";

import targets from "./targets.json";

interface Props {
	onSubmit: (target: ListedItem) => void;
}

export const SelectTarget = ({ onSubmit }: Props) => {
	const [item, setItem] = useState<ListedItem>();
	const [items, setItems] = useState<ListedItem[] | undefined>();

	useEffect(() => {
		(async () => {
			const i: ListedItem[] = targets.map(({ name, label }) => {
					return ({
						label,
						value: name,
					});
			});

			setItems(i)
			const firstItem: ListedItem = i[0] || {
				label: "Error: no targets available",
				value: "error",
			};
			setItem(firstItem);
		})();
	}, []);

	if (!item) {
		return (
			<Box margin={2}>
				<Text color="red">Error: no languages available</Text>
			</Box>
		);
	}

	return (
		<Box margin={1} flexDirection="column">
			<Text>Please select the target for the project</Text>
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
