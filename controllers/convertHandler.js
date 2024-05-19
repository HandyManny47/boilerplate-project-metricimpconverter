const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

units = {
  gal: "L",
  L: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs",
};

conversionRate = {
  gal: galToL,
  L: 1 / galToL,
  mi: miToKm,
  km: 1 / miToKm,
  lbs: lbsToKg,
  kg: 1 / lbsToKg,
};

unitMapping = {
  gal: "gallons",
  L: "liters",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
};

function ConvertHandler() {
  this.getNum = function (word) {
    const englishAlphabet = /[a-zA-Z]/;
    const idx = word.split("").findIndex((char) => englishAlphabet.test(char));
    if (idx === 0) {
      return 1;
    }

    let quantityStr;
    if (idx < 0) {
      quantityStr = word.slice(0);
    } else {
      quantityStr = word.slice(0, idx);
    }

    const quantityArr = quantityStr.split("/");

    if (quantityArr.length === 1) {
      const quantity = quantityArr[0];
      if (quantity === "") return "invalid number";
      return isNaN(+quantity) ? "invalid number" : +quantity;
    }
    if (quantityArr.length === 2) {
      if (quantityArr.some((num) => num === "")) {
        return "invalid number";
      }
      const numerator = +quantityArr[0];
      const denominator = +quantityArr[1];
      return isNaN(numerator) || isNaN(denominator)
        ? "invalid number"
        : numerator / denominator;
    }

    return "invalid number";
  };

  this.getUnit = function (word) {
    const englishAlphabet = /[a-zA-Z]/;
    const idx = word.split("").findIndex((char) => englishAlphabet.test(char));
    if (idx < 0) {
      return "invalid unit";
    }
    const unit = word.slice(idx);
    return this.spellOutUnit(unit);
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit];
  };

  this.spellOutUnit = function (unit) {
    if (unit === "L" || unit === "l") return "L";
    if (units.hasOwnProperty(unit.toLowerCase())) {
      return unit.toLowerCase();
    }
    return "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    return Math.round(conversionRate[initUnit] * initNum * 1e5) / 1e5;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${unitMapping[initUnit]} converts to ${returnNum} ${unitMapping[returnUnit]}`;
  };

}

module.exports = ConvertHandler;
