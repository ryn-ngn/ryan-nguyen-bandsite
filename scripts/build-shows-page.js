// sprint 3 addition:
import { BandSiteApi } from "./band-site-api.js";
import { Helper } from "./helpers.js";
const apiKey = "7f897f23-b5c3-4d3d-8727-e5577f22fadf";

const helper = new Helper();
const api = new BandSiteApi(apiKey);
let shows = await api.getShows();
shows = shows.data;
for (let show of shows) {
  console.log(show);
}

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
    helper.addNewElementToParent("h3", infoGroupCtn, tempClassName, key);

    // create content under each heading, add to show card
    tempClassName = `${blockClass}__${key}`;

    helper.addNewElementToParent(
      "p",
      infoGroupCtn,
      tempClassName,
      key === "date" ? helper.createDate(show[key]) : show[key]
    );

    showCard.appendChild(infoGroupCtn);
  });

  let infoGroupCtn = document.createElement("div");
  infoGroupCtn.classList.add(blockClass);
  helper.addNewElementToParent(
    "button",
    infoGroupCtn,
    "info-group-ctn__button",
    "buy tickets"
  );
  showCard.appendChild(infoGroupCtn);
  helper.addNewElementToParent("hr", showsCtn, "shows-ctn__divider");
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
