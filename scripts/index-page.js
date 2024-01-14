// sprint 3 addition:
import { BandSiteApi } from "./band-site-api.js";
import { createDate, addNewElementToParent, findMatchCommentId } from "./helpers.js";
const apiKey = "7f897f23-b5c3-4d3d-8727-e5577f22fadf";

const api = new BandSiteApi(apiKey);

const cmtList = document.querySelector(".comments-list");

// helper function to create avatar container
function createAvatar(commentCard, blockClass) {
  const avatar = document.createElement("div");

  const img = document.createElement("img");
  img.classList.add(`${blockClass}avatar`);
  img.src = "https://placehold.co/36";
  avatar.appendChild(img);

  return avatar;
}

// helper function to create avatar container
function createLikeIcon(likeCount, blockClass) {
  const iconCtn = document.createElement("div");

  const likeNumber = document.createElement("p");
  likeNumber.innerText = likeCount;
  likeNumber.classList.add(`${blockClass}__like-count`);
  iconCtn.appendChild(likeNumber);

  const icon = document.createElement("img");
  icon.src = "../assets/icons/icon-like.svg";
  iconCtn.appendChild(icon);
  iconCtn.classList.add(`${blockClass}__like-icon`);
  return iconCtn;
}

// helper function to create text content (name, date, comment) container
function createCommentTxtCtn(comment) {
  const blockClass = "comment-text-ctn";

  const commentTxtCtn = document.createElement("div");
  commentTxtCtn.classList.add(blockClass);

  const nameDate = document.createElement("div");
  nameDate.classList.add(`${blockClass}__name-date`);
  commentTxtCtn.appendChild(nameDate);

  // loop through each key-value pair of a comment object
  Object.keys(comment).forEach((key) => {
    let tempClassName;
    tempClassName = `${blockClass}__${key}`;
    if (key === "timestamp") {
      addNewElementToParent("p", nameDate, tempClassName, createDate(comment[key]));
    } else if (key === "name" || key === "comment") {
      addNewElementToParent(
        "p",
        key === "name" ? nameDate : commentTxtCtn,
        tempClassName,
        comment[key]
      );
    }
  });

  const likeCount = comment.likes;

  const likeIcon = createLikeIcon(likeCount, blockClass);
  commentTxtCtn.appendChild(likeIcon);

  return commentTxtCtn;
}

// helper function to create comment card from avatar ctn and text ctn
function createCommentCardContent(comment, blockClass) {
  const commentCard = document.createElement("div");
  commentCard.setAttribute("id", comment.id);
  commentCard.classList.add("comment-card");
  commentCard.appendChild(createAvatar(commentCard, blockClass));
  commentCard.appendChild(createCommentTxtCtn(comment));
  return commentCard;
}

// loop through comment list, use each comment object to create new comment card
async function populateCommentList() {
  const comments = await api.getComments();

  //sort comments after adding new comment:
  comments.sort((commentA, commentB) => commentB.timestamp - commentA.timestamp);

  addNewElementToParent("hr", cmtList, "comments-list__divider");

  for (const [key, comment] of Object.entries(comments)) {
    const commentCard = createCommentCardContent(comment, "comment-card__");
    cmtList.appendChild(commentCard);
    addNewElementToParent("hr", cmtList, "comments-list__divider");
  }

  return comments;
}

// event listener to handle form submit/ mouse click on COMMEnT button
const commentBtn = document.querySelector(".comment-form__button");
commentBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const userName = document.getElementById("nameInput");
  const comment = document.getElementById("commentInput");

  if (userName.value === "" || comment.value === "") return;

  const newCommentContent = {
    name: userName.value,
    comment: comment.value,
  };

  const newCommentObj = await api.postComment(newCommentContent);

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
});

async function updateLike() {
  const likes = document.querySelectorAll(".comment-text-ctn__like-icon img");

  // 2. loop through like icon node lists, add event listener to each icon
  likes.forEach((like) =>
    like.addEventListener("click", async (event) => {
      const idClicked = event.target.closest(".comment-card").id;
      const likeCount = event.target.previousSibling;
      const likeResponse = await api.addLike(idClicked);
      likeCount.innerText = likeResponse.likes;
    })
  );
}

async function loadPage() {
  await populateCommentList();
  updateLike();
}

loadPage();
