import {
  addNewElementToParent,
  createCommentCardContent,
  handleLikeClick,
  handleDeleteLike,
  bandSiteApi,
  cmtList,
} from "./helpers.js";

// loop through comment list retrieved from API call
// use each comment object to create new comment card
async function populateCommentList() {
  const comments = await bandSiteApi.getComments();

  //sort comments after adding new comment:
  comments.sort((commentA, commentB) => commentB.timestamp - commentA.timestamp);

  addNewElementToParent("hr", cmtList, "comments-list__divider");

  for (const [key, comment] of Object.entries(comments)) {
    const commentCard = createCommentCardContent(comment, "comment-card__");
    cmtList.appendChild(commentCard);
    addNewElementToParent("hr", cmtList, "comments-list__divider");
  }
}

// event listener to handle form submit
const commentBtn = document.querySelector(".comment-form__button");
commentBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const userName = document.getElementById("name-input");
  const comment = document.getElementById("comment-input");

  if (userName.value === "" || comment.value === "") return;

  const newCommentContent = {
    name: userName.value,
    comment: comment.value,
  };

  const newCommentObj = await bandSiteApi.postComment(newCommentContent);

  document.querySelector(".comment-form").reset();

  // locate current top comment
  const topComment = cmtList.querySelector(".comment-card");

  // create a new comment card from comment form input and insert before current top comment
  const newCommentCard = createCommentCardContent(newCommentObj, "comment-card__");
  cmtList.insertBefore(newCommentCard, topComment);

  // add divider after newly added comment and before previous top comment
  const newDivider = document.createElement("hr");
  newDivider.classList.add("comments-list__divider");
  cmtList.insertBefore(newDivider, topComment);

  // to include newly added new comment's to likes handlers
  updateLike();
  deleteCommentHandler();
});

function updateLike() {
  const likes = document.querySelectorAll(".comment-details__like-icon");

  // 2. loop through like icon node lists, add event listener to each icon
  likes.forEach((like) => like.addEventListener("click", handleLikeClick));
}

function deleteCommentHandler() {
  const deleteIcon = document.querySelectorAll(".comment-details__delete-like");

  // 2. loop through delete icon node lists, add event listener to each icon
  deleteIcon.forEach((icon) => icon.addEventListener("click", handleDeleteLike));
}

async function loadPage() {
  await populateCommentList();
  updateLike();
  deleteCommentHandler();
}

loadPage();
