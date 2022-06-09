import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Arreglos, Gastos } from '../interfaces/facturacion';
import { Gasto } from '../interfaces/facturacion';
import { Arreglo } from '../interfaces/facturacion';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  baseurl= "http:/localhost:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  arreglos:Arreglos[]=[]
  gastos:Gastos[]=[]

  constructor(private serv:HttpClient) { }

  getGastosPorFecha(inicio:Date,fin:Date){
    return this.serv.get<Gastos[]>
    ('http://127.0.0.1:8000/facturacion/gastosPorFecha?inicio='+inicio+'&fin='+fin,
    {headers: this.httpHeaders}
    ).subscribe(
      data => {
        console.log("DATA DE GASTOS POR FECHA");
        console.log(data);
          //Aqui mapear los gastos y arreglos y append a las variables del servicio
        },
        error => {
          console.log(error);
        }
    );;
  }
  getGastosTotales(){
    return this.serv.get<Gasto[]>('http://127.0.0.1:8000/facturacion/gastos')
  }

  getArreglosTotales(){
    return this.serv.get<Arreglo[]>('http://127.0.0.1:8000/arreglo/arreglos')
  }

  getArreglos(){
    return this.arreglos;
  }
  getGastos(){
    return this.gastos;
  }

  mandarCorreo(nombre:string,apellidos:string,mail:string,tfn:string,vehiculo:string,motivo:string){
    return this.serv.post('http://127.0.0.1:8000/cliente/formularioContacto/',
    {"nombre":nombre,"apellidos":apellidos,"mail":mail,"tfn":tfn,"vehiculo":vehiculo,"motivo":motivo}).subscribe()
  }
}
