const API_URL = "https://wedev-api.sky.pro/api/v1/olga-kondratova/comments";
export function getComments() {
    return fetch(API_URL)
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Ошибка сервера");
            }
            return response.json();
        })
        .then((data) => data.comments);
        }


export function addComment(name, text) {
    return fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ name, text }),
    }).then((response) => {
        if (response.status === 400) {           
            throw new Error("Ошибка валидации");
            }
        if (response.status === 500) {
            throw new Error("Ошибка сервера");
        }
        return response.json();
    });
}