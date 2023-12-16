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

// helper function to add a newly created HTML element to a parent element
function addNewElementToParent(newEleType, parentEle, newEleClass, newEleContent) {
  const childElement = document.createElement(newEleType);
  childElement.classList.add(newEleClass);
  childElement.innerText = newEleContent;
  parentEle.appendChild(childElement);
}

// helper function to create content of a comment card
function createCommentCardContent(commentCard, comment) {
  commentCard.classList.add("comment-card");
  const blockClass = "comment-card__";

  // loop through each key-value pair of a comment object
  Object.keys(comment).forEach((key) => {
    let tempField;

    // decide which key-value pair is being processed
    if (key === "name") tempField = "name";
    else if (key === "date") tempField = "date";
    else tempField = "comment";

    // create heading for each element, add to comment card
    tempClassName = `${blockClass}heading`;
    addNewElementToParent("h3", commentCard, tempClassName, tempField);

    // create content under each heading, add to comment card
    tempClassName = `${blockClass}${tempField}`;
    addNewElementToParent("p", commentCard, tempClassName, comment[tempField]);
  });
}

const cmtList = document.querySelector(".comments-list");

// loop through each comment
for (const [key, comment] of Object.entries(comments)) {
  // create comment card div, add class name (.classList.add(""))
  const commentCard = document.createElement("div");
  createCommentCardContent(commentCard, comment);
  commentCard.appendChild(document.createElement("hr"));
  cmtList.appendChild(commentCard);
}

function addComment() {
  const userName = document.getElementById("nameInput").value;
  const comment = document.getElementById("commentInput").value;
  const date = new Date().toLocaleDateString({
    month: "short",
    day: "short",
    year: "numeric",
  });
  const newComment = {
    name: userName,
    date: date,
    comment: comment,
  };

  const commentCard = document.createElement("div");
  createCommentCardContent(commentCard, newComment);

  const separatorLine = document.querySelector(".comments-list__separator-line");

  separatorLine.after(commentCard);
  commentCard.appendChild(document.createElement("hr"));
}
