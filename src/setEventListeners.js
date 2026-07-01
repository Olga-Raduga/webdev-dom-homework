import { addComment, getComments } from "./api.js";
export function setupLikes(comments, commentsList, commentInput, renderComments) {
    commentsList.addEventListener("click", function (event) {
        const likeButton = event.target.closest(".like-button");
        if (likeButton) {
            const index = Number(likeButton.dataset.index);
            comments[index].isLiked = !comments[index].isLiked;
            comments[index].likes += comments[index].isLiked ? 1 : -1;
            renderComments(comments, commentsList);
            return;
        }
        const commentCard = event.target.closest(".comment");
        if (commentCard) {
            const index = Number(commentCard.dataset.index);
            commentInput.value = "> " + comments[index].text;
        }
    });
}
export function setupAddComment(comments, commentsList, addButton, nameInput, commentInput, renderComments) {
    addButton.addEventListener("click", function () {
        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();
        if (name === "") { alert("Введите имя"); return; }
        if (comment === "") { alert("Введите комментарий"); return; }
        addComment(name, comment)
            .then(() => getComments())
            .then((newComments) => {
                comments.length = 0;
                newComments.forEach((c) => comments.push(c));
                renderComments(comments, commentsList);
                nameInput.value = "";
                commentInput.value = "";
            })
            .catch((error) => alert(error.message));
    });
}