const Notification = require('../schema/notification')

class NotificationInfo {

    async saveDocenteNotification(docente){
        return Notification.create(docente)
        .then(dados => {
            return dados
        })
    }
    
    async saveAlunoNotification(aluno){
        return Notification.create(aluno)
        .then(dados => {
            return dados
        })
    }

    async getallNotifications(numero){
        return Notification.find({"numero":numero})
        .then(dados => {
            return dados
        })
    }

    async getallNotReadNotifications(numero){
        return Notification.find({"numero":numero,"lida":false})
        .then(dados => {
            return dados
        })
    }

    async saveGradesNotifications(nota){
        return Notification.create(nota)        
        .then(dados => {
            return dados
        })
    }
    
    async editInscricao(prova,data,hora,sala,numero){
        return Notification.updateMany({"prova":prova,"notificacao":"criacao de prova"},
        { $set: { "sala" : sala,"data":data,"hora":hora,"numero":numero }}).then(data=>{
            return data
        })
    }

    async saveInscricao(inscricao){
        return Notification.create(inscricao)
        .then(dados => {
            return dados
        })
    }
}

module.exports.NotificationInfo = NotificationInfo;
