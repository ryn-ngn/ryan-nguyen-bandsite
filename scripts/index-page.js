// sprint 3 addition:
import { BandSiteApi } from "./band-site-api.js";
import { Helper } from "./helpers.js";
const apiKey = "7f897f23-b5c3-4d3d-8727-e5577f22fadf";

const api = new BandSiteApi(apiKey);
const helper = new Helper();

let comments = await api.getComments();

comments = comments.data;
for (let comment of comments) {
  console.log(comment);
}

const cmtList = document.querySelector(".comments-list");

// helper function to create avatar container
function addAvatar(commentCard, blockClass) {
  const avatar = document.createElement("div");

  const img = document.createElement("img");
  img.classList.add(`${blockClass}avatar`);
  img.src = "https://placehold.co/36";
  avatar.appendChild(img);

  return avatar;
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
    console.log("*** here ***:", key);
    let tempClassName;
    tempClassName = `${blockClass}__${key}`;

    if (key === "timestamp") {
      helper.addNewElementToParent(
        "p",
        nameDate,
        tempClassName,
        helper.createDate(comment[key])
      );
    } else if (key === "name" || key === "comment") {
      helper.addNewElementToParent(
        "p",
        key === "name" ? nameDate : commentTxtCtn,
        tempClassName,
        comment[key]
      );
    }
  });

  return commentTxtCtn;
}

// helper function to create comment card from avatar ctn and text ctn
function createCommentCardContent(comment, blockClass) {
  const commentCard = document.createElement("div");

  commentCard.classList.add("comment-card");
  const avatarCtn = addAvatar(commentCard, blockClass);
  commentCard.appendChild(avatarCtn);

  const commentTxtCtn = createCommentTxtCtn(comment);
  commentCard.appendChild(commentTxtCtn);
  return commentCard;
}

// loop through comment list, use each comment object to create new comment card
function populateCommentList() {
  //sort comments after adding new comment:
  comments.sort((commentA, commentB) => commentB.timestamp - commentA.timestamp);

  helper.addNewElementToParent("hr", cmtList, "comments-list__divider");

  for (const [key, comment] of Object.entries(comments)) {
    const blockClass = "comment-card__";
    const commentCard = createCommentCardContent(comment, blockClass);
    cmtList.appendChild(commentCard);
    helper.addNewElementToParent("hr", cmtList, "comments-list__divider");
  }
}
populateCommentList();

// event listener to handle form submit/ mouse click on COMMEnT button
const commentBtn = document.querySelector(".comment-form__button");
commentBtn.addEventListener("click", async (event) => {
  const userName = document.getElementById("nameInput");
  const comment = document.getElementById("commentInput");

  if (userName.value === "" || comment.value === "") return;

  const newComment = {
    name: userName.value,
    comment: comment.value,
  };

  const response = await api.postComment(newComment);

  event.preventDefault();
  document.querySelector(".comment-form").reset();

  populateCommentList();
});
