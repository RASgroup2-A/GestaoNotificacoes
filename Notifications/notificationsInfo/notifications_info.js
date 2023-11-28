const Notification = require('../schema/schema')

class NotificationInfo {

    async saveDocenteNotification(docente){
        return Notification.create(docente)
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

    //atualizar as notificacoes de criacao de prova com as novas informacoes para todos os alunos com essa prova
    //de forma a manter as informações dos alunos consistentes e não gerar conflitos para a realizacao da prova
    
    async editExam(prova,data,hora,sala){
        return Notification.updateMany({"prova":prova,"notificacao":"criacao de prova"},
        { $set: { "sala" : sala,"data":data,"hora":hora }}).then(data=>{
            return data
        })
    }
}

module.exports.NotificationInfo = NotificationInfo;
