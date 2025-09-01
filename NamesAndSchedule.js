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

    updateRecords(wins, losses, ties){
      this.wins = wins;
      this.losses = losses;
      this.ties = ties;
    }

    getName() {
      return this.name;
    }

    getPngImageDirectory()
    {
      this.pngImageName = `Images/${this.shortName}.png`;
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
    constructor(home, away, gameName){
        this.away = away;
        this.home = home;

        this.awayOdds = 1.00;
        this.homeOdds = 1.00;

        // We use the odds to calculate the value of the picks
        // The favorite will always be 1 and the underdog will be relative to that
        this.awayValue = 0;
        this.homeValue = 0;

        this.awayScore = 0;
        this.homeScore = 0;

        this.gameName = gameName;

        this.homeFavorite = true;
    }

    SetGameName(gameName){
      this.gameName = gameName;
    }

    SetScore(homeScore, awayScore){
      this.homeScore = homeScore;
      this.awayScore = awayScore;
    }

    SetOdds(homeOdds, awayOdds){
      this.homeOdds = homeOdds;
      this.awayOdds = awayOdds;

      if(this.homeOdds == 100)
        this.homeOdds = -100;
      if(this.awayOdds == 100)
        this.awayOdds = -100;

      this.homeFavorite = this.homeOdds < this.awayOdds ? true : false;

      this.homeValue = this.homeOdds;
      this.awayValue = this.awayOdds;

      /*
      let bool = false;
      if(this.home.name == "Buffalo Bills" && this.away.name == "Baltimore Ravens")
      {
        bool = true;
        console.log("We are inside set odds " + this.home.name + " " + this.away.name);
      }

      // Take care of the scenario where they are both negative
      if(this.homeValue < 0 && this.awayValue < 0)
      {
        if(bool)
          console.log("We are inside if(this.homeValue < 0 && this.awayValue < 0)");

        let difference = 0;
        if(this.homeValue > this.awayValue)
        {
          if(bool)
            console.log("We are inside if(this.homeValue > this.awayValue)");

          // Away is the favorite
          difference = this.homeValue - this.awayValue;
          if(difference < 100)
            this.homeValue = 1 + (difference / 100);
          else
            this.homeValue = difference / 100;

          this.awayValue = 1;

          if(bool)
            console.log("this.homeValue: ", this.homeValue);
          if(bool)
            console.log("this.awayValue: ", this.awayValue);

        }
        else if(this.awayValue > this.homeValue){

          if(bool)
            console.log("We are inside else if(this.awayValue > this.homeValue)");

          // Home is the favorite
          difference = this.awayValue - this.homeValue;
          if(difference < 100)
            this.awayValue = 1 + (difference / 100);
          else
            this.awayValue = difference / 100;

          this.homeValue = 1;

          if(bool)
            console.log("this.homeValue: ", this.homeValue);
          if(bool)
            console.log("this.awayValue: ", this.awayValue);

        }
        else{

          if(bool)
            console.log("We are inside else, so they are even");

          // They are even
          this.homeValue = 1;
          this.awayValue = 1;

          if(bool)
            console.log("this.homeValue: ", this.homeValue);
          if(bool)
            console.log("this.awayValue: ", this.awayValue);
        }

        return;
      }

      // Now test if one or both are even
      if(this.homeValue == 100 || this.awayValue == 100 || this.homeValue == -100 || this.awayValue == -100)
      {
        if((this.homeValue == 100 && this.awayValue == 100))
        {
          this.homeValue = 1;
          this.awayValue = 1;
        }
        else if(this.homeValue < this.awayValue)
        {
          // Home is the favorite
          this.awayValue = Math.abs(this.homeValue / 100);
          this.homeValue = 1;
        }
        else{
          // Away is favorite
          this.homeValue = Math.abs(this.awayValue / 100);
          this.awayValue = 1;
        }

        return;
      }

      // And finally the easiest part
      let total = Math.abs(this.homeValue) + Math.abs(this.awayValue);
      let underdog = (total / 100) - 1;
      if(this.homeFavorite){
        this.homeValue = 1;
        this.awayValue = underdog;
      }
      else{
        this.awayValue = 1;
        this.homeValue = underdog;
      }

      return;
      */
      // New function above!!!!!!!!!!!!!!


      // Take care of ther scenario where they are both negative
      if(this.homeValue < 0 && this.awayValue < 0)
      {
        if(this.homeValue == -100 && this.awayValue == -100)
        {
          this.homeValue = 1;
          this.awayValue = 1;
          return;
        }

        if(this.homeValue == -100 || this.awayValue == -100)
        {
          if(this.homeFavorite)
          {
            this.awayValue = this.homeValue / 100;
            this.homeValue = 1;
          }
          else
          {
            this.homeValue = this.awayValue / 100;
            this.awayValue = 1;
          }
        }
        else
        {
          if(this.homeFavorite)
          {
            this.awayValue = this.awayValue + ((this.homeValue / 100) - 1);
            this.homeValue = 1;
          }
          else
          {
            this.homeValue = this.homeValue + ((this.awayValue / 100) - 1);
            this.awayValue = 1;
          }
        }
      }

      // And finally the easiest part
      let total = Math.abs(this.homeValue) + Math.abs(this.awayValue);
      let underdog = (total / 100) - 1;
      if(this.homeFavorite){
        this.homeValue = 1;
        this.awayValue = underdog;
      }
      else{
        this.awayValue = 1;
        this.homeValue = underdog;
      }

      return;

      // Calc value for home team
      if(this.homeValue < 0){
        let MoneyBet = this.homeValue;
        let MoneyWinnings = 100;
        this.homeValue = MoneyWinnings / MoneyBet;
      }
      else{
        let MoneyBet = 100;
        let MoneyWinnings = this.homeValue;
        this.homeValue = MoneyWinnings / MoneyBet;
      }

      // Calc value for away team
      if(this.awayValue < 0){
        let MoneyBet = this.awayValue;
        let MoneyWinnings = 100;
        this.awayValue = MoneyWinnings / MoneyBet;
      }
      else{
        let MoneyBet = 100;
        let MoneyWinnings = this.awayValue;
        this.awayValue = MoneyWinnings / MoneyBet;
      }

      this.homeValue = Math.abs(this.homeValue);
      this.awayValue = Math.abs(this.awayValue);
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

    IsGame(name){
      if(this.gameName == name)
        return true;

      return this.home.IsTeam(name) || this.away.IsTeam(name);
    }

    IsGameBothTeams(home, away){
      return this.home.IsTeam(home) && this.away.IsTeam(away);
    }

    IsWinner(teamname){
      const winner = this.GetWinner();
      if(winner == undefined)
        return false;

      return winner.IsTeam(teamname);
    }

    GetResult(teamname){
      // We return 1 if it is a winner 2 if a loser and 3 if it has not been played yet
      const winner = this.GetWinner();
      if(winner == undefined){
        if(this.awayScore == -1)
          return 3;
        else // game must have ended in a tie
          return 2;
      }

      if(winner.IsTeam(teamname))
        return 1;
      else 
        return 2;
    }
  }

  class Week
  {
    constructor (week, startDateStr, endDateStr, regular = true){
        this.week = week;
        this.games = [];
        this.startDate = new Date(startDateStr).getTime();
        this.endDate = new Date(endDateStr).getTime();
        this.regularSeason = regular;
    }

    AddGame(home, away) {
        let gameNum = `Game ${this.games.length + 1}`;
        this.games.push(new Game(home, away, gameNum));
    }

    GetWinners(obj){
      let count = 0;
      let losses = 0;
      let value = 0;
      Object.entries(obj).forEach(([key, name]) =>{

        let gamefound = undefined;
        for(const game of this.games){
          if(game.IsGame(key)){
            gamefound = game;
            break;
          }
        }
    
        if(gamefound == undefined)
        {
          console.log("Could not find game for team " + name);
          return {wins: count, points: value};
        }

      //  if(gamefound.IsWinner(name))
      //  {
      //    count++;
      //    value += gamefound.GetTeamValue(name);
      //  }

        let r = gamefound.GetResult(name);
        if(r == 1){
          count++;
          value += gamefound.GetTeamValue(name);
        }
        else if(r == 2)
          ++losses;
      });

      return {wins: count, losses: losses, points: value};
    }

    FindGame(teamname){

      for(const game of this.games){
        if(game.IsGame(teamname)){
          return game;
        }
      }

      return undefined;
    }

    FindGameByTeams(home, away){
      for(const game of this.games){
        if(game.IsGameBothTeams(home, away)){
          return game;
        }
      }

      return undefined;
    }
  }

  class Season
  {
    constructor()
    {
        this.weeks = [];
        this.doneAddingOdds = false;
        this.preseasonWeeks = [];
    }

    AddWeek(week){
        this.weeks.push(week);
    }

    AddPreseasonWeek(week){
        this.preseasonWeeks.push(week);
    }

    GetWeek(index){
      if(index < this.weeks.length)
        return this.weeks[index];

      return undefined;
    }

    GetPreseasonWeek(index){
      if(index < this.preseasonWeeks.length)
        return this.preseasonWeeks[index];

      return undefined;
    }

    LoadWeekOdds(week, games){

      if(games == undefined || games == null)
        return;

      console.log("\n\nWeek " + week.week);
      for (const [gameKey, game] of Object.entries(games)){
        const game1 = week.FindGameByTeams(game.home, game.away);

        // Make sure we found the game
        if(game1 == undefined)
        {
          console.log("Could not find game for home:" + game.home  + " away:" + game.away);
          continue;
        }

        // Add odds to game
        game1.SetOdds(game.homeMoneyline, game.awayMoneyline);
            
        // Check if we have scores
        if(game1.homeScore != -1){
          // We have scores
          game1.SetScore(game.homeScore, game.awayScore);
        }
      }
    }

    LoadOdds(data){ 

      console.log("\n\nStart LoadOdds()");
      console.log(this.weeks[0]);
      console.log(data.week1);
      this.LoadWeekOdds(this.weeks[0], data.week1);
      this.LoadWeekOdds(this.weeks[1], data.week2);
      this.LoadWeekOdds(this.weeks[2], data.week3);
      this.LoadWeekOdds(this.weeks[3], data.week4);
      this.LoadWeekOdds(this.weeks[4], data.week5);
      this.LoadWeekOdds(this.weeks[5], data.week6);
      this.LoadWeekOdds(this.weeks[6], data.week7);
      this.LoadWeekOdds(this.weeks[7], data.week8);
      this.LoadWeekOdds(this.weeks[8], data.week9);
      this.LoadWeekOdds(this.weeks[9], data.week10);
      this.LoadWeekOdds(this.weeks[10], data.week11);
      this.LoadWeekOdds(this.weeks[11], data.week12);
      this.LoadWeekOdds(this.weeks[12], data.week13);
      this.LoadWeekOdds(this.weeks[13], data.week14);
      this.LoadWeekOdds(this.weeks[14], data.week15);
      this.LoadWeekOdds(this.weeks[15], data.week16);
      this.LoadWeekOdds(this.weeks[16], data.week17);
      this.LoadWeekOdds(this.weeks[17], data.week18);
      console.log("Leave LoadOdds()\n\n");

    }

    LoadOddsPreseason(data)
    {
      console.log("\n\nStart LoadOddsPreseason()");
      this.LoadWeekOdds(this.preseasonWeeks[0], data.weeks.week1);
      this.LoadWeekOdds(this.preseasonWeeks[1], data.weeks.week2);
      this.LoadWeekOdds(this.preseasonWeeks[2], data.weeks.week3);
      console.log("Leave LoadOddsPreseason()\n\n");
    }

    DoneAddingWeeks(){
      let count = 1;
      this.doneAddingOdds = false;
      for(const item of this.weeks)
      {
        fetch(String("week" + count + ".json"))
          .then(response => response.json())
          .then(data => {
            let games = data.week1;

            for (const [gameKey, game] of Object.entries(games)) {
            
              const game1 = week.FindGame(game.home);
              if(game1 == undefined)
              {
                console.log("Could not find game for " + game.home);
                break;
              }

              console.log("Setting Odds!!!!!!!!!!!!!!!!!!!!!");
              // Add odds to game
              game1.SetOdds(game.homeMoneyline, game.awayMoneyline);
            
              // Check if we have scores
              if(game1.homeScore != -1){
                // We have scores
                game1.SetScore(game.homeScore, game.awayScore);
              }
            }

            console.log("Got week " + count + " odds filled!!!!");
            if(count == 18)
            {
              this.doneAddingOdds = true;
              return;
            }
          })
          .catch(err => console.error("Error fetching JSON: for week " + count, err));
        count++;
      }

      /*
      this.weeks.forEach(week=>{

        if(count < 19){
          fetch(String("week" + count + ".json"))
          .then(response => response.json())
          .then(data => {
            let games = data.week1;

            for (const [gameKey, game] of Object.entries(games)) {
            
              const game1 = week.FindGame(game.home);
              if(game1 == undefined)
              {
                console.log("Could not find game for " + game.home);
                break;
              }

              console.log("Setting Odds!!!!!!!!!!!!!!!!!!!!!");
              // Add odds to game
              game1.SetOdds(game.homeMoneyline, game.awayMoneyline);
            
              // Check if we have scores
              if(game1.homeScore != -1){
                // We have scores
                game1.SetScore(game.homeScore, game.awayScore);
              }
            }

            console.log("Got week " + count + " odds filled!!!!");
            if(count == 18)
            {
              this.doneAddingOdds = true;
              console.log("this.doneAddingOdds is true and DoneAddingWeeks has finished running")
            }
          })
          .catch(err => console.error("Error fetching JSON: for week " + count, err));
      }

        ++count;
      });
      */
      
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

let preWeek1 = new Week(1, "2025-08-01T00:00:00Z", "2025-08-10T23:05:00Z", false);
preWeek1.AddGame(DET, LAC, false);
preWeek1.AddGame(BAL, IND, false);
preWeek1.AddGame(PHI, CIN, false);
preWeek1.AddGame(SEA, LV, false);
preWeek1.AddGame(ATL, DET, false);
preWeek1.AddGame(CAR, CLE, false);
preWeek1.AddGame(NE, WAS, false);
preWeek1.AddGame(BUF, NYG, false);
preWeek1.AddGame(MIN, HOU, false);
preWeek1.AddGame(JAX, PIT, false);
preWeek1.AddGame(LAR, DAL, false);
preWeek1.AddGame(TB, TEN, false);
preWeek1.AddGame(GB, NYJ, false);
preWeek1.AddGame(ARI, KC, false);
preWeek1.AddGame(SF, DEN, false);
preWeek1.AddGame(CHI, MIA, false);
preWeek1.AddGame(LAC, NO, false);

let preWeek2 = new Week(2, "2025-08-15T23:00:00Z", "2025-08-19T03:00:00Z", false); 
preWeek2.AddGame(ATL, TEN, false);
preWeek2.AddGame(SEA, KC, false);
preWeek2.AddGame(DET, MIA, false);
preWeek2.AddGame(HOU, CAR, false);
preWeek2.AddGame(IND, GB, false);
preWeek2.AddGame(MIN, NE, false);
preWeek2.AddGame(PHI, CLE, false);
preWeek2.AddGame(LV, SF, false);
preWeek2.AddGame(DAL, BAL, false);
preWeek2.AddGame(LAR, LAC, false);
preWeek2.AddGame(NYG, NYJ, false);
preWeek2.AddGame(PIT, TB, false);
preWeek2.AddGame(DEN, ARI, false);
preWeek2.AddGame(NO, JAX, false);
preWeek2.AddGame(CHI, BUF, false);
preWeek2.AddGame(WAS, CIN, false);

let preWeek3 = new Week(3, "2025-08-21T23:00:00Z", "2025-08-31T16:00:00Z", false); 
preWeek3.AddGame(CAR, PIT, false);
preWeek3.AddGame(NYG, NE, false);
preWeek3.AddGame(NYJ, PHI, false);
preWeek3.AddGame(DAL, ATL, false);
preWeek3.AddGame(TEN, MIN, false);
preWeek3.AddGame(KC, CHI, false);
preWeek3.AddGame(WAS, BAL, false);
preWeek3.AddGame(NO, DEN, false)
preWeek3.AddGame(CIN, IND, false);
preWeek3.AddGame(CLE, LAR, false);
preWeek3.AddGame(DET, HOU, false);
preWeek3.AddGame(GB, SEA, false);
preWeek3.AddGame(MIA, JAX, false);
preWeek3.AddGame(TB, BUF, false);
preWeek3.AddGame(SF, LAC, false);
preWeek3.AddGame(ARI, LV, false);

let week1 = new Week(1, "2025-09-05T00:20:00Z", "2025-09-09T04:00:00Z"); 
week1.AddGame(PHI, DAL);
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

let week2 = new Week(2, "2025-09-12T00:15:00Z", "2025-09-16T05:00:00Z");
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

let week3 = new Week(3, "2025-09-19T00:15:00Z", "2025-09-23T03:15:00Z");
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

let week4 = new Week(4, "2025-09-26T00:15:00Z", "2025-09-30T03:15:00Z");
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

let week5 = new Week(5, "2025-10-03T00:15:00Z", "2025-10-07T03:15:00Z");
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

let week6 = new Week(6, "2025-10-10T00:15:00Z", "2025-10-14T03:15:00Z");
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

let week7 = new Week(7, "2025-10-17T00:15:00Z", "2025-10-21T03:15:00Z");
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

let week8 = new Week(8, "2025-10-24T00:15:00Z", "2025-10-28T03:15:00Z");
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

let week9 = new Week(9, "2025-10-31T04:20:00Z", "2025-11-04T10:00:00Z");
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

let week10 = new Week(10, "2025-11-07T01:15:00Z", "2025-11-11T04:15:00Z");
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

let week11 = new Week(11, "2025-11-14T01:15:00Z", "2025-11-18T04:15:00Z");
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

let week12 = new Week(12, "2025-11-21T01:15:00Z", "2025-11-25T04:15:00Z");
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

let week13 = new Week(13, "2025-11-27T18:00:00Z", "2025-12-02T04:15:00Z");
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

let week14 = new Week(14, "2025-12-05T01:15:00Z", "2025-12-09T04:15:00Z");
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

let week15 = new Week(15, "2025-12-12T01:15:00Z", "2025-12-16T04:15:00Z");
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

let week16 = new Week(16, "2025-12-19T01:15:00Z", "2025-12-23T04:15:00Z");
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

let week17 = new Week(17, "2025-12-25T18:00:00Z", "2025-12-30T04:15:00Z");
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

let week18 = new Week(18, "2026-01-04T18:00:00Z", "2026-01-05T04:20:00Z");
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

  season.AddPreseasonWeek(preWeek1);
  season.AddPreseasonWeek(preWeek2);
  season.AddPreseasonWeek(preWeek3);

  let playersStats = { wins: 0, points: 0, picksMade: 0 };
  let players = {};

  /*
  function PullUsersAndGetWins(snapshot){

    console.log("In PullUsersAndGetWins");
    snapshot.forEach(doc => {
      console.log("In snapshot.forEach");
      const storageId = doc.id; // document ID is the username
      const username = storageId.split("_")[0];
      const data = doc.data();

      console.log("username");
      console.log(username);

      let totalWins = 0;
      let totalPoints = 0;
      let picksMade = 0;

      let weekStats = [];
      function fillWeekStats()
      {
        weekStats = [];
        for (let i = 0; i < 18; i++) {
          weekStats.push({ wins: 0, points: 0, weekPicks: null});
        }
      }

      // We call this first to make sure weekStats is filled with 18 weeks just in case they have no picks for any weeks
      // Because it will never enter the forEach loop and fill weekStats
      fillWeekStats();

      // Loop through each week's picks
      Object.keys(data).forEach(weekKey => {
        const weekData = data[weekKey];

        fillWeekStats();
        
        if (weekData?.picks) {

          const weekNumberMatch = weekKey.match(/\d+/); // extracts the number from "week1"
          if (!weekNumberMatch) return; // skip if no number

          const weekNumber = parseInt(weekNumberMatch[0]);
          
          const regulareSeasonStart = Date.now() >= new Date("2025-09-04T19:20:00");
          const week = regulareSeasonStart ? season.GetWeek(weekNumber - 1) : season.GetPreseasonWeek(weekNumber - 1);
          
          if(week !== undefined){
            const result = week.GetWinners(weekData.picks);
            weekStats[weekNumber - 1] = {wins: result.wins, points: result.points, weekPicks: weekData.picks};
            totalWins += result.wins;
            totalPoints += result.points;
          }
          else{
            console.log("weeks is undefined!");
          }
            
          picksMade += Object.keys(weekData.picks).length;
        }
      });

      players[username] = {
        username: username, // ✅ Add this
        wins: totalWins,
        points: totalPoints,
        picksMade: picksMade,
        winpercent: picksMade > 0 ? totalWins / picksMade : 0,
        weekStats: weekStats
      };

    });

    // sort players
    players = Object.entries(players)
      .map(([username, stats]) => ({ username, ...stats }))
      .sort((a, b) => {
        if (b.wins !== a.wins) {
          return b.wins - a.wins; // sort by wins first
        } else {
          return b.points - a.points; // tiebreaker: sort by points
        }
      });

      return players;
  }
  */

  function PullUsersAndGetWins(snapshot){

    console.log("In PullUsersAndGetWins");
    snapshot.forEach(doc => {
      console.log("In snapshot.forEach");
      const data = doc.data();

      const storageId = data.username; // document ID is the username
      const username = storageId.split("_")[0];

      console.log("username");
      console.log(username);

      let totalWins = 0;
      let totalLosses = 0;
      let totalPoints = 0;
      let picksMade = 0;

      let weekStats = [];
      function fillWeekStats()
      {
        weekStats = [];
        for (let i = 0; i < 18; i++) {
          weekStats.push({ wins: 0, points: 0, weekPicks: null});
        }
      }

      // We call this first to make sure weekStats is filled with 18 weeks just in case they have no picks for any weeks
      // Because it will never enter the forEach loop and fill weekStats
      fillWeekStats();

      // Loop through each week's picks
      Object.keys(data).forEach(weekKey => {
        if (weekKey === "username") return;

        const weekData = data[weekKey];
        if (weekData?.picks) {

          const weekNumberMatch = weekKey.match(/\d+/); // extracts the number from "week1"
          if (!weekNumberMatch) return; // skip if no number

          const weekNumber = parseInt(weekNumberMatch[0]);
          
          const regulareSeasonStart = Date.now() >= new Date("2025-09-04T19:20:00");
          const week = regulareSeasonStart ? season.GetWeek(weekNumber - 1) : season.GetPreseasonWeek(weekNumber - 1);
          
          if(week !== undefined){
            const result = week.GetWinners(weekData.picks);
            console.log(`Week ${weekNumber}: result.wins = ${result.wins}, result.points = ${result.points}`);
            weekStats[weekNumber - 1] = {wins: result.wins, points: result.points, weekPicks: weekData.picks};
            console.log("weekStats[1] = ", weekStats[weekNumber - 1]);
            totalWins += result.wins;
            totalLosses += result.losses;
            totalPoints += result.points;
            console.log(`Accumulated totals → totalWins = ${totalWins}, totalPoints = ${totalPoints}`);
          }
          else{
            console.log("weeks is undefined!");
          }
            
          picksMade += Object.keys(weekData.picks).length;
        }
      });

      players[username] = {
        username: username, // ✅ Add this
        wins: totalWins,
        losses: totalLosses,
        points: totalPoints,
        picksMade: picksMade,
        winpercent: totalWins + totalLosses > 0 ? totalWins / (totalWins + totalLosses) : 0,
        weekStats: weekStats
      };

    });

    // sort players
    players = Object.entries(players)
      .map(([username, stats]) => ({ username, ...stats }))
      .sort((a, b) => {
        if (b.wins !== a.wins) {
          return b.wins - a.wins; // sort by wins first
        } else {
          return b.points - a.points; // tiebreaker: sort by points
        }
      });

      return players;
  }

  function getCurrentWeek(currentDate) {
    const now = new Date(currentDate).getTime();

    const allWeeks = [...season.preseasonWeeks, ...season.weeks];

    for (const week of allWeeks) {
      if (now >= week.startDate && now <= week.endDate) {
        return week;  // Found the current week
      }
    }

    return null;  // Not currently in any week
  }

  function isBettingWindowOpen(currentDate) {
    const now = new Date(currentDate).getTime();

    const allWeeks = [...season.preseasonWeeks, ...season.weeks];

    const firstWeek = allWeeks[0];
    const lastWeek = allWeeks[allWeeks.length - 1];

    if (now < firstWeek.startDate) {
      return season.GetPreseasonWeek(0);
    } 

    if (now > lastWeek.endDate) {
      return null;
    }

    for (let i = 0; i < allWeeks.length - 1; i++) {
      const currentWeek = allWeeks[i];
      const nextWeek = allWeeks[i + 1];

      if (now > currentWeek.endDate && now < nextWeek.startDate) {
        return nextWeek;
      }
    }

    return null; // currently inside a week, not in between
}


  /*
  function getCurrentWeek(currentDate, seasonjson) {
    const now = new Date(currentDate);

    for (const [week, window] of Object.entries(seasonjson)) {
      const begin = new Date(window.begin);
      const end = new Date(window.end);

      if (now >= begin && now <= end) {
        return week;
      }
    }

    return null; // Not in any NFL week
  }
 
  function isBettingWindowOpen(currentDate, seasonjson) {
    const now = new Date(currentDate);

    const weekKeys = Object.keys(seasonjson);
    const firstWeek = seasonjson[weekKeys[0]];
    const lastWeek = seasonjson[weekKeys[weekKeys.length - 1]];

    const seasonStart = new Date(firstWeek.begin);
    const seasonEnd = new Date(lastWeek.end);

    // ✅ Before the first week starts
    if (now < seasonStart) {
      return season.GetPreseasonWeek(0);
    }

    // ⛔ After the season ends
    if (now > seasonEnd) {
      return null;
    }

    // ✅ Between any two weeks
    for (let i = 0; i < weekKeys.length - 1; i++) {
      const currentWeek = seasonjson[weekKeys[i]];
      const nextWeek = seasonjson[weekKeys[i + 1]];

      const endOfCurrent = new Date(currentWeek.end);
      const startOfNext = new Date(nextWeek.begin);

      if (now > endOfCurrent && now < startOfNext) {
        // If it's less than 2 we call season.GetPreseasonWeek
        if(i + 1 < 2) {
          return season.GetPreseasonWeek(i + 1);
        }

        // Else we call season.GetWeek
        return season.GetWeek((i + 1) - 3);
      }
    }

    // ⛔ During an active week
    return null;

  }
    */

  function UpdateRecords(records) {
    const teamKeys = Object.keys(records);

    for (let i = 0; i < teamKeys.length; i++) {
      const teamCode = teamKeys[i];
      const record = records[teamCode]; // This gives you the { wins, losses, ties }

      NFLteams[i].updateRecords(record.wins, record.losses, record.ties);
    }
  }

  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  function formatDisplayDate(date) {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const ordinal = getOrdinalSuffix(day);
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // convert 0 to 12-hour format

  return `${weekday}, ${month} ${day}${ordinal}, at ${hours}:${minutes}${ampm}`;
}

  
  
  
