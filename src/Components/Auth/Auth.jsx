import { Navigate, Outlet } from "react-router-dom";

export const Auth = ({ user, children }) => {
	if (!user) {
		return <Navigate to="/login" />;
	}

	return <Outlet />;
};
