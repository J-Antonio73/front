import { useEffect, useState } from "react";

export function QrModal({
	campainMessage,
	setIsSubmit,
	setFormErrors,
	setCampainMessage,
	// show,
}) {
	const [loading, setLoading] = useState(false);
	const [qr, setQr] = useState("");
	const [isClicked, setIsClicked] = useState(true);
	const handleLoaded = () => {
		setLoading(false);
	};

	const generateQR = async () => {
		setLoading(true);
		setIsClicked(false);
		fetch(`${process.env.REACT_APP_HOST}/api/generateqr`, {
			method: "POST",
			body: JSON.stringify({ message: campainMessage }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setQr(data.code);
				setLoading(false);
				setCampainMessage("");
				setIsSubmit(false);
				setFormErrors({});
			});
	};

	return (
		<div
			className="modal fade"
			id="exampleModal"
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">
							Enviar campaña
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body d-flex justify-content-center">
						{isClicked ? (
							<div>
								<p>
									Se enviará el mensaje, en caso que se
									requiera se solicitará escanear el codigo
									qr.
								</p>
							</div>
						) : loading ? (
							// Muestra el spinner mientras se carga el QR
							<div className="spinner-border" role="status">
								<span className="visually-hidden">
									Loading...
								</span>
							</div>
						) : (
							// Muestra el QR cuando está listo
							<img
								src={`${qr}`}
								alt="QR Code"
								onLoad={handleLoaded}
							/>
						)}
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							onClick={generateQR}
						>
							Enviar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
