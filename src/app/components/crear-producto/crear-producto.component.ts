import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-producto.html',
  styleUrls: ['./crear-producto.css'],
})
export class CrearProductoComponent {
  form: FormGroup;

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

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.productoService.crearProducto(this.form.value).subscribe({
      next: (response) => {
        console.log('producto creado satisfactoriamente:', response);
        this.router.navigate(['/productos']);
      },
      error: (error) => {
        console.error('Error creando producto:', error);
      },
    });
  }
}
