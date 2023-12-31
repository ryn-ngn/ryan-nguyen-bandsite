const shows = [
  {
    dates: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    dates: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    dates: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    dates: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    dates: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    dates: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

const showsCtn = document.querySelector(".shows-ctn");

// helper function to add a newly created HTML element to a parent element
function addNewElementToParent(newEleType, parentEle, newEleClass, newEleContent) {
  let childElement = document.createElement(newEleType);
  childElement.classList.add(newEleClass);
  childElement.innerText = newEleContent;
  parentEle.appendChild(childElement);
}

// helper function to add separator line to show card
function addSeparatorLine() {
  const separatorLine = document.createElement("hr");
  separatorLine.classList.add("comments-list__divider");
  showsCtn.appendChild(separatorLine);
}

// loop through each shows
for (const [key, show] of Object.entries(shows)) {
  // create show card div, add class name (.classList.add(""))
  let showCard = document.createElement("div");
  showCard.classList.add("show-card");

  let blockClass = "info-group-ctn";

  // loop through each key-value pair of a show object
  Object.keys(show).forEach((key) => {
    let tempField;
    let infoGroupCtn = document.createElement("div");
    infoGroupCtn.classList.add(blockClass);

    // decide which key-value pair is being processed
    if (key === "dates") tempField = "dates";
    else if (key === "location") tempField = "location";
    else tempField = "venue";

    // create heading for each element, add to show card
    tempClassName = `${blockClass}__heading`;
    addNewElementToParent("h3", infoGroupCtn, tempClassName, tempField);

    // create content under each heading, add to show card
    tempClassName = `${blockClass}__${tempField}`;
    addNewElementToParent("p", infoGroupCtn, tempClassName, show[tempField]);
    showCard.appendChild(infoGroupCtn);
  });
  let infoGroupCtn = document.createElement("div");
  infoGroupCtn.classList.add(blockClass);
  addNewElementToParent(
    "button",
    infoGroupCtn,
    "info-group-ctn__button",
    "buy tickets"
  );
  showCard.appendChild(infoGroupCtn);
  addSeparatorLine();
  showsCtn.appendChild(showCard);
}

showsCtn.addEventListener("click", (event) => {
  let showCards = document.querySelectorAll(".show-card");
  let prevClicked = document.querySelector(".clicked");

  showCards.forEach((card) =>
    card.addEventListener("click", () => {
      prevClicked?.classList?.remove("clicked");
      card.classList.add("clicked");
    })
  );
});

function clearShowCardClick() {
  // any click on body
  // loop through
}
