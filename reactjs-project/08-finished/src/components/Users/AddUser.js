import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [error, setError] = useState();
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  ReactDOM.createPortal(
    <ErrorModal />,
    document.getElementById("backdrop-root")
  );
  const addUserHandler = (event) => {
    event.preventDefault();
    const newUsername = nameInputRef.current.value;
    const newAge = ageInputRef.current.value;
    if (newUsername.trim().length === 0 || newAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+newAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(newUsername, newAge);
    nameInputRef.current.value = ''
    ageInputRef.current.value = ''
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' ref={nameInputRef} />
          <label htmlFor='age'>Age (Years)</label>
          <input id='age' type='number' ref={ageInputRef} />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
