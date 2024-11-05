import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = 'http://localhost:8080/api/marca';

  constructor(private http: HttpClient) {}

  
  getMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }

  getMarcaById(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.apiUrl}/${id}`); 
  }

  createMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, marca);
  }

  
  updateMarca(marca: Marca): Observable<Marca> {
    return this.http.put<Marca>(`${this.apiUrl}/${marca.id}`,marca); 
  }

  deleteMarca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); 
  }
}