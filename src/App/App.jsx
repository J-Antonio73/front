// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/Login/Login";
import Campain from "../Components/Campain/Campain";
import Panel from "../Components/Panel/Panel";
import { useEffect, useState } from "react";
import { Auth } from "../Components/Auth/Auth";

function App() {
	const [user, setUser] = useState(localStorage.getItem("token"));

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route element={<Auth user={user} />}>
					<Route index element={<Panel />} />
					<Route path="/panel" element={<Panel />} />
					<Route path="/campain" element={<Campain />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
