// Holds and short and long names for teams
class Pair{
    constructor(name, shortName){
      this.name = name;
      this.shortName = shortName
    }
  }

  // Set Team names
  let teamNames = [];
  teamNames.push(new Pair("Philadelphia Eagles", "PHI")); //1
  teamNames.push(new Pair("Dallas Cowboys", "DAL")); //2
  teamNames.push(new Pair("Los Angeles Chargers", "LAC")); //3
  teamNames.push(new Pair("Kansas City Chiefs", "KC")); //4
  teamNames.push(new Pair("Atlanta Falcons", "ATL")); //5
  teamNames.push(new Pair("Tampa Bay Buccaneers", "TB")); //6
  teamNames.push(new Pair("Cleveland Browns", "CLE")); //7
  teamNames.push(new Pair("Cincinnati Bengals", "CIN")); //8
  teamNames.push(new Pair("Indianapolis Colts", "IND")); //9
  teamNames.push(new Pair("Miami Dolphins", "MIA")); //10
  teamNames.push(new Pair("New England Patriots", "NE")); //11
  teamNames.push(new Pair("Las Vegas Raiders", "LV")); //12
  teamNames.push(new Pair("New Orleans Saints", "NO")); //13
  teamNames.push(new Pair("Arizona Cardinals", "ARI")); //14
  teamNames.push(new Pair("New York Jets", "NYJ")); //15
  teamNames.push(new Pair("Pittsburgh Steelers", "PIT")); //16
  teamNames.push(new Pair("Washington Commanders", "WAS")); //17
  teamNames.push(new Pair("New York Giants", "NYG")); //18
  teamNames.push(new Pair("Jacksonville Jaguars", "JAX")); //19
  teamNames.push(new Pair("Carolina Panthers", "CAR")); //20
  teamNames.push(new Pair("Denver Broncos", "DEN")); //21
  teamNames.push(new Pair("Tennessee Titans", "TEN")); //22
  teamNames.push(new Pair("Seattle Seahawks", "SEA")); //23
  teamNames.push(new Pair("San Francisco 49ers", "SF")); //24
  teamNames.push(new Pair("Green Bay Packers", "GB")); //25
  teamNames.push(new Pair("Detroit Lions", "DET")); //26
  teamNames.push(new Pair("Los Angeles Rams", "LAR")); //27
  teamNames.push(new Pair("Houston Texans", "HOU")); //28
  teamNames.push(new Pair("Buffalo Bills", "BUF")); //29
  teamNames.push(new Pair("Baltimore Ravens", "BAL")); //30
  teamNames.push(new Pair("Chicago Bears", "CHI")); //31
  teamNames.push(new Pair("Minnesota Vikings", "MIN")); //32

  
  function GetShortName(name) {
    const match = teamNames.find(n => n.name === name);
    return match ? match.shortName : null;
  }
  

  class Team{
    constructor(name, shortName, wins, losses, ties)
    {
      this.name = name;
      this.shortName = shortName;
      this.wins = wins;
      this.losses = losses;
      this.ties = ties;

      this.getPngImageDirectory();
    }

    getName() {
      return this.name;
    }

    getPngImageDirectory()
    {
        this.pngImageName = "Images/" + this.shortName + ".png";
    }

    IsTeam(teamname){
      return teamname == this.name || teamname == this.shortName;
    }
  }

  // Fill Teamarray
  let TeamArray = [];
  teamNames.forEach(pair => {
    TeamArray.push(new Team(pair.name, pair.shortName, 0, 0, 0));
  });

  class Game
  {
    constructor(home, away){
        this.away = away;
        this.home = home;

        this.awayOdds = 1.00;
        this.homeOdds = 1.00;

        // We use the odds to calculate the value of the picks
        // The favorite will always be 1 and the underdog will be relative to that
        this.awayValue = 1.00;
        this.homeValue = 1.00;

        this.awayScore = 0;
        this.homeScore = 0;

        this.gameName = 0;

        this.homeFavorite = true;
    }

    SetGameName(gameName){
      this.gameName = gameName;
    }

    SetScore(homeScore, awayScore){
      this.homeScore = homeScore;
      this.awayScore = awayScore;
      Number()
    }

    SetOdds(homeOdds, awayOdds){

      console.log("Start SetOdds??????????????????????????");
      console.log("per homeOdds:");
      console.log(homeOdds);
      console.log("per awayOdds");
      console.log(awayOdds);
      this.homeOdds = homeOdds;
      this.awayOdds = awayOdds;

      console.log("this.homeOdds:");
      console.log(this.homeOdds)
      console.log("this.awayOdds:");
      console.log(this.awayOdds);

      this.homeFavorite = this.homeOdds < this.awayOdds ? true : false;

      this.homeValue = Number(this.homeOdds);
      this.awayValue = Number(this.awayOdds);

      // Calc value for home team
      if(this.homeValue < 0){
        let MoneyBet = this.homeValue;
        let MoneyWinnings = 100;
        this.homeValue = MoneyBet / MoneyWinnings
      }
      else{
        let MoneyBet = 100;
        let MoneyWinnings = this.homeValue;
        this.homeValue = MoneyBet / MoneyWinnings
      }

      // Calc value for away team
      if(this.awayValue < 0){
        let MoneyBet = this.awayValue;
        let MoneyWinnings = 100;
        this.awayValue = MoneyBet / MoneyWinnings
      }
      else{
        let MoneyBet = 100;
        let MoneyWinnings = this.awayValue;
        this.awayValue = MoneyBet / MoneyWinnings
      }

      // Make favored team's value to one and adjust underdog relative to that
      let valDifference = this.homeFavorite ? this.homeValue - 1 : this.awayValue - 1
      if(valDifference < 0){
        // We need to add to both
        this.homeValue += Math.abs(valDifference);
        this.awayValue += Math.abs(valDifference);
      }
      if(valDifference > 0){
        // We need to subtract both
        this.homeValue -= valDifference;
        this.awayValue -= valDifference;
      }
      console.log("End SetOdds??????????????????????????");
    }

    // Get the value of the home team and away team. Not the original odds
    GetPickValues(homeVal, awayVal){
      homeVal = this.homeValue;
      awayVal = this.awayValue;
    }

    GetScore(homeScore, awayScore){
      homeScore = this.awayScore;
      awayScore = this.awayScore;
    }

    GetWinnerTeamName(){
      if (this.homeScore == this.awayScore){
        return "No Winner";
      }

      return this.awayScore > this.homeScore ? this.away.name : this.home.name
    }

    GetWinner(){
      if (this.homeScore == this.awayScore){
        return undefined;
      }

      return this.awayScore > this.homeScore ? this.away : this.home
    }

    GetTeamValue(teamname){
      if(teamname == this.home.name)
        return this.homeValue;
      if(teamname == this.away.name)
        return this.awayValue;
      
      return 0;
    }

    IsGame(teamname){
      return this.home.IsTeam(teamname) || this.away.IsTeam(teamname);
    }

    IsWinner(teamname){
      const winner = this.GetWinner();
      if(winner == undefined)
        return false;

      return winner.IsTeam(teamname);
    }
  }

  class Week
  {
    constructor (week){
        this.week = week;
        this.games = [];
    }

    AddGame(home, away) {
        this.games.push(new Game(home, away));
    }

    GetWinners(array){
      let count = 0;
      let value = 0;
      array.forEach(name =>{

        const game = this.games.find(game=>{game.IsGame(name)});
        if(game == undefined)
        {
          console.log("Could not find game for team " + name);
          return {wins: count, points: value};
        }

        if(game.IsWinner(name))
        {
          count++;
          value += game.GetTeamValue(name);
        }
      });

      return {wins: count, points: value};
    }
  }

  class Season
  {
    constructor()
    {
        this.weeks = [];
    }
    AddWeek(week){
        this.weeks.push(week);
    }
  }

  let NFLteams = [];
  // Team objects
  let PHI = new Team("Philadelphia Eagles", "PHI", 0, 0, 0);
