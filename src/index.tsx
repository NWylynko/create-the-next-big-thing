import React from "react";

import { Switch } from "./PageManager";
import App, { AppProps } from "./app"

const Index = (props: AppProps) => {
	return (
			<Switch startLocation="project-name">
				<App {...props}/>
			</Switch>
	);
};

export default Index;
