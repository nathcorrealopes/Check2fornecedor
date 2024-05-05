import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fornecedores } from '../../interfaces/fornecedores';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FornecedorService } from '../../services/fornecedores.service';

@Component({
  selector: 'app-fornecedores-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fornecedores-edit.component.html',
  styleUrl: './fornecedores-edit.component.css'
})
export class FornecedoresEditComponent {
  fornecedor?:Fornecedores;
  fornecedorForm: FormGroup = new FormGroup({})

  constructor(private route: ActivatedRoute, private fornecedorService:FornecedorService, private formbuilder : FormBuilder){
    this.getClientById()
  }

  id?:string;
  getClientById(){
    this.id = this.route.snapshot.paramMap.get('id') ?? ''
    this.fornecedorService.getById(this.id).subscribe((fornecedorResponse) => this.fornecedor = fornecedorResponse)

    this.fornecedorForm = this.formbuilder.group({
      nome: [this.fornecedor?.nome],
      telefone: [this.fornecedor?.telefone],
      endereco: [this.fornecedor?.endereco],
      id: [this.fornecedor?.id]
    })

  }

  update():void{
    if(this.fornecedorForm.valid){
      const fornecedorAlterado:Fornecedores = {
        nome: this.fornecedorForm.value.nome,
        telefone: this.fornecedorForm.value.telefone,
        endereco: this.fornecedorForm.value.endereco,
        id: this.fornecedorForm.value.id
      }
      this.fornecedorService.atualizar(fornecedorAlterado).subscribe()
      alert('Fornecedor alterado com sucesso')
    }
  }
}
