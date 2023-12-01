import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";

const columns = [
	{ id: "fullname", label: "Nombre", minWidth: 120 },
	{ id: "phone", label: "Telefono", minWidth: 100 },
	{ id: "email", label: "Correo", minWidth: 120 },
];

function LoadCustomeFetchCustomerssComponent() {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_HOST}/api/get`)
			.then((res) => res.json())
			.then((res) => {
				setRows(res);
			});
	}, []);

	return { rows };
}

function ColumnGroupingTable() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const { rows } = LoadCustomeFetchCustomerssComponent();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<>
			<h2>Lista de clientes</h2>
			<Paper sx={{ width: "100%" }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align="center"
										colSpan={1}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row) => (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.id}
									>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align="center"
											>
												{row[column.id]}
											</TableCell>
										))}
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelRowsPerPage="Clientes por página"
				/>
			</Paper>
		</>
	);
}

export default ColumnGroupingTable;
