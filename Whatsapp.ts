declare function require(name: string): any;
var input = require('readline-sync');

import { Usuario } from "./Usuario";
import { Chat } from "./Chat";
import { Mensagem } from "./Mensagem";

export class Whatsapp{
    private usuarios : Array<Usuario>;
    private chats : Array<Chat>;

    public construtor(usuarios : Array<Usuario> = [], chats : Array<Chat> = []){
        this.usuarios = usuarios;
        this.chats = chats;
    }

    public getUsuarios(): Usuario[]{
        return this.usuarios;
    }

    public setUsuarios(usuarios : Usuario[]): void{
        this.usuarios = usuarios;
    }

    public getChats(): Chat[]{
        return this.chats;
    }

    public setChats(chats : Chat[]): void{
        this.chats = chats;
    }

    public addUsuario(nome: string): boolean{
        if(this.buscarUsuario(nome) != undefined){
            return false;
        }else{
            this.usuarios.push(new Usuario(nome)); //aad Usuario na lista de usuarios
            return true;
        }
    }

    public addGrupo(nome: string, usuario: string): number{
        let grup: Usuario | undefined = this.buscarUsuario(usuario);

        if(this.buscarGrupo(nome) != undefined){
            return 1;
        }else if(this.buscarUsuario == undefined){
            return 2;
        }
        else{
            let g: Chat | undefined = (new Chat(nome));

            this.chats.push(g);
            g.getUsuarios().push(grup);
            return 3;
        }
    }

    public addUserGrupo(adm: string, usuario: string, grupo: string): number{
        let userAdm: Usuario = this.buscarUsuario(adm);
        let user: Usuario = this.buscarUsuario(usuario);
        let grup: Chat = this.buscarGrupo(grupo);

        if(userAdm == undefined){
            return 1; // adm não existe
        }else if(user == undefined){
            return 2; //usuario não existe
        }else if(grup == undefined){
            return 3; //grupo não existe
        }else if(grup.buscarUsuario(usuario) != undefined){
            return 4; //pessoa já existe no grupo
        }else if(grup.buscarUsuario(adm) == undefined){
            return 5; //adm não está no grupo
        }else{
            grup.getUsuarios().push(user);
            return 0; // inserido com sucesso
        }
    }

    public enviarMensagem(texto: string, usuario: string, grupo: string): number{
        let p: Usuario = this.buscarUsuario(usuario);
        let g: Chat = this.buscarGrupo(grupo);

        if(p == undefined){
            return 1; // pessoa não existe
        }else if(g == undefined){
            return 2; // grupo não existe
        }else if(g.buscarUsuario(usuario) == undefined){
            return 3; //pessoa não está no grupo
        }else{
            g.getMensagens().push(new Mensagem(p, texto));
            return 0;
        }
    }

    
    public buscarMensagemNovas(usuario: string, grupo: string): Mensagem[] | number{
        let p: Usuario = this.buscarUsuario(usuario);
        let g: Chat = this.buscarGrupo(grupo);
        let res: Array<Mensagem> = [];

        if(p == undefined){
            return 1; //pessoa não existe
        }else if(g == undefined){
            return 2; //grupo não existe
        }else if(g.buscarUsuario(usuario) == undefined){
            return 3; //pessoa não está no grupo
        }else{
            for(let m of g.getMensagens()){
                if(m.buscarLeitor(usuario) == undefined){
                    res.push(m);
                    m.getLeitores().push(p);
                }
            }
        }
        return res;
    }

    public lerMensagens(usuario: string, grupo: string): string{
        let r: Mensagem[] | number = this.buscarMensagemNovas(usuario, grupo);
        let res: string = "";
        if(r == 1){
            return "Pessoa não existe.";
        }else if(r == 2){
            return "Grupo não existe.";
        }else if(r == 3){
            return "Pessoa não está no grupo.";
        }else{
            let l : Mensagem[] = r;
            for(let i of l){
                res += i.toString() + "\n";
            }
            return res;
        }
    }
    

