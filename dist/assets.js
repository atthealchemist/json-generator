"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var countries_json_1 = __importDefault(require("@Assets/countries.json"));
var airports_json_1 = __importDefault(require("@Assets/airports.json"));
var cultures_json_1 = __importDefault(require("@Assets/cultures.json"));
var firstNames_json_1 = __importDefault(require("@Assets/firstNames.json"));
var surNames_json_1 = __importDefault(require("@Assets/surNames.json"));
var addresses_json_1 = __importDefault(require("@Assets/addresses.json"));
var phonecodes_json_1 = __importDefault(require("@Assets/phonecodes.json"));
var cities_json_1 = __importDefault(require("@Assets/cities.json"));
var domainzones_json_1 = __importDefault(require("@Assets/domainzones.json"));
var companies_json_1 = __importDefault(require("@Assets/companies.json"));
exports.Assets = {
    airports: airports_json_1.default,
    firstNames: firstNames_json_1.default,
    surNames: surNames_json_1.default,
    countries: countries_json_1.default,
    addresses: addresses_json_1.default,
    phoneCodes: phonecodes_json_1.default,
    domainZones: domainzones_json_1.default,
    companies: companies_json_1.default,
    cities: cities_json_1.default,
    languages: cultures_json_1.default
};
