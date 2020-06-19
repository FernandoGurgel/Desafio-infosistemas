import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private API_URL = environment.API+"/cars";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
    .get(this.API_URL);
  }

  getById(id) {
    return this.http
    .get(`${this.API_URL}/${id}`);
  }

  saveCar(car) {
    return this.http
    .post(this.API_URL, car);
  }

  updateCar(car) {
    return this.http
    .put(`${this.API_URL}/${car.id}`, car);
  }

  deleteCar(car) {
    return this.http
    .delete(`${this.API_URL}/${car.id}` )
  }

}
