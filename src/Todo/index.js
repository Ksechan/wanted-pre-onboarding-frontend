import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../API";

const Todo = () => {
  const navigation = useNavigate();
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  const [visibleModify, setVisibleModify] = useState(null);
  const [todoValue, setTodoValue] = useState({
    newTodo: "",
    modifyTodo: "",
  });

  const { newTodo, modifyTodo } = todoValue;

  const onChange = (e) => {
    const { value, name } = e.target;
    setTodoValue({
      ...todoValue,
      [name]: value,
    });
  };

  const onGetTodo = () => {
    axios({
      url: `${API_URL}/todos`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          setTodos(result.data);
          console.log("asdf");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCreateTodo = () => {
    axios({
      url: `${API_URL}/todos`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {
        todo: newTodo,
      },
    })
      .then((result) => {
        if (result.status === 201) {
          onGetTodo();
          setTodoValue({
            ...todoValue,
            newTodo: "",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const onModifyTodo = (id, value, isChecked) => {
    axios({
      url: `${API_URL}/todos/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {
        todo: value,
        isCompleted: isChecked,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          setVisibleModify(null);
          onGetTodo();
        }
      })
      .catch((error) => console.log(error));
  };

  const onDeleteTodo = (id) => {
    axios({
      url: `${API_URL}/todos/${id}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((result) => {
        if (result.status === 204) {
          onGetTodo();
        }
      })
      .catch((error) => console.log(error));
  };

  const onVisibleModifyTodo = (id, todo) => {
    setVisibleModify(id);
    setTodoValue({
      ...todoValue,
      modifyTodo: todo,
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      onCreateTodo();
    }
  };

  const onModifyKeyDown = (e, id, value, isChecked) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      onModifyTodo(id, value, isChecked);
    }
  };

  useEffect(() => {
    if (token) {
      onGetTodo();
    } else {
      alert("로그인을 먼저 해주세요.");
      navigation("/signin");
    }
  }, []);

  return (
    <div className="todo-block">
      <h2>ToDooYa</h2>
      <div className="new-todo">
        <input name="newTodo" value={newTodo} onChange={onChange} data-testid="new-todo-input" autoFocus placeholder="what's your todo" onKeyDown={onKeyDown} />
        <button data-testid="new-todo-add-button" onClick={onCreateTodo} disabled={newTodo === ""} className={`${newTodo === "" ? " disabled" : ""}`}>
          add todo
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((item, index) => {
          return (
            <li key={item.id}>
              {visibleModify === item.id ? (
                <div className="modify-todo">
                  <label>
                    <input
                      type="checkbox"
                      value={item.isCompleted}
                      checked={item.isCompleted}
                      onChange={(e) => {
                        onModifyTodo(item.id, item.todo, e.target.checked);
                      }}
                    />
                    <input
                      name="modifyTodo"
                      value={modifyTodo}
                      onChange={onChange}
                      data-testid="modify-input"
                      autoFocus
                      onKeyDown={(e) => {
                        onModifyKeyDown(e, item.id, modifyTodo, item.isCompleted);
                      }}
                    />
                  </label>
                  <div>
                    <button
                      data-testid="submit-button"
                      onClick={() => {
                        if (visibleModify === null) {
                          onModifyTodo(item.id, item.todo, item.isCompleted);
                        } else {
                          onModifyTodo(item.id, modifyTodo, item.isCompleted);
                        }
                      }}
                    >
                      제출
                    </button>
                    <button data-testid="cancel-button" onClick={() => setVisibleModify(null)}>
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="asdf">
                    <span>#{index + 1}</span>
                    <label>
                      <input
                        type="checkbox"
                        value={item.isCompleted}
                        checked={item.isCompleted}
                        onChange={(e) => {
                          onModifyTodo(item.id, item.todo, e.target.checked);
                        }}
                      />
                      <span>{item.todo}</span>
                    </label>
                  </div>
                  <div>
                    <button
                      data-testid="modify-button"
                      onClick={() => {
                        onVisibleModifyTodo(item.id, item.todo);
                      }}
                    >
                      수정
                    </button>
                    <button
                      data-testid="delete-button"
                      onClick={() => {
                        onDeleteTodo(item.id);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
