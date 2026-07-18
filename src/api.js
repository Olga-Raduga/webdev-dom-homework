const API_URL = "https://wedev-api.sky.pro/api/v2/olga-kondratova";
export function getComments() {
    return fetch(API_URL + "/comments")
        .then((response) => {
            if (response.status === 500) throw new Error("Ошибка сервера");
            return response.json();
        })
        .then((data) => data.comments);
}


export function addComment(text, token) {
    return fetch(API_URL + "/comments", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({ text }),
    }).then((response) => {
        if (response.status === 400) throw new Error("Ошибка валидации");
        if (response.status === 401) throw new Error("Нет авторизации");
        if (response.status === 500) throw new Error("Ошибка сервера");
        return response.json();
    });
}
export function login(login, password) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({ login, password }),
    }).then((response) => {
        if (response.status === 400) throw new Error("Неверный логин или пароль");
        if (response.status === 401) throw new Error("Неверный логин или пароль");
        return response.json();
    });
}