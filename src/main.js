import { getComments, addComment, login } from "./api.js";
import { renderComments } from "./renderComments.js";

const commentsList = document.querySelector(".comments");
const addForm = document.querySelector(".add-form");

//токен и имя пользователя
let userToken = null;
let userName = null;
//страница входа
function renderLoginPage() {
    addForm.innerHTML = `
        <p>Чтобы добавить комментарий, 
            <a href="#" id="login-link">авторизуйтесь</a>
        </p>
    `;
    document.getElementById("login-link").addEventListener("click", function (e) {
        e.preventDefault();
        renderAuthForm();
    });
}
//форма входа
function renderAuthForm() {
    addForm.innerHTML = `
        <input type="text" id="login-input" placeholder="Логин" />
        <input type="password" id="password-input" placeholder="Пароль" />
        <button id="login-button">Войти</button>
        <p id="login-error" style="color:red; display:none;">Неверный логин или пароль</p>
    `;
    document.getElementById("login-button").addEventListener("click", function () {
        const loginValue = document.getElementById("login-input").value;
        const passwordValue = document.getElementById("password-input").value;
        login(loginValue, passwordValue)
            .then((data) => {
                userToken = data.user.token;
                userName = data.user.name;
                renderAddForm();
            })
            .catch(() => {
                document.getElementById("login-error").style.display = "block";
            });
    });
}
//форма добавления комментария
function renderAddForm() {
    addForm.innerHTML = `
        <input type="text" class="add-form-name" value="${userName}" readonly />
        <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
        <div class="add-form-row">
            <button class="add-form-button">Написать</button>
        </div>
    `;
    const commentInput = addForm.querySelector(".add-form-text");
    const addButton = addForm.querySelector(".add-form-button");
    addButton.addEventListener("click", function () {
        const text = commentInput.value.trim();
        if (text.length < 3) {
            alert("Комментарий должен быть не короче 3 символов");
            return;
        }
        addComment(text, userToken)
            .then(() => getComments())
            .then((newComments) => {
                renderComments(newComments, commentsList);
                commentInput.value = "";
            })
            .catch((error) => {
                if (error.message === "Ошибка сервера") {
                    alert("Сервер сломался, попробуй позже");
                } else if (error.message === "Ошибка валидации") {
                    alert("Текст комментария слишком короткий");
                } else {
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                }
            });
    });
}
//запуск
function init() {
    commentsList.innerHTML = "<li class='loading'>Комментарии загружаются...</li>";
    getComments()
        .then((comments) => {
            renderComments(comments, commentsList);
            renderLoginPage();
        })
        .catch((error) => {
            if (error.message === "Ошибка сервера") {
                alert("Сервер сломался, попробуй позже");
            } else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
            }
        });
}
init();
