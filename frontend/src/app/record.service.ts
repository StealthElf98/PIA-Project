import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) { }

  getAllMRecordsService(){
    return this.http.get(`${this.uri}/Records/getAllMRecords`);
  }

  getAllFRecordsService(){
    return this.http.get(`${this.uri}/Records/getAllFRecords`);
  }
}
