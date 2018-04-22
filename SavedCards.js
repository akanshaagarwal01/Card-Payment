function SavedCards() {
  this.DOMElements = {};
  this.storage = new Storage();
}
SavedCards.prototype.initDOMElements = function() {
  this.DOMElements.displayContainer = document.getElementById("savedCards");
};
SavedCards.prototype.displaySavedCards = function() {
  let storedCards = JSON.parse(this.storage.getItem("cards"));
  storedCards.forEach((card, index) => {
    this.renderCard(card, index);
  });
};
SavedCards.prototype.renderCard = function(card, index) {
  let imgSource = this.calcImageSource(card);
  let cardContainer = document.createElement("div");
  cardContainer.className = "cardContainer";
  let html = `<div class="cardTypeDisplay">
    ${card.cardType.displayText}
    </div>
    <div class="cardImageDisplay">
        <img id = "cardImg" class = "cardImg" src = "${imgSource}">
    </div>
    <div class="cardNumDisplay">
    ${card.cardNum}
    </div>
    <div class="cardEditDisplay">
        <button id= "editCard" class = "editCard"  data-action="edit">EDIT</button>
    </div>
    <div class="cardDeleteDisplay">
        <img src = "images/delete.png"  data-action="delete">
    </div>`;
  cardContainer.innerHTML = html;
  cardContainer.addEventListener("click", this.ModifyCard.bind(null, index));
  this.DOMElements.displayContainer.append(cardContainer);
};
SavedCards.prototype.editCard = function(index) {
  let editables = document.querySelectorAll(".editCard");
  for (let editable of editables) {
    editable.disabled = true;
    editable.className = "editDisabled";
  }
  let toBeEditedCard = document.getElementsByClassName("cardContainer")[index];
  toBeEditedCard.classList.add("toBeEdited");
  card = JSON.parse(this.storage.getItem("cards"))[index];
  let html = this.generateHtml(card);
  toBeEditedCard.innerHTML = html;
  month = document.getElementById("month_ed");
  year = document.getElementById("year_ed");
  let mon;
  for (let i = 1; i <= 12; i++) {
    mon = document.createElement("option");
    mon.textContent = i < 10 ? "0" + i : i;
    month.append(mon);
  }
  let curr_yr = new Date().getFullYear();
  let yr;
  for (let i = curr_yr; i <= curr_yr + 40; i++) {
    yr = document.createElement("option");
    yr.textContent = i;
    year.append(yr);
  }
  month_ed.value = card.expMonth;
  year_ed.value = card.expYear;
  toBeEditedCard.addEventListener(
    "click",
    this.confirmEdit.bind(toBeEditedCard, card, index)
  );
};
SavedCards.prototype.deleteCard = function(index) {
  let storedCards = JSON.parse(this.storage.getItem("cards"));
  storedCards.splice(index, 1);
  this.storage.setItem("cards", JSON.stringify(storedCards));
  alert("Card deleted successfully !!");
  this.DOMElements.displayContainer.innerHTML = "";
  sCard.displaySavedCards();
};
SavedCards.prototype.ModifyCard = function(index, event) {
  if (event.target.dataset.action === "edit") {
    sCard.editCard(index);
  } else if (event.target.dataset.action === "delete") {
    sCard.deleteCard(index);
  }
};

SavedCards.prototype.calcImageSource = function(card) {
  let imgSource = "";
  switch (card.cardType.displayText) {
    case "Visa":
      imgSource = "images/Visa.png";
      break;
    case "Master":
      imgSource = "images/MasterCard.png";
      break;
    case "Maestro":
      imgSource = "images/Maestro.png";
  }
  return imgSource;
};

SavedCards.prototype.generateHtml = function(card) {
  let imgSource = this.calcImageSource(card);
  let html = `<div class="cardTypeDisplay">
    ${card.cardType.displayText}
    </div>
    <div class="cardImageDisplay">
        <img id = "cardImg" class = "cardImg" src = "${imgSource}">
    </div>
    <div class="cardNumDisplay">
    <input type = "number" name= "cardNum" id = "cardNum_ed" class = "inp cardNum ed" value  = "${
      card.cardNum
    }" autofocus required>
    <br><br>
    <label>Expiry</label>
      <select name="Month" id = "month_ed" class="inp month" required>
          <option value="" disabled selected hidden>MM</option>
      </select>
      <select name="Year" id = "year_ed" class="inp year" required>
          <option value="" disabled selected hidden>YYYY</option>
      </select>
    </div>
    <div class="cardEditDisplay">
        <button id= "editCard" class = "editCard"  data-action="edit">EDIT</button>
    </div>
    <div class="doneEdit">
        <img src="images/done.png" id= "done" class = "done"  data-action="done">
    </div>
    <div class="cancelEdit">
        <img src="images/cancel.png" id= "cancel" class = "cancel"  data-action="cancel">
    </div>
    <div class="cardDeleteDisplay">
        <img src = "images/delete.png"  data-action="delete">
    </div>`;
  return html;
};

SavedCards.prototype.confirmEdit = function(card, index, event) {
  if (event.target.dataset.action === "done") {
    let modifiedCard = {
      cardNum: document.getElementById("cardNum_ed").value,
      expMonth: document.getElementById("month_ed").value,
      expYear: document.getElementById("year_ed").value
    };
    modifiedCard.cardType = edCard.findCardType(modifiedCard.cardNum);
    if (
      modifiedCard.cardType &&
      modifiedCard.cardType.cardNumberLength === modifiedCard.cardNum.length
    ) {
      let storedCards = JSON.parse(sCard.storage.getItem("cards"));
      storedCards.splice(index, 1, modifiedCard);
      sCard.storage.setItem("cards", JSON.stringify(storedCards));
      alert("Successfully saved the changes !!");
    } else {
      alert("Invalid changes !!");
    }
    this.classList.remove("toBeEdited");
    sCard.DOMElements.displayContainer.innerHTML = "";
    sCard.displaySavedCards();
  } else if (event.target.dataset.action === "cancel") {
    this.classList.remove("toBeEdited");
    sCard.DOMElements.displayContainer.innerHTML = "";
    sCard.displaySavedCards();
  }
};

let sCard = new SavedCards();
sCard.initDOMElements();
sCard.displaySavedCards();
edCard = new NewCard();