    public buscarGrupo(nome: string): Chat | undefined{
        for(let i of this.chats){
            if(i.getNome() == nome){
                return i;
            }
        }
        return undefined;
    }

    public buscarUsuario(nome: string): Usuario | undefined{
        for(let i of this.usuarios){
            if(i.getNome() == nome){
                return i;
            }
        }
        return undefined;
    }

    public mostrarUsers(): string{
        let res : string = "";

        for(let i of this.usuarios){
            res += i.getNome() + " ";
        }
        return res;
    }

    public deletarUsuario(nome: string): boolean{
        for(let i = 0; i < this.usuarios.length; i++){
            if(this.usuarios[i].getNome() == nome){
                this.usuarios.slice(i, 1);
                return true;
            }
        }
        return false;
    }

    public init(){
        let grups : Chat;
        let users : Usuario;
        let cmd : string;
        let help : string = "1 - Adicionar usuário \n"
        + "2 - Mostrar usuários \n"
        + "3 - Criar grupo \n"
        + "4 - Mostrar grupo de determinado usuário \n"
        + "5 - Adicionar usuário ao grupo \n"
        + "6 - Mostrar usuários do grupo \n"
        + "7 - Sair do grupo \n"
        + "8 - Mandar mensagem \n"
        + "9 - Ler mensagens \n";

        let n : string = null;
        let ng : string = null;

        while(true){
            cmd = input.question("Digite o caminho ou sair: ");
            if(cmd == "sair"){
                console.log("Tchau, volte sempre!");
                break;
            }
            switch(cmd){
                case "1":
                    n = input.question("Digite o nome do usuário: ");
                    this.addUsuario(n);
                    break;

                case "2":
                    this.mostrarUsers();
                    break;
                
                case "3":
                    n = input.question("Digite o nome do usuário: ");
                    ng = input.question("Digite o nome do grupo: ");
                    if(this.addGrupo(n, ng) == 1){
                        console.log("Grupo já existe.");
                    }else if(this.addGrupo(n, ng) == 2){
                        console.log("Grupo não existe.");
                    }else{
                        console.log("Grupo criado com sucesso.");
                    }
                    break;

                case "4":
                    n = input.question("Digite o nome do usuário: ");
                    users.mostrarChat();
                    break;

                case "5":
                    let nadm : string = input.question("Digite o nome do adm: ");
                    n = input.question("Digite o nome do usuário: ");
                    ng = input.question("Digite o nome do grupo: ");
                    if(this.addUserGrupo(nadm, n, ng) == 1){
                        console.log("Administrador não existe.");
                    }else if(this.addUserGrupo(nadm, n, ng) == 2){
                        console.log("Usuário não existe.");
                    }else if(this.addUserGrupo(nadm, n, ng) == 3){
                        console.log("Grupo não existe.");
                    }else if(this.addUserGrupo(nadm, n, ng) == 4){
                        console.log("Usuários já existe.");
                    }else if(this.addUserGrupo(nadm, n, ng) == 5){
                        console.log("Administrador não está no grupo");  
                    }else if(this.addUserGrupo(nadm, n, ng) == 0){
                        console.log("Inserido com sucesso.")
                    }                  
                    break;

                case "6":
                    ng = input.question("Digite o nome do grupo: ");
                    grups.mostrarUsersGrupos();
                    break;

                case "7":
                    ng = input.question("Digite o nome do grupo: ");
                    n = input.question("Digite o nome do usuário: ");
                    grups = this.buscarGrupo(ng);
                    grups.sairGrupo(n);

                case "8":
                    ng = input.question("Digite o nome do grupo: ");
                    n = input.question("Digite o nome do usuário: "); 
                    let txt : string = input.question("Digite a mensagem: ");
                    this.enviarMensagem(txt, ng, n);

                case "9":
                    ng = input.question("Digite o nome do grupo: ");
                    n = input.question("Digite o nome do usuário: "); 
                    this.buscarMensagemNovas(n, ng);
                    this.lerMensagens(ng, n);

                default:
                    console.log("Comando não existe.");

            }
        }
    }


}