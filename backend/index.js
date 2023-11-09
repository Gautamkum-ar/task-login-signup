import express from "express";
import cors from "cors";

const app = express();

app.use(
	cors({
		origin: "*",
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sample user data (for demonstration)
const users = [
	{ email: "gkvc9696@gmail.com", username: "user1", password: "password1" },
	{ email: "user2@gmail.com", username: "user2", password: "password2" },
];
// Routes login
app.post("/login", (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			throw new Error("Email and password are required");
		}
		const finduser = users.find((user) => user.email === email);
		if (!finduser) {
			throw new Error("User not found");
		}
		if (finduser.password !== password) {
			throw new Error("Password is incorrect");
		}
		return res
			.status(200)
			.json({ message: "Login Successful!", data: finduser, success: true });
	} catch (error) {
		console.log(error);
	}
});

// Routes register
app.post("/signup", (req, res) => {
	const { email, username, password } = req.body;
	try {
		if (!username || !email || !password) {
			throw new Error("Username, Email and Password fields are required");
		}
		const check_existing_users = users.some((user) => user.email == email);
		if (check_existing_users) {
			throw new Error(`${email} already exists`);
		} else {
			users.push({ email, username, password });
			return res
				.status(200)
				.json({ message: "Registered successfully", success: true });
		}
	} catch (err) {
		console.log(err);
	}
});

const port = 4000;
app.listen(port, () => {
	console.log(`App started on port ${port}`);
});
