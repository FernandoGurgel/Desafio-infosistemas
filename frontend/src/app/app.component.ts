import { Component } from '@angular/core';
import { faCheckDouble, faCalendarAlt, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { AppService } from './app.service'

interface CarDTO{
  id: string
  placa: string,
  modelo: string,
  chassi: string,
  renavam: number
  marca: string,
  date: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  faCheckDouble = faCheckDouble
  faCalendar = faCalendarAlt
  faEdit= faEdit
  faRemoveFormat=faTrashAlt

  listCars: Array<CarDTO> = []

  constructor(private service: AppService){

    service.getAll().subscribe((result:[]) => {
      result.forEach(car =>{
        const {id, placa, marca, modelo, created_at,renavam,chassi} = car
        this.listCars.push({id, renavam, chassi,marca,modelo,placa, date: new Date(created_at).toLocaleDateString(
          'pt-br',
        )})
      })
    });
  }

  setSelectedCar(car){
    console.log('selecionando'+ car.placa);
  }

  deleteSelectedCar(car){
    if(confirm("Você desejá excluir este carro?")){
      this.service.deleteCar(car).subscribe((response)=>{
        window.location.reload()
      })
    }
  }
}
