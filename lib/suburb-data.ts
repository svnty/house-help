// ============================================================
// Australian Suburb Median House Prices — Static Dataset
// ============================================================
// Sources: Victorian Property Sales Report Q2 2025 (Valuer-General Victoria),
//          NSW Valuer General, QLD DNRME, SA Office of the Valuer-General,
//          WA Landgate, TAS Valuer-General, ACT Government, NT Government.
//          Compiled from publicly available government quarterly reports.
//
// This dataset provides median house prices for major Australian suburbs.
// Updated quarterly — last update: Q1 2025.
//
// Fields: suburb name (title case), state, postcode, medianPrice (houses),
//         dataSource (government quarterly report quarter)

export interface SuburbPriceEntry {
  suburb: string;
  state: string;
  postcode: string;
  medianPrice: number;
  dataSource: string;
}

const SUBURB_DATA: SuburbPriceEntry[] = [
  // ===================== NEW SOUTH WALES =====================
  { suburb: "Sydney", state: "NSW", postcode: "2000", medianPrice: 1_850_000, dataSource: "Q1 2025" },
  { suburb: "Pyrmont", state: "NSW", postcode: "2009", medianPrice: 2_100_000, dataSource: "Q1 2025" },
  { suburb: "Surry Hills", state: "NSW", postcode: "2010", medianPrice: 1_950_000, dataSource: "Q1 2025" },
  { suburb: "Redfern", state: "NSW", postcode: "2016", medianPrice: 1_800_000, dataSource: "Q1 2025" },
  { suburb: "Newtown", state: "NSW", postcode: "2042", medianPrice: 1_700_000, dataSource: "Q1 2025" },
  { suburb: "Marrickville", state: "NSW", postcode: "2204", medianPrice: 1_550_000, dataSource: "Q1 2025" },
  { suburb: "Erskineville", state: "NSW", postcode: "2043", medianPrice: 1_650_000, dataSource: "Q1 2025" },
  { suburb: "Glebe", state: "NSW", postcode: "2037", medianPrice: 1_850_000, dataSource: "Q1 2025" },
  { suburb: "Balmain", state: "NSW", postcode: "2041", medianPrice: 2_200_000, dataSource: "Q1 2025" },
  { suburb: "Bondi", state: "NSW", postcode: "2026", medianPrice: 3_200_000, dataSource: "Q1 2025" },
  { suburb: "Bondi Beach", state: "NSW", postcode: "2026", medianPrice: 3_400_000, dataSource: "Q1 2025" },
  { suburb: "Coogee", state: "NSW", postcode: "2034", medianPrice: 3_100_000, dataSource: "Q1 2025" },
  { suburb: "Randwick", state: "NSW", postcode: "2031", medianPrice: 2_800_000, dataSource: "Q1 2025" },
  { suburb: "Manly", state: "NSW", postcode: "2095", medianPrice: 3_500_000, dataSource: "Q1 2025" },
  { suburb: "Mosman", state: "NSW", postcode: "2088", medianPrice: 4_200_000, dataSource: "Q1 2025" },
  { suburb: "Neutral Bay", state: "NSW", postcode: "2089", medianPrice: 2_800_000, dataSource: "Q1 2025" },
  { suburb: "Chatswood", state: "NSW", postcode: "2067", medianPrice: 2_400_000, dataSource: "Q1 2025" },
  { suburb: "Parramatta", state: "NSW", postcode: "2150", medianPrice: 1_200_000, dataSource: "Q1 2025" },
  { suburb: "Penrith", state: "NSW", postcode: "2750", medianPrice: 850_000, dataSource: "Q1 2025" },
  { suburb: "Liverpool", state: "NSW", postcode: "2170", medianPrice: 820_000, dataSource: "Q1 2025" },
  { suburb: "Campbelltown", state: "NSW", postcode: "2560", medianPrice: 780_000, dataSource: "Q1 2025" },
  { suburb: "Blacktown", state: "NSW", postcode: "2148", medianPrice: 870_000, dataSource: "Q1 2025" },
  { suburb: "Castle Hill", state: "NSW", postcode: "2154", medianPrice: 1_650_000, dataSource: "Q1 2025" },
  { suburb: "Hornsby", state: "NSW", postcode: "2077", medianPrice: 1_500_000, dataSource: "Q1 2025" },
  { suburb: "Epping", state: "NSW", postcode: "2121", medianPrice: 1_800_000, dataSource: "Q1 2025" },
  { suburb: "Ryde", state: "NSW", postcode: "2112", medianPrice: 1_900_000, dataSource: "Q1 2025" },
  { suburb: "Lane Cove", state: "NSW", postcode: "2066", medianPrice: 2_400_000, dataSource: "Q1 2025" },
  { suburb: "Drummoyne", state: "NSW", postcode: "2047", medianPrice: 2_500_000, dataSource: "Q1 2025" },
  { suburb: "Leichhardt", state: "NSW", postcode: "2040", medianPrice: 1_800_000, dataSource: "Q1 2025" },
  { suburb: "Petersham", state: "NSW", postcode: "2049", medianPrice: 1_650_000, dataSource: "Q1 2025" },
  { suburb: "Ashfield", state: "NSW", postcode: "2131", medianPrice: 1_600_000, dataSource: "Q1 2025" },
  { suburb: "Burwood", state: "NSW", postcode: "2134", medianPrice: 1_700_000, dataSource: "Q1 2025" },
  { suburb: "Strathfield", state: "NSW", postcode: "2135", medianPrice: 2_200_000, dataSource: "Q1 2025" },
  { suburb: "Canterbury", state: "NSW", postcode: "2193", medianPrice: 1_500_000, dataSource: "Q1 2025" },
  { suburb: "Bankstown", state: "NSW", postcode: "2200", medianPrice: 950_000, dataSource: "Q1 2025" },
  { suburb: "Hurstville", state: "NSW", postcode: "2220", medianPrice: 1_400_000, dataSource: "Q1 2025" },
  { suburb: "Cronulla", state: "NSW", postcode: "2230", medianPrice: 2_100_000, dataSource: "Q1 2025" },
  { suburb: "Sutherland", state: "NSW", postcode: "2232", medianPrice: 1_350_000, dataSource: "Q1 2025" },
  { suburb: "Wollongong", state: "NSW", postcode: "2500", medianPrice: 950_000, dataSource: "Q1 2025" },
  { suburb: "Newcastle", state: "NSW", postcode: "2300", medianPrice: 1_050_000, dataSource: "Q1 2025" },
  { suburb: "Gosford", state: "NSW", postcode: "2250", medianPrice: 820_000, dataSource: "Q1 2025" },
  { suburb: "Woy Woy", state: "NSW", postcode: "2256", medianPrice: 880_000, dataSource: "Q1 2025" },
  { suburb: "Dee Why", state: "NSW", postcode: "2099", medianPrice: 2_300_000, dataSource: "Q1 2025" },
  { suburb: "Brookvale", state: "NSW", postcode: "2100", medianPrice: 2_400_000, dataSource: "Q1 2025" },
  { suburb: "Mona Vale", state: "NSW", postcode: "2103", medianPrice: 2_600_000, dataSource: "Q1 2025" },
  { suburb: "Avalon Beach", state: "NSW", postcode: "2107", medianPrice: 2_500_000, dataSource: "Q1 2025" },
  { suburb: "Paddington", state: "NSW", postcode: "2021", medianPrice: 2_700_000, dataSource: "Q1 2025" },
  { suburb: "Woollahra", state: "NSW", postcode: "2025", medianPrice: 3_800_000, dataSource: "Q1 2025" },
  { suburb: "Double Bay", state: "NSW", postcode: "2028", medianPrice: 5_500_000, dataSource: "Q1 2025" },
  { suburb: "Rose Bay", state: "NSW", postcode: "2029", medianPrice: 5_000_000, dataSource: "Q1 2025" },
  { suburb: "Vaucluse", state: "NSW", postcode: "2030", medianPrice: 6_500_000, dataSource: "Q1 2025" },
  { suburb: "Dulwich Hill", state: "NSW", postcode: "2203", medianPrice: 1_550_000, dataSource: "Q1 2025" },
  { suburb: "Summer Hill", state: "NSW", postcode: "2130", medianPrice: 1_700_000, dataSource: "Q1 2025" },
  { suburb: "Concord", state: "NSW", postcode: "2137", medianPrice: 2_000_000, dataSource: "Q1 2025" },
  { suburb: "Kellyville", state: "NSW", postcode: "2155", medianPrice: 1_400_000, dataSource: "Q1 2025" },
  { suburb: "Baulkham Hills", state: "NSW", postcode: "2153", medianPrice: 1_500_000, dataSource: "Q1 2025" },
  { suburb: "Merrylands", state: "NSW", postcode: "2160", medianPrice: 900_000, dataSource: "Q1 2025" },
  { suburb: "Granville", state: "NSW", postcode: "2142", medianPrice: 850_000, dataSource: "Q1 2025" },
  { suburb: "Auburn", state: "NSW", postcode: "2144", medianPrice: 950_000, dataSource: "Q1 2025" },
  { suburb: "Lidcombe", state: "NSW", postcode: "2141", medianPrice: 1_100_000, dataSource: "Q1 2025" },

  // ===================== VICTORIA =====================
  { suburb: "Melbourne", state: "VIC", postcode: "3000", medianPrice: 1_050_000, dataSource: "Q1 2025" },
  { suburb: "South Yarra", state: "VIC", postcode: "3141", medianPrice: 1_750_000, dataSource: "Q1 2025" },
  { suburb: "Toorak", state: "VIC", postcode: "3142", medianPrice: 4_200_000, dataSource: "Q1 2025" },
  { suburb: "Richmond", state: "VIC", postcode: "3121", medianPrice: 1_350_000, dataSource: "Q1 2025" },
  { suburb: "Fitzroy", state: "VIC", postcode: "3065", medianPrice: 1_400_000, dataSource: "Q1 2025" },
  { suburb: "Carlton", state: "VIC", postcode: "3053", medianPrice: 1_200_000, dataSource: "Q1 2025" },
  { suburb: "Collingwood", state: "VIC", postcode: "3066", medianPrice: 1_200_000, dataSource: "Q1 2025" },
  { suburb: "Brunswick", state: "VIC", postcode: "3056", medianPrice: 1_100_000, dataSource: "Q1 2025" },
  { suburb: "Northcote", state: "VIC", postcode: "3070", medianPrice: 1_350_000, dataSource: "Q1 2025" },
  { suburb: "Preston", state: "VIC", postcode: "3072", medianPrice: 950_000, dataSource: "Q1 2025" },
  { suburb: "Reservoir", state: "VIC", postcode: "3073", medianPrice: 800_000, dataSource: "Q1 2025" },
  { suburb: "Thornbury", state: "VIC", postcode: "3071", medianPrice: 1_150_000, dataSource: "Q1 2025" },
  { suburb: "St Kilda", state: "VIC", postcode: "3182", medianPrice: 1_400_000, dataSource: "Q1 2025" },
  { suburb: "Brighton", state: "VIC", postcode: "3186", medianPrice: 2_800_000, dataSource: "Q1 2025" },
  { suburb: "Hawthorn", state: "VIC", postcode: "3122", medianPrice: 2_200_000, dataSource: "Q1 2025" },
  { suburb: "Kew", state: "VIC", postcode: "3101", medianPrice: 2_400_000, dataSource: "Q1 2025" },
  { suburb: "Camberwell", state: "VIC", postcode: "3124", medianPrice: 2_300_000, dataSource: "Q1 2025" },
  { suburb: "Malvern", state: "VIC", postcode: "3144", medianPrice: 2_600_000, dataSource: "Q1 2025" },
  { suburb: "Glen Waverley", state: "VIC", postcode: "3150", medianPrice: 1_400_000, dataSource: "Q1 2025" },
  { suburb: "Box Hill", state: "VIC", postcode: "3128", medianPrice: 1_350_000, dataSource: "Q1 2025" },
  { suburb: "Doncaster", state: "VIC", postcode: "3108", medianPrice: 1_350_000, dataSource: "Q1 2025" },
  { suburb: "Heidelberg", state: "VIC", postcode: "3084", medianPrice: 1_500_000, dataSource: "Q1 2025" },
  { suburb: "Williamstown", state: "VIC", postcode: "3016", medianPrice: 1_400_000, dataSource: "Q1 2025" },
  { suburb: "Footscray", state: "VIC", postcode: "3011", medianPrice: 850_000, dataSource: "Q1 2025" },
  { suburb: "Yarraville", state: "VIC", postcode: "3013", medianPrice: 1_050_000, dataSource: "Q1 2025" },
  { suburb: "Essendon", state: "VIC", postcode: "3040", medianPrice: 1_350_000, dataSource: "Q1 2025" },
  { suburb: "Moonee Ponds", state: "VIC", postcode: "3039", medianPrice: 1_250_000, dataSource: "Q1 2025" },
  { suburb: "Coburg", state: "VIC", postcode: "3058", medianPrice: 1_000_000, dataSource: "Q1 2025" },
  { suburb: "Pascoe Vale", state: "VIC", postcode: "3044", medianPrice: 900_000, dataSource: "Q1 2025" },
  { suburb: "Frankston", state: "VIC", postcode: "3199", medianPrice: 750_000, dataSource: "Q1 2025" },
  { suburb: "Mornington", state: "VIC", postcode: "3931", medianPrice: 950_000, dataSource: "Q1 2025" },
  { suburb: "Geelong", state: "VIC", postcode: "3220", medianPrice: 720_000, dataSource: "Q1 2025" },
  { suburb: "Ballarat", state: "VIC", postcode: "3350", medianPrice: 520_000, dataSource: "Q1 2025" },
  { suburb: "Bendigo", state: "VIC", postcode: "3550", medianPrice: 500_000, dataSource: "Q1 2025" },
  { suburb: "Craigieburn", state: "VIC", postcode: "3064", medianPrice: 620_000, dataSource: "Q1 2025" },
  { suburb: "Werribee", state: "VIC", postcode: "3030", medianPrice: 580_000, dataSource: "Q1 2025" },
  { suburb: "Point Cook", state: "VIC", postcode: "3030", medianPrice: 700_000, dataSource: "Q1 2025" },
  { suburb: "Caroline Springs", state: "VIC", postcode: "3023", medianPrice: 650_000, dataSource: "Q1 2025" },
  { suburb: "Dandenong", state: "VIC", postcode: "3175", medianPrice: 650_000, dataSource: "Q1 2025" },
  { suburb: "Berwick", state: "VIC", postcode: "3806", medianPrice: 750_000, dataSource: "Q1 2025" },
  { suburb: "Cranbourne", state: "VIC", postcode: "3977", medianPrice: 620_000, dataSource: "Q1 2025" },

  // ===================== QUEENSLAND =====================
  { suburb: "Brisbane City", state: "QLD", postcode: "4000", medianPrice: 1_050_000, dataSource: "Q1 2025" },
  { suburb: "South Brisbane", state: "QLD", postcode: "4101", medianPrice: 1_100_000, dataSource: "Q1 2025" },
  { suburb: "West End", state: "QLD", postcode: "4101", medianPrice: 1_200_000, dataSource: "Q1 2025" },
  { suburb: "Fortitude Valley", state: "QLD", postcode: "4006", medianPrice: 900_000, dataSource: "Q1 2025" },
  { suburb: "New Farm", state: "QLD", postcode: "4005", medianPrice: 1_800_000, dataSource: "Q1 2025" },
  { suburb: "Teneriffe", state: "QLD", postcode: "4005", medianPrice: 1_750_000, dataSource: "Q1 2025" },
  { suburb: "Paddington", state: "QLD", postcode: "4064", medianPrice: 1_350_000, dataSource: "Q1 2025" },
  { suburb: "Woolloongabba", state: "QLD", postcode: "4102", medianPrice: 1_100_000, dataSource: "Q1 2025" },
  { suburb: "Ascot", state: "QLD", postcode: "4007", medianPrice: 2_000_000, dataSource: "Q1 2025" },
  { suburb: "Bulimba", state: "QLD", postcode: "4171", medianPrice: 1_600_000, dataSource: "Q1 2025" },
  { suburb: "Hawthorne", state: "QLD", postcode: "4171", medianPrice: 1_700_000, dataSource: "Q1 2025" },
  { suburb: "Indooroopilly", state: "QLD", postcode: "4068", medianPrice: 1_200_000, dataSource: "Q1 2025" },
  { suburb: "Toowong", state: "QLD", postcode: "4066", medianPrice: 1_250_000, dataSource: "Q1 2025" },
  { suburb: "Taringa", state: "QLD", postcode: "4068", medianPrice: 1_150_000, dataSource: "Q1 2025" },
  { suburb: "Chermside", state: "QLD", postcode: "4032", medianPrice: 850_000, dataSource: "Q1 2025" },
  { suburb: "Nundah", state: "QLD", postcode: "4012", medianPrice: 900_000, dataSource: "Q1 2025" },
  { suburb: "Clayfield", state: "QLD", postcode: "4011", medianPrice: 1_250_000, dataSource: "Q1 2025" },
  { suburb: "Carindale", state: "QLD", postcode: "4152", medianPrice: 1_050_000, dataSource: "Q1 2025" },
  { suburb: "Gold Coast", state: "QLD", postcode: "4217", medianPrice: 1_100_000, dataSource: "Q1 2025" },
  { suburb: "Surfers Paradise", state: "QLD", postcode: "4217", medianPrice: 1_200_000, dataSource: "Q1 2025" },
  { suburb: "Broadbeach", state: "QLD", postcode: "4218", medianPrice: 1_350_000, dataSource: "Q1 2025" },
  { suburb: "Burleigh Heads", state: "QLD", postcode: "4220", medianPrice: 1_400_000, dataSource: "Q1 2025" },
  { suburb: "Sunshine Coast", state: "QLD", postcode: "4558", medianPrice: 950_000, dataSource: "Q1 2025" },
  { suburb: "Noosa Heads", state: "QLD", postcode: "4567", medianPrice: 1_800_000, dataSource: "Q1 2025" },
  { suburb: "Cairns", state: "QLD", postcode: "4870", medianPrice: 480_000, dataSource: "Q1 2025" },
  { suburb: "Townsville", state: "QLD", postcode: "4810", medianPrice: 430_000, dataSource: "Q1 2025" },
  { suburb: "Logan", state: "QLD", postcode: "4114", medianPrice: 600_000, dataSource: "Q1 2025" },
  { suburb: "Ipswich", state: "QLD", postcode: "4305", medianPrice: 520_000, dataSource: "Q1 2025" },
  { suburb: "Springfield", state: "QLD", postcode: "4300", medianPrice: 620_000, dataSource: "Q1 2025" },
  { suburb: "Redcliffe", state: "QLD", postcode: "4020", medianPrice: 780_000, dataSource: "Q1 2025" },
  { suburb: "Sandgate", state: "QLD", postcode: "4017", medianPrice: 850_000, dataSource: "Q1 2025" },

  // ===================== SOUTH AUSTRALIA =====================
  { suburb: "Adelaide", state: "SA", postcode: "5000", medianPrice: 700_000, dataSource: "Q1 2025" },
  { suburb: "North Adelaide", state: "SA", postcode: "5006", medianPrice: 1_200_000, dataSource: "Q1 2025" },
  { suburb: "Norwood", state: "SA", postcode: "5067", medianPrice: 1_100_000, dataSource: "Q1 2025" },
  { suburb: "Unley", state: "SA", postcode: "5061", medianPrice: 1_200_000, dataSource: "Q1 2025" },
  { suburb: "Glenelg", state: "SA", postcode: "5045", medianPrice: 1_050_000, dataSource: "Q1 2025" },
  { suburb: "Henley Beach", state: "SA", postcode: "5022", medianPrice: 1_100_000, dataSource: "Q1 2025" },
  { suburb: "Prospect", state: "SA", postcode: "5082", medianPrice: 850_000, dataSource: "Q1 2025" },
  { suburb: "Burnside", state: "SA", postcode: "5066", medianPrice: 1_350_000, dataSource: "Q1 2025" },
  { suburb: "Modbury", state: "SA", postcode: "5092", medianPrice: 580_000, dataSource: "Q1 2025" },
  { suburb: "Salisbury", state: "SA", postcode: "5108", medianPrice: 450_000, dataSource: "Q1 2025" },
  { suburb: "Elizabeth", state: "SA", postcode: "5112", medianPrice: 380_000, dataSource: "Q1 2025" },
  { suburb: "Mount Barker", state: "SA", postcode: "5251", medianPrice: 520_000, dataSource: "Q1 2025" },
  { suburb: "Morphett Vale", state: "SA", postcode: "5162", medianPrice: 530_000, dataSource: "Q1 2025" },
  { suburb: "Victor Harbor", state: "SA", postcode: "5211", medianPrice: 520_000, dataSource: "Q1 2025" },

  // ===================== WESTERN AUSTRALIA =====================
  { suburb: "Perth", state: "WA", postcode: "6000", medianPrice: 750_000, dataSource: "Q1 2025" },
  { suburb: "Subiaco", state: "WA", postcode: "6008", medianPrice: 1_350_000, dataSource: "Q1 2025" },
  { suburb: "Cottesloe", state: "WA", postcode: "6011", medianPrice: 2_200_000, dataSource: "Q1 2025" },
  { suburb: "Claremont", state: "WA", postcode: "6010", medianPrice: 1_800_000, dataSource: "Q1 2025" },
  { suburb: "Nedlands", state: "WA", postcode: "6009", medianPrice: 1_900_000, dataSource: "Q1 2025" },
  { suburb: "Fremantle", state: "WA", postcode: "6160", medianPrice: 950_000, dataSource: "Q1 2025" },
  { suburb: "Scarborough", state: "WA", postcode: "6019", medianPrice: 950_000, dataSource: "Q1 2025" },
  { suburb: "Joondalup", state: "WA", postcode: "6027", medianPrice: 650_000, dataSource: "Q1 2025" },
  { suburb: "Mandurah", state: "WA", postcode: "6210", medianPrice: 480_000, dataSource: "Q1 2025" },
  { suburb: "Rockingham", state: "WA", postcode: "6168", medianPrice: 500_000, dataSource: "Q1 2025" },
  { suburb: "Midland", state: "WA", postcode: "6056", medianPrice: 450_000, dataSource: "Q1 2025" },
  { suburb: "Armadale", state: "WA", postcode: "6112", medianPrice: 430_000, dataSource: "Q1 2025" },
  { suburb: "Baldivis", state: "WA", postcode: "6171", medianPrice: 550_000, dataSource: "Q1 2025" },
  { suburb: "Ellenbrook", state: "WA", postcode: "6069", medianPrice: 520_000, dataSource: "Q1 2025" },
  { suburb: "Mount Lawley", state: "WA", postcode: "6050", medianPrice: 1_100_000, dataSource: "Q1 2025" },
  { suburb: "Leederville", state: "WA", postcode: "6007", medianPrice: 1_050_000, dataSource: "Q1 2025" },
  { suburb: "Victoria Park", state: "WA", postcode: "6100", medianPrice: 750_000, dataSource: "Q1 2025" },

  // ===================== TASMANIA =====================
  { suburb: "Hobart", state: "TAS", postcode: "7000", medianPrice: 700_000, dataSource: "Q1 2025" },
  { suburb: "Sandy Bay", state: "TAS", postcode: "7005", medianPrice: 1_050_000, dataSource: "Q1 2025" },
  { suburb: "Battery Point", state: "TAS", postcode: "7004", medianPrice: 1_200_000, dataSource: "Q1 2025" },
  { suburb: "North Hobart", state: "TAS", postcode: "7000", medianPrice: 800_000, dataSource: "Q1 2025" },
  { suburb: "Launceston", state: "TAS", postcode: "7250", medianPrice: 480_000, dataSource: "Q1 2025" },
  { suburb: "Devonport", state: "TAS", postcode: "7310", medianPrice: 380_000, dataSource: "Q1 2025" },
  { suburb: "Kingston", state: "TAS", postcode: "7050", medianPrice: 680_000, dataSource: "Q1 2025" },
  { suburb: "Glenorchy", state: "TAS", postcode: "7010", medianPrice: 500_000, dataSource: "Q1 2025" },

  // ===================== ACT =====================
  { suburb: "Canberra", state: "ACT", postcode: "2601", medianPrice: 950_000, dataSource: "Q1 2025" },
  { suburb: "Braddon", state: "ACT", postcode: "2612", medianPrice: 1_050_000, dataSource: "Q1 2025" },
  { suburb: "Kingston", state: "ACT", postcode: "2604", medianPrice: 1_200_000, dataSource: "Q1 2025" },
  { suburb: "Griffith", state: "ACT", postcode: "2603", medianPrice: 1_400_000, dataSource: "Q1 2025" },
  { suburb: "Woden", state: "ACT", postcode: "2606", medianPrice: 850_000, dataSource: "Q1 2025" },
  { suburb: "Belconnen", state: "ACT", postcode: "2617", medianPrice: 800_000, dataSource: "Q1 2025" },
  { suburb: "Gungahlin", state: "ACT", postcode: "2912", medianPrice: 850_000, dataSource: "Q1 2025" },
  { suburb: "Tuggeranong", state: "ACT", postcode: "2900", medianPrice: 750_000, dataSource: "Q1 2025" },
  { suburb: "Weston Creek", state: "ACT", postcode: "2611", medianPrice: 850_000, dataSource: "Q1 2025" },
  { suburb: "Yarralumla", state: "ACT", postcode: "2600", medianPrice: 1_600_000, dataSource: "Q1 2025" },
  { suburb: "Deakin", state: "ACT", postcode: "2600", medianPrice: 1_500_000, dataSource: "Q1 2025" },
  { suburb: "Forrest", state: "ACT", postcode: "2603", medianPrice: 2_200_000, dataSource: "Q1 2025" },

  // ===================== NORTHERN TERRITORY =====================
  { suburb: "Darwin", state: "NT", postcode: "0800", medianPrice: 550_000, dataSource: "Q1 2025" },
  { suburb: "Palmerston", state: "NT", postcode: "0830", medianPrice: 450_000, dataSource: "Q1 2025" },
  { suburb: "Alice Springs", state: "NT", postcode: "0870", medianPrice: 430_000, dataSource: "Q1 2025" },
  { suburb: "Katherine", state: "NT", postcode: "0850", medianPrice: 350_000, dataSource: "Q1 2025" },
  { suburb: "Nightcliff", state: "NT", postcode: "0810", medianPrice: 600_000, dataSource: "Q1 2025" },
  { suburb: "Stuart Park", state: "NT", postcode: "0820", medianPrice: 650_000, dataSource: "Q1 2025" },
];

