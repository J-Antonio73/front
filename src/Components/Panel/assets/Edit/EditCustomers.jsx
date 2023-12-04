import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import FetchCustomers from "../FetchCustomers";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { useState, Fragment, useEffect } from "react";
import "./EditCustomers";

export function EditCustomers() {
	const initialValues = {
		firstname: "",
		lastname: "",
		phone: "",
		email: "",
		id: "",
	};

	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [value, setValue] = useState(null);

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
		if (values.email.trim().length > 0) {
			if (!regex.test(values.email)) {
				errors.email = "Correo inválido";
			}
		}

		return errors;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = validate(formValues);
		if (Object.keys(errors).length === 0) {
			setIsSubmit(true);

			const res = fetch(
				`${process.env.REACT_APP_HOST}/api/panel/update`,
				{
					method: "POST",
					body: JSON.stringify(formValues),
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
						"Content-Type": "application/json",
					},
				}
			);
			setFormValues(initialValues);

			setFormErrors({});
			setValue(null);
			setDisabled(true);
		} else {
			console.log("Error");
			// Hay errores, no se envía el formulario
			setFormErrors(errors);
			setIsSubmit(true); // Esto activará los mensajes de error en los campos
		}
	};

	return (
		<div className="create-container">
			<LoadCustomers
				setDisabled={setDisabled}
				setFormValues={setFormValues}
				initialValues={initialValues}
				setValue={setValue}
				value={value}
				setFormErrors={setFormErrors}
			/>
			<TextField
				sx={{
					marginBottom: "1rem",
				}}
				required
				fullWidth
				disabled={disabled}
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
				disabled={disabled}
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
				disabled={disabled}
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
				disabled={disabled}
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
				disabled={disabled}
			>
				Guardar
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

function LoadCustomers({
	setDisabled,
	setFormValues,
	initialValues,
	setValue,
	value,
	setFormErrors,
}) {
	const { loading, options, setOpen, setOptions, open } = FetchCustomers();

	const handleChange = (event, newValue) => {
		console.log(newValue);
		if (!newValue) {
			setValue(null);
			setDisabled(true);
			setFormValues(initialValues);
			setFormErrors({});
			return;
		}
		setFormValues({
			firstname: newValue.firstname,
			lastname: newValue.lastname,
			phone: newValue.phone,
			email: newValue.email,
			id: newValue.id,
		});
		setValue(newValue);
		setFormErrors({});
		setDisabled(false);
		setOptions(newValue ? [newValue, ...options] : options);
	};

	return (
		<Autocomplete
			id="cliente"
			fullWidth
			sx={{ marginBottom: "1rem", marginTop: "2rem" }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			isOptionEqualToValue={(option, value) =>
				option.fullname === value.fullname
			}
			onChange={handleChange}
			value={value}
			getOptionLabel={(option) => option.fullname}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Cliente"
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<Fragment>
								{loading ? (
									<CircularProgress
										color="inherit"
										size={20}
									/>
								) : null}
								{params.InputProps.endAdornment}
							</Fragment>
						),
					}}
				/>
			)}
		/>
	);
}
