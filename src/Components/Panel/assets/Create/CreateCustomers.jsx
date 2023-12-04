import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { useState } from "react";
import "./CreateCustomers.css";

export function CreateCustomers() {
	const initialValues = {
		firstname: "",
		lastname: "",
		phone: "",
		email: "",
	};

	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

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
		if (Object.keys(errors).length === 0) {
			// No hay errores, entonces se puede enviar el formulario
			setIsSubmit(true);

			console.log(formValues);
			fetch(`${process.env.REACT_APP_HOST}/api/panel/create`, {
				method: "POST",
				body: JSON.stringify(formValues),
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
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
				error={formErrors.email && isSubmit}
				helperText={formErrors.email}
			/>

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
