import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PeopleIcon from "@mui/icons-material/People";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SendIcon from "@mui/icons-material/Send";
import ColumnGroupingTable from "./assets/Read/ReadCustomers";
import { EditCustomers } from "./assets/Edit/EditCustomers";
import { CreateCustomers } from "./assets/Create/CreateCustomers";
import { DeleteCustomers } from "./assets/Delete/DeleteCustomers";
import { GenerateCampain } from "./assets/Campain/Campain";
import { useEffect, useState } from "react";
import "./Panel.css";

function Panel(props) {
	const [value, setValue] = useState("customers");
	const [panelType, setPanelType] = useState("read");

	useEffect(() => {
		fetch(`${process.env.REACT_APP_HOST}/api/auth`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.code !== 200) {
					window.location.href = "/login";
					localStorage.clear();
				}
			});
	}, []);

	return (
		<div className="panel">
			<div className="header">
				<ButtonAppBar
					panelType={panelType}
					setPanelType={setPanelType}
				/>
			</div>
			<div className="content">
				{panelType === "read" ? (
					PanelRead({ setValue, value })
				) : (
					<PanelCampain setPanelType={setPanelType} />
				)}
			</div>
		</div>
	);
}

function PanelRead({ setValue, value }) {
	return (
		<>
			<div className="content-header">
				<LabelBottomNavigation setValue={setValue} value={value} />
			</div>
			<div className="content-body">
				{value === "customers" ? <ColumnGroupingTable /> : null}
				{value === "add" ? <CreateCustomers /> : null}
				{value === "edit" ? <EditCustomers /> : null}
				{value === "Delete" ? <DeleteCustomers /> : null}
			</div>
		</>
	);
}

function PanelCampain({ setPanelType }) {
	return (
		<>
			<div className="content-header">
				<h2>Generar una campaña</h2>
			</div>
			<div className="content-body">
				<GenerateCampain setPanelType={setPanelType} />
			</div>
		</>
	);
}

function LabelBottomNavigation({ setValue, value }) {
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<BottomNavigation
			sx={{ width: "100%" }}
			value={value}
			onChange={handleChange}
		>
			<BottomNavigationAction
				label="Clientes"
				value="customers"
				icon={<PersonIcon />}
			/>
			<BottomNavigationAction
				label="Añadir"
				value="add"
				icon={<PersonAddIcon />}
			/>
			<BottomNavigationAction
				label="Editar"
				value="edit"
				icon={<ManageAccountsIcon />}
			/>
			<BottomNavigationAction
				label="Eliminar"
				value="Delete"
				icon={<PersonRemoveIcon />}
			/>
		</BottomNavigation>
	);
}

function ButtonAppBar({ panelType, setPanelType }) {
	const handleChange = (type) => {
		setPanelType(type);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Panel de control
					</Typography>
					{panelType === "read" ? (
						<Button
							color="inherit"
							onClick={() => {
								handleChange("campain");
							}}
							startIcon={<SendIcon />}
						>
							Generar campaña
						</Button>
					) : (
						<Button
							color="inherit"
							onClick={() => {
								handleChange("read");
							}}
							startIcon={<PeopleIcon />}
						>
							Listar clientes
						</Button>
					)}
					<Button
						startIcon={<ExitToAppIcon />}
						color="inherit"
						onClick={() => {
							localStorage.clear();
							window.location.href = "/login";
						}}
					>
						Cerrar sesion
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Panel;
