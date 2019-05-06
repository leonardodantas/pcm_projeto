import { DatePipe } from "@angular/common";

export class ManutencaoEquipamento{

  constructor(
    public id: number,
    public id_equipamento: number,
    public id_usuario: number,
    public nome: string,
    public descricao_envio_user: string,
    public descricao_atual_manu: string,
    public descricao_final_manu: string,
    public data_envio: string,
    public data_realizado: string,
    public status: string
  ){}
}
