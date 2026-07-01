import { getComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { setupLikes, setupAddComment } from "./setEventListeners.js";
const commentsList = document.querySelector(".comments");
const addButton = document.querySelector(".add-form-button");
const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
const addForm = document.querySelector(".add-form");
function loadComments() {
    commentsList.innerHTML = "<li class='loading'>Комментарии загружаются...</li>";
    return getComments().then((comments) => {
        renderComments(comments, commentsList);
        return comments;
    });
}
loadComments().then((comments) => {
    setupLikes(comments, commentsList, commentInput, renderComments);
    setupAddComment(comments, commentsList, addButton, nameInput, commentInput, addForm, renderComments);
});