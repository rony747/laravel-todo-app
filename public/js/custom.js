let taskInput = document.querySelector(".task-input");
let taskSubmit = document.querySelector(".submit-task");

// Get all Todos
function getAllTodos() {
    axios
        .get("/gettodos")
        .then(function (response) {
            if (response.status === 200) {
                let todoData = response.data;
                let taskListUl = document.querySelector(".task-list");
                taskListUl.innerHTML = "";
                todoData.forEach((todo) => {
                    if (todo.todo_done == 1) {
                        taskListUl.innerHTML += `<li class="task-list-item taskListLi" data-id="${todo.id}" v-for="task in tasks">
                        <label class="task-list-item-label">
                            <input type="checkbox" class="task-complete" id="task-complete" checked>
                            <span>${todo.todo_text}</span>
                        </label>
                        <span class="delete-btn" title="Delete Task">task delete</span>
                    </li>`;
                    } else {
                        taskListUl.innerHTML += `<li class="task-list-item taskListLi" data-id="${todo.id}" v-for="task in tasks">
                        <label class="task-list-item-label">
                            <input type="checkbox" class="task-complete" id="task-complete">
                            <span>${todo.todo_text}</span>
                        </label>
                        <span class="delete-btn" title="Delete Task">task delete</span>
                    </li>`;
                    }
                });
            } else {
                Toastify({
                    text: "Something is wrong",
                    style: {
                        background:
                            "linear-gradient(to right, #f60000, #f66000)",
                    },
                }).showToast();
            }
            // add todo function call
            taskInput.addEventListener("keydown", function (event) {
                // Number 13 is the "Enter" key on the keyboard
                if (event.keyCode === 13) {
                    // Cancel the default action, if needed
                    event.preventDefault();
                    // Trigger the button element with a click
                    addTodo();
                    taskInput.value = "";
                }
            });

            taskSubmit.addEventListener("click", () => {
                addTodo();
            });

            // complete function call
            let taskComBtn = document.querySelectorAll(".task-complete");
            taskComBtn.forEach((taskCbtn) => {
                taskCbtn.addEventListener("click", () => {
                    let id = taskCbtn.closest("li").dataset.id;
                    todoComplete(id);
                });
            });

            // Delete function call
            let taskDelBtns = document.querySelectorAll(".delete-btn");
            taskDelBtns.forEach((taskdelBtn) => {
                taskdelBtn.addEventListener("click", () => {
                    let id = taskdelBtn.closest("li").dataset.id;
                    todoDelete(id);
                });
            });
        })
        .catch(function (error) {
            Toastify({
                text: error,
                style: {
                    background: "linear-gradient(to right, #f60000, #f66000)",
                },
            }).showToast();
        });
}

getAllTodos();

// todo Add operation
function addTodo() {
    if (taskInput.value == "") {
        Toastify({
            text: "Field is required",
            style: {
                background: "linear-gradient(to right, #f60000, #f66000)",
            },
        }).showToast();
    } else {
        let inputVal = taskInput.value;
        axios
            .post("/addtodo", { todoText: inputVal, todoStatus: 0 })
            .then(function (response) {
                if (response.status === 200) {
                    Toastify({
                        text: "Task Added",
                        style: {
                            background:
                                "linear-gradient(to right, cyan, limegreen)",
                        },
                    }).showToast();
                    getAllTodos();
                } else {
                    Toastify({
                        text: "Todo add failed",
                        style: {
                            background:
                                "linear-gradient(to right, #f60000, #f66000)",
                        },
                    }).showToast();
                }
            })
            .catch(function (error) {
                Toastify({
                    text: error,
                    style: {
                        background:
                            "linear-gradient(to right, #f60000, #f66000)",
                    },
                }).showToast();
            });
    }
}

// todo complete operation

function todoComplete(comId) {
    axios
        .post("/todocomplete", { id: comId })
        .then(function (response) {
            if (response.status === 200) {
                Toastify({
                    text: "Success",
                    style: {
                        background:
                            "linear-gradient(to right, cyan, limegreen)",
                    },
                }).showToast();
                getAllTodos();
            } else {
                Toastify({
                    text: "Something is wrong",
                    style: {
                        background:
                            "linear-gradient(to right, #f60000, #f66000)",
                    },
                }).showToast();
            }
        })
        .catch(function (error) {
            Toastify({
                text: error,
                style: {
                    background: "linear-gradient(to right, #f60000, #f66000)",
                },
            }).showToast();
        });
}

// todo Delete operation

function todoDelete(delId) {
    axios
        .post("/tododelete", { id: delId })
        .then(function (response) {
            if (response.status === 200) {
                Toastify({
                    text: "Todo deleted",
                    style: {
                        background:
                            "linear-gradient(to right, cyan, limegreen)",
                    },
                }).showToast();
                getAllTodos();
            } else {
                Toastify({
                    text: "Something is wrong",
                    style: {
                        background:
                            "linear-gradient(to right, #f60000, #f66000)",
                    },
                }).showToast();
            }
        })
        .catch(function (error) {
            Toastify({
                text: error,
                style: {
                    background: "linear-gradient(to right, #f60000, #f66000)",
                },
            }).showToast();
        });
}
