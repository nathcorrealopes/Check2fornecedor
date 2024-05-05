import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Fornecedores } from '../interfaces/fornecedores';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private fornecedoresUrl = "http://localhost:3000/fornecedores"
  constructor(private http:HttpClient) {

  }

  httpHeader = {
    headers:{
      "Content-Type":"Application/json"
    }
  }

  atualizar(fornecedor:Fornecedores){
    return this.http.put(`${this.fornecedoresUrl}/${fornecedor.id}`, fornecedor, this.httpHeader)
  }

  //Esta lista virá da API
  clientes:Fornecedores[] = [];

  listar():Observable<Fornecedores[]>{
    return this.http.get<Fornecedores[]>(this.fornecedoresUrl) as Observable<Fornecedores[]>
    //return this.clientes;
  }

  remover(id:string){
    return this.http.delete(`${this.fornecedoresUrl}/${id}`)
  }

  adicionar(fornecedor:Fornecedores){
    return this.http.post(this.fornecedoresUrl, fornecedor, this.httpHeader)
  }

  getById(id:string):Observable<Fornecedores>{
    return this.http.get(`${this.fornecedoresUrl}/${id}`) as Observable<Fornecedores>
  }
}