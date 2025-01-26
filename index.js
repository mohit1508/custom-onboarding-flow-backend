require("dotenv").config();
const express = require("express");
const cors = require("cors");
const onboardingRoutes = require("./routes/onboarding");
const adminRoutes = require("./routes/admin");
const dataRoutes = require("./routes/data");
const statesRoutes = require("./routes/states");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/onboarding", onboardingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/states", statesRoutes);

app.listen(process.env.SERVER_PORT, () => console.log(`Server running on port ${process.env.SERVER_PORT}`));
