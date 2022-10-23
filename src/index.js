const express = require("express");
const cors = require("cors");
const { port } = require("./config");
const { organizer, user } = require("./routes/v1");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/v1/organizer/", organizer);
app.use("/v1/users/", user);

app.get("/", (req, res) => {
    res.send({ message: "On" });
});

app.all("*", (req, res) => {
    res.status(404).send({ error: "Nėra puslapio" });
});

app.listen(port, () => {
    console.log("Prisijungęs " + port)
});