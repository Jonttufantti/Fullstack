const Todo = ({ todo, onDelete, onComplete }) => {
  const onClickDelete = () => {
    onDelete(todo);
  };

  const onClickComplete = () => {
    onComplete(todo);
  };

  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={onClickDelete}> Delete </button>
      </span>
    </>
  );

  const notDoneInfo = (
    <>
      <span>This todo is not done</span>
      <span>
        <button onClick={onClickDelete}> Delete </button>
        <button onClick={onClickComplete}> Set as done </button>
      </span>
    </>
  );

  return (
    <>
      <span>{todo.text}</span>
      {todo.done ? doneInfo : notDoneInfo}
    </>
  );
};

export default Todo;
