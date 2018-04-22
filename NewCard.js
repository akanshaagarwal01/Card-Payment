function NewCard(cardNum, expMonth, expYear, cvv) {
  this._cardNum = cardNum;
  this._expMonth = expMonth;
  this._expYear = expYear;
  this._cvv = cvv;
  this.DOMElements = {};
}

NewCard.prototype.renderForm = function(formId) {
  this.createFormHtml(formId);
  this.initFormElements(formId);
  this.DOMElements[`form_${formId}`].addEventListener(
    "submit",
    this.handleCardDetails
  );
  this.DOMElements[`cardNum_${formId}`].addEventListener(
    "input",
    this.formFlowHandler
  );
  month = this.DOMElements[`month_${formId}`];
  year = this.DOMElements[`year_${formId}`];
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
};

NewCard.prototype.createFormHtml = function(formId) {
  let html = `<form name="cardDetails" id="${formId}">
      <label for="cardNum">Card Number</label>
      <br/>
      <input type="text" name= "cardNum" id = "cardNum_${formId}" class="inp cardNum" tabindex="1" autofocus required>
      <br/>
      <br/>
      <label>Expiry</label>
      <br/>
      <select name="Month" id = "month_${formId}" class="inp month" tabindex="2" disabled>
          <option value="" disabled selected hidden>MM</option>
      </select>
      <select name="Year" id = "year_${formId}" class="inp year" tabindex="3" disabled>
          <option value="" disabled selected hidden>YYYY</option>
      </select>
      <input type="password" name="cvv" id = "cvv_${formId}" class="inp cvv" placeholder="CVV" tabindex="4" disabled>
      <br/>
      <br/>
      <br/>
      <input type="submit" value="SUBMIT" id = "submit_${formId}" class="inp submit disabled" tabindex="5" disabled>
  </form>
  <div id = "cardTypeDiv_${formId}" class = "cardTypeDiv">
  <img id = "cardTypeImage_${formId}" class = "cardTypeImage" src="">
  </div>`;
  this.DOMElements[formId].innerHTML = html;
};

NewCard.prototype.formFlowHandler = function() {
  let formId = this.form.id;
  if (!this.value) {
    let cardImg = document.getElementById(`cardTypeImage_${formId}`);
    cardImg.src = "";
  } else if (this.value && nCard.validateCardNum(this.value, formId)) {
    document.getElementById(`month_${formId}`).disabled = false;
    document.getElementById(`year_${formId}`).disabled = false;
    document.getElementById(`cvv_${formId}`).disabled = false;
    document.getElementById(`submit_${formId}`).disabled = false;
    document.getElementById(`submit_${formId}`).classList.remove("disabled");
  }
};

NewCard.prototype.validateCardNum = function(cardNum, formId) {
  let cardType = this.findCardType(cardNum);
  let cardImg = document.getElementById(`cardTypeImage_${formId}`);
  switch (cardType.displayText) {
    case "Visa":
      cardImg.src = "images/Visa.png";
      break;
    case "Master":
      cardImg.src = "images/MasterCard.png";
      break;
    case "Maestro":
      cardImg.src = "images/Maestro.png";
  }
  if (cardType.cardNumberLength == cardNum.length) {
    return true;
  }
};

NewCard.prototype.handleCardDetails = function() {
  if (this.validate()) {
    this.addToSaved();
  }
};

NewCard.prototype.initDOMElements = function() {
  this.DOMElements = {
    form_div: document.getElementById("addCard")
  };
};

NewCard.prototype.initFormElements = function(formId) {
  this.DOMElements[`form_${formId}`] = document.getElementById(formId);
  this.DOMElements[`cardNum_${formId}`] = document.getElementById(
    `cardNum_${formId}`
  );
  this.DOMElements[`month_${formId}`] = document.getElementById(
    `month_${formId}`
  );
  this.DOMElements[`year_${formId}`] = document.getElementById(
    `year_${formId}`
  );
};

NewCard.prototype.findCardType = function(cardNum) {
  for (let types in config) {
    if (cardNum && config[types].cardPattern.test(cardNum)) {
      return config[types];
    }
  }
};

NewCard.prototype.validate = function(cardType) {
  for (let types in config) {
    if (config[types].displayText === cardType) {
    }
  }
};

NewCard.prototype.addToSaved = function() {};

let nCard = new NewCard();
nCard.initDOMElements();
nCard.renderForm("form_div");
// console.log(typeOf(config.VISA.cardPattern.typeOf));
