export class Usuario {

  constructor(
    public id: number,
    public fk_cargo_usuario: number,
    public cargo: string,
    public fk_funcao: number,
    public funcao: string,
    public nome:string,
    public email: string,
    public senha: string
  ){}
}
