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

export function findMatchCommentId(id, comments) {
  for (const commentNode of comments) {
    if (id === commentNode.id) return commentNode.id;
  }
  return false;
}
