// sprint 3 addition:
import { BandSiteApi } from "./band-site-api.js";
import { createDate, addNewElementToParent } from "./helpers.js";
const apiKey = "7f897f23-b5c3-4d3d-8727-e5577f22fadf";

const api = new BandSiteApi(apiKey);
let shows = await api.getShows();

const showsCtn = document.querySelector(".shows-ctn");

// loop through each shows
for (const [key, show] of Object.entries(shows)) {
  // create show card div, add class name (.classList.add(""))
  let showCard = document.createElement("div");
  showCard.classList.add("show-card");

  let blockClass = "info-group-ctn";

  // loop through each key-value pair of a show object
  Object.keys(show).forEach((key) => {
    if (key === "id") return;

    let infoGroupCtn = document.createElement("div");
    infoGroupCtn.classList.add(blockClass);

    // create heading for each element, add to show card
    let tempClassName = `${blockClass}__heading`;
    addNewElementToParent("h3", infoGroupCtn, tempClassName, key);

    // create content under each heading, add to show card
    tempClassName = `${blockClass}__${key}`;

    addNewElementToParent(
      "p",
      infoGroupCtn,
      tempClassName,
      key === "date" ? createDate(show[key]) : show[key]
    );

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
  addNewElementToParent("hr", showsCtn, "shows-ctn__divider");
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
