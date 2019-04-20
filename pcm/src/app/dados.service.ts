import { Usuario } from "./model/usuario";

export class DadosService{
  public usuarios: Usuario[]

  public qtdUser(): number{
    return this.usuarios.length
  }

  public popularUser(usuarios: Usuario): void{
    let usuario: Usuario =  new Usuario(
      usuarios.id,
      usuarios.fk_cargo_usuario,
      usuarios.cargo,
      usuarios.nome,
      usuarios.email,
      null
    )

    this.usuarios.push(usuarios)
  }
}

