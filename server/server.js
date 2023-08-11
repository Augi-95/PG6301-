import express  from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();


const DPT =["sale","finance"];
const EMPLOYEE = [
    {
        name: "john",
        dpt: "ABC",
        log: 20
    },
	{
        name: "jane",
        dpt: "XYZ",
        log: 20
    },
    
];
const TASK= [
    {
        activity: "calculate salary",
	emp: EMPLOYEE[0],
        dpt: DPT[1],

    }, 
    {
        activity: "manage sale",
	emp: EMPLOYEE[1],
        dpt: DPT[0],

    },
    
];

app.use(bodyParser.json());

app.get("/api/task", (req, res) =>{
    res.json(TASK);
});

app.post("/api/task", (req, res) =>{
    const {activity, emp, dpt} = req.body;
    TASK.push({activity, emp, dpt});
    res.sendStatus(200);
})

app.use(express.static(path.resolve("..", "client", "dist")));
app.use((req, res) => {
   res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on http://localhost:" + server.address().port);
});