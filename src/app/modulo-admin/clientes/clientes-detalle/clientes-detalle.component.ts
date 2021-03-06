import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/user';
import { VehiculoSimple } from 'src/app/interfaces/vehiculo';
import { ClienteService } from 'src/app/services/cliente.service';
import { VehiculoService } from 'src/app/services/vehiculos.service';

@Component({
  selector: 'app-clientes-detalle',
  templateUrl: './clientes-detalle.component.html',
  styleUrls: ['./clientes-detalle.component.scss']
})
export class ClientesDetalleComponent implements OnInit {

  cliente:Cliente;
  clienteUpdate:Cliente;
  nombre:string;
  apellidos:string;
  email:string;
  telefono:string;
  calle:string;
  dni:string;

  vehiculo:VehiculoSimple;

  title:string="¿Estas seguro de eliminar este cliente?";
  titleError:string="";

  rows = [];
  temp = [];
  columns = [{ name: 'Marca' }, { name: 'Modelo' }, { name: 'Color' }, { name: 'Matricula' }];
  constructor(private route: ActivatedRoute, private cilenteService : ClienteService, private vehiculoService : VehiculoService, private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.router.navigateByUrl('/inicio')
    }
    this.route.params.subscribe((param) => {
      //console.log("parametros" + Object.values(param));
      this.cilenteService.getCliente(Object.values(param).toString()).subscribe((data) => {
        this.cliente = data;
        this.cargarCliente();
        this.cargarVehiculo();
      });
    });    
  }

  cargarVehiculo(){
    this.rows = [];
    this.temp = [];
    this.vehiculoService.getVehiculoByDni(this.dni).subscribe((data) => {
      console.log("DATA: " + data)
      this.temp = [...data]
      this.rows = data;
    });
  }

  onClickRow(event){
    console.log("EventoFila :" + event)
    this.router.navigate(["/vehiculos-detalle/", event.matricula]);
  }

  cargarCliente(){
    this.nombre = this.cliente.nombre;
    this.apellidos = this.cliente.apellidos;
    this.email = this.cliente.email;   
    this.telefono = this.cliente.telefono;
    this.calle = this.cliente.calle;
    this.dni = this.cliente.dni;
  }

  filter(event){
    const temp = this.temp.filter(function (d) {
      return d.matricula.indexOf(event) !== -1 || !event;
    });
    this.rows = temp;
  }

  delete(){
    this.cilenteService.deleteCliente(this.dni).subscribe(data => {
      alert("DataDelete: " + Object.values(data))
      document.getElementById("closeConfirmacion").click();
      this.router.navigateByUrl("/clientes")
    },
    error => {
      this.errorDialog(error.error.mensaje, "")
    })    
  }

  edit(){   
    alert("Entro") 
    this.clienteUpdate = {"nombre":this.nombre, "apellidos":this.apellidos, "calle":this.calle, "dni":this.dni, "email":this.email, "telefono":this.telefono}
    this.cilenteService.updateCliente(this.clienteUpdate).subscribe((data) =>{      
      alert("EntroData: "+ Object.values(data)) 
      console.log("DatitaUpdate: " + Object.values(data))
      this.router.navigateByUrl("/clientes")
    },
    (error) => {
      alert("Error")
      this.errorDialog(error.error.mensaje, "edit")
    })
  }

  add(event){
    this.vehiculo = event;
    this.vehiculo.cliente = this.dni;
    this.vehiculoService.saveVehiculo(this.vehiculo).subscribe(data =>{
      console.log("DataVehiculo: " + Object.values(data))
      document.getElementById("close").click()
      this.router.navigateByUrl("/clientes")
    },
    error => {
      this.errorDialog(error.error.mensaje, "edit")
    })
  }

  return(){
    this.router.navigateByUrl("/clientes")
  }

  errorDialog(texto, tipo:string){
    if(tipo == "edit"){
      for (const key in texto) {
        this.titleError = texto[key];
        break;
      }
      document.getElementById("botonError").click()
    }else{
      document.getElementById("closeConfirmacion").click();
    }    
  }
}
