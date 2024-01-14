import { BandSiteApi } from "./band-site-api.js";
const apiKey = "7f897f23-b5c3-4d3d-8727-e5577f22fadf";

export const bandSiteApi = new BandSiteApi(apiKey);
export const cmtList = document.querySelector(".comments-list");

export function createDate(timestamp = null) {
  return new Date(timestamp).toLocaleDateString({
    month: "short",
    day: "short",
    year: "numeric",
  });
}

export function addNewElementToParent(
  newEleType,
  parentEle,
  newEleClass,
  newEleContent = null
) {
  let childElement = document.createElement(newEleType);
  childElement.classList.add(newEleClass);
  if (newEleContent) childElement.innerText = newEleContent;
  parentEle.appendChild(childElement);
}

// helper function to create avatar container
function createAvatar(blockClass) {
  const avatar = document.createElement("div");

  const img = document.createElement("img");
  img.classList.add(`${blockClass}avatar`);
  img.src = "https://placehold.co/36";
  img.alt = "placeholder for commenter's avatar";
  avatar.appendChild(img);

  return avatar;
}

// helper function to create avatar container
function createLikeInfo(likeCount, blockClass) {
  const iconCtn = document.createElement("div");
  iconCtn.classList.add(`${blockClass}__like-info`);

  const likeCtn = document.createElement("div");
  likeCtn.classList.add(`${blockClass}__like-ctn`);

  const likeNumber = document.createElement("p");
  likeNumber.innerText = likeCount;
  likeNumber.classList.add(`${blockClass}__like-count`);
  likeCtn.appendChild(likeNumber);

  const likeIcon = document.createElement("img");
  likeIcon.src = "../assets/icons/icon-like.svg";
  likeIcon.alt = "like icon";
  likeIcon.classList.add(`${blockClass}__like-icon`);
  likeCtn.appendChild(likeIcon);

  iconCtn.appendChild(likeCtn);

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "../assets/icons/icon-delete.svg";
  deleteIcon.alt = "delete icon";
  deleteIcon.classList.add(`${blockClass}__delete-like`);

  iconCtn.appendChild(deleteIcon);

  return iconCtn;
}

// helper function to create text content (name, date, comment) container
function createCommentTxtCtn(comment) {
  const blockClass = "comment-details";

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

  const likeIcon = createLikeInfo(likeCount, blockClass);
  commentTxtCtn.appendChild(likeIcon);

  return commentTxtCtn;
}

// helper function to create comment card from avatar ctn and text ctn
export function createCommentCardContent(comment, blockClass) {
  const commentCard = document.createElement("div");
  commentCard.setAttribute("id", comment.id);
  commentCard.classList.add("comment-card");
  commentCard.appendChild(createAvatar(blockClass));
  commentCard.appendChild(createCommentTxtCtn(comment));
  return commentCard;
}

export async function handleLikeClick(event) {
  const idClicked = event.target.closest(".comment-card").id;
  const likeCount = event.target.previousSibling;
  const likeResponse = await bandSiteApi.addLike(idClicked);
  likeCount.innerText = likeResponse.likes;
}

export async function handleDeleteLike(event) {
  const idClicked = event.target.closest(".comment-card").id;
  const aboveDivider = event.target.closest(".comment-card").previousSibling;
  await bandSiteApi.deleteComment(idClicked);
  cmtList.removeChild(aboveDivider);
  cmtList.removeChild(event.target.closest(".comment-card"));
}