NFLteams.push(PHI);
let DAL = new Team("Dallas Cowboys", "DAL", 0, 0, 0);
NFLteams.push(DAL);
let LAC = new Team("Los Angeles Chargers", "LAC", 0, 0, 0);
NFLteams.push(LAC);
let KC = new Team("Kansas City Chiefs", "KC", 0, 0, 0);
NFLteams.push(KC);
let ATL = new Team("Atlanta Falcons", "ATL", 0, 0, 0);
NFLteams.push(ATL);
let TB = new Team("Tampa Bay Buccaneers", "TB", 0, 0, 0);
NFLteams.push(TB);
let CLE = new Team("Cleveland Browns", "CLE", 0, 0, 0);
NFLteams.push(CLE);
let CIN = new Team("Cincinnati Bengals", "CIN", 0, 0, 0);
NFLteams.push(CIN);
let IND = new Team("Indianapolis Colts", "IND", 0, 0, 0);
NFLteams.push(IND);
let MIA = new Team("Miami Dolphins", "MIA", 0, 0, 0);
NFLteams.push(MIA);
let NE = new Team("New England Patriots", "NE", 0, 0, 0);
NFLteams.push(NE);
let LV = new Team("Las Vegas Raiders", "LV", 0, 0, 0);
NFLteams.push(LV);
let NO = new Team("New Orleans Saints", "NO", 0, 0, 0);
NFLteams.push(NO);
let ARI = new Team("Arizona Cardinals", "ARI", 0, 0, 0);
NFLteams.push(ARI);
let NYJ = new Team("New York Jets", "NYJ", 0, 0, 0);
NFLteams.push(NYJ);
let PIT = new Team("Pittsburgh Steelers", "PIT", 0, 0, 0);
NFLteams.push(PIT);
let WAS = new Team("Washington Commanders", "WAS", 0, 0, 0);
NFLteams.push(WAS);
let NYG = new Team("New York Giants", "NYG", 0, 0, 0);
NFLteams.push(NYG);
let JAX = new Team("Jacksonville Jaguars", "JAX", 0, 0, 0);
NFLteams.push(JAX);
let CAR = new Team("Carolina Panthers", "CAR", 0, 0, 0);
NFLteams.push(CAR);
let DEN = new Team("Denver Broncos", "DEN", 0, 0, 0);
NFLteams.push(DEN);
let TEN = new Team("Tennessee Titans", "TEN", 0, 0, 0);
NFLteams.push(TEN);
let SEA = new Team("Seattle Seahawks", "SEA", 0, 0, 0);
NFLteams.push(SEA);
let SF = new Team("San Francisco 49ers", "SF", 0, 0, 0);
NFLteams.push(SF);
let GB = new Team("Green Bay Packers", "GB", 0, 0, 0);
NFLteams.push(GB);
let DET = new Team("Detroit Lions", "DET", 0, 0, 0);
NFLteams.push(DET);
let LAR = new Team("Los Angeles Rams", "LAR", 0, 0, 0);
NFLteams.push(LAR);
let HOU = new Team("Houston Texans", "HOU", 0, 0, 0);
NFLteams.push(HOU);
let BUF = new Team("Buffalo Bills", "BUF", 0, 0, 0);
NFLteams.push(BUF);
let BAL = new Team("Baltimore Ravens", "BAL", 0, 0, 0);
NFLteams.push(BAL);
let CHI = new Team("Chicago Bears", "CHI", 0, 0, 0);
NFLteams.push(CHI);
let MIN = new Team("Minnesota Vikings", "MIN", 0, 0, 0);
NFLteams.push(MIN);

