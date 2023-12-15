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

// loop through each shows
for (const [key, show] of Object.entries(shows)) {
  // create show card div, add class name (.classList.add(""))
  let showCard = document.createElement("div");
  showCard.classList.add("show-card");

  let blockClass = "showCard__";

  // loop through each key-value pair of a show object
  Object.keys(show).forEach((key) => {
    let tempField;

    // decide which key-value pair is being processed
    key === "dates" ? (tempField = "dates") : "";
    key === "location" ? (tempField = "location") : "";
    key === "venue" ? (tempField = "venue") : "";

    // create heading for each element, add to show card
    tempClassName = `${blockClass}heading`;
    addNewElementToParent("h3", showCard, tempClassName, tempField);

    // create content under each heading, add to show card
    tempClassName = `${blockClass}${tempField}`;
    addNewElementToParent("p", showCard, tempClassName, show[tempField]);
  });

  showsCtn.appendChild(showCard);
}
