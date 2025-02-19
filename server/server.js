const express = require("express");
const cors = require("cors");

const app = express();// define the port number
const PORT = process.env.PORT || 5000;


app.use(cors());

// Greeting API Route
app.get("/api/greet", (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "Oops! Looks like you forgot to provide a name." });
    }

    res.json({ message: `Hey, ${name}! Welcome to Younglabs. Glad to have you here!` });
});

// port
app.listen(PORT, () => {
    console.log(`🚀 Server is up and running on port ${PORT}`);
});
