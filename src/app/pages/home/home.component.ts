import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Parser } from 'expr-eval-ex';
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
  parser;
  resultados = [{}];

  constructor(
    public parameters:ParametersForms,
    private toastr: ToastrService,
  ) { 
    this.parser = new Parser({
      operators: {
        // These default to true, but are included to be explicit
        add: true,
        concatenate: true,
        conditional: true,
        divide: true,
        factorial: true,
        multiply: true,
        power: true,
        remainder: true,
        subtract: true,
    
        // Disable and, or, not, <, ==, !=, etc.
        logical: false,
        comparison: false,
    
        // The in operator is disabled by default in the current version
        'in': true
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  calcular(){
    let inter = 1;
    let f_d = 112;
    let tolerancia = this.parameters.baseForm.value.error;
    let xa =this.parameters.baseForm.value.limiteInferior
    let xb = this.parameters.baseForm.value.limiteSuperior
    let punto_anterior = 0;
    let calculo = 112;
    
    while (Math.abs(calculo) >= tolerancia){
      
      let punto_medio = (( parseFloat(xa) + parseFloat(xb))/2);
      let f_a = this.funcion(xa).toFixed(4);
      f_d = this.funcion(punto_medio).toFixed(9);

      if(punto_medio != 0){
        calculo = punto_medio - punto_anterior;
      }

      this.resultados.push({intervalo:inter,a:xa,b:xb,x1:Math.abs(f_d),error:calculo == 0?Math.abs(punto_medio):Math.abs(calculo)});

      let faxfd = f_a*f_d

      if(faxfd>0){
        xa = punto_medio.toFixed(4)
        punto_anterior = punto_medio;
      }else{
        xb = punto_medio.toFixed(4)
        punto_anterior = punto_medio;
      }

      if(Math.abs(calculo)<=tolerancia){
        break
      }


      inter++;  
    }

    console.log(this.resultados);
   

  }

  funcion(f_x:number){
    let f = this.parser.parse(this.parameters.baseForm.value.funcion);
  
    return f.evaluate({x:f_x});
  }

}
