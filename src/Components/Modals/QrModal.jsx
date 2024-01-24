import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export function QrModal({
	campainMessage,
	selectedImage,
	setIsSubmit,
	setFormErrors,
	setCampainMessage,
	setSelectedImage,
	show,
	setShow,
	handleClose,
	setPanelType,
}) {
	const [loading, setLoading] = useState(false);
	const [qr, setQr] = useState("");
	const [isClicked, setIsClicked] = useState(true);
	const [msjSend, setMsjSend] = useState(false);
	const [btnOk, setBtnOk] = useState(false);
	const handleLoaded = () => {
		setLoading(false);
	};

	const generateQR = async () => {
		setLoading(true);
		setIsClicked(false);

		fetch(`${process.env.REACT_APP_HOST}/api/panel/generateqr`, {
			method: "POST",
			body: JSON.stringify({
				message: campainMessage,
				image: selectedImage,
			}),
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.code === 401) {
					window.location.href = "/login";
					return;
				}
				if (data.code === "msgsend") {
					setMsjSend(true);
					setLoading(false);
					setIsSubmit(false);
					setCampainMessage("");
					setSelectedImage("");
					setFormErrors({});
					setBtnOk(true);
					return;
				}
				setQr(data.code);
				setLoading(false);
				setCampainMessage("");
				setIsSubmit(false);
				setFormErrors({});
				setBtnOk(true);
			});
	};

	const btnsalir = () => {
		setBtnOk(false);
		setIsClicked(true);
		setShow(false);
		setPanelType("read");
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Enviar mensajes.</Modal.Title>
			</Modal.Header>
			<Modal.Body className="modal-body d-flex justify-content-center">
				{isClicked ? (
					<div>
						<p>
							Se enviará el mensaje, en caso que se requiera se
							solicitará escanear el codigo qr.
						</p>
					</div>
				) : loading ? (
					// Muestra el spinner mientras se carga el QR
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				) : msjSend ? (
					// Muestra el QR cuando está listo
					<div>Mensaje enviado</div>
				) : (
					<img src={`${qr}`} alt="QR Code" onLoad={handleLoaded} />
				)}
			</Modal.Body>

			<Modal.Footer>
				{btnOk ? (
					<Button variant="secondary" onClick={btnsalir}>
						Salir
					</Button>
				) : (
					<Button
						className="btn btn-secondary"
						onClick={generateQR}
						disabled={loading}
					>
						Enviar
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}
