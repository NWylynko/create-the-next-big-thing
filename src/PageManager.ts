import React, { createContext } from "react";

interface Istore {
	isMobile: boolean;
}

const StoreContext = createContext({} as Istore);
export default StoreContext;

export function StoreProvider({
	children,
	TestValues,
}: {
	children: React.ReactNode;
	TestValues?: Istore;
}): JSX.Element {
	const store: Istore = {
		isMobile: TestValues !== undefined ? TestValues.isMobile : isMobile,
	};

	return (
		<StoreContext.Provider value={store as Istore}>
			{children}
		</StoreContext.Provider>
	);
}
