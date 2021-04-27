import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from "react-router-dom";
import { isAuthenticated } from '../auth/helper';
import { deleteTodo, getUserTodos } from './helper/userapicall';



const ManageTodos = () => {


    const [todos, setTodos] = useState([])
    const  {user, token } = isAuthenticated();

    const userId = user._id;
    const preload = () => {
      getUserTodos(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
              console.log(todos);
                setTodos(data);
            }
        });
    };

    useEffect(() => {
      preload();
    }, []) 


    const deleteATodo = todoId => {
        deleteTodo(todoId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        })
    }

    return (
      <Base title="Welcome User" description="Manage todos here">
        <Link className="btn btn-info" to={`/user/dashboard`}>
          <span className="">User Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">All Todos</h2>
            {todos.map((todo, index) => {
              return (
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className="text-white text-left">{todo.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/user/todo/update/${todo._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button onClick={() => {
                        deleteATodo(todo._id)
                    }} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Base>
    );
}

export default ManageTodos;