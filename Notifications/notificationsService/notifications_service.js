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
        for (let i = 0; i < docentes.length; i++) {
            this.notifyNewDocenteAccount(docentes[i].nome,docentes[i].n_mecanografico,docentes[i].email);    
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
}

module.exports.NotificationsService = NotificationsService;