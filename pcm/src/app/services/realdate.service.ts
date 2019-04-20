class RealTime{

  public qtd: number

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
}

export {RealTime}
