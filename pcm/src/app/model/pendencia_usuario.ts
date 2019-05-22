export class PendenciaUsuario{

  constructor(
    public id: number,
    public id_usuario: number,
    public id_pendencia: number,
    public descricao: string,
    public assunto: string,
    public cod: string,
    public data_criacao: string,
    public data_limite: string,
    public porcentagem: number,
    public email: string,
    public nome: string,
    public status: string,
    public porc_total_atual: number,
    public atualizacao: string
  ){}
}
