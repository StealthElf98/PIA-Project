import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './model/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  getAllCountriesService(){
    return this.http.get(`${this.uri}/Countries/getAllCountries`);
  }

  getAllMedalsService(){
    return this.http.get(`${this.uri}/Medals/getAllMedals`);
  }

  giveGold(country){
    let data = {
      country:country
    }
    return this.http.post(`${this.uri}/Medals/giveGold`, data);
  }

  giveSilver(country){
    let data = {
      country:country
    }
    return this.http.post(`${this.uri}/Medals/giveSilver`, data);
  }

  giveBronze(country){
    let data = {
      country:country
    }
    return this.http.post(`${this.uri}/Medals/giveBronze`, data);
  }

  getAllDistinctCountriesService(){
    return this.http.get(`${this.uri}/Countries/getAllDistinctCountries`);
  }
  
  updateNum(country, num){
    let data = {
      country:country,
      num:num
    }
    return this.http.post(`${this.uri}/Countries/updateNum`, data);
  }
}
