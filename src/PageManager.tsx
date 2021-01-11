import React, { createContext, useState, useContext } from "react";

interface Store {
	location: string;
	setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const StoreContext = createContext({} as Store);
export default StoreContext;

export const usePage = () => useContext(StoreContext);

interface SwitchProps {
	children: JSX.Element | JSX.Element[];
	startLocation?: string;
}

export const Switch = ({
	children,
	startLocation
}: SwitchProps): JSX.Element => {
	const [location, setLocation] = useState<string>(startLocation || "");

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

interface RouteProps {
	children: JSX.Element | JSX.Element[];
	path: string;
}

export const Route = ({ children, path }: RouteProps): JSX.Element => {
	
	const { location } = useContext(StoreContext);

	if (path === location) {
		return (<>{children}</>)
	}

	return (<></>)
	
}