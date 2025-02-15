import { PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to get users" });
    }
});

app.post("/", async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
            password: req.body.password
            }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

