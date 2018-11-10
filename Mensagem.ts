import { Usuario } from "./Usuario";

export class Mensagem{
    private emissor : Usuario;
    private texto : string;
    private leitores: Array<Usuario>;

    public constructor(emissor: Usuario, texto: string){
        this.emissor = emissor;
        this.texto = texto;
        this.leitores = [this.emissor];
    }

    public getEmissor(): Usuario{
        return this.emissor;
    }

    public setId(emissor : Usuario): void{
        this.emissor = emissor;
    }

    public getTexto(): string{
        return this.texto;
    }

    public setTexto(texto : string): void{
        this.texto =  texto;
    }

    public getLeitores() : Usuario[]{
        return this.leitores;
    }

    public setLeitores(leitores : Usuario[]): void{
        this.leitores = leitores;
    }

    public buscarLeitor(nome: string): Usuario | undefined{
        for(let i of this.leitores){
            if(i.getNome() == nome){
                return i;
            }
        }
        return undefined;
    }

    public toString(): string{
        let res: string = "";
        res += this.emissor.getNome() + ":" + this.texto;
        return res;

    }

    


}