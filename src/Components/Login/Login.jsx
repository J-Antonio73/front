import { useState, useEffect } from "react";
import "./Login.css";

function Login() {
	const initialValues = {
		username: "",
		password: "",
	};
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
		// eslint-disable-next-line
		const res = fetch(`${process.env.REACT_APP_HOST}/api/login`, {
			method: "POST",
			body: JSON.stringify(formValues),
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.code !== 200) {
					setFormErrors({ password: data.status });

					return;
				}
				localStorage.setItem("token", data.token);
				window.location.href = "/panel";
			});
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(formValues);
		}
	}, [formErrors, formValues, isSubmit]);
	const validate = (values) => {
		const errors = {};

		if (!values.username) {
			errors.username = "Ingrese usuario";
		}
		if (!values.password) {
			errors.password = "Ingrese contraseña";
		}
		return errors;
	};

	return (
		<>
			<div className="bgImg"></div>
			<div className="container">
				<form onSubmit={handleSubmit}>
					<h1>Iniciar Sesion</h1>
					<div className="ui divider"></div>
					<div className="ui form">
						<div className="field">
							<label>Usuario</label>
							<input
								type="text"
								name="username"
								placeholder="Usuario"
								value={formValues.username}
								onChange={handleChange}
							/>
						</div>
						<p className="text-danger">{formErrors.username}</p>
						<div className="field">
							<label>Contraseña</label>
							<input
								type="password"
								name="password"
								placeholder="Contraseña"
								value={formValues.password}
								onChange={handleChange}
							/>
						</div>
						<p className="text-danger">{formErrors.password}</p>
						<button className="fluid ui button blue">
							Ingresar
						</button>
					</div>
				</form>
			</div>{" "}
		</>
	);
}

export default Login;
