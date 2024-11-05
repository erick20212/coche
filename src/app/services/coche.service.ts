import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coche, Marca, Tipo } from '../models/coche';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
  private apiUrl = 'http://localhost:8080/api/coche';
  private tipoUrl = 'http://localhost:8080/api/tipo';
  private marcaUrl = 'http://localhost:8080/api/marca';

  constructor(private http: HttpClient) {}

  // Obtener todos los coches
  getCoches(): Observable<Coche[]> {
    return this.http.get<Coche[]>(this.apiUrl);
  }

  // Obtener todos los tipos
  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.tipoUrl);
  }

  // Obtener todas las marcas
  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.marcaUrl);
  }

  // Crear un coche
  createCoche(coche: Coche): Observable<Coche> {
    return this.http.post<Coche>(this.apiUrl, coche);
  }

  // Actualizar un coche existente
  updateCoche(coche: Coche): Observable<Coche> {
    return this.http.put<Coche>(`${this.apiUrl}/${coche.id}`, coche);
  }

  // Eliminar un coche
  deleteCoche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
