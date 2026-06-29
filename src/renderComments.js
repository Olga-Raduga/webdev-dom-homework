import { escapeHtml } from "./escapeHtml.js";
export function renderComments(comments, commentsList) {
  commentsList.innerHTML = comments
    .map(
      (comment, index) => `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${escapeHtml(comment.author.name)}</div>
          <div>${comment.date}</div>
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