import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos
        .map((todo) => (
          <div
            key={todo._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "70%",
              margin: "auto",
            }}
          >
            <Todo todo={todo} onDelete={deleteTodo} onComplete={completeTodo} />
          </div>
        ))
        .reduce(
          (acc, cur, index) => [...acc, <hr key={`hr-${index}`} />, cur],
          []
        )}
    </>
  );
};

export default TodoList;
