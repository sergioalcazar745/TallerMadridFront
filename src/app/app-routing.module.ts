import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturacionComponent } from './modulo-admin/facturacion/facturacion.component';
import { VehiculosComponent } from './modulo-admin/vehiculos/vehiculos.component';
import { ContactoComponent } from './modulo-paginas/contacto/contacto.component';
import { HomeComponent } from './modulo-paginas/home/home.component';
import { InicioSesionComponent } from './modulo-paginas/inicio-sesion/inicio-sesion.component';
import { ServiciosComponent } from './modulo-paginas/servicios/servicios.component';
import { UbicacionComponent } from './modulo-paginas/ubicacion/ubicacion.component';
import { ClientesComponent } from './modulo-admin/clientes/clientes.component';
import { ClientesDetalleComponent } from './modulo-admin/clientes/clientes-detalle/clientes-detalle.component';
import { VehiculosDetalleComponent } from './modulo-admin/vehiculos/vehiculos-detalle/vehiculos-detalle.component';
import { ArregloComponent } from './modulo-admin/arreglo/arreglo.component';
import { ArregloDetalleComponent } from './modulo-admin/arreglo/arreglo-detalle/arreglo-detalle.component';
import { GraficaComponent } from './modulo-admin/grafica/grafica.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent
  },
  {
    path:'contacto',
    component: ContactoComponent
  },
  {
    path:'ubicacion',
    component: UbicacionComponent
  },
  {
    path:'servicios',
    component: ServiciosComponent
  },
  {
    path:'inicio-sesion',
    component: InicioSesionComponent
  },
  {
    path:'clientes',
    component: ClientesComponent
  },
  {
    path:'facturacion',
    component: FacturacionComponent
  },
  {
    path:'vehiculos',
    component: VehiculosComponent
  },
  {
    path:'arreglos',
    component: ArregloComponent
  },
  {
    path:'arreglo-detalle/:id',
    component: ArregloDetalleComponent
  },
  {
    path:'clientes-detalle/:dni',
    component: ClientesDetalleComponent
  },
  {
    path:'vehiculos-detalle/:matricula',
    component: VehiculosDetalleComponent
  },
  {
    path:"grafica",
    component: GraficaComponent
  },
  {
    path:'**',
    redirectTo: 'inicio'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
