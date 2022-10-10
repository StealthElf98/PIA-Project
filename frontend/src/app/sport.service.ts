import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  insertSportService(sport, discipline, type, min, max){
    let data = {
      sport:sport,
      discipline:discipline,
      type:type,
      min:min,
      max:max
    }
    return this.http.post(`${this.uri}/Sports/insertSport`, data);
  }

  getAllSportsService(){
    return this.http.get(`${this.uri}/Sports/getAllSports`);
  }

  getISports(){
    return this.http.get(`${this.uri}/Sports/getISports`);
  }

  getESports(){
    return this.http.get(`${this.uri}/Sports/getESports`);
  }

  getAllSportssService(){
    return this.http.get(`${this.uri}/Sports/getAllSportss`);
  }

  checkIfOkService(sport, discipline){
    let data = {
      sport:sport,
      discipline:discipline
    }
    return this.http.post(`${this.uri}/Sports/checkIfOk`, data);
  }

  addAthleteService(name, sex, sport, discipline, country){
    let data = {
      name:name,
      sex:sex,
      sport:sport, 
      discipline:discipline,
      country:country,
      wonM:0,
      medal:null
    }
    return this.http.post(`${this.uri}/Athletes/addAthlete`, data);
  }

  addTenisPlayer(name, sex, sport, discipline, country, rank){
    let data = {
      name:name,
      sex:sex,
      sport:sport, 
      discipline:discipline,
      country:country,
      wonM:0,
      medal:null,
      rank:rank
    }
    return this.http.post(`${this.uri}/Athletes/addAthlete`, data);
  }

  sameSportService(name, sport){
    let data = {
      name:name,
      sport:sport
    }
    return this.http.post(`${this.uri}/Athletes/sameSport`, data);
  }

  distinctDisciplinesService(){
    return this.http.get(`${this.uri}/Sports/distinctDisciplines`);
  }

  distinctDisciplinessService(){
    return this.http.get(`${this.uri}/Sports/distinctDiscipliness`);
  }

  getAllAthletesByParamService(name, sex, sport, discipline, country, wonM){
    let data = {
      name:name,
      sex:sex,
      sport:sport,
      discipline:discipline,
      country:country,
      wonM:wonM
    }
    return this.http.post(`${this.uri}/Athletes/getAllAthletesByParam`, data);
  }

  enoughAthletesService(sport, discipline, sex){
    let data = {
      sex:sex,
      sport:sport,
      discipline:discipline,
      
    }
    return this.http.post(`${this.uri}/Athletes/enoughAthletes`, data);
  }

  alreadyExists(name, discipline){
    let data = {
      name:name,
      discipline:discipline
    }
    return this.http.post(`${this.uri}/Athletes/alreadyExists`, data);
  }

  getAthletesByDiscipline(discipline, sex){
    let data = {
      discipline:discipline,
      sex:sex
    }
    return this.http.post(`${this.uri}/Athletes/getAthletesByDiscipline`, data);
  }

  giveMedals(names, discipline){
    let data = {
      names:names,
      discipline:discipline
    }
    return this.http.post(`${this.uri}/Athletes/giveMedals`, data);
  }

  giveGold(name, discipline){
    let data = {
      name:name,
      discipline:discipline
    }
    return this.http.post(`${this.uri}/Athletes/giveGold`, data);
  }

  giveSilver(name, discipline){
    let data = {
      name:name,
      discipline:discipline
    }
    return this.http.post(`${this.uri}/Athletes/giveSilver`, data);
  }

  giveBronze(name, discipline){
    let data = {
      name:name,
      discipline:discipline
    }
    return this.http.post(`${this.uri}/Athletes/giveBronze`, data);
  }


  getStartDateService(discipline, sex){
    let data = {
      discipline:discipline,
      sex:sex
    }

    return this.http.post(`${this.uri}/Tournaments/getStartDate`, data);
  }

  addTeam(country,sport, discipline, sex, athletes){
    let data = {
      country:country,
      sport:sport,
      discipline:discipline,
      sex:sex,
      athletes:athletes,
      wonM:0,
      medal:null
    }
    return this.http.post(`${this.uri}/Teams/addTeam`, data);
  }

  teamExists(country, sport, discipline, sex){
    let data = {
      country:country,
      sport:sport,
      discipline:discipline,
      sex:sex
    }
    return this.http.post(`${this.uri}/Teams/teamExists`, data);
  }

  getTeams(sport, sex){
    let data = {
      sport:sport,
      sex:sex
    }
    return this.http.post(`${this.uri}/Teams/getTeams`, data);
  }

  getITeams(sport,discipline, sex){
    let data = {
      sport:sport,
      discipline:discipline,
      sex:sex
    }
    return this.http.post(`${this.uri}/Teams/getITeams`, data);
  }

  getTenisPlayers(sport, discipline,sex){
    let data = {
      sport:sport,
      discipline:discipline,
      sex:sex,
    }
    return this.http.post(`${this.uri}/Athletes/getTenisPlayers`, data);
  }

  getAthlete(name, discipline){
    let data = {
      name:name,
      discipline:discipline
    }
    return this.http.post(`${this.uri}/Athletes/getAthlete`, data);
  }

  doubleExists(name){
    let data = {
      name:name,
    }
    return this.http.post(`${this.uri}/Athletes/doubleExists`, data);
  }
  
  getDoubles(discipline,sex){
    let data = {
      discipline:discipline,
      sex:sex,
    }
    return this.http.post(`${this.uri}/Athletes/getDoubles`, data);
  }

  getAllAthletesFromCountry(country){
    let data = {
      country:country
    }
    return this.http.post(`${this.uri}/Athletes/getAllAthletesFromCountry`, data);
  }
  
  getAllDisciplinesFromCountry(country, sport){
    let data = {
      country:country,
      sport:sport
    }
    return this.http.post(`${this.uri}/Athletes/getAllDisciplinesFromCountry`, data);
  }

  getAllAthletesByDiscipline(country, discipline){
    let data = {
      country:country,
      discipline:discipline
    }
    return this.http.post(`${this.uri}/Athletes/getAllAthletesByDiscipline`, data);
  }

  getAllAthletesBySport(country, sport){
    let data = {
      country:country,
      sport:sport
    }
    return this.http.post(`${this.uri}/Athletes/getAllAthletesBySport`, data);
  }
}
