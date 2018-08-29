// import msk from 'msk';
import { DateTime } from 'date-time-js';


export default class Commands {
  //  hideObject(): void;

  repeat(repeatedObject: any, argName: string, start: number = 0, end: number = -1) {
    let arr = [];
    let num = 0;

    if(end > 0) {
      num = this.number(start, end);
      for (let i = 0; i <= num - 1; i++) {
        arr.push(repeatedObject);
      }
    } else {
      num = this.number(0, start);
      for (let i = 0; i <= num - 1; i++) {
        arr.push(repeatedObject);
      }
    }
    
    return arr;
  }

  index(start?: number): number {
    let index: number = 0;
    if (start) {
      index = start;
    }
    return index++;
  }

  array(...values): any[] {
    let resArr = [];
    for (let val of values) {
      if(val.indexOf('@') >= 0) {
        val = this[val.replace('@','')]();
        console.log('fun', val);
        resArr.push(val);
      } else {
        resArr.push(val);
      }
    }
    return resArr;
  }

  price(cur: string): string {

    let currencies = {
      "USD": "$",
      "EUR": "€"
    }

    return `${this.number(0, 1000)}${currencies[cur]}`;
  }

  firstName(): string {
    let firstNames: string[] = [];

    Assets.firstNamesJson.forEach(element => {
      firstNames.push(element);
    });

    return firstNames[this.number(0, firstNames.length - 1)];
  }

  lastName(): string {
    let surNames: string[] = [];

    Assets.surNamesJson.forEach(element => {
      surNames.push(element);
    });

    return surNames[this.number(0, surNames.length - 1)];
  }

  surName(): string {
    return this.lastName();
  }

  fullName(): string {
    return `${this.firstName()} ${this.lastName()}`;
  }

  company(): string {
    let companies: string[] = [];

    Assets.companiesJson.forEach(element => {
      companies.push(element);
    });

    return companies[this.number(0, companies.length - 1)];
  }

  countryName(): string {
    return this.country();
  }

  country(): string {
    let countryNames: string[] = [];

    Assets.countriesJson.forEach(element => {
      countryNames.push(element.name);
    });

    return countryNames[this.number(0, countryNames.length - 1)];
  }

  cities(): string {
    let cities: string[] = [];

    Assets.addressJson.forEach(element => {
      cities.push(element.city);
    });

    return cities[this.number(0, cities.length - 1)];
  }

  city(): string {
    return this.cities();
  }

  street(): string {
    return this.streetHouse();
  }

  house(): string {
    return this.streetHouse();
  }

  streetHouse(): string {
    let addresses: string[] = [];

    Assets.addressJson.forEach(element => {
      addresses.push(element.address);
    });

    return addresses[this.number(0, addresses.length - 1)];
  }

  address(): string {
    return this.streetHouse();
  }

  district(): string {
    return this.state();
  }

  state(): string {
    let states: string[] = [];

    Assets.addressJson.forEach(element => {
      states.push(element.state);
    });

    return states[this.number(0, states.length - 1)];
  }

  coordinate(comma?: number): number {
    
    let firstDigit = this.number(-180, 180);
    let secondDigit = this.number(0.1, 0.099999999999999999);

    return firstDigit + secondDigit;
  }

  countryCode(): string {
    let countryCodes: string[] = [];

    Assets.countriesJson.forEach(element => {
      countryCodes.push(element.code);
    });

    return countryCodes[this.number(0, countryCodes.length - 1)];
  }

  airportName(): string {
    let airportNames: string[] = [];

    Assets.airportsJson.forEach(element => {
      airportNames.push(element.name);
    });

    return airportNames[this.number(0, airportNames.length - 1)];
  }

  iataCode(): string {
    let airportCodes: string[] = [];

    Assets.airportsJson.forEach(element => {
      airportCodes.push(element.code);
    });

    return airportCodes[this.number(0, airportCodes.length - 1)];
  }

  airportCode(): string {
    return this.iataCode();
  }

  languageCulture(): string {
    // let languageCultures: string[] = [];

    // languagesJson.forEach(element => {
    //   languageCultures.push(element.LangCultureName);
    // });

    // return this.random(languageCultures);
    return '';
  }

  dateTime(format?: string): string {
      return (format) ? new DateTime(2018, 0, 1).format(format) : new DateTime(2018, 0, 1).format("YYYY-MM-DD HH:mm:ss");
  }

  domainZone(): string {
    let domains: string[] = [];

    domainZoneJson.forEach(element => {
      domains.push(element);
    });

    return domains[this.number(0, domains.length - 1)];
  }

  website(): string {
    return `${this.company()
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "")}${this.domainZone()}`;
  }

  email(user?: string, website?: string): string {
    let resultEmail = "";

    if (user === '') {
      user = this.fullName().replace(" ", "_");
    }

    resultEmail.concat(user);

    if (website === '') {
      website = this.website();
    }

    if(website.indexOf('.') < 0) {
      website = `${website}${this.domainZone()}`;
    }

    return `${user}@${website}`;
  }

  private phoneCode() {
    let phoneCodes: string[] = [];

    phoneCodesJson.forEach(element => {
      phoneCodes.push(element);
    });

    return phoneCodes[this.number(0, phoneCodes.length - 1)];
  }

   phone(mask?: string): string {

    let phoneCode = this.phoneCode();

    let phoneFormatter: string = phoneCode + " (999) 999-99-99",
    phoneNumber: any;

    phoneNumber = this.number(100000000, 10000000000);
    return `${this.phoneCode()}${phoneNumber}`;
  }

  random(...values: any[]) {
    return values[this.number(0, values.length - 1)];
  }

  boolean(): boolean {
    return Math.random() >= 0.5;
  }

  integer(low: number, high: number): number {
    if(typeof low === 'string') {
      low = parseInt(low);
    }
    if(typeof high === 'string') {
      high = parseInt(high);
    }
    // Math.floor(Math.random() * (max - min)) + min;
    let num: number = Math.floor(Math.random() * (high - low)) + low;
    console.log(`Commands.integer(${low}, ${high})`, num);
    return num;
  }

  float(low: number, high: number): number {
    if(typeof low === 'string') {
      low = parseFloat(low);
    }
    if(typeof high === 'string') {
      high = parseFloat(high);
    }
    // Math.floor(Math.random() * (max - min)) + min;
    let num: number = Math.floor(Math.random() * (high - low)) + low;
    console.log(`Commands.float(${low}, ${high})`, num);
    return num;
  }

  number(low: number, high: number): number {
    if(low % 1 === 0 && high % 1 === 0) {
      return this.integer(low, high);
    } else {
      return this.float(low, high);
    }
  }

  gender(): any {
    return this.random("Male", "Female");
  }
}
