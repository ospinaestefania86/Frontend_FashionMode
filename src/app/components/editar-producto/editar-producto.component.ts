import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-producto.html',
  styleUrls: ['./editar-producto.css'],
})
export class EditarProductoComponent {
  form;
  id: string = '';
  producto: any;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: [null, [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.id = this.router.url.split('/').pop() || '';
    this.productoService.obtenerProducto(this.id).subscribe((data) => {
      this.producto = data;
      this.form.patchValue({
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        descripcion: this.producto.descripcion,
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.productoService
        .actualizarProducto(this.id, this.form.value)
        .subscribe((response) => {
          console.log('Producto actualizado satisfactoriamente:', response);
          this.router.navigate(['/productos']);
        });
    }
  }
}
