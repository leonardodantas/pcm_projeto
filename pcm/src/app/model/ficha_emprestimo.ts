export class FichaEmprestimo{

  constructor(
    public id: number,
    public usuario_id_user: number,
    public id_emprestimo: number,
    public data_requisicao: string,
    public data_emprestimo: string,
    public data_devolucao: string,
    public motivo_emprestimo: string,
    public status_devolucao: string,
    public status_requisicao: string
  ){}
}
