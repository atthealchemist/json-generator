"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import msk from 'msk';
var moment_1 = __importDefault(require("moment"));
var countries_json_1 = __importDefault(require("../assets/countries.json"));
var airports_json_1 = __importDefault(require("../assets/airports.json"));
var firstNames_json_1 = __importDefault(require("../assets/firstNames.json"));
var surNames_json_1 = __importDefault(require("../assets/surNames.json"));
var addresses_json_1 = __importDefault(require("../assets/addresses.json"));
var phonecodes_json_1 = __importDefault(require("../assets/phonecodes.json"));
var domainzones_json_1 = __importDefault(require("../assets/domainzones.json"));
var companies_json_1 = __importDefault(require("../assets/companies.json"));
var Commands = /** @class */ (function () {
    function Commands() {
    }
    //  hideObject(): void;
    Commands.prototype.repeat = function (repeatedObject, argName, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = -1; }
        var arr = [];
        var num = 0;
        if (end > 0) {
            num = this.number(start, end);
            for (var i = 0; i <= num - 1; i++) {
                arr.push(repeatedObject);
            }
        }
        else {
            num = this.number(0, start);
            for (var i = 0; i <= num - 1; i++) {
                arr.push(repeatedObject);
            }
        }
        return arr;
    };
    Commands.prototype.index = function (start) {
        var index = 0;
        if (start) {
            index = start;
        }
        return index++;
    };
    Commands.prototype.array = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var resArr = [];
        for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
            var val = values_1[_a];
            if (val.indexOf('@') >= 0) {
                val = this[val.replace('@', '')]();
                console.log('fun', val);
                resArr.push(val);
            }
            else {
                resArr.push(val);
            }
        }
        return resArr;
    };
    Commands.prototype.price = function (cur) {
        var currencies = {
            "USD": "$",
            "EUR": "€"
        };
        return "" + this.number(0, 1000) + currencies[cur];
    };
    Commands.prototype.firstName = function () {
        var firstNames = [];
        firstNames_json_1.default.forEach(function (element) {
            firstNames.push(element);
        });
        return firstNames[this.number(0, firstNames.length - 1)];
    };
    Commands.prototype.lastName = function () {
        var surNames = [];
        surNames_json_1.default.forEach(function (element) {
            surNames.push(element);
        });
        return surNames[this.number(0, surNames.length - 1)];
    };
    Commands.prototype.surName = function () {
        return this.lastName();
    };
    Commands.prototype.fullName = function () {
        return this.firstName() + " " + this.lastName();
    };
    Commands.prototype.company = function () {
        var companies = [];
        companies_json_1.default.forEach(function (element) {
            companies.push(element.name);
        });
        return companies[this.number(0, companies.length - 1)];
    };
    Commands.prototype.countryName = function () {
        return this.country();
    };
    Commands.prototype.country = function () {
        var countryNames = [];
        countries_json_1.default.forEach(function (element) {
            countryNames.push(element.name);
        });
        return countryNames[this.number(0, countryNames.length - 1)];
    };
    Commands.prototype.cities = function () {
        var cities = [];
        addresses_json_1.default.forEach(function (element) {
            cities.push(element.city);
        });
        return cities[this.number(0, cities.length - 1)];
    };
    Commands.prototype.city = function () {
        return this.cities();
    };
    Commands.prototype.street = function () {
        return this.streetHouse();
    };
    Commands.prototype.house = function () {
        return this.streetHouse();
    };
    Commands.prototype.streetHouse = function () {
        var addresses = [];
        addresses_json_1.default.forEach(function (element) {
            addresses.push(element.address);
        });
        return addresses[this.number(0, addresses.length - 1)];
    };
    Commands.prototype.address = function () {
        return this.streetHouse();
    };
    Commands.prototype.district = function () {
        return this.state();
    };
    Commands.prototype.state = function () {
        var states = [];
        addresses_json_1.default.forEach(function (element) {
            states.push(element.state);
        });
        return states[this.number(0, states.length - 1)];
    };
    Commands.prototype.coordinate = function (comma) {
        var firstDigit = this.number(-180, 180);
        var secondDigit = this.number(0.1, 0.099999999999999999);
        return firstDigit + secondDigit;
    };
    Commands.prototype.countryCode = function () {
        var countryCodes = [];
        countries_json_1.default.forEach(function (element) {
            countryCodes.push(element.code);
        });
        return countryCodes[this.number(0, countryCodes.length - 1)];
    };
    Commands.prototype.airportName = function () {
        var airportNames = [];
        airports_json_1.default.forEach(function (element) {
            airportNames.push(element.name);
        });
        return airportNames[this.number(0, airportNames.length - 1)];
    };
    Commands.prototype.iataCode = function () {
        var airportCodes = [];
        airports_json_1.default.forEach(function (element) {
            airportCodes.push(element.code);
        });
        return airportCodes[this.number(0, airportCodes.length - 1)];
    };
    Commands.prototype.airportCode = function () {
        return this.iataCode();
    };
    Commands.prototype.languageCulture = function () {
        // let languageCultures: string[] = [];
        // languagesJson.forEach(element => {
        //   languageCultures.push(element.LangCultureName);
        // });
        // return this.random(languageCultures);
        return '';
    };
    Commands.prototype.dateTime = function (format) {
        return (format) ? moment_1.default().format(format) : moment_1.default().format("YYYY-MM-DD HH:mm:ss");
    };
    Commands.prototype.domainZone = function () {
        var domains = [];
        domainzones_json_1.default.forEach(function (element) {
            domains.push(element.domain);
        });
        return domains[this.number(0, domains.length - 1)];
    };
    Commands.prototype.website = function () {
        return "" + this.company()
            .toLowerCase()
            .replace(/[^a-z0-9]/gi, "") + this.domainZone();
    };
    Commands.prototype.email = function (user, website) {
        var resultEmail = "";
        if (user === '') {
            user = this.fullName().replace(" ", "_");
        }
        resultEmail.concat(user);
        if (website === '') {
            website = this.website();
        }
        if (website.indexOf('.') < 0) {
            website = "" + website + this.domainZone();
        }
        return user + "@" + website;
    };
    Commands.prototype.phoneCode = function () {
        var phoneCodes = [];
        phonecodes_json_1.default.forEach(function (element) {
            phoneCodes.push(element.dial_code);
        });
        return phoneCodes[this.number(0, phoneCodes.length - 1)];
    };
    Commands.prototype.phone = function (mask) {
        var phoneCode = this.phoneCode();
        var phoneFormatter = phoneCode + " (999) 999-99-99", phoneNumber;
        phoneNumber = this.number(100000000, 10000000000);
        return "" + this.phoneCode() + phoneNumber;
    };
    Commands.prototype.random = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return values[this.number(0, values.length - 1)];
    };
    Commands.prototype.boolean = function () {
        return Math.random() >= 0.5;
    };
    Commands.prototype.integer = function (low, high) {
        if (typeof low === 'string') {
            low = parseInt(low);
        }
        if (typeof high === 'string') {
            high = parseInt(high);
        }
        // Math.floor(Math.random() * (max - min)) + min;
        var num = Math.floor(Math.random() * (high - low)) + low;
        console.log("Commands.integer(" + low + ", " + high + ")", num);
        return num;
    };
    Commands.prototype.float = function (low, high) {
        if (typeof low === 'string') {
            low = parseFloat(low);
        }
        if (typeof high === 'string') {
            high = parseFloat(high);
        }
        // Math.floor(Math.random() * (max - min)) + min;
        var num = Math.floor(Math.random() * (high - low)) + low;
        console.log("Commands.float(" + low + ", " + high + ")", num);
        return num;
    };
    Commands.prototype.number = function (low, high) {
        if (low % 1 === 0 && high % 1 === 0) {
            return this.integer(low, high);
        }
        else {
            return this.float(low, high);
        }
    };
    Commands.prototype.gender = function () {
        return this.random("Male", "Female");
    };
    return Commands;
}());
exports.default = Commands;
