import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { QrModal } from "../../../Modals/QrModal";
import "./Campain.css";

export function GenerateCampain() {
	const [campainMessage, setCampainMessage] = useState("");
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [modalShow, setModalShow] = useState(false);

	const submitCampain = async () => {
		if (!campainMessage.trim().length > 0) {
			setFormErrors({
				campainMessage: "Ingrese el mensaje de la campaña",
			});
			setIsSubmit(true);
			return;
		}
	};

	const handleChange = (e) => {
		const { value } = e.target;
		setCampainMessage(value);
		if (value.trim().length < 1) {
			setDisabled(true);
			return;
		}
		setDisabled(false);
	};

	return (
		<>
			<div className="campain-container hv">
				<TextField
					sx={{ width: "60%", marginLeft: "20%", marginRight: "20%" }}
					id="outlined-multiline-flexible"
					label="Escriba su mensaje"
					multiline
					rows={10}
					value={campainMessage}
					error={isSubmit}
					helperText={formErrors.campainMessage}
					onChange={(e) => {
						handleChange(e);
					}}
				/>

				<ColorButton
					sx={{ width: "auto", marginTop: "2rem" }}
					variant="text"
					disabled={disabled}
					onClick={submitCampain}
					data-bs-toggle="modal"
					data-bs-target="#exampleModal"
				>
					Generar campaña
				</ColorButton>
			</div>
			<QrModal
				campainMessage={campainMessage}
				setIsSubmit={setIsSubmit}
				setFormErrors={setFormErrors}
				setCampainMessage={setCampainMessage}
			/>
		</>
	);
}

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(green[200]),
	backgroundColor: green[200],
	"&:hover": {
		backgroundColor: green[400],
	},
}));
