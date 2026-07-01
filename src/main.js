import { getComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { setupLikes, setupAddComment } from "./setEventListeners.js";
const commentsList = document.querySelector(".comments");
const addButton = document.querySelector(".add-form-button");
const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
getComments().then((comments) => {
    renderComments(comments, commentsList);
    setupLikes(comments, commentsList, commentInput, renderComments);
    setupAddComment(comments, commentsList, addButton, nameInput, commentInput, renderComments);
});