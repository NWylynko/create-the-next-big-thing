// copied from https://github.com/brigand/ink-progress-bar
// converted from javascript to typescript
import React, { useState, useEffect } from 'react';
import {Text} from 'ink';

export interface ProgressBarProps {
	percent?: number;
	columns?: number;
	left?: number;
	right?: number;
	character?: string;
	rightPad?: boolean;
}

export const ProgressBar = ({
	percent = 0.50,
	columns = undefined,
	left = 0,
	right = 0,
	character = '█',
	rightPad = false
}: ProgressBarProps) => {

  const [bar, setBar] = useState(' ');

  useEffect(() => {
    const screen = columns ?? process.stdout.columns ?? 80;
		const space = screen - right - left;
		const max = Math.floor(Math.min(space * percent, space));
		const chars = character.repeat(max);

		if (!rightPad) {
			setBar(chars);
		} else {
      setBar(chars + ' '.repeat(space - max));
    }
  }, [percent, columns, left, right, character, rightPad])

  return <Text>{bar}</Text>;
};

