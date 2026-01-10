// Athlete Data Bank - Single Source of Truth for all athletes

export interface BaseAthlete {
  id: string;
  name: string;
  image: string;
  team: string;
  abbreviation: string;
  teamId: string;
  position?: string;
  bgColor?: string;
}

// Base athlete data - this is the source of truth
// IDs must match URL slugs (name.toLowerCase().replace(/\s+/g, "-"))
export const ATHLETES_BANK: BaseAthlete[] = [
  {
    id: "lebron-james",
    name: "LeBron James",
    image: "/icons/athletes/lebron-james.png",
    team: "Los Angeles Lakers",
    abbreviation: "LAL",
    teamId: "los-angeles-lakers",
    position: "Forward",
    bgColor: "bg-dark-yellow",
  },
  {
    id: "stephen-curry",
    name: "Stephen Curry",
    image: "/icons/athletes/stephen-curry.png",
    team: "Golden State Warriors",
    abbreviation: "GSW",
    teamId: "golden-state-warriors",
    position: "Guard",
    bgColor: "bg-dark-blue",
  },
  {
    id: "kevin-durant",
    name: "Kevin Durant",
    image: "/icons/athletes/kevin-durant.png",
    team: "Phoenix Suns",
    abbreviation: "PHX",
    teamId: "phoenix-suns",
    position: "Forward",
    bgColor: "bg-dark-violet",
  },
  {
    id: "luka-doncic",
    name: "Luka Doncic",
    image: "/icons/athletes/luka-doncic.png",
    team: "Dallas Mavericks",
    abbreviation: "DAL",
    teamId: "dallas-mavericks",
    position: "Guard",
    bgColor: "bg-dark-blue",
  },
  {
    id: "jayson-tatum",
    name: "Jayson Tatum",
    image: "/icons/athletes/jayson-tatum.png",
    team: "Boston Celtics",
    abbreviation: "BOS",
    teamId: "boston-celtics",
    position: "Forward",
    bgColor: "bg-dark-yellow",
  },
  {
    id: "giannis-antetokounmpo",
    name: "Giannis Antetokounmpo",
    image: "/icons/athletes/g-antetokounmpo.png",
    team: "Milwaukee Bucks",
    abbreviation: "MIL",
    teamId: "milwaukee-bucks",
    position: "Forward",
    bgColor: "bg-forest-green",
  },
  {
    id: "anthony-davis",
    name: "Anthony Davis",
    image: "/icons/athletes/anthony-davis.png",
    team: "Los Angeles Lakers",
    abbreviation: "LAL",
    teamId: "los-angeles-lakers",
    position: "Forward-Center",
    bgColor: "bg-dark-violet",
  },
  {
    id: "jimmy-butler",
    name: "Jimmy Butler",
    image: "/icons/athletes/lebron-james.png", // placeholder
    team: "Miami Heat",
    abbreviation: "MIA",
    teamId: "miami-heat",
    position: "Forward",
    bgColor: "bg-red-600",
  },
  {
    id: "nikola-jokic",
    name: "Nikola Jokic",
    image: "/icons/athletes/g-antetokounmpo.png", // placeholder
    team: "Denver Nuggets",
    abbreviation: "DEN",
    teamId: "denver-nuggets",
    position: "Center",
    bgColor: "bg-yellow-500",
  },
  {
    id: "joel-embiid",
    name: "Joel Embiid",
    image: "/icons/athletes/anthony-davis.png", // placeholder
    team: "Philadelphia 76ers",
    abbreviation: "PHI",
    teamId: "philadelphia-76ers",
    position: "Center",
    bgColor: "bg-blue-600",
  },
  {
    id: "jaylen-brown",
    name: "Jaylen Brown",
    image: "/icons/athletes/jayson-tatum.png", // placeholder
    team: "Boston Celtics",
    abbreviation: "BOS",
    teamId: "boston-celtics",
    position: "Guard-Forward",
    bgColor: "bg-green-500",
  },
  {
    id: "devin-booker",
    name: "Devin Booker",
    image: "/icons/athletes/stephen-curry.png", // placeholder
    team: "Phoenix Suns",
    abbreviation: "PHX",
    teamId: "phoenix-suns",
    position: "Guard",
    bgColor: "bg-dark-violet",
  },
  {
    id: "kawhi-leonard",
    name: "Kawhi Leonard",
    image: "/icons/athletes/kevin-durant.png", // placeholder
    team: "LA Clippers",
    abbreviation: "LAC",
    teamId: "la-clippers",
    position: "Forward",
    bgColor: "bg-blue-500",
  },
  {
    id: "damian-lillard",
    name: "Damian Lillard",
    image: "/icons/athletes/stephen-curry.png", // placeholder
    team: "Milwaukee Bucks",
    abbreviation: "MIL",
    teamId: "milwaukee-bucks",
    position: "Guard",
    bgColor: "bg-forest-green",
  },
];

