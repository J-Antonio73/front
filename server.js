const express = require("express");
const path = require("path");
const port = process.env.PORT || 9000;
const app = express();
const cors = require("cors");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
	res.setHeader(
		"Access-Control-Allow-Origin",
		`${process.env.REACT_APP_HOST}`
	);
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, (err) => console.log(`Server is running on port ${port}`));
