import React, { createContext } from "react";

const store = {
	location: "/",
};

const StoreContext = createContext(store);
export default StoreContext;

interface StoreProviderProps {
	children: JSX.Element;
}

export const StoreProvider = ({
	children,
}: StoreProviderProps): JSX.Element => {
	return (
		<>
			<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
		</>
	);
};
