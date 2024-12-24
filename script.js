// let input =document.querySelector(".t-input")
// let btn =document.querySelector(".t-btn")
// let ul =document.querySelector(".t-list")

// btn.addEventListener("click" ,() => {
//     let li = document.createElement("li")
//     li.innerText = input.value
//     ul.appendChild(li)
//      li.style.marginTop = "5px"
//     input.value = ""
//     li.addEventListener("click", () => {
//         li.style.textDecoration = "line-through" 
//     })
//     li.addEventListener("dblclick", () => {
//         ul.removeChild(li)
//     }) 
// })



const input = document.querySelector(".t-input");
        const btn = document.querySelector(".t-btn");
        const ul = document.querySelector(".t-list");
        const clearBtn = document.querySelector(".clear-btn");

        function saveTodos() {
            const todos = [];
            ul.querySelectorAll("li").forEach(li => {
                todos.push({
                    text: li.innerText,
                    completed: li.classList.contains("completed")
                });
            });
            localStorage.setItem("todos", JSON.stringify(todos));
        }

        function loadTodos() {
            const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
            savedTodos.forEach(todo => {
                const li = document.createElement("li");
                li.innerText = todo.text;
                if (todo.completed) {
                    li.classList.add("completed");
                }
                attachListeners(li);
                ul.appendChild(li);
            });
        }

        function attachListeners(li) {
            li.addEventListener("click", () => {
                li.classList.toggle("completed");
                saveTodos();
            });

            li.addEventListener("dblclick", () => {
                li.remove();
                saveTodos();
            });
        }

        btn.addEventListener("click", () => {
            if (input.value.trim() === "") return;
            const li = document.createElement("li");
            li.innerText = input.value.trim();
            attachListeners(li);
            ul.appendChild(li);
            input.value = "";
            saveTodos();
        });

        clearBtn.addEventListener("click", () => {
            ul.innerHTML = "";
            saveTodos();
        });

        window.addEventListener("load", loadTodos);