let week1 = new Week(1);
week1.AddGame(PHI, DAL);
week1.games[0].SetOdds(-250, +185);
week1.AddGame(LAC, KC);
week1.AddGame(ATL, TB);
week1.AddGame(CLE, CIN);
week1.AddGame(IND, MIA);
week1.AddGame(NE, LV);
week1.AddGame(NO, ARI);
week1.AddGame(NYJ, PIT);
week1.AddGame(WAS, NYG);
week1.AddGame(JAX, CAR);
week1.AddGame(DEN, TEN);
week1.AddGame(SEA, SF);
week1.AddGame(GB, DET);
week1.AddGame(LAR, HOU);
week1.AddGame(BUF, BAL);
week1.AddGame(CHI, MIN);

let week2 = new Week(2);
week2.AddGame(GB, WAS);
week2.AddGame(CIN, JAX);
week2.AddGame(DAL, NYG);
week2.AddGame(DET, CHI);
week2.AddGame(TEN, LAR);
week2.AddGame(MIA, NE);
week2.AddGame(NO, SF);
week2.AddGame(NYJ, BUF);
week2.AddGame(PIT, SEA);
week2.AddGame(BAL, CLE);
week2.AddGame(IND, DEN);
week2.AddGame(ARI, CAR);
week2.AddGame(KC, PHI);
week2.AddGame(MIN, ATL);
week2.AddGame(HOU, TB);
week2.AddGame(LV, LAC);

