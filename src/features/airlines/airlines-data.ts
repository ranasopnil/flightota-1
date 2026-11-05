export interface AirlineItem {
  id: string;
  name: string;
  iata: string;
  icao: string;
  country: string;
  hub: string;
  category: "ndc" | "lcc";
  badgeText: string;
}

export const AIRLINES_DATA: AirlineItem[] = [
  {
    "id": "emirates",
    "name": "Emirates",
    "iata": "EK",
    "icao": "UAE",
    "country": "United Arab Emirates",
    "hub": "Dubai",
    "category": "ndc",
    "badgeText": "IATA Level 4 Certified"
  },
  {
    "id": "qatar-airways",
    "name": "Qatar Airways",
    "iata": "QR",
    "icao": "QTR",
    "country": "Qatar",
    "hub": "Doha",
    "category": "ndc",
    "badgeText": "Oryx Connect NDC"
  },
  {
    "id": "singapore-airlines",
    "name": "Singapore Airlines",
    "iata": "SQ",
    "icao": "SIA",
    "country": "Singapore",
    "hub": "Singapore",
    "category": "ndc",
    "badgeText": "KrisConnect Partner"
  },
  {
    "id": "british-airways",
    "name": "British Airways",
    "iata": "BA",
    "icao": "BAW",
    "country": "United Kingdom",
    "hub": "London Heathrow",
    "category": "ndc",
    "badgeText": "IAG NDC Direct"
  },
  {
    "id": "lufthansa-group",
    "name": "Lufthansa Group",
    "iata": "LH",
    "icao": "DLH",
    "country": "Germany / Europe",
    "hub": "Frankfurt / Munich / Zurich",
    "category": "ndc",
    "badgeText": "Continuous Pricing NDC"
  },
  {
    "id": "air-france-klm",
    "name": "Air France - KLM",
    "iata": "AF",
    "icao": "AFR",
    "country": "France / Netherlands",
    "hub": "Paris CDG / Amsterdam AMS",
    "category": "ndc",
    "badgeText": "Flying Blue NDC"
  },
  {
    "id": "american-airlines",
    "name": "American Airlines",
    "iata": "AA",
    "icao": "AAL",
    "country": "United States",
    "hub": "Dallas-Fort Worth / Miami",
    "category": "ndc",
    "badgeText": "AA Direct Connect"
  },
  {
    "id": "united-airlines",
    "name": "United Airlines",
    "iata": "UA",
    "icao": "UAL",
    "country": "United States",
    "hub": "Chicago / Newark / Houston",
    "category": "ndc",
    "badgeText": "United NDC Connect"
  },
  {
    "id": "delta-air-lines",
    "name": "Delta Air Lines",
    "iata": "DL",
    "icao": "DAL",
    "country": "United States",
    "hub": "Atlanta / New York JFK",
    "category": "ndc",
    "badgeText": "Delta Digital Connect"
  },
  {
    "id": "biman-bangladesh",
    "name": "Biman Bangladesh Airlines",
    "iata": "BG",
    "icao": "BBC",
    "country": "Bangladesh",
    "hub": "Dhaka Hazrat Shahjalal",
    "category": "ndc",
    "badgeText": "Biman Direct Gateway"
  },
  {
    "id": "saudia",
    "name": "Saudia",
    "iata": "SV",
    "icao": "SVA",
    "country": "Saudi Arabia",
    "hub": "Jeddah / Riyadh",
    "category": "ndc",
    "badgeText": "Saudia NDC Direct"
  },
  {
    "id": "turkish-airlines",
    "name": "Turkish Airlines",
    "iata": "TK",
    "icao": "THY",
    "country": "Turkey",
    "hub": "Istanbul New Airport",
    "category": "ndc",
    "badgeText": "TK Connect NDC"
  },
  {
    "id": "cathay-pacific",
    "name": "Cathay Pacific",
    "iata": "CX",
    "icao": "CPA",
    "country": "Hong Kong SAR",
    "hub": "Hong Kong International",
    "category": "ndc",
    "badgeText": "Cathay Connect NDC"
  },
  {
    "id": "etihad-airways",
    "name": "Etihad Airways",
    "iata": "EY",
    "icao": "ETD",
    "country": "United Arab Emirates",
    "hub": "Abu Dhabi Zayed International",
    "category": "ndc",
    "badgeText": "Etihad NDC Pipe"
  },
  {
    "id": "qantas-airways",
    "name": "Qantas Airways",
    "iata": "QF",
    "icao": "QFA",
    "country": "Australia",
    "hub": "Sydney / Melbourne",
    "category": "ndc",
    "badgeText": "Qantas Distribution Platform"
  },
  {
    "id": "air-canada",
    "name": "Air Canada",
    "iata": "AC",
    "icao": "ACA",
    "country": "Canada",
    "hub": "Toronto / Montreal / Vancouver",
    "category": "ndc",
    "badgeText": "Air Canada NDC Direct"
  },
  {
    "id": "iberia",
    "name": "Iberia",
    "iata": "IB",
    "icao": "IBE",
    "country": "Spain",
    "hub": "Madrid Barajas",
    "category": "ndc",
    "badgeText": "IAG Iberia Connect"
  },
  {
    "id": "gulf-air",
    "name": "Gulf Air",
    "iata": "GF",
    "icao": "GFA",
    "country": "Bahrain",
    "hub": "Bahrain International",
    "category": "ndc",
    "badgeText": "Gulf Air Direct NDC"
  },
  {
    "id": "kuwait-airways",
    "name": "Kuwait Airways",
    "iata": "KU",
    "icao": "KAC",
    "country": "Kuwait",
    "hub": "Kuwait International",
    "category": "ndc",
    "badgeText": "Kuwait Airways Gateway"
  },
  {
    "id": "oman-air",
    "name": "Oman Air",
    "iata": "WY",
    "icao": "OMA",
    "country": "Oman",
    "hub": "Muscat International",
    "category": "ndc",
    "badgeText": "Oman Air NDC Direct"
  },
  {
    "id": "flydubai",
    "name": "flydubai",
    "iata": "FZ",
    "icao": "FDB",
    "country": "United Arab Emirates",
    "hub": "Dubai International",
    "category": "lcc",
    "badgeText": "Navitaire Direct API"
  },
  {
    "id": "air-arabia",
    "name": "Air Arabia",
    "iata": "G9",
    "icao": "ABY",
    "country": "United Arab Emirates",
    "hub": "Sharjah / Abu Dhabi",
    "category": "lcc",
    "badgeText": "Radixx Galaxy Connect"
  },
  {
    "id": "indigo",
    "name": "IndiGo",
    "iata": "6E",
    "icao": "IGO",
    "country": "India",
    "hub": "Delhi / Mumbai / Bengaluru",
    "category": "lcc",
    "badgeText": "Navitaire Open API"
  },
  {
    "id": "airasia",
    "name": "AirAsia",
    "iata": "AK",
    "icao": "AXM",
    "country": "Malaysia / ASEAN",
    "hub": "Kuala Lumpur (KLIA2)",
    "category": "lcc",
    "badgeText": "AirAsia Direct Pipe"
  },
  {
    "id": "scoot",
    "name": "Scoot",
    "iata": "TR",
    "icao": "TGW",
    "country": "Singapore",
    "hub": "Singapore Changi",
    "category": "lcc",
    "badgeText": "Scoot Direct Connect"
  },
  {
    "id": "us-bangla",
    "name": "US-Bangla Airlines",
    "iata": "BS",
    "icao": "UBG",
    "country": "Bangladesh",
    "hub": "Dhaka Hazrat Shahjalal",
    "category": "lcc",
    "badgeText": "Radixx Direct Connect"
  },
  {
    "id": "novoair",
    "name": "NOVOAIR",
    "iata": "VQ",
    "icao": "NVQ",
    "country": "Bangladesh",
    "hub": "Dhaka Hazrat Shahjalal",
    "category": "lcc",
    "badgeText": "Aviation Direct API"
  },
  {
    "id": "air-astra",
    "name": "Air Astra",
    "iata": "2A",
    "icao": "AWA",
    "country": "Bangladesh",
    "hub": "Dhaka Hazrat Shahjalal",
    "category": "lcc",
    "badgeText": "Air Astra REST Gateway"
  },
  {
    "id": "ryanair",
    "name": "Ryanair",
    "iata": "FR",
    "icao": "RYR",
    "country": "Ireland / Europe",
    "hub": "Dublin / London Stansted",
    "category": "lcc",
    "badgeText": "OTA Approved Direct API"
  },
  {
    "id": "easyjet",
    "name": "easyJet",
    "iata": "U2",
    "icao": "EZY",
    "country": "United Kingdom / Europe",
    "hub": "London Gatwick / Geneva",
    "category": "lcc",
    "badgeText": "easyJet Direct REST"
  },
  {
    "id": "wizz-air",
    "name": "Wizz Air",
    "iata": "W6",
    "icao": "WZZ",
    "country": "Hungary / UAE / Europe",
    "hub": "Budapest / Abu Dhabi",
    "category": "lcc",
    "badgeText": "Wizz Air Connect API"
  },
  {
    "id": "jazeera-airways",
    "name": "Jazeera Airways",
    "iata": "J9",
    "icao": "JZR",
    "country": "Kuwait",
    "hub": "Kuwait International (T5)",
    "category": "lcc",
    "badgeText": "Jazeera Direct API"
  },
  {
    "id": "flynas",
    "name": "flynas",
    "iata": "XY",
    "icao": "KNE",
    "country": "Saudi Arabia",
    "hub": "Riyadh / Jeddah",
    "category": "lcc",
    "badgeText": "flynas Direct Connect"
  },
  {
    "id": "spicejet",
    "name": "SpiceJet",
    "iata": "SG",
    "icao": "SEJ",
    "country": "India",
    "hub": "Delhi / Mumbai",
    "category": "lcc",
    "badgeText": "SpiceJet Direct API"
  },
  {
    "id": "akasa-air",
    "name": "Akasa Air",
    "iata": "QP",
    "icao": "AKJ",
    "country": "India",
    "hub": "Mumbai / Bengaluru",
    "category": "lcc",
    "badgeText": "Akasa Cloud Native API"
  },
  {
    "id": "southwest-airlines",
    "name": "Southwest Airlines",
    "iata": "WN",
    "icao": "SWA",
    "country": "United States",
    "hub": "Dallas Love Field / Chicago Midway",
    "category": "lcc",
    "badgeText": "Southwest Partner Connect"
  },
  {
    "id": "cebu-pacific",
    "name": "Cebu Pacific",
    "iata": "5J",
    "icao": "CEB",
    "country": "Philippines",
    "hub": "Manila / Cebu",
    "category": "lcc",
    "badgeText": "Cebu Direct Connect"
  },
  {
    "id": "vietjet-air",
    "name": "VietJet Air",
    "iata": "VJ",
    "icao": "VJC",
    "country": "Vietnam",
    "hub": "Hanoi / Ho Chi Minh City",
    "category": "lcc",
    "badgeText": "VietJet Direct API"
  },
  {
    "id": "pegasus-airlines",
    "name": "Pegasus Airlines",
    "iata": "PC",
    "icao": "PGT",
    "country": "Turkey",
    "hub": "Istanbul Sabiha Gökçen",
    "category": "lcc",
    "badgeText": "Pegasus Direct Connect"
  },
  {
    "id": "volotea",
    "name": "Volotea",
    "iata": "V7",
    "icao": "VOE",
    "country": "Spain / France / Italy",
    "hub": "Barcelona / Nantes / Venice",
    "category": "lcc",
    "badgeText": "Volotea Connect API"
  }
];
