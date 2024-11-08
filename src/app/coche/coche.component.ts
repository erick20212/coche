import { Component, OnInit } from '@angular/core';
import { Coche, Tipo, Marca } from '../models/coche';
import { CocheService } from '../services/coche.service';
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
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-coche',
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
    CardModule,
    DropdownModule
  ],
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CocheComponent implements OnInit {
  coches: Coche[] = [];
  coche: Coche = { id: 0, placa: '', puertas: '', tipo: { id: 0, nombre: '' }, marca: { id: 0, nombre: '' } };
  tipos: Tipo[] = [];
  marcas: Marca[] = [];
  cocheDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private cocheService: CocheService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    console.log("Inicializando CocheComponent...");
    this.loadCoches();
    this.loadTipos();
    this.loadMarcas();
  }

  loadCoches(): void {
    this.cocheService.getCoches().subscribe(
      (data: Coche[]) => {
        console.log("Coches cargados:", data);
        this.coches = data;
      },
      (error: any) => {
        console.error("Error al cargar los coches", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los coches', life: 3000 });
      }
    );
  }

  loadTipos(): void {
    this.cocheService.getTipos().subscribe(
      (data: Tipo[]) => {
        console.log("Tipos cargados:", data);
        this.tipos = data;
      },
      (error: any) => {
        console.error("Error al cargar los tipos", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los tipos', life: 3000 });
      }
    );
  }

  loadMarcas(): void {
    this.cocheService.getMarcas().subscribe(
      (data: Marca[]) => {
        console.log("Marcas cargadas:", data);
        this.marcas = data;
      },
      (error: any) => {
        console.error("Error al cargar las marcas", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las marcas', life: 3000 });
      }
    );
  }

  openNew() {
    console.log("Abriendo diálogo para nuevo coche.");
    this.coche = { id: 0, placa: '', puertas: '', tipo: { id: 0, nombre: '' }, marca: { id: 0, nombre: '' } };
    this.submitted = false;
    this.cocheDialog = true;
  }

  hideDialog() {
    console.log("Cerrando diálogo.");
    this.cocheDialog = false;
    this.submitted = false;
  }

  saveCoche() {
    this.submitted = true;

    if (this.coche.placa.trim()) {
      if (this.coche.id) {
        console.log("Actualizando coche existente:", this.coche);
        this.cocheService.updateCoche(this.coche).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Coche actualizado', life: 3000 });
            this.loadCoches();
          },
          (error: any) => {
            console.error("Error al actualizar el coche", error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el coche', life: 3000 });
          }
        );
      } else {
        console.log("Creando nuevo coche:", this.coche);
        this.cocheService.createCoche(this.coche).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Coche creado', life: 3000 });
            this.loadCoches();
          },
          (error: any) => {
            console.error("Error al crear el coche", error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el coche', life: 3000 });
          }
        );
      }

      this.cocheDialog = false;
      this.coche = { id: 0, placa: '', puertas: '', tipo: { id: 0, nombre: '' }, marca: { id: 0, nombre: '' } };
    }
  }

  editCoche(coche: Coche) {
    console.log("Editando coche:", coche);
    this.coche = { ...coche };
    this.cocheDialog = true;
  }

  deleteCoche(coche: Coche) {
    console.log("Intentando eliminar coche:", coche);
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar este coche?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cocheService.deleteCoche(coche.id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Coche eliminado', life: 3000 });
            this.loadCoches();
          },
          (error: any) => {
            console.error("Error al eliminar el coche", error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el coche', life: 3000 });
          }
        );
      }
    });
  }
}
