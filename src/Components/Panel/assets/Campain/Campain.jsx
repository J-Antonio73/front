import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { QrModal } from "../../../Modals/QrModal";
import "./Campain.css";

export function GenerateCampain({ setPanelType }) {
	const [campainMessage, setCampainMessage] = useState("");
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [selectedImage, setSelectedImage] = useState(null);
	const [base64Image, setBase64Image] = useState('');

	const submitCampain = async () => {
		if (!campainMessage.trim().length > 0) {
			setFormErrors({
				campainMessage: "Ingrese el mensaje de la campaña",
			});
			return;
		}
		
		if (selectedImage) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBase64Image(reader.result);

				console.log("Imagen convertida a base64:", reader.result);
			};
			reader.readAsDataURL(selectedImage);
		}

		handleShow();
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

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSelectedImage(file);
	};

	return (
		<>
			<div className="campain-container hv">

				<label htmlFor="fileInput" sx={{ marginTop: '1rem', display: 'block' }}>
				Seleccione una imagen <small><i>(opcional)</i></small>:
				<input
					type="file"
					id="fileInput"
					name={selectedImage}
    				onChange={(e) => {
						handleFileChange(e);
					}}
					accept="image/*"
					sx={{ display: 'none' }}
				/>
				</label>

				<TextField
					sx={{ width: "60%", marginLeft: "20%", marginRight: "20%" }}
					id="outlined-multiline-flexible"
					label="Escriba su mensaje"
					multiline
					rows={7}
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
				>
					Generar campaña
				</ColorButton>
			</div>
			<QrModal
				campainMessage={campainMessage}
				selectedImage={base64Image}
				setIsSubmit={setIsSubmit}
				setFormErrors={setFormErrors}
				setCampainMessage={setCampainMessage}
				setSelectedImage={setSelectedImage}
				show={show}
				setShow={setShow}
				handleClose={handleClose}
				setPanelType={setPanelType}
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
