export class Helper {
  createDate(timestamp = null) {
    return new Date(timestamp).toLocaleDateString({
      month: "short",
      day: "short",
      year: "numeric",
    });
  }

  addNewElementToParent(newEleType, parentEle, newEleClass, newEleContent = null) {
    let childElement = document.createElement(newEleType);
    childElement.classList.add(newEleClass);
    if (newEleContent) childElement.innerText = newEleContent;
    parentEle.appendChild(childElement);
  }
}
