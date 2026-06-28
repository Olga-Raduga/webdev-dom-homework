export function setupLikes(comments, commentsList, commentInput, renderComments) {
    commentsList.addEventListener("click", function (event) {
        const likeButton = event.target.closest(".like-button");
        if (likeButton) {
            const index = Number(likeButton.dataset.index);
            comments[index].isLiked = !comments[index].isLiked;
            comments[index].likesCount += comments[index].isLiked ? 1 : -1;
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
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = String(now.getFullYear()).slice(2);
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        comments.push({
            name,
            date: `${day}.${month}.${year} ${hours}:${minutes}`,
            text: comment,
            likesCount: 0,
            isLiked: false,
        });
        renderComments(comments, commentsList);
        nameInput.value = "";
        commentInput.value = "";
    });
}