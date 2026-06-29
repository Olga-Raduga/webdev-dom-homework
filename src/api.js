const API_URL = "https://wedev-api.sky.pro/api/v1/olga-kondratova/comments";
export function getComments() {
    return fetch(API_URL)
        .then((response) => response.json())
        .then((data) => data.comments);
}
export function addComment(name, text) {
    return fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ name, text }),
    }).then((response) => {
        if (!response.ok) {
            return response.json().then((err) => {
                throw new Error(err.error);
            });
        }
        return response.json();
    });
}