import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

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
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  faArrowLeft = faArrowLeft
  myFrom: FormGroup
  listCars: Array<CarDTO>=[]
  car:any = {}
  id:string=null


  constructor(private service: AppService, private fb: FormBuilder, private router: ActivatedRoute) {
    const {id} = router.snapshot.params
    if(!!id){
      service.getById(id).subscribe((result:[]) => {
        result.forEach(car =>{
          const {id,ano, placa, marca, modelo, created_at,renavam,chassi} = car

          this.myFrom.patchValue({
            id,
            placa,
            modelo,
            chassi,
            renavam,
            marca,
            ano
          })
          this.listCars.push({ano, id, renavam, chassi,marca,modelo,placa, date: new Date(created_at).toLocaleDateString(
            'pt-br',
          )})
        })
      });

      this.id = id
    }

  }

  ngOnInit(): void {
    this.myFrom = this.fb.group({
      id: '',
      placa: '',
      modelo: '',
      chassi: '',
      renavam: '',
      marca: '',
      ano: '',
    })
  }


  validateFields(){
    if(this.myFrom.value.placa != ''
      && this.myFrom.value.modelo != ''
      && this.myFrom.value.chassi != ''
      && this.myFrom.value.renavam != ''
      && this.myFrom.value.marca != ''
      && this.myFrom.value.ano != ''
      ){
        return false
    }else{
      return true
    }
  }

  updateCar(){
    if(this.car != undefined){
      this.service.updateCar(this.myFrom.value).subscribe((response)=>{
        window.history.back()
      })
    }else{
      alert("fill in all fields")
    }
  }

  saveCar(){
    if(this.car != undefined){
      this.service.saveCar(this.myFrom.value).subscribe((response)=>{
        window.history.back()
      })
    }else{
      alert("fill in all fields")
    }
  }
}
