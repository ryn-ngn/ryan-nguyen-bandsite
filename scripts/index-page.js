const comments = [
  {
    name: "Connor Walton",
    date: "02/17/2021",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    comment:
      "I feel blessed to have seen them in person. What a comment! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];
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
    else if (key === "date") tempField = "date";
    else tempField = "comment";

    tempClassName = `${blockClass}__${tempField}`;

    if (tempField === "name" || tempField === "date") {
      addNewElementToParent("p", nameDate, tempClassName, comment[tempField]);
    } else {
      addNewElementToParent("p", commentTxtCtn, tempClassName, comment[tempField]);
    }
  });

  return commentTxtCtn;
}

// helper function to comment comment card from avatar ctn and text ctn
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

  const date = new Date().toLocaleDateString({
    month: "short",
    day: "short",
    year: "numeric",
  });

  const newComment = {
    name: userName.value,
    date: date,
    comment: comment.value,
  };
  comments.unshift(newComment);
  event.preventDefault();
  document.querySelector(".comment-form").reset();

  let currComments = document.querySelectorAll(".comment-card");
  currComments.forEach((comment) => comment.remove(comment.firstChild));

  let dividers = document.querySelectorAll(".comments-list__divider");
  dividers.forEach((divider) => divider.remove(divider.firstChild));

  populateCommentList();
});
