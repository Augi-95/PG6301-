import * as React from "react";
import {useState, useEffect} from "react";
import * as ReactDOM from "react-dom/client";
import Navigation from './navigation/Navigation';
import './index.css';

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
        <div class="wrapper">
        {
            task.map( m =>
                 <div key={m.activity}>
                <li class="add-box">
                <h1>{m.activity} </h1>
                <div class="salary-card">

		<p> Assign to: {m.emp.name} </p>
                <p> Log hours: {m.emp.log} hours </p>
		<p> Dept: {m.dpt}</p>  
        </div>
                </li>
              </div>

         
        )}</div>
    </div>;
}


function NewTask({taskApi}){

    const [activity, setActivity] = useState("hello");
    const [emp, setEmp]  = useState({
      "name": "jane1",
      "log": 201
    });
    const [dpt, setDpt] = useState("IT");


    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

alert(activity);
        await taskApi.onAddTask({activity,emp, dpt});
        navigate("/");
    }

    return   <div className="task-form"> 
    <form onSubmit={handleSubmit}>
      
        <h1> Enter details for new Task </h1>
        <div>
            <label> Task Activity: <input value={activity} onChange={e => setActivity(e.target.value)} /></label>
        </div>
        <div>
            <label> name: <input value={emp.name} onChange={e => setEmp(prevEmp => ({ ...prevEmp, "name": e.target.value }))} /></label>
        </div>
        <div>
            <label> Log: <textarea value={emp.log} onChange={e => setEmp(prevEmp => ({ ...prevEmp, "log": e.target.value }))}/></label>
        </div>
        <div>
        <label>Department: 
            <select value={dpt} onChange={e => setDpt(e.target.value)}>
              
              <option value="finance">Finance</option>
              <option value="hr">Human Resources</option>
              <option value="it">Information Technology</option>
              {/* Add more options as needed */}
            </select>
          </label>
        </div>
        <button>Submit</button>
    </form>
    </div>
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
<Navigation/>
        <Routes>     
	

            <Route path="/" element={<ListTask taskApi={taskApi}/>}></Route>
            <Route path="/task/new" element={<NewTask taskApi={taskApi}/>}></Route>
            <Route path="/task" element={<ListTask taskApi={taskApi}/>}></Route>
        </Routes>
    </BrowserRouter>
}

root.render(
    <Application/>
);