import React, { createContext, useState } from "react";

interface Store {
	location: string;
	setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const StoreContext = createContext({} as Store);
export default StoreContext;

interface StoreProviderProps {
	children: JSX.Element;
}

export const StoreProvider = ({
	children,
}: StoreProviderProps): JSX.Element => {
	const [location, setLocation] = useState<string>("/");

	const store: Store = {
		location,
		setLocation,
	};

	return (
		<>
			<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
		</>
	);
};
