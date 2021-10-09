import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ParametersForms } from 'src/app/utils/parametersForm';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['intervalo', 'a', 'b', 'x1','error'];
  dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  decimales = 0;
  error = 1;
  constructor(
    public parameters:ParametersForms,
    private toastr: ToastrService,
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  calcular(){
    
  }

}
