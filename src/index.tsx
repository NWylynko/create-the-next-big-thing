import React from "react";
import "./jobQueue";

import { DataStoreProvider } from "./AppDataStore";
import { ProgressBarProvider } from "./ProgressBar";
import { Switch } from "./PageManager";
import App, { AppProps } from "./app";

const Index = (props: AppProps) => {
	return (
		<DataStoreProvider>
			<ProgressBarProvider>
				<Switch startLocation="project-name">
					<App {...props} />
				</Switch>
			</ProgressBarProvider>
		</DataStoreProvider>
	);
};

export default Index;
