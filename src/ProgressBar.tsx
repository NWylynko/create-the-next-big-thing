import React, { createContext, useState, useContext, useEffect } from "react";
import { Text, Box } from "ink";
import PB, { ProgressBarProps } from "./components/ProgressBar";
import { tasks, jobs } from "./jobQueue";
import { screenWidth } from "./utils/screenSize";

interface Store {
	totalTasks: number;
	completeTasks: number;
}

const StoreContext = createContext({} as Store);
export default StoreContext;

export const useProgressBar = () => useContext(StoreContext);

interface ProgressBarProviderProps {
	children: JSX.Element | JSX.Element[];
	startLocation?: string;
}

export const ProgressBarProvider = ({
	children,
}: ProgressBarProviderProps): JSX.Element => {
	const [totalTasks, setTotalTasks] = useState<number>(0);
	const [completeTasks, setCompleteTasks] = useState<number>(0);

	useEffect(() => {
		const updateProgress = () => {
			setTotalTasks(tasks.total);
			setCompleteTasks(tasks.complete);
		};
		const events = ["start", "success", "error"];
		events.forEach((event) => {
			jobs.on(event, updateProgress);
		});

		return () => {
			events.forEach((event) => {
				jobs.off(event, updateProgress);
			});
		};
	}, []);

	const store: Store = {
		totalTasks,
		completeTasks,
	};

	return (
		<>
			<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
		</>
	);
};

export const ProgressBar = (props: ProgressBarProps) => {
	const { totalTasks, completeTasks } = useProgressBar();

	const percent = completeTasks / totalTasks || 1;

	return (
		<Box flexDirection="column" width={screenWidth()}>
			<Box flexDirection="row" justifyContent="space-around">
				<Text>Tasks: {totalTasks}</Text>
				<Text>Completed: {completeTasks}</Text>
				<Text>{Math.floor(percent * 100)}%</Text>
			</Box>
			<Box flexDirection="row">
				<PB {...props} percent={percent} />
			</Box>
		</Box>
	);
};
