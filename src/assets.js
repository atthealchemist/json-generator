"use strict";
exports.__esModule = true;
var countries_json_1 = require("@Assets/countries.json");
var airports_json_1 = require("@Assets/airports.json");
var cultures_json_1 = require("@Assets/cultures.json");
var firstNames_json_1 = require("@Assets/firstNames.json");
var surNames_json_1 = require("@Assets/surNames.json");
var addresses_json_1 = require("@Assets/addresses.json");
var phonecodes_json_1 = require("@Assets/phonecodes.json");
var cities_json_1 = require("@Assets/cities.json");
var zones_json_1 = require("@Assets/zones.json");
var companies_json_1 = require("@Assets/companies.json");
exports.Assets = {
    airports: airports_json_1["default"],
    firstNames: firstNames_json_1["default"],
    surNames: surNames_json_1["default"],
    countries: countries_json_1["default"],
    addresses: addresses_json_1["default"],
    phoneCodes: phonecodes_json_1["default"],
    domainZones: zones_json_1["default"],
    companies: companies_json_1["default"],
    cities: cities_json_1["default"],
    languages: cultures_json_1["default"]
};
