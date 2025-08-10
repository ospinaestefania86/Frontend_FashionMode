import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/${id}`);
  }

  crearProducto(data: any): Observable<any> {
    let producto = {
      nombre: data.nombre,
      precio: data.precio,
      descripcion: data.descripcion,
    };

    // la API externa simula la creacion de un producto pero no lo agrega al servidor

    return this.http.post(`${this.apiUrl}/productos`, producto);
  }

  actualizarProducto(id: string, data: any): Observable<any> {
    // Actualizar un producto no lo actualiza en el servidor.
    // Simula una solicitud PUT/PATCH y devuelve el producto actualizado con los datos modificados.

    let producto = {
      nombre: data.nombre,
      precio: data.precio,
      descripcion: data.descripcion,
    };
    return this.http.put(`${this.apiUrl}/productos/${id}`, producto);
  }

  eliminarProducto(id: string): Observable<any> {
    // La API externa simula la eliminación de un producto pero no lo elimina del servidor.

    return this.http.delete(`${this.apiUrl}/productos/${id}`);
  }
}