let week3 = new Week(3);
week3.AddGame(BUF, MIA);
week3.AddGame(CLE, GB);
week3.AddGame(TEN, IND);
week3.AddGame(MIN, CIN);
week3.AddGame(NE, PIT);
week3.AddGame(PHI, LAR);
week3.AddGame(TB, NYJ);
week3.AddGame(WAS, LV);
week3.AddGame(CAR, ATL);
week3.AddGame(JAX, HOU);
week3.AddGame(LAC, DEN);
week3.AddGame(SEA, NO);
week3.AddGame(CHI, DAL);
week3.AddGame(SF, ARI);
week3.AddGame(NYG, KC);
week3.AddGame(BAL, DET);

let week4 = new Week(4);
week4.AddGame(ARI, SEA);
week4.AddGame(PIT, MIN);
week4.AddGame(ATL, WAS);
week4.AddGame(BUF, NO);
week4.AddGame(DET, CLE);
week4.AddGame(NE, CAR);
week4.AddGame(NYG, LAC);
week4.AddGame(TB, PHI);
week4.AddGame(HOU, TEN);
week4.AddGame(LAR, IND);
week4.AddGame(SF, JAX);
week4.AddGame(KC, BAL);
week4.AddGame(LV, CHI);
week4.AddGame(DAL, GB);
week4.AddGame(MIA, NYJ);
week4.AddGame(DEN, CIN);

let week5 = new Week(5);
week5.AddGame(LAR, SF);
week5.AddGame(CLE, MIN);
week5.AddGame(IND, LV);
week5.AddGame(NO, NYG);
week5.AddGame(NYJ, DAL);
week5.AddGame(PHI, DEN);
week5.AddGame(CAR, MIA);
week5.AddGame(BAL, HOU);
week5.AddGame(ARI, TEN);
week5.AddGame(SEA, TB);
week5.AddGame(CIN, DET);
week5.AddGame(LAC, WAS);
week5.AddGame(BUF, NE);
week5.AddGame(JAX, KC);

let week6 = new Week(6);
week6.AddGame(NYG, PHI);
week6.AddGame(NYJ, DEN);
week6.AddGame(IND, ARI);
week6.AddGame(MIA, LAC);
week6.AddGame(PIT, CLE);
week6.AddGame(TB, SF);
week6.AddGame(CAR, DAL);
week6.AddGame(JAX, SEA);
week6.AddGame(BAL, LAR);
week6.AddGame(LV, TEN);
week6.AddGame(GB, CIN);
week6.AddGame(NO, NE);
week6.AddGame(KC, DET);
week6.AddGame(ATL, BUF);
week6.AddGame(WAS, CHI);

let week7 = new Week(7);
week7.AddGame(CIN, PIT);
week7.AddGame(JAX, LAR);
week7.AddGame(CHI, NO);
week7.AddGame(CLE, MIA);
week7.AddGame(TEN, NE);
week7.AddGame(KC, LV);
week7.AddGame(MIN, PHI);
week7.AddGame(NYJ, CAR);
week7.AddGame(DEN, NYG);
week7.AddGame(LAC, IND);
week7.AddGame(DAL, WAS);
week7.AddGame(ARI, GB);
week7.AddGame(SF, ATL);
week7.AddGame(DET, TB);
week7.AddGame(SEA, HOU);

