import * as React from "react";
import {useState, useEffect} from "react";
import * as ReactDOM from "react-dom/client";
import {Routes, Route, Link, BrowserRouter, useNavigate} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('app'));

function Home(){
    return <div>
        <h1> Task management system</h1>
        <ul>
            <li><Link to="/task"> Task List </Link></li>
            <li><Link to="task/new"> Add New Task </Link></li>
        </ul>
    </div>
}

function ListTask({taskApi}){
    const [task, setTask] = useState();

    useEffect(  () => {
        async function fetchData(){

            console.log("hello");
            setTask(undefined);
            setTask(await taskApi.listTask());
        }

        fetchData();
    }, []);
if(!task){

        console.log(task);
        return <div>Loading...</div>
    }
    
name
    return <div>
        <h1> List Task </h1>
        {
            task.map( m =>
            <div key={m.activity}>
 		<h1>Task Activity: {m.activity} </h1>
		<div> Employee name: {m.emp.name} </div>
                <div> Log hours: {m.emp.log} hours </div>
		<div> Department: {m.dpt}</div>   
            </div>
        )}
    </div>;
}


function NewTask({taskApi}){
const [name, setName] = useState("junaid");
    const [activity, setActivity] = useState("hello");
    const [emp, setEmp]  = useState({
      "name": "jane1",
      "dpt": "XYZ1",
      "log": 201
    });
    const [dpt, setDpt]  = useState("ok");

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

alert(activity);
        await taskApi.onAddTask({activity,emp, dpt});
        navigate("/");
    }

    return <form onSubmit={handleSubmit}>
        <h1> Enter details for new Task </h1>
        <div>
            <label> Task Activity: <input value={activity} onChange={e => setActivity(e.target.value)} /></label>
        </div>
        <div>
            <label> name: <input value={name} onChange={e => setName(e.target.value)} /></label>
        </div>
        <div>
            <label> Dpt: <textarea value={dpt} onChange={e => setDpt(e.target.value)}/></label>
        </div>
        <button>Submit</button>
    </form>
}

function Application(){

    const taskApi = {
        onAddTask: async (m) => {
            await fetch("/api/task", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(m)
            })
        },
        listTask: async () => {
            const res = await fetch("/api/task");
            return res.json();
        }
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/task/new" element={<NewTask taskApi={taskApi}/>}></Route>
            <Route path="/task" element={<ListTask taskApi={taskApi}/>}></Route>
        </Routes>
    </BrowserRouter>
}

root.render(
    <Application/>
);