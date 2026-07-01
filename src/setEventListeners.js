import { addComment, getComments } from "./api.js";
function delay(interval = 800) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}
export function setupLikes(comments, commentsList, commentInput, renderComments) {
    commentsList.addEventListener("click", function (event) {
        const likeButton = event.target.closest(".like-button");
        if (likeButton) {
            const index = Number(likeButton.dataset.index);
            if (comments[index].isLikeLoading) return;
            comments[index].isLikeLoading = true;
            likeButton.classList.add("-loading-like");
            delay(800).then(() => {
                comments[index].likes = comments[index].isLiked
                    ? comments[index].likes - 1
                    : comments[index].likes + 1;
                comments[index].isLiked = !comments[index].isLiked;
                comments[index].isLikeLoading = false;
                renderComments(comments, commentsList);
            });
            return;
        }
        const commentCard = event.target.closest(".comment");
        if (commentCard) {
            const index = Number(commentCard.dataset.index);
            commentInput.value = "> " + comments[index].text;
        }
    });
}
export function setupAddComment(comments, commentsList, addButton, nameInput, commentInput, addForm, renderComments) {
    const addingText = document.createElement("p");
    addingText.textContent = "Комментарий добавляется...";
    addingText.style.display = "none";
    addForm.after(addingText);
    addButton.addEventListener("click", function () {
        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();
        if (name === "") { alert("Введите имя"); return; }
        if (comment === "") { alert("Введите комментарий"); return; }
        addForm.style.display = "none";
        addingText.style.display = "block";
        addComment(name, comment)
            .then(() => getComments())
            .then((newComments) => {
                comments.length = 0;
                newComments.forEach((c) => comments.push(c));
                renderComments(comments, commentsList);
                nameInput.value = "";
                commentInput.value = "";
            })
            .catch((error) => alert(error.message))
            .finally(() => {
                addForm.style.display = "";
                addingText.style.display = "none";
            });
    });
}