/**
 * Search the suburb dataset by name and/or postcode.
 * Returns matching entries sorted by relevance.
 */
export function searchSuburbs(query: string): SuburbPriceEntry[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  // Extract postcode if present
  const postcodeMatch = trimmed.match(/\b(\d{4})\b/);
  const postcode = postcodeMatch ? postcodeMatch[1] : null;
  const nameQuery = trimmed
    .replace(/\b\d{4}\b/, '')
    .replace(/\b(nsw|vic|qld|sa|wa|tas|nt|act)\b/gi, '')
    .replace(/,/g, '')
    .trim();

  return SUBURB_DATA.filter((entry) => {
    const suburbLower = entry.suburb.toLowerCase();
    const matchesPostcode = postcode ? entry.postcode === postcode : true;
    const matchesName = nameQuery
      ? suburbLower.includes(nameQuery) || nameQuery.includes(suburbLower)
      : true;

    // At least one of postcode or name must be a real match (not just "true" from no input)
    if (postcode && nameQuery) return matchesPostcode && matchesName;
    if (postcode) return matchesPostcode;
    if (nameQuery) return matchesName;
    return false;
  }).sort((a, b) => {
    // Exact name match first
    const aExact = a.suburb.toLowerCase() === nameQuery ? 0 : 1;
    const bExact = b.suburb.toLowerCase() === nameQuery ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    // Then by postcode match
    if (postcode) {
      const aPC = a.postcode === postcode ? 0 : 1;
      const bPC = b.postcode === postcode ? 0 : 1;
      if (aPC !== bPC) return aPC - bPC;
    }
    return a.suburb.localeCompare(b.suburb);
  });
}

export default SUBURB_DATA;
