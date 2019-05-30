class RealTime{

  public qtd: number

  public manutencaoAndamento: number
  public manutencaoNovas: number

  public requisicaoEspera: number

  public qtdPendenciaAguar: number

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

  public adicionarRequisicaoNovas(requisicao: number): void{
    this.requisicaoEspera = requisicao
  }

  public getRequisicaoNovas(): number{
    return this.requisicaoEspera
  }

  public diminuirRequisicoes(): void{
    this.requisicaoEspera = this.requisicaoEspera - 1
  }

  public adicionarPendenciasAguard(qtdPendencias: number): void{
    this.qtdPendenciaAguar = qtdPendencias
  }

  public diminuirPendenciasAguard(): void{
    this.qtdPendenciaAguar = this.qtdPendenciaAguar - 1
  }

  public getQtdPendenciasAguard(): number{
    return this.qtdPendenciaAguar
  }
}

export {RealTime}
