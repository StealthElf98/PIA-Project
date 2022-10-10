import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Record } from '../model/record';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(private recordService:RecordService, private router:Router) { }

  ngOnInit(): void {
    this.recordService.getAllMRecordsService().subscribe((data:Record[])=>{
      this.mrecords = data;
      this.dataSource = new MatTableDataSource(this.mrecords);
      this.dataSource.paginator = this.paginator.toArray()[0];
    })
    this.recordService.getAllFRecordsService().subscribe((data:Record[])=>{
      this.frecords = data;
      this.dataSource2 = new MatTableDataSource(this.frecords);
      this.dataSource2.paginator = this.paginator.toArray()[1];
    })
    
  }

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  

  mrecords:Record[];
  frecords:Record[];
  dataSource:MatTableDataSource<Record>;
  dataSource2:MatTableDataSource<Record>;
  displayedColumns: string[] = ['discipline', 'result', 'athlete', 'country','place', 'year'];
  displayedColumns2: string[] = ['discipline', 'result', 'athlete', 'country','place', 'year'];

  getAllMRecords(){

  }
  getAllFRecords(){
    
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
