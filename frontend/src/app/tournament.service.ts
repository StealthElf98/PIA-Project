import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  disciplineExists(discipline:string, sex){
    let data = {
      discipline:discipline,
      sex:sex
    }

    return this.http.post(`${this.uri}/Tournaments/disciplineExists`, data);
  }

  insertTournament(sport, discipline, format, sex,
    start, end, locations, athletes, delegat){
      let data = {
        sport:sport,
        discipline:discipline,
        format:format,
        sex:sex,
        start:start,
        end:end,
        locations:locations,
        athletes:athletes,
        delegat:delegat
      }
      return this.http.post(`${this.uri}/Tournaments/insertTournament`, data);
    }
   
    getTournaments(username){
      let data = {
        username:username
      }
      return this.http.post(`${this.uri}/Tournaments/getTournaments`, data);
    }

    addResult(delegat, sport, discipline, sex, date, athlete){
      let data = {
        delegat:delegat,
        sport:sport,
        discipline:discipline,
        sex:sex,
        date:date,
        time:null,
        location:null,
        athlete:athlete,
        result1:null,
        result2:null,
        result3:null,
        result4:null,
        result5:null,
        result6:null,
      }
      return this.http.post(`${this.uri}/Results/addResult`, data);
    }

    setTimeAndLocation(time, location, discipline, sex){
      let data = {
        time:time,
        location:location,
        discipline:discipline,
        sex:sex
      }
      return this.http.post(`${this.uri}/Results/setTimeAndLocation`, data);
    }

    checkIfOK(date, time, location, discipline){
      let data = {
        date:date,
        time:time,
        location:location,
        discipline:discipline
      }
      return this.http.post(`${this.uri}/Results/checkIfOk`, data);
    }

    insertResults(athlete,discipline,result1, round){
      let data = {
        athlete:athlete,
        discipline:discipline,
        result1:result1,
        round:round
      }
      return this.http.post(`${this.uri}/Results/insertResults`, data);
    }

    getOneResult(discipline, sex){
      let data = {
        discipline:discipline,
        sex:sex
      }
      return this.http.post(`${this.uri}/Results/getOneResult`, data);
    }

    getFirstResult(discipline, sex){
      let data = {
        discipline:discipline,
        sex:sex
      }
      return this.http.post(`${this.uri}/Results/getFirstResult`, data);
    }

    getAllResults(discipline, sex){
      let data = {
        discipline:discipline,
        sex:sex
      }
      return this.http.post(`${this.uri}/Results/getAllResults`, data);
    }

    sportExists(sport, discipline, sex){
      let data = {
        sport:sport,
        discipline:discipline,
        sex:sex
      }
      return this.http.post(`${this.uri}/Tournaments/sportExists`, data);
    }

    insertOsmina(sport, discipline, sex, osmina, delegat){
      let data = {
        sport:sport,
        discipline:discipline,
        sex:sex,
        osmina:osmina,
        cetvrtina:[],
        polufinale:[],
        treceMesto:[],
        finale:[],
        round:8,
        delegat:delegat
      }
      return this.http.post(`${this.uri}/ResultTs/insertOsmina`, data);
    }

    insertCetvrtina(sport, discipline, sex, cetvrtina, delegat){
      let data = {
        sport:sport,
        discipline:discipline,
        sex:sex,
        osmina:[],
        cetvrtina:cetvrtina,
        polufinale:[],
        treceMesto:[],
        finale:[],
        round:4,
        delegat:delegat
      }
      return this.http.post(`${this.uri}/ResultTs/insertCetvrtina`, data);
    }

    insertPolufinale(sport, discipline, sex, polufinale, delegat){
      let data = {
        sport:sport,
        discipline:discipline,
        sex:sex,
        osmina:[],
        cetvrtina:[],
        polufinale:polufinale,
        treceMesto:[],
        finale:[],
        round:2,
        delegat:delegat
      }
      return this.http.post(`${this.uri}/ResultTs/insertPolufinale`, data);
    }

    getResultT(sport, discipline, sex){
      let data = {
        sport:sport,
        discipline:discipline,
        sex:sex,
      }
      return this.http.post(`${this.uri}/ResultTs/getResultT`, data);
    }

    insertResultT(name1, name2, sex, result, round){
      let data = {
        name1:name1,
        name2:name2,
        sex:sex,
        result:result,
        round:round
      }
      return this.http.post(`${this.uri}/ResultTs/insertResultT`, data);
    }

    insertMatch(name1, name2, sex, sport, discipline, round){
      let data = {
        name1:name1,
        name2:name2,
        sex:sex,
        sport:sport,
        discipline:discipline,
        round:round
      }
      return this.http.post(`${this.uri}/ResultTs/insertMatch`, data);
    }

    insertGroups(groupA,groupB,sex,sport){
      let data = {
        groupA:groupA,
        groupB:groupB,
        sex:sex,
        sport:sport
      }
      return this.http.post(`${this.uri}/Groups/insertGroups`, data);
    }

    getGroups(sex, sport){
      let data = {
        sex:sex,
        sport:sport
      }
      return this.http.post(`${this.uri}/Groups/getGroups`, data);
    }

    checkNumOfTour(delegat){
      let data = {
        delegat:delegat
      }
      return this.http.post(`${this.uri}/Tournaments/checkNumOfTour`, data);
    }
}