let week8 = new Week(8);
week8.AddGame(LAC, MIN);
week8.AddGame(ATL, MIA);
week8.AddGame(CIN, NYJ);
week8.AddGame(NE, CLE);
week8.AddGame(PHI, NYG);
week8.AddGame(CAR, BUF);
week8.AddGame(BAL, CHI);
week8.AddGame(HOU, SF);
week8.AddGame(NO, TB);
week8.AddGame(DEN, DAL);
week8.AddGame(IND, TEN);
week8.AddGame(PIT, GB);
week8.AddGame(KC, WAS);

let week9 = new Week(9);
week9.AddGame(MIA, BAL);
week9.AddGame(CIN, CHI);
week9.AddGame(DET, MIN);
week9.AddGame(GB, CAR);
week9.AddGame(TEN, LAC);
week9.AddGame(NE, ATL);
week9.AddGame(NYG, SF);
week9.AddGame(PIT, IND);
week9.AddGame(HOU, DEN);
week9.AddGame(LV, JAX);
week9.AddGame(LAR, NO);
week9.AddGame(BUF, KC);
week9.AddGame(WAS, SEA);
week9.AddGame(DAL, ARI);

let week10 = new Week(10);
week10.AddGame(DEN, LV);
week10.AddGame(IND, ATL);
week10.AddGame(CHI, NYG);
week10.AddGame(MIA, BUF);
week10.AddGame(MIN, BAL);
week10.AddGame(NYJ, CLE);
week10.AddGame(TB, NE);
week10.AddGame(CAR, NO);
week10.AddGame(HOU, JAX);
week10.AddGame(SEA, ARI);
week10.AddGame(SF, LAR);
week10.AddGame(WAS, DET);
week10.AddGame(LAC, PIT);
week10.AddGame(GB, PHI);

let week11 = new Week(11);
week11.AddGame(NE, NYJ);
week11.AddGame(MIA, WAS);
week11.AddGame(ATL, CAR);
week11.AddGame(BUF, TB);
week11.AddGame(TEN, HOU);
week11.AddGame(MIN, CHI);
week11.AddGame(NYG, GB);
week11.AddGame(PIT, CIN);
week11.AddGame(JAX, LAC);
week11.AddGame(LAR, SEA);
week11.AddGame(ARI, SF);
week11.AddGame(CLE, BAL);
week11.AddGame(DEN, KC);
week11.AddGame(PHI, DET);
week11.AddGame(LV, DAL);

let week12 = new Week(12);
week12.AddGame(HOU, BUF);
week12.AddGame(CHI, PIT);
week12.AddGame(CIN, NE);
week12.AddGame(DET, NYG);
week12.AddGame(GB, MIN);
week12.AddGame(TEN, SEA);
week12.AddGame(KC, IND);
week12.AddGame(BAL, NYJ);
week12.AddGame(LV, CLE);
week12.AddGame(ARI, JAX);
week12.AddGame(DAL, PHI);
week12.AddGame(NO, ATL);
week12.AddGame(LAR, TB);
week12.AddGame(SF, CAR);

let week13 = new Week(13);
week13.AddGame(DET, GB);
week13.AddGame(DAL, KC);
week13.AddGame(BAL, CIN);
week13.AddGame(PHI, CHI);
week13.AddGame(CLE, SF);
week13.AddGame(TEN, JAX);
week13.AddGame(IND, HOU);
week13.AddGame(MIA, NO);
week13.AddGame(NYJ, ATL);
week13.AddGame(TB, ARI);
week13.AddGame(CAR, LAR);
week13.AddGame(SEA, MIN);
week13.AddGame(PIT, BUF);
week13.AddGame(LAC, LV);
week13.AddGame(WAS, DEN);
week13.AddGame(NE, NYG);

