export class Pendencia{

  constructor(
    public id: number,
    public id_usuario_adm: number,
    public nome_usuario_adm: number,
    public id_status_pendencia: number,
    public assunto: string,
    public descricao: string,
    public cod: string,
    public data_criacao: string,
    public data_limite: string,
    public porcetagem: number
  ){}
}
