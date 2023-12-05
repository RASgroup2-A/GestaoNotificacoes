var mongoose = require('mongoose');

class NotificationsService{

    constructor(notificationDB){
        this.notificationsDB = notificationDB
    }

    /*Guardar notificação da adicao de um novo docente*/
    async notifyNewDocenteAccount(nome,n_mecanografico,email){
        const docente = {"_id":mongoose.Types.ObjectId(),"notificacao":"registo docente","numero":n_mecanografico,
        "email":email,"nome":nome,"lida":false};
        return this.notificationsDB.saveDocenteNotification(docente);
    }

    /*Guardar notificações da adições de novos docentes*/
    async notifyNewDocenteAccounts(docentes){
        notificacoes = []
        for (let i = 0; i < docentes.length; i++) {
            notificacoes.push(this.notifyNewDocenteAccount(docentes[i].nome,docentes[i].n_mecanografico,docentes[i].email));    
        }          
        return notificacoes
    }

    /*Guardar notificação da adicao de um novo aluno*/
    async notifyNewAlunoAccount(nome,n_mecanografico,email){
        const aluno = {"_id":mongoose.Types.ObjectId(),"notificacao":"registo aluno","numero":n_mecanografico,
        "email":email,"nome":nome,"lida":false};
        return this.notificationsDB.saveAlunoNotification(aluno);
    }

    /*Guardar notificações da adições de novos alunos*/
    async notifyNewAlunoAccounts(alunos){
        for (let i = 0; i < alunos.length; i++) {
            this.notifyNewAlunoAccount(alunos[i].nome,alunos[i].n_mecanografico,alunos[i].email);    
        }          
    }

    /*Filtrar todas as notificações correspondentes a um determinado user.*/
    async getNotifications(idUser){
        return this.notificationsDB.getallNotifications(idUser)
    }

    /*Filtrar todas as notificações correspondentes a um determinado user que ainda não foram lidas.*/
    async checkNotReadNotifications(idUser){
        return this.notificationsDB.getallNotReadNotifications(idUser)
    }

    /*Guardar notificações do lançamento das notas para todos os estudantes envolvidos.*/
    async notifyStudentsGradesPublished(provaInfo,studentsIds){
        for(let i=0;studentsIds.length;i++){    
            const nota = {"_id":mongoose.Types.ObjectId(),"notificacao":"nota","numero":studentsIds[i],
            "email":"","nome":"","lida":false,"prova":provaInfo["prova"]};
            this.notificationsDB.saveGradesNotifications(nota);
        }
    }

    /*Guardar as notificacoes para os alunos de que foram inscritos para uma prova*/
    async notifyInscricaoProva(prova,alunos){
        let notificacoes = []
        for(let s=0;s<alunos.length;s++){
            for(let a=0;a<alunos[s]["alunos"].length;a++){
                const inscricao = {"_id":mongoose.Types.ObjectId(),"notificacao":"inscricao prova","numero":alunos[s]["alunos"][a],
                "lida":false,"prova":prova,"sala":alunos[s]["sala"],"data":alunos[s]["data"],"hora":alunos[s]["hora"]};
                let n = await this.notificationsDB.saveInscricao(inscricao); 
                notificacoes.push(n);    
            }
        }
        return notificacoes
    }

    async notifyIEditInscricaoProva(prova,alunos){
        let notificacoes = []
        for(let s=0;s<alunos.length;s++){
            for(let a=0;a<alunos[s]["alunos"].length;a++){
                numero=alunos[s]["alunos"][a];
                sala=alunos[s]["sala"];
                data=alunos[s]["data"];
                hora=alunos[s]["hora"];
                let n = await this.notificationsDB.editInscricao(prova,data,hora,sala,numero); 
                notificacoes.push(n);    
            }
        }
        return notificacoes
    }
}

module.exports.NotificationsService = NotificationsService;