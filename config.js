(function() {
  const config = {
    VISA: {
      cardPattern: /^4/,
      cardNumberLength: 16,
      cvv: "required",
      cvvLength: 3,
      displayText: "Visa"
    },
    MASTERCARD: {
      cardPattern: /^5[1-5]/,
      cardNumberLength: 16,
      cvv: "required",
      cvvLength: 3,
      displayText: "Master"
    },
    MAESTRO: {
      cardPattern: /^(50|63|66|5[6-8]|6[8-9]|600[0-9]|6010|601[2-9]|60[2-9]|61|620|621|6220|6221[0-1])/,
      cardNumberLength: 19,
      cvv: "optional",
      cvvLength: 4,
      displayText: "Maestro"
    }
  };
  window.config = config;
})();
