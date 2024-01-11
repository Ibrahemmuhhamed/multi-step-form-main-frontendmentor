const form = document.querySelector("form");
const InpustContainers = document.querySelectorAll("form > div:not(.control)");
const sideBar = document.querySelectorAll(".sidebar ul li");
const nextButton = document.querySelector("#next_step");
const backButton = document.querySelector(".back");
let summaryContainer = document.querySelector(".selection .adds");
let addContainer = "";
const timeRangeDivs = document.querySelectorAll("#time_range");
const totalPricePar = document.querySelector(".total-price .par_price");

let totalPrice = 0;
let userChosses = {};
let planInfo = {};
let timeChoosing = { range: "monthly", Abbreviation: "mo" };
// planInfo["timeChoosing"] = timeChoosing;
let targetInputsID = 0;
const addOns = {
  service: {
    title: "Online service",
    monthly: 1,
    yearly: 12,
  },
  storage: { title: "Larger Storage", monthly: 2, yearly: 20 },
  custom_profile: {
    title: "Custom Profile",
    monthly: 1,
    yearly: 20,
  },
};

let currentInputsContainer =
  document.querySelectorAll("form > div")[targetInputsID];
let currentInputs = currentInputsContainer.querySelectorAll("input");
const plansInputs = document.querySelectorAll(
  "main .plan > div:not(.time_range) input"
);
const plansContainer = document.querySelectorAll(
  "main .plan > div:not(.time_range) > div"
);
const timeRangeInputs = document.querySelectorAll(".time_range input");
backButton.style.display = "none";
backButton.addEventListener("click", () => {
  if (targetInputsID !== 2) {
    plansInputs.forEach((e) => e.removeAttribute("required"));
  }
  // summary.innerHTML = "";
  if (targetInputsID == 1) (backButton.style.display = "none"), (allow = false);
  let ele = document.querySelectorAll("form > div")[targetInputsID];
  if (ele) {
    // totalPrice = 0;
    targetInputsID--;
    displayInputs(targetInputsID);
    SideBarActiveState(targetInputsID);
    summaryContainer.innerHTML = "";
    addContainer = "";
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (targetInputsID == 0) {
    let allow = false;
    let userInfo = {};
    currentInputs.forEach((e) => {
      if (e.value == "") {
        allow = false;
        e.parentElement.classList.add("null_error");
      } else {
        if (e.id == "email") {
          // email validation
          let emailRegExp = new RegExp("(.*)@(.*).");
          if (!emailRegExp.test(e.value)) {
            allow = false;
            console.log("ddd");
            e.parentElement.classList.add("email_error");
          } else {
            allow = true;
            e.parentElement.classList.remove("email_error");
          }
        }
        e.parentElement.classList.remove("null_error");
      }
    });

    if (allow) {
      plansInputs.forEach((e) => e.setAttribute("required", true));
      currentInputs.forEach((e) => {
        userInfo[e.id] = e.value;
      });
      userChosses["UserInfo"] = userInfo;
      targetInputsID++;
      backButton.style.display = "block";
      SideBarActiveState(targetInputsID);
    }
  } else if (targetInputsID == 1) {
    plansChoose();
    targetInputsID++;
    SideBarActiveState(targetInputsID);
    let prices = document.querySelectorAll(".add-ons div .price");
    prices.forEach((e) => {
      let catgory = e.parentElement.querySelector("label").getAttribute("for");
      e.innerText = `+$${
        addOns[catgory][userChosses.planInfo.timeChoosing.range]
      }/${userChosses.planInfo.timeChoosing.Abbreviation}`;
    });
  } else if (targetInputsID == 2) {
    addOnsSection();
    targetInputsID++;
    SideBarActiveState(targetInputsID);
    totalPrice = 0;
    let prices = document.querySelectorAll(".selection .price");
    prices.forEach((e) => {
      totalPrice += +e.innerHTML.match(/\d+/)[0];
    });
    summarySection();
    total();
  } else if (targetInputsID == 3) {
    nextButton.style.display = "none";
    backButton.style.display = "none";
    targetInputsID++;
    displayInputs(targetInputsID);
  }
  if (targetInputsID !== 0) {
    console.log("dddd");
    plansInputs.forEach((e) =>
      e.getAttribute("required") ? e.removeAttribute("required") : ""
    );
  }
  currentInputsContainer =
    document.querySelectorAll("form > div")[targetInputsID];
  displayInputs(targetInputsID);
  currentInputs = currentInputsContainer.querySelectorAll("input");
});

function displayInputs(id) {
  InpustContainers.forEach((e, i) => {
    if (i == id) {
      e.style.display = "flex";
    } else {
      e.style.display = "none";
    }
  });
}
function SideBarActiveState(id) {
  sideBar.forEach((e, i) => {
    if (id == i) {
      e.classList.add("active");
    } else {
      e.classList.remove("active");
    }
  });
}
function plansChoose() {
  plansInputs.forEach((e) => {
    if (e.checked) {
      let planName = e.parentElement.querySelector("label").innerText;
      let price = e.parentElement.querySelector("#value").innerText;
      planInfo["Plan"] = planName;
      planInfo["Price"] = price;
      // totalPrice = +price;
      planInfo["timeChoosing"] = timeChoosing;
      userChosses["planInfo"] = planInfo;
    }
  });
}
let line = document.querySelector(".line");

timeRangeInputs.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.id == "yearly") {
      timeChoosing = {
        range: "yearly",
        Abbreviation: "Yr",
      };

      timeRangeDivs.forEach((e, i) => {
        e.innerText = "Yr";
        let value = e.parentElement.querySelector("#value");
        if (value) value.innerText = `${90 + i * 30}`;
      });
      // Style The Bar
      line.style.setProperty("--left", "none");
      line.style.setProperty("--right", "4px");
      plansContainer.forEach((e) => {
        e.classList.add("yearly");
      });
    } else {
      timeChoosing = {
        range: "monthly",
        Abbreviation: "mo",
      };
      timeRangeDivs.forEach((e, i) => {
        e.innerText = "mo";
        let value = e.parentElement.querySelector("#value");
        if (value) value.innerText = `${9 + i * 3}`;
      });
      plansContainer.forEach((e) => {
        e.classList.remove("yearly");
      });
      line.style.setProperty("--left", "4px");
      line.style.setProperty("--right", "none");
    }
  });
});
// addOnsSection();
function addOnsSection() {
  let inputs = document.querySelectorAll(".add-ons div input");
  let addOnsChoosed = {};
  inputs.forEach((e) => {
    if (e.checked) {
      if (!addOnsChoosed[e.id]) {
        addOnsChoosed[e.id] =
          addOns[e.id][userChosses.planInfo.timeChoosing.range];
      }
    }
  });
  userChosses["add-ons"] = addOnsChoosed;
}
function summarySection() {
  let summary = document.querySelector(".selection");
  let selectedPlan = summary.querySelector(".selected-plan p");
  let price = summary.querySelector(".price");
  selectedPlan.innerText = `${userChosses.planInfo.Plan}(${userChosses.planInfo.timeChoosing.range})`;
  price.innerHTML = `$${userChosses.planInfo.Price}/${userChosses.planInfo.timeChoosing.Abbreviation}`;
  for (i = 0; i < Object.keys(userChosses["add-ons"]).length; i++) {
    addOnsAddToSummary(
      addOns[Object.keys(userChosses["add-ons"])[i]],
      Object.keys(userChosses["add-ons"])[i]
    );
  }
}
function addOnsAddToSummary(add_ons, key) {
  let summary = document.querySelector(".selection div");
  let div = document.createElement("div");
  div.innerHTML = `
  <p>${add_ons.title}</p>
  <p class="par_price price">+$${userChosses["add-ons"][key]}/${userChosses.planInfo.timeChoosing.Abbreviation}</p>
`;
  const titlePar = document.createElement("p");
  summaryContainer.appendChild(div);
}

function total() {
  totalPrice = +userChosses.planInfo.Price;
  for ([key, value] of Object.entries(userChosses["add-ons"])) {
    totalPrice += value;
  }
  totalPricePar.innerHTML = `$${totalPrice}/${userChosses.planInfo.timeChoosing.Abbreviation}`;
}
