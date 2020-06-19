import { Component, OnInit } from '@angular/core';

import { faCheckDouble, faCalendarAlt, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { AppService } from '../app.service'

interface CarDTO{
  id: string
  placa: string,
  modelo: string,
  chassi: string,
  renavam: number
  marca: string,
  ano: number,
  date: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  faCheckDouble = faCheckDouble
  faCalendar = faCalendarAlt
  faEdit= faEdit
  faTrashAlt=faTrashAlt

  listCars: Array<CarDTO> = []
  listTempCars: Array<CarDTO> = []

  searchText

  constructor(private service: AppService){

    service.getAll().subscribe((result:[]) => {
      result.forEach(car =>{
        const {id,ano, placa, marca, modelo, created_at,renavam,chassi} = car
        this.listCars.push({ano, id, renavam, chassi,marca,modelo,placa, date: new Date(created_at).toLocaleDateString(
          'pt-br',
        )})
      })
    });
  }

  deleteSelectedCar(car){
    if(confirm("Você desejá excluir este carro?")){
      this.service.deleteCar(car).subscribe((response)=>{
        window.location.reload()
      })
    }
  }

  ngOnInit(): void {
  }
}
