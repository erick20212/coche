import { Component, OnInit } from '@angular/core';
import { Marca } from '../models/marca';
import { MarcaService } from '../services/marca.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SiderbarComponent } from '../siderbar/siderbar.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-marca',
  standalone: true,
  imports: [
    TableModule, 
    DialogModule, 
    ButtonModule, 
    ToolbarModule, 
    CommonModule, 
    FormsModule, 
    ToastModule, 
    ConfirmDialogModule,
    SiderbarComponent,
    CardModule
  ],
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MarcaComponent implements OnInit {
  marcas: Marca[] = [];
  marca: Marca = { id: 0, nombre: '' };
  marcaDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private marcaService: MarcaService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    console.log("Componente MarcaComponent inicializado.");
    this.loadMarcas();
  }

  loadMarcas(): void {
    console.log("Intentando cargar marcas...");
    this.marcaService.getMarca().subscribe(
      (data) => {
        console.log('Marcas cargadas:', data);
        this.marcas = data;
        if (data.length === 0) {
          console.warn('No hay marcas disponibles en el backend.');
        }
      },
      (error) => {
        console.error('Error al cargar las marcas', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las marcas', life: 3000 });
      }
    );
  }

  openNew() {
    console.log("Abriendo diálogo para nueva marca.");
    this.marca = { id: 0, nombre: '' };
    this.submitted = false;
    this.marcaDialog = true;
  }

  hideDialog() {
    console.log("Cerrando diálogo.");
    this.marcaDialog = false;
    this.submitted = false;
  }

  saveMarca() {
    this.submitted = true;

    if (this.marca.nombre.trim()) {
      if (this.marca.id) {
        console.log("Actualizando marca existente:", this.marca);
        this.marcaService.updateMarca(this.marca).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca actualizada', life: 3000 });
          this.loadMarcas();
        }, (error) => {
          console.error('Error al actualizar la marca', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la marca', life: 3000 });
        });
      } else {
        console.log("Creando nueva marca:", this.marca);
        this.marcaService.createMarca(this.marca).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca creada', life: 3000 });
          this.loadMarcas();
        }, (error) => {
          console.error('Error al crear la marca', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la marca', life: 3000 });
        });
      }

      this.marcaDialog = false;
      this.marca = { id: 0, nombre: '' };
    }
  }

  editMarca(marca: Marca) {
    console.log("Editando marca:", marca);
    this.marca = { ...marca };
    this.marcaDialog = true;
  }

  deleteMarca(marca: Marca) {
    console.log("Intentando eliminar marca:", marca);
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar esta Marca?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.marcaService.deleteMarca(marca.id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca eliminada', life: 3000 });
            this.loadMarcas();
          },
          (error) => {
            console.error('Error al eliminar la Marca', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la Marca', life: 3000 });
          }
        );
      }
    });
  }
}
