import { getComments, addComment, login, register } from "./api.js";
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
            или
            <a href="#" id="register-link">зарегистрируйтесь</a>
        </p>
    `;
    document.getElementById("login-link").addEventListener("click", function (e) {
        e.preventDefault();
        renderAuthForm();
    });
    document.getElementById("register-link").addEventListener("click", function (e) {
        e.preventDefault();
        renderRegisterForm();
    });
}
//форма входа
function renderAuthForm() {
    addForm.innerHTML = `
        <input type="text" id="login-input" class="add-form-name" placeholder="Логин" />
        <input type="password" id="password-input" class="add-form-text" placeholder="Пароль" />
          <div class="add-form-row">
        <button id="login-button" class="add-form-button">Войти</button>
          </div>
        <p id="login-error" style="color:red; display:none;">Неверный логин или пароль</p>
    `;
    document.getElementById("login-button").addEventListener("click", function () {
        const loginValue = document.getElementById("login-input").value;
        const passwordValue = document.getElementById("password-input").value;
        login(loginValue, passwordValue)
            .then((data) => {
                userToken = data.user.token;
                userName = data.user.name;
                //сохраняю в браузере
                localStorage.setItem('token', userToken);
                localStorage.setItem('name', userName);
                renderAddForm();
            })
            .catch(() => {
                document.getElementById("login-error").style.display = "block";
            });
    });
}
//форма регистрации
function renderRegisterForm() {
    addForm.innerHTML = `
        <input type="text" id="reg-name" class="add-form-name" placeholder="Ваше имя" />
        <input type="text" id="reg-login" class="add-form-name" placeholder="Логин" />
        <input type="password" id="reg-password" class="add-form-text" placeholder="Пароль" />
        <div class="add-form-row">
        <button id="reg-button" class="add-form-button">Зарегистрироваться</button>
        </div>
        <p><a href="#" id="back-to-login" style="color:#bcec30;">Уже есть аккаунт? Войти</a></p>
        <p id="reg-error" style="color:red; display:none;"></p>
    `;
    document.getElementById("back-to-login").addEventListener("click", function (e) {
        e.preventDefault();
        renderAuthForm();
    });
    document.getElementById("reg-button").addEventListener("click", function () {
        const name = document.getElementById("reg-name").value;
        const loginValue = document.getElementById("reg-login").value;
        const password = document.getElementById("reg-password").value;
        register(loginValue, password, name)
            .then((data) => {
                userToken = data.user.token;
                userName = data.user.name;
                localStorage.setItem('token', userToken);
                localStorage.setItem('name', userName);
                renderAddForm();
            })
            .catch((error) => {
                const errorEl = document.getElementById("reg-error");
                errorEl.textContent = error.message;
                errorEl.style.display = "block";
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
    //проверяю при старте
    const savedToken = localStorage.getItem('token');
    const savedName = localStorage.getItem('name');
    if (savedToken) {
        userToken = savedToken;
        userName = savedName;
    }
    commentsList.innerHTML = "<li class='loading'>Комментарии загружаются...</li>";
    getComments()
        .then((comments) => {
            renderComments(comments, commentsList);
            if (userToken) {
                renderAddForm();
            } else {
                renderLoginPage();
            }
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
