const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL =
	process.env.MONGO_URL ||
	`mongodb+srv://root:toor@cluster0.zolqe.mongodb.net/blogs-kingdom?retryWrites=true&w=majority`;

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());

mongoose
	.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log("database connected."))
	.catch((err) => console.log(err));

//Routes
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
	console.log("App listening successful.");
});
