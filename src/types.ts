type period = {
    first: string;
    second: string;
}

type venue = {
    id: number;
    name: string;
    city: string;
}

type status = {
    long: string;
    short: string;
    elapsed: number;
}

type league = {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
}

type team = {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
}

type goals = {
    home: number;
    away: number;
}

type score = {
    halftime: goals;
    fulltime: goals;
    extratime: goals;
    penalty: goals;
}

type fixture = {
    id: number;
    referee: string;
    timezone: string;
    date: string;
    timestamp: number;
    periods: period;
    venue: venue;
}
type match = {
    fixture: fixture;
    status: status;
    league: league;
    teams: {
        home: team;
        away: team;
    };
    score: score;
}