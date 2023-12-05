var mongoose = require('mongoose');
const { Logger } = require('../controller/logger');

class NotificationsService{

    constructor(notificationDB){
        this.notificationsDB = notificationDB
    }

    /*Guardar notificação da adicao de um novo docente*/
    async notifyNewDocenteAccount(nome,n_mecanografico,email){
        try{
            const docente = {"_id":mongoose.Types.ObjectId(),"notificacao":"registo docente","numero":n_mecanografico,"email":email,"nome":nome,"lida":false};
            const v = this.notificationsDB.saveDocenteNotification(docente);
            const logger = new Logger(new Date(),"DB (notificação de adição de um novo docente)")
            logger.addLog()
            return v
        }catch(error){
            const logger = new Logger(new Date(),"error:"+error)
            logger.addLog()     
            throw error; 
        }
    }

    /*Guardar notificações da adições de novos docentes*/
    async notifyNewDocenteAccounts(docentes){
        try{
            let notificacoes = []
            for (let i = 0; i < docentes.length; i++) {
                const v = this.notifyNewDocenteAccount(docentes[i].nome,docentes[i].n_mecanografico,docentes[i].email)
                notificacoes.push(v); 
                const logger = new Logger(new Date(),"DB (notificação de adição de um novo docente)")
                logger.addLog()
            }          
            return notificacoes
        }catch(error){
            const logger = new Logger(new Date(),"error:"+error)
            logger.addLog()     
            throw error; 
        }
    }

    /*Guardar notificação da adicao de um novo aluno*/
    async notifyNewAlunoAccount(nome,n_mecanografico,email){
        try{
            const aluno = {"_id":mongoose.Types.ObjectId(),"notificacao":"registo aluno","numero":n_mecanografico,
            "email":email,"nome":nome,"lida":false};
            const v = this.notificationsDB.saveAlunoNotification(aluno);
            const logger = new Logger(new Date(),"DB (notificação de adição de um novo aluno)")
            logger.addLog()
            return v
        }catch(error){
            const logger = new Logger(new Date(),"error:"+error)
            logger.addLog()     
            throw error;
        }
    }

    /*Guardar notificações da adições de novos alunos*/
    async notifyNewAlunoAccounts(alunos){
        try{
            let alunos=[]
            for (let i = 0; i < alunos.length; i++) {
                v = this.notifyNewAlunoAccount(alunos[i].nome,alunos[i].n_mecanografico,alunos[i].email);
                alunos.push(v);
                const logger = new Logger(new Date(),"DB (notificação de adição de um novo aluno)")
                logger.addLog()
            }
            return alunos;   
        }catch(error){
            const logger = new Logger(new Date(),"error:"+error)
            logger.addLog()     
            throw error;
        }      
    }

    /*Filtrar todas as notificações correspondentes a um determinado user.*/
    async getNotifications(idUser){
        try{
            const v = this.notificationsDB.getallNotifications(idUser)
            const logger = new Logger(new Date(),"DB (filtragem das notificações do aluno "+idUser+")")
            logger.addLog()
            return v
        }catch(error){
            const logger = new Logger(new Date(),"error:"+error)
            logger.addLog()     
            throw error;
        }
        
    }

    /*Filtrar todas as notificações correspondentes a um determinado user que ainda não foram lidas.*/
    async checkNotReadNotifications(idUser){
        try{
            const v = this.notificationsDB.getallNotReadNotifications(idUser)
            const logger = new Logger(new Date(),"DB (filtragem das notificações não lidas do aluno "+idUser+")")
            logger.addLog()
            return v
        }catch(error){
            const logger = new Logger(new Date(),"error:"+error)
            logger.addLog()     
            throw error; 
        } 
    }

    /*Guardar notificações do lançamento das notas para todos os estudantes envolvidos.*/
    async notifyStudentsGradesPublished(provaInfo,studentsIds){
        try{
            let grades=[]
            for(let i=0;studentsIds.length;i++){    
                const nota = {"_id":mongoose.Types.ObjectId(),"notificacao":"nota","numero":studentsIds[i],"email":"","nome":"","lida":false,"prova":provaInfo["prova"]};
                v = this.notificationsDB.saveGradesNotifications(nota);
                const logger = new Logger(new Date(),"DB (guardada a notificação do lançamento das notas de "+studentsIds[i]+")")
                logger.addLog()
                grades.push(v);
            }
            return grades;
        }catch(error){
            const logger = new Logger(new Date(),"error:"+error)
            logger.addLog()     
            throw error;
        }
    }

    /*Guardar as notificacoes para os alunos de que foram inscritos para uma prova*/
    async notifyInscricaoProva(prova,alunos){
        try{
            let notificacoes = []
            for(let s=0;s<alunos.length;s++){
                for(let a=0;a<alunos[s]["alunos"].length;a++){
                    const inscricao = {"_id":mongoose.Types.ObjectId(),"notificacao":"inscricao prova","numero":alunos[s]["alunos"][a],
                    "lida":false,"prova":prova,"sala":alunos[s]["sala"],"data":alunos[s]["data"],"hora":alunos[s]["hora"]};
                    let n = await this.notificationsDB.saveInscricao(inscricao); 
                    const logger = new Logger(new Date(),"DB (guardada a notificação da inscrição de "+alunos[s]["alunos"][a]+")")
                    logger.addLog()    
                    notificacoes.push(n);    
                }
            }
            return notificacoes
        }catch(error){
            const logger = new Logger(new Date(),"error:"+error)
            logger.addLog()     
            throw error;
        }
    }

    async notifyEditInscricaoProva(prova,alunos){
        try{
            let notificacoes = []
            for(let s=0;s<alunos.length;s++){
                for(let a=0;a<alunos[s]["alunos"].length;a++){
                    const numero=alunos[s]["alunos"][a];
                    const sala=alunos[s]["sala"];
                    const data=alunos[s]["data"];
                    const hora=alunos[s]["hora"];
                    let n = await this.notificationsDB.editInscricao(prova,data,hora,sala,numero); 
                    notificacoes.push(n);    
                    const logger = new Logger(new Date(),"DB (guardada a notificação de edição/inscrição de "+numero+")")
                    logger.addLog()    

                }
            }
            return notificacoes
        }catch(error){
            const logger = new Logger(new Date(),"error:"+error)
            logger.addLog()     
            throw error;
        }
    }
}

module.exports.NotificationsService = NotificationsService;