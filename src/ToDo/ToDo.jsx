import React, { useState } from "react"
import styles from './ToDo.module.css'

function Planner(){

    const [task, setTask] = useState(["Take out trash", "Eat Breakfast","Take a shower"])
    const [newTask, setNewTask] = useState("");
    const [finishedTasks, setFinishedTasks] = useState([]);

   
    function doneTask(index){

        const currentTime = new Date;
        let currentHours = currentTime.getHours();
        let currentMins = currentTime.getMinutes();
        let currentSeconds = currentTime.getSeconds();
        let meridiem = currentHours >= 12 ? "AM" : "PM"
        currentHours = currentHours % 12 || 12;
        
        let final = (`${currentHours.toString().padStart(2, "0")}:${currentMins.toString().padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")} ${meridiem}`);
    
        setFinishedTasks(f => [...f, { task: task[index], timeFinished: final}]);
        setTask(t => t.filter((_,i) => i !== index));
    }

    function addTask(event){
        event.preventDefault();
        setTask(t => [...t, newTask])
        setNewTask("")
    }
    
    function addNewTask(event){
        setNewTask(event.target.value);
    }
    function deleteTask(index) {
        setTask(t => t.filter((_,i) => i !== index))
    }
    function undoTask(index){
        setTask(t => [...t, finishedTasks[index].task]);
        setFinishedTasks(t => t.filter((_, i) => i !== index));
    }


    return (
    <div className={styles.plannerCont}>
        <h1 className={styles.plannerDivision}>TO-DO-LIST</h1>
        <form action="submit" onSubmit={addTask}>
            <input type="text" value={newTask} placeholder="Enter a task" onChange={addNewTask} required/>
            <button className={styles.addTaskBtn}>ADD TASK</button>
        </form>
        <ol>
            {task.map((task,index) => <li key={index} ><span className={styles.taskName}>{task}</span>
                <button className={styles.doneBtn} onClick={() => doneTask(index)}>MARK AS DONE</button>
                <button className={styles.delBtn} onClick={() => deleteTask(index)}>DELETE TASK</button>
                </li>)}
        </ol>    
            <h1 className={styles.plannerDivision}>FINISHED TASKS</h1>
            <ol>
                {finishedTasks.map((finishedTasks,index) => <li key={index}><span className={styles.taskName}>{finishedTasks.task}</span>
                <button className={styles.addTaskBtn} onClick={() => undoTask(index)}> UNDO </button>
                <span className={styles.doneAt}>{finishedTasks.timeFinished}</span>
                    </li>)}
            </ol>
    </div>
    );
}
export default Planner