let week14 = new Week(14);
week14.AddGame(DET, DAL);
week14.AddGame(ATL, SEA);
week14.AddGame(CLE, TEN);
week14.AddGame(GB, CHI);
week14.AddGame(MIN, WAS);
week14.AddGame(NYJ, MIA);
week14.AddGame(TB, NO);
week14.AddGame(JAX, IND);
week14.AddGame(BAL, PIT);
week14.AddGame(LV, DEN);
week14.AddGame(BUF, CIN);
week14.AddGame(ARI, LAR);
week14.AddGame(KC, HOU);
week14.AddGame(LAC, PHI);

let week15 = new Week(15);
week15.AddGame(TB, ATL);
week15.AddGame(CHI, CLE);
week15.AddGame(CIN, BAL);
week15.AddGame(KC, LAC);
week15.AddGame(NE, BUF);
week15.AddGame(NYG, WAS);
week15.AddGame(PHI, LV);
week15.AddGame(JAX, NYJ);
week15.AddGame(HOU, ARI);
week15.AddGame(DEN, GB);
week15.AddGame(LAR, DET);
week15.AddGame(NO, CAR);
week15.AddGame(SF, TEN);
week15.AddGame(SEA, IND);
week15.AddGame(DAL, MIN);
week15.AddGame(PIT, MIA);

let week16 = new Week(16);
week16.AddGame(SEA, LAR);
week16.AddGame(CHI, GB);
week16.AddGame(WAS, PHI);
week16.AddGame(CLE, BUF);
week16.AddGame(DAL, LAC);
week16.AddGame(TEN, KC);
week16.AddGame(NO, NYJ);
week16.AddGame(NYG, MIN);
week16.AddGame(CAR, TB);
week16.AddGame(BAL, NE);
week16.AddGame(DEN, JAX);
week16.AddGame(ARI, ATL);
week16.AddGame(DET, PIT);
week16.AddGame(HOU, LV);
week16.AddGame(MIA, CIN);
week16.AddGame(IND, SF);

let week17 = new Week(17);
week17.AddGame(WAS, DAL);
week17.AddGame(MIN, DET);
week17.AddGame(KC, DEN);
week17.AddGame(CIN, ARI);
week17.AddGame(GB, BAL);
week17.AddGame(LV, NYG);
week17.AddGame(LAC, HOU);
week17.AddGame(CAR, SEA);
week17.AddGame(CLE, PIT);
week17.AddGame(TEN, NO);
week17.AddGame(IND, JAX);
week17.AddGame(MIA, TB);
week17.AddGame(NYJ, NE);
week17.AddGame(BUF, PHI);
week17.AddGame(SF, CHI);
week17.AddGame(ATL, LAR);

let week18 = new Week(18);
week18.AddGame(ATL, NO);
week18.AddGame(BUF, NYJ);
week18.AddGame(CHI, DET);
week18.AddGame(CIN, CLE);
week18.AddGame(DEN, LAC);
week18.AddGame(LV, KC);
week18.AddGame(LAR, ARI);
week18.AddGame(MIN, GB);
week18.AddGame(NE, MIA);
week18.AddGame(NYG, DAL);
week18.AddGame(PHI, WAS);
week18.AddGame(PIT, BAL);
week18.AddGame(SF, SEA);
week18.AddGame(TB, CAR);
week18.AddGame(JAX, TEN);
week18.AddGame(HOU, IND);

  
 
  let season = new Season();
  season.AddWeek(week1);
  season.AddWeek(week2);
  season.AddWeek(week3);
  season.AddWeek(week4);
  season.AddWeek(week5);
  season.AddWeek(week6);
  season.AddWeek(week7);
  season.AddWeek(week8);
  season.AddWeek(week9);
  season.AddWeek(week10);
  season.AddWeek(week11);
  season.AddWeek(week12);
  season.AddWeek(week13);
  season.AddWeek(week14);
  season.AddWeek(week15);
  season.AddWeek(week16);
  season.AddWeek(week17);
  season.AddWeek(week18);

  
  
  
