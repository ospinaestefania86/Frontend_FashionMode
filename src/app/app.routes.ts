import { Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ListaProductosComponent },
  { path: 'crear', component: CrearProductoComponent },
  { path: 'editar/:id', component: EditarProductoComponent },
];
