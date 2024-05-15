import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import { distritosManzanillo } from "../../assets/distritos";
import "./CreateCustomers.css";

export function CreateCustomers() {
	const initialValues = {
		firstname: "",
		lastname: "",
		phone: "",
		email: "",
		dist: 0,
	};

	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileDisabled, setFileDisabled] = useState(true);
	const [formDisabled, setFormDisabled] = useState(false);

	const [dist, setDist] = useState(0);
	const [distList, setDistList] = useState(distritosManzanillo);

	const handleDistChange = (e) => setDist(e.target.value);

	const handleFileChange = (e) => {
		if (e.target.files) setSelectedFile(e.target.files[0]);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.firstname) {
			errors.firstname = "Ingrese el nombre del cliente";
		}
		if (!values.lastname) {
			errors.lastname = "Ingrese el apellido del cliente";
		}
		if (!values.phone) {
			errors.phone = "Ingrese el teléfono del cliente";
		}
		if (values.email.trim().length > 0)
			if (!regex.test(values.email)) errors.email = "Correo inválido";

		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validate(formValues);
		if (Object.keys(errors).length === 0 || formDisabled) {
			// No hay errores, entonces se puede enviar el formulario
			setIsSubmit(true);

			const dataSend = new FormData();
			if (!formDisabled) {
				dataSend.append("data", JSON.stringify(formValues));
				console.log("data");
			} else {
				dataSend.append("file", selectedFile);
				console.log("file");
			}

			if (!dataSend.has("data") && !dataSend.has("file")) {
				return;
			}

			fetch(`${process.env.REACT_APP_HOST}/api/panel/create`, {
				method: "POST",
				body: dataSend,
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					// "Content-Type":
					// "multipart/form-data; boundary=---------------------------WebKitFormBoundaryh9UF2hFjspgvNh9T--;",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setFormValues(initialValues);
					setFormErrors({});
				});
		} else {
			console.log("Error");
			// Hay errores, no se envía el formulario
			setFormErrors(errors);
			setIsSubmit(true); // Esto activará los mensajes de error en los campos
		}
	};

	return (
		<div className="create-container">
			<div>
				<FormGroup>
					<FormControlLabel
						control={<Switch />}
						onChange={(e) => {
							setFileDisabled(!fileDisabled);
							setFormDisabled(!formDisabled);
						}}
						label="Cargar contactos con archivo xlsx."
					/>
				</FormGroup>
			</div>
			<label
				htmlFor="fileInput"
				sx={{ marginTop: "1rem", display: "block" }}
			>
				Seleccione un archivo xlsx{" "}
				<small>
					<i>(opcional)</i>
				</small>
				:
				<input
					type="file"
					id="contactsFile"
					name={selectedFile}
					disabled={fileDisabled}
					onChange={(e) => {
						handleFileChange(e);
					}}
					accept=".xlsx"
					sx={{ display: "none" }}
				/>
			</label>
			<TextField
				sx={{
					marginBottom: "1rem",
					marginTop: "2rem",
				}}
				required
				fullWidth
				id="firstname"
				name="firstname"
				label="Nombre del Cliente"
				variant="outlined"
				value={formValues.firstname}
				onChange={handleChange}
				disabled={formDisabled}
				error={formErrors.firstname && isSubmit}
				helperText={formErrors.firstname}
			/>
			<TextField
				sx={{ marginBottom: "1rem" }}
				required
				fullWidth
				id="lastname"
				name="lastname"
				label="Apellido del Cliente"
				variant="outlined"
				value={formValues.lastname}
				onChange={handleChange}
				disabled={formDisabled}
				error={formErrors.lastname && isSubmit}
				helperText={formErrors.lastname}
			/>
			<TextField
				required
				fullWidth
				sx={{ marginBottom: "1rem" }}
				id="phone"
				name="phone"
				label="Telefono del Cliente"
				variant="outlined"
				value={formValues.phone}
				onChange={handleChange}
				disabled={formDisabled}
				error={formErrors.phone && isSubmit}
				helperText={formErrors.phone}
			/>
			<TextField
				fullWidth
				sx={{ marginBottom: "1rem" }}
				id="email"
				name="email"
				label="Correo del Cliente"
				variant="outlined"
				value={formValues.email}
				onChange={handleChange}
				disabled={formDisabled}
				error={formErrors.email && isSubmit}
				helperText={formErrors.email}
			/>

			<FormControl sx={{ width: 100 }}>
				<InputLabel id="demo-simple-select-label">Distrito</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={dist}
					label="Distrito"
					onChange={handleDistChange}
				>
					{distList.map((dist) => (
						<MenuItem key={dist.id} value={dist.id}>
							{dist.id}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<ColorButton
				sx={{ width: "8rem" }}
				variant="text"
				onClick={handleSubmit}
			>
				Añadir
			</ColorButton>
		</div>
	);
}

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(green[200]),
	backgroundColor: green[200],
	"&:hover": {
		backgroundColor: green[400],
	},
}));
