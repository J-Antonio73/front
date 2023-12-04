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
			const data = await fetch(
				`${process.env.REACT_APP_HOST}/api/panel/get`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
						"Content-Type": "application/json",
					},
				}
			).then((res) => res.json());
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
