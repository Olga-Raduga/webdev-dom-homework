import { escapeHtml } from "./escapeHtml.js";
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
export function renderComments(comments, commentsList) {
  commentsList.innerHTML = comments
    .map(
      (comment, index) => `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${escapeHtml(comment.author.name)}</div>
          <div>${formatDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${escapeHtml(comment.text)}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
          </div>
        </div>
      </li>
    `
    )
    .join("");
}