// Utility function to generate random price (between $90 and $115)
function generateRandomPrice(): string {
  const price = (Math.random() * 25 + 90).toFixed(1);
  return `$${price}`;
}

// Utility function to generate random change percentage (between -3 and +5)
function generateRandomChange(): number {
  return parseFloat((Math.random() * 8 - 3).toFixed(2));
}

// Utility function to generate random percentage (between 70 and 95)
function generateRandomPercentage(): number {
  return Math.floor(Math.random() * 25 + 70);
}

// Utility function to generate random volume
function generateRandomVolume(): string {
  const volume = (Math.random() * 500 + 200).toFixed(1);
  return `$${volume}k`;
}

// Utility function to generate random performance (between 75 and 95)
function generateRandomPerformance(): number {
  return Math.floor(Math.random() * 20 + 75);
}

// Utility function to generate random rank (between 1 and 50)
function generateRandomRank(): number {
  return Math.floor(Math.random() * 50 + 1);
}

/**
 * Get all athletes from the bank
 */
export function getAllAthletes(): BaseAthlete[] {
  return ATHLETES_BANK;
}

/**
 * Get a random athlete from the bank
 */
export function getRandomAthlete(): BaseAthlete {
  const randomIndex = Math.floor(Math.random() * ATHLETES_BANK.length);
  return ATHLETES_BANK[randomIndex];
}

/**
 * Get random athletes from the bank
 * @param count Number of athletes to return
 * @param allowDuplicates Whether to allow duplicate athletes (default: true)
 */
export function getRandomAthletes(
  count: number,
  allowDuplicates: boolean = true,
): BaseAthlete[] {
  if (allowDuplicates) {
    return Array.from({ length: count }, () => getRandomAthlete());
  } else {
    const shuffled = [...ATHLETES_BANK].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, ATHLETES_BANK.length));
  }
}

/**
 * Get an athlete by ID
 */
export function getAthleteById(id: string): BaseAthlete | undefined {
  return ATHLETES_BANK.find((athlete) => athlete.id === id);
}

/**
 * Get athletes by team ID
 */
export function getAthletesByTeamId(teamId: string): BaseAthlete[] {
  return ATHLETES_BANK.filter((athlete) => athlete.teamId === teamId);
}

/**
 * Extended athlete data with dynamic fields (for trending/price charts)
 */
export interface ExtendedAthleteData extends BaseAthlete {
  price: string;
  change: number;
  percentage: number;
  volume?: string;
  volumeChange?: number;
  performance?: number;
  rank?: number;
}

/**
 * Generate extended athlete data with random dynamic values
 */
export function generateExtendedAthleteData(
  athlete: BaseAthlete,
): ExtendedAthleteData {
  return {
    ...athlete,
    price: generateRandomPrice(),
    change: generateRandomChange(),
    percentage: generateRandomPercentage(),
    volume: generateRandomVolume(),
    volumeChange: generateRandomChange(),
    performance: generateRandomPerformance(),
    rank: generateRandomRank(),
  };
}

/**
 * Get random extended athlete data
 * @param count Number of athletes to return
 * @param allowDuplicates Whether to allow duplicate athletes (default: true)
 */
export function getRandomExtendedAthletes(
  count: number,
  allowDuplicates: boolean = true,
): ExtendedAthleteData[] {
  const athletes = getRandomAthletes(count, allowDuplicates);
  return athletes.map(generateExtendedAthleteData);
}

/**
 * Get extended athlete data by ID
 */
export function getExtendedAthleteById(
  id: string,
): ExtendedAthleteData | undefined {
  const athlete = getAthleteById(id);
  return athlete ? generateExtendedAthleteData(athlete) : undefined;
}

/**
 * Simple athlete data for cards (name, image, abbreviation, price, change, percentage)
 */
export interface SimpleAthleteData {
  id: string;
  name: string;
  image: string;
  abbreviation: string;
  price: string;
  change: number;
  percentage: number;
}

/**
 * Generate simple athlete data for cards
 */
export function generateSimpleAthleteData(
  athlete: BaseAthlete,
): SimpleAthleteData {
  return {
    id: athlete.id,
    name: athlete.name,
    image: athlete.image,
    abbreviation: athlete.abbreviation,
    price: generateRandomPrice(),
    change: generateRandomChange(),
    percentage: generateRandomPercentage(),
  };
}

/**
 * Get random simple athlete data for cards
 * @param count Number of athletes to return
 * @param allowDuplicates Whether to allow duplicate athletes (default: true)
 */
export function getRandomSimpleAthletes(
  count: number,
  allowDuplicates: boolean = true,
): SimpleAthleteData[] {
  const athletes = getRandomAthletes(count, allowDuplicates);
  return athletes.map(generateSimpleAthleteData);
}
