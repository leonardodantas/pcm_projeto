class RealTime{

  public qtd: number

  public manutencaoAndamento: number
  public manutencaoNovas: number

  constructor(){}

  public getQtd(): number{

    return this.qtd
  }

  public popularQtdUser(qtd: number){
    this.qtd = qtd
  }

  public removeQtd(): void{
    let nQtd = this.getQtd()
    this.qtd = nQtd - 1
  }

  public popularManutencao(novas: number, andamento: number): void{

    //console.log(novas, andamento)

    if(novas !== undefined){

      this.manutencaoNovas = novas
    }

    if(andamento !== undefined){

      this.manutencaoAndamento = andamento
    }
  }

  public getManuNovas(): number{
    return this.manutencaoNovas
  }

  public getManuAndamento(): number{
    return this.manutencaoAndamento
  }

  public aumentarManuAndamento(): void{
    this.manutencaoAndamento += 1;
  }

  public diminuirNovas(): void{
    this.manutencaoNovas = this.manutencaoNovas - 1
  }

  public diminuirAndamento(): void{
    this.manutencaoAndamento = this.manutencaoAndamento - 1
  }
}

export {RealTime}
