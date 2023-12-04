import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import FetchCustomers from "../FetchCustomers";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { useState, Fragment, useEffect } from "react";
import "./DeleteCustomers";

export function DeleteCustomers() {
	const [customer, setCustomer] = useState(null);
	const [value, setValue] = useState(null);
	const [disabled, setDisabled] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_HOST}/api/panel/delete`, {
			method: "POST",
			body: JSON.stringify(customer),
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setCustomer(null);
				setDisabled(true);
				setValue(null);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="create-container">
			<LoadCustomers
				setDisabled={setDisabled}
				setCustomer={setCustomer}
				setValue={setValue}
				value={value}
			/>

			<ColorButton
				sx={{ width: "8rem" }}
				variant="text"
				onClick={handleSubmit}
				disabled={disabled}
			>
				Eliminar
			</ColorButton>
		</div>
	);
}

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(red[200]),
	backgroundColor: red[200],
	"&:hover": {
		backgroundColor: red[400],
	},
}));

function LoadCustomers({ setDisabled, setCustomer, setValue, value }) {
	const handleChange = (event, value) => {
		if (!value) {
			setDisabled(true);
			setCustomer(null);
			setValue(null);
			return;
		}
		setCustomer(value);
		setDisabled(false);
		setValue(value);
		setOptions(value ? [value, ...options] : options);
	};

	const { loading, options, setOpen, setOptions, open } = FetchCustomers();

	return (
		<Autocomplete
			id="delete-customers"
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
			value={value}
			onChange={handleChange}
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
