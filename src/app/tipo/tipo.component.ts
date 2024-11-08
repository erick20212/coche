import { Component, OnInit } from '@angular/core';
import { Tipo } from '../models/tipo';
import { TipoService } from '../services/tipo.service';
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
  selector: 'app-tipo',
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
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TipoComponent implements OnInit {
  tipos: Tipo[] = [];
  tipo: Tipo = { id: 0, nombre: '' };
  tipoDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private tipoService: TipoService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    console.log("Inicializando TipoComponent y cargando tipos...");
    this.loadTipos();
  }

  loadTipos(): void {
    this.tipoService.getTipo().subscribe(
      (data) => {
        console.log('Tipos cargados:', data);
        this.tipos = data;
      },
      (error) => {
        console.error('Error al cargar los tipos', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los tipos', life: 3000 });
      }
    );
  }

  openNew() {
    console.log("Abriendo diálogo para nuevo tipo.");
    this.tipo = { id: 0, nombre: '' };
    this.submitted = false;
    this.tipoDialog = true;
  }

  hideDialog() {
    console.log("Cerrando diálogo.");
    this.tipoDialog = false;
    this.submitted = false;
  }

  saveTipo() {
    this.submitted = true;

    if (this.tipo.nombre.trim()) {
      if (this.tipo.id) {
        // Actualizar tipo existente
        console.log("Actualizando tipo existente:", this.tipo);
        this.tipoService.updateTipo(this.tipo).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo actualizado', life: 3000 });
          this.loadTipos();
        }, (error) => {
          console.error('Error al actualizar el tipo', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el tipo', life: 3000 });
        });
      } else {
        // Crear nuevo tipo
        console.log("Creando nuevo tipo:", this.tipo);
        this.tipoService.createTipo(this.tipo).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo creado', life: 3000 });
          this.loadTipos();
        }, (error) => {
          console.error('Error al crear el tipo', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el tipo', life: 3000 });
        });
      }

      this.tipoDialog = false;
      this.tipo = { id: 0, nombre: '' };
    }
  }

  editTipo(tipo: Tipo) {
    console.log("Editando tipo:", tipo);
    this.tipo = { ...tipo };
    this.tipoDialog = true;
  }

  deleteTipo(tipo: Tipo) {
    console.log("Intentando eliminar tipo:", tipo);
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar este Tipo?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tipoService.deleteTipo(tipo.id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo eliminado', life: 3000 });
            this.loadTipos();
          },
          (error) => {
            console.error('Error al eliminar el tipo', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el tipo', life: 3000 });
          }
        );
      }
    });
  }
}
