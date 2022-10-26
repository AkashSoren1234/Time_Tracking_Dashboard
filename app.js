import data from "./data.json" assert { type: "json" };

let tab_values = document.querySelectorAll(".tab");
let id_values = document.querySelectorAll(".stats-section-container");
let dot_image_elements = document.querySelectorAll(".dot-image");
let stat_tabs = document.querySelectorAll(".header-tab");

stat_tabs.forEach((stat_tab) => {
  stat_tab.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("dot-image")) {
      stat_tab.style.backgroundColor = "hsl(235, 46%, 20%)";
    } else {
      stat_tab.style.backgroundColor = "hsl(235, 43%, 55%)";
    }
  });
  stat_tab.addEventListener("mouseout", (e) => {
    stat_tab.style.backgroundColor = "hsl(235, 46%, 20%)";
  });
});

tab_values.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    id_values.forEach((id_value) => {
      let filterval = data.filter(
        (x) => x.title.toLowerCase().replace(" ", "") == id_value.id
      );
      filterval = filterval[0];
      let text_target = e.target.textContent.toLowerCase();

      let curr = filterval.timeframes[text_target].current;
      let prev = filterval.timeframes[text_target].previous;
      let title = filterval.title;
      if (text_target == "daily") {
        prev = `Yesterday - ${prev}hr`;
      } else if (text_target == "weekly") {
        prev = `Last Week - ${prev}hr`;
      } else {
        prev = `Last Month - ${prev}hr`;
      }
      let title_element = id_value.querySelector(".title");
      let curr_element = id_value.querySelector(".curr-data");
      let prev_element = id_value.querySelector(".prev-data");
      title_element.textContent = title;
      if (Number(curr) < 2) {
        curr_element.textContent = `${curr}hr`;
      } else {
        curr_element.textContent = `${curr}hrs`;
      }
      prev_element.textContent = prev;
    });
  });
});
