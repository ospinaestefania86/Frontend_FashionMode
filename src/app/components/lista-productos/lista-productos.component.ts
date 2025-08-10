import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-productos.html',
  styleUrls: ['./lista-productos.css'],
})
export class ListaProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  editarProducto(id: string) {
    this.router.navigate(['/editar', id]);
  }

  eliminarProducto(id: string) {
    if (confirm('¿Estás segura de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.productos = this.productos.filter((p) => p.id !== id);
      });
    }
  }
  productoSeleccionado: any = null;
  modalVisible = false;

  verProducto(id: string) {
    const producto = this.productos.find((p) => p.id === id);
    if (producto) {
      this.productoSeleccionado = producto;
      this.modalVisible = true;
    }
  }

  cerrarModal() {
    this.modalVisible = false;
    this.productoSeleccionado = null;
  }
}
