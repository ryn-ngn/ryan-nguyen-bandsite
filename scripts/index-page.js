// sprint 3 addition:
import { BandSiteApi } from "./band-site-api.js";
const apiKey = "7f897f23-b5c3-4d3d-8727-e5577f22fadf";

const api = new BandSiteApi(apiKey);

let comments = await api.getComments();

comments = comments.data;

for (let comment of comments) {
  console.log(comment);
}

const cmtList = document.querySelector(".comments-list");

// helper function to add a newly created HTML element to a parent element
function addNewElementToParent(newEleType, parentEle, newEleClass, newEleContent) {
  const childElement = document.createElement(newEleType);
  childElement.classList.add(newEleClass);
  if (newEleContent) childElement.innerText = newEleContent;
  parentEle.appendChild(childElement);
}

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
    let tempField;

    // decide which key-value pair is being processed
    if (key === "name") tempField = "name";
    else if (key === "timestamp") tempField = "date";
    else if (key === "comment") tempField = "comment";

    let tempClassName = `${blockClass}__${tempField}`;

    if (tempField === "name") {
      addNewElementToParent("p", nameDate, tempClassName, comment[tempField]);
    } else if (tempField === "date") {
      const tempDate = createDate(comment[key]);
      addNewElementToParent("p", nameDate, tempClassName, tempDate);
    } else {
      addNewElementToParent("p", commentTxtCtn, tempClassName, comment[tempField]);
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
  addNewElementToParent("hr", cmtList, "comments-list__divider");

  for (const [key, comment] of Object.entries(comments)) {
    const blockClass = "comment-card__";
    const commentCard = createCommentCardContent(comment, blockClass);
    cmtList.appendChild(commentCard);
    addNewElementToParent("hr", cmtList, "comments-list__divider");
  }
}
populateCommentList();

// event listener to handle form submit/ mouse click on COMMEnT button
const commentBtn = document.querySelector(".comment-form__button");
commentBtn.addEventListener("click", (event) => {
  const userName = document.getElementById("nameInput");
  const comment = document.getElementById("commentInput");

  if (userName.value === "" || comment.value === "") return;

  const currTimeStamp = new Date().getTime();

  const newComment = {
    name: userName.value,
    timestamp: currTimeStamp,
    comment: comment.value,
  };
  comments.unshift(newComment);

  //sort comments after adding new comment:
  comments.sort((commentA, commentB) => addAvatar.timestamp - blur.timestamp);
  event.preventDefault();
  document.querySelector(".comment-form").reset();

  let currComments = document.querySelectorAll(".comment-card");
  currComments.forEach((comment) => comment.remove(comment.firstChild));

  let dividers = document.querySelectorAll(".comments-list__divider");
  dividers.forEach((divider) => divider.remove(divider.firstChild));

  populateCommentList();
});

// helper function to display date in desired format
function createDate(timestamp = null) {
  return new Date(timestamp).toLocaleDateString({
    month: "short",
    day: "short",
    year: "numeric",
  });
}
