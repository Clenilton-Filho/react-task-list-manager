import React from "react";
import { useState, useEffect } from "react";
import "./TaskList.css";
import "../../assets/styles/settings/colors.css";
import icon from '../../assets/images/task-list.webp';

function TaskList() {

    const listStorage = localStorage.getItem('List');

    const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
    const [newItem, setNewItem] = useState("");

    useEffect(()=>{
        localStorage.setItem('List',JSON.stringify(list));
    },[list]);

    const addItem = (event) => {
        event.preventDefault();
        if(!newItem){
            return;
        }
        setList([...list, {text: newItem, isDone: false}])
        setNewItem("");
        document.getElementById("taskInput").focus();
    }

    const markItem = (index) => {
        const updatedList = [...list];
        updatedList[index].isDone = !updatedList[index].isDone;
        setList(updatedList);
    }

    const deleteItem = (index) => {
        const updatedList = [...list];
        updatedList.splice(index,1);
        setList(updatedList);
    }

    const deleteAll = () => {
        setList([]);
    }

    return(
            <div className="app">
                <h1 className="app-title">Task List</h1>
                <form onSubmit={addItem}>
                    <input id="taskInput" type="text" placeholder="Type in the task" value={newItem}
                    onChange={(e)=>{
                        setNewItem(e.target.value);
                    }}/>
                    <button type="submit" className="add-button">Add</button>
                </form>
                <div id="tasks" className="tasks">
                    { 
                        list.length < 1
                        ?
                        (<img src={icon}></img>)
                        :(
                        list.map((item,index)=>(
                            <div className={item.isDone ? 'item done' : 'item'} key={index}>
                                <span onClick={() => markItem(index)}>{item.text}</span>
                                <button onClick={() => deleteItem(index)}>Delete</button>
                            </div>
                        )))
                    }
                </div>
                {
                    list.length > 0 &&
                    <button className="delete-all" onClick={deleteAll}>Delete All</button>
                }
            </div>
    )
}

export default TaskList