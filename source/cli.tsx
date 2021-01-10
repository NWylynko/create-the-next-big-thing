#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./ui";

const helpText = `
Usage
	$ create-the-next-big-thing

Options
	--name  Your name

Examples
	$ create-the-next-big-thing --name=Jane
	Hello, Jane
`;

const cli = meow(helpText, {
	flags: {
		name: {
			type: "string",
		},
	},
});

render(<App name={cli.flags.name} />);
