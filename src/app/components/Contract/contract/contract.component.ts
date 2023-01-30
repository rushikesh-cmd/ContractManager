import { ApiService } from './../../../services/api.service';
import { DialogComponent } from './../../Dialog/dialog/dialog.component';
import { Component,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent {

  displayedColumns: string[] = ['id','contractName', 'projectName', 'managerName', 'startDate','endDate','resources','status','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private dialog : MatDialog,private api : ApiService){}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%',
    }).afterClosed().subscribe(val =>{
      if(val === 'Save'){
        this.getAllContract();
      }
    })
  }

  ngOnInit():void{
    this.getAllContract();
  }

  getAllContract(){
    this.api.getContract()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching Contract")
      }
    })
  }
  
  editContract(row : any){
    this.dialog.open(DialogComponent,{
      width :'30%',
      data : row
    }).afterClosed().subscribe(val=>{
      if(val === 'Update'){
        this.getAllContract();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
