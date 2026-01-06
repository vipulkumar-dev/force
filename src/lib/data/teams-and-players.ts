export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl: string;
  league: string;
  bgColor?: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  teamAbbreviation: string;
  position?: string;
  imageUrl: string;
  teamImageUrl: string;
  bgColor?: string;
}

export const TEAMS: Team[] = [
  {
    id: "detroit-pistons",
    name: "Detroit Pistons",
    abbreviation: "DET",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-blue-500",
  },
  {
    id: "new-york-knicks",
    name: "New York Knicks",
    abbreviation: "NYK",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-orange-500",
  },
  {
    id: "boston-celtics",
    name: "Boston Celtics",
    abbreviation: "BOS",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-green-500",
  },
  {
    id: "toronto-raptors",
    name: "Toronto Raptors",
    abbreviation: "TOR",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-red-500",
  },
  {
    id: "orlando-magic",
    name: "Orlando Magic",
    abbreviation: "ORL",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-blue-600",
  },
  {
    id: "miami-heat",
    name: "Miami Heat",
    abbreviation: "MIA",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-red-600",
  },
  {
    id: "oklahoma-city-thunder",
    name: "Oklahoma City Thunder",
    abbreviation: "OKC",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-blue-400",
  },
  {
    id: "san-antonio-spurs",
    name: "San Antonio Spurs",
    abbreviation: "SAS",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-gray-600",
  },
  {
    id: "denver-nuggets",
    name: "Denver Nuggets",
    abbreviation: "DEN",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-yellow-500",
  },
  {
    id: "houston-rockets",
    name: "Houston Rockets",
    abbreviation: "HOU",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-red-500",
  },
  {
    id: "los-angeles-lakers",
    name: "Los Angeles Lakers",
    abbreviation: "LAL",
    logoUrl: "/images/teams/lakers-logo.svg",
    league: "NBA",
    bgColor: "bg-dark-yellow",
  },
  {
    id: "minnesota-timberwolves",
    name: "Minnesota Timberwolves",
    abbreviation: "MIN",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-blue-500",
  },
  {
    id: "philadelphia-76ers",
    name: "Philadelphia 76ers",
    abbreviation: "PHI",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-blue-600",
  },
  {
    id: "cleveland-cavaliers",
    name: "Cleveland Cavaliers",
    abbreviation: "CLE",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-wine",
  },
  {
    id: "golden-state-warriors",
    name: "Golden State Warriors",
    abbreviation: "GSW",
    logoUrl: "/images/teams/warriors-logo.svg",
    league: "NBA",
    bgColor: "bg-blue-600",
  },
  {
    id: "utah-jazz",
    name: "Utah Jazz",
    abbreviation: "UTA",
    logoUrl: "/icons/leagues/nba-new.png", // Placeholder - add actual logo
    league: "NBA",
    bgColor: "bg-navy",
  },
];

export const PLAYERS: Player[] = [
  {
    id: "luka-doncic",
    name: "Luka Doncic",
    teamId: "los-angeles-lakers",
    teamName: "Los Angeles Lakers",
    teamAbbreviation: "LAL",
    position: "Guard",
    imageUrl: "/icons/athletes/luka-doncic.png",
    teamImageUrl: "/images/teams/lakers-logo.svg",
    bgColor: "bg-dark-yellow",
  },
  {
    id: "shai-gilgeous-alexander",
    name: "Shai Gilgeous Alexander",
    teamId: "oklahoma-city-thunder",
    teamName: "Oklahoma City Thunder",
    teamAbbreviation: "OKC",
    position: "Guard",
    imageUrl: "/icons/athletes/kevin-durant.png", // Placeholder - add actual image
    teamImageUrl: "/icons/leagues/nba-new.png",
    bgColor: "bg-blue-400",
  },
  {
    id: "tyrese-maxey",
    name: "Tyrese Maxey",
    teamId: "philadelphia-76ers",
    teamName: "Philadelphia 76ers",
    teamAbbreviation: "PHI",
    position: "Guard",
    imageUrl: "/icons/athletes/jayson-tatum.png", // Placeholder - add actual image
    teamImageUrl: "/icons/leagues/nba-new.png",
    bgColor: "bg-blue-600",
  },
  {
    id: "jaylen-brown",
    name: "Jaylen Brown",
    teamId: "boston-celtics",
    teamName: "Boston Celtics",
    teamAbbreviation: "BOS",
    position: "Forward",
    imageUrl: "/icons/athletes/jayson-tatum.png", // Placeholder - add actual image
    teamImageUrl: "/icons/leagues/nba-new.png",
    bgColor: "bg-green-500",
  },
  {
    id: "nikola-jokic",
    name: "Nikola Jokic",
    teamId: "denver-nuggets",
    teamName: "Denver Nuggets",
    teamAbbreviation: "DEN",
    position: "Center",
    imageUrl: "/images/players/nikola-jokic.png",
    teamImageUrl: "/icons/leagues/nba-new.png",
    bgColor: "bg-yellow-500",
  },
  {
    id: "donovan-mitchell",
    name: "Donovan Mitchell",
    teamId: "cleveland-cavaliers",
    teamName: "Cleveland Cavaliers",
    teamAbbreviation: "CLE",
    position: "Guard",
    imageUrl: "/icons/athletes/anthony-davis.png", // Placeholder - add actual image
    teamImageUrl: "/icons/leagues/nba-new.png",
    bgColor: "bg-wine",
  },
  {
    id: "jalen-brunson",
    name: "Jalen Brunson",
    teamId: "new-york-knicks",
    teamName: "New York Knicks",
    teamAbbreviation: "NYK",
    position: "Guard",
    imageUrl: "/icons/athletes/jayson-tatum.png", // Placeholder - add actual image
    teamImageUrl: "/icons/leagues/nba-new.png",
    bgColor: "bg-orange-500",
  },
  {
    id: "anthony-edwards",
    name: "Anthony Edwards",
    teamId: "minnesota-timberwolves",
    teamName: "Minnesota Timberwolves",
    teamAbbreviation: "MIN",
    position: "Guard",
    imageUrl: "/icons/athletes/kevin-durant.png", // Placeholder - add actual image
    teamImageUrl: "/icons/leagues/nba-new.png",
    bgColor: "bg-blue-500",
  },
  {
    id: "stephen-curry",
    name: "Stephen Curry",
    teamId: "golden-state-warriors",
    teamName: "Golden State Warriors",
    teamAbbreviation: "GSW",
    position: "Guard",
    imageUrl: "/icons/athletes/stephen-curry.png",
    teamImageUrl: "/images/teams/warriors-logo.svg",
    bgColor: "bg-blue-600",
  },
  {
    id: "lauri-markkanen",
    name: "Lauri Markkanen",
    teamId: "utah-jazz",
    teamName: "Utah Jazz",
    teamAbbreviation: "UTA",
    position: "Forward",
    imageUrl: "/icons/athletes/g-antetokounmpo.png", // Placeholder - add actual image
    teamImageUrl: "/icons/leagues/nba-new.png",
    bgColor: "bg-navy",
  },
];

// Helper functions
export function getTeamById(id: string): Team | undefined {
  return TEAMS.find(team => team.id === id);
}

export function getPlayerById(id: string): Player | undefined {
  return PLAYERS.find(player => player.id === id);
}

export function getPlayersByTeamId(teamId: string): Player[] {
  return PLAYERS.filter(player => player.teamId === teamId);
}

