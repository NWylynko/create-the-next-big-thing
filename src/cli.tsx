#!/usr/bin/env node
import "source-map-support/register";
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./app";

const helpText = `
Usage
	$ create-the-next-big-thing

Options (all optional)
	--javascript select javascript
	--typescript select typescript

	--npm select npm
	--yarn select yarn

`;

const cli = meow(helpText, {
	flags: {
		javascript: {
			type: "boolean",
		},
		typescript: {
			type: "boolean",
		},
		npm: {
			type: "boolean",
		},
		yarn: {
			type: "boolean",
		},
	},
});

render(<App {...cli.flags} />);
