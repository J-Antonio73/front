import { useState, useEffect } from "react";

export default function LoadCustomeFetchCustomerssComponent() {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;
	useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const data = await fetch("http://localhost:3002/api/get").then(
				(res) => res.json()
			);
			console.log(data);
			if (active) {
				setOptions([...data]);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return { loading, options, setOpen, setOptions, open };
}
