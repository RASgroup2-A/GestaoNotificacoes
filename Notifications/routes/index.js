var express = require('express');
var router = express.Router();
const {MessageNotificationsComposer} = require('../notificationsService/messagenotifications_composer')

const {NotificationInfo} = require('../notificationsInfo/notifications_info');
const {NotificationsService} = require('../notificationsService/notifications_service');

const notificationsinfo = new NotificationInfo();
const notificationsservice = new NotificationsService(notificationsinfo)

/*Rota para guardar notificação de adicao de um novo docente a registar*/
router.post('/notifications/docente', function(req, res, next) {

  nome = req.body["nome"]
  n_mecanografico = req.body["n_mecanografico"]
  email = req.body["email"]
  notificationsservice.notifyNewDocenteAccount(nome,n_mecanografico,email).then(notificacao=>{
    res.jsonp({msg:"notificacao guardada.","notificacao":notificacao});
  }).catch(error=>{
    console.log(error);
    res.status(500).jsonp({ erro: "Não foi possível guardar a notificação do registo do docente.", msg:error });
  })
})


/*Rota para guardar notificações correspondentes a uma lista de docentes que vao ser registados*/
router.post('/notifications/docente', function(req, res, next) {
  
  docentes = req.body["docentes"]
  notificationsservice.notifyNewDocenteAccounts(docentes).then(notificacoes=>{
    res.jsonp({msg:"notificacao guardada.","notificacoes":notificacoes});
  }).catch(error=>{
    console.log(error);
    res.status(500).jsonp({ erro: "Não foi possível guardar as notificações do registo dos docentes.", msg:error});
  })
})


/*Rota para obter notificacoes nao lidas de um user*/
router.get('/notifications/unread/:id',function(req,res,next){
  idUser = req.params.id
  notificationsservice.checkNotReadNotifications(idUser).then(notificacoes=>{
    const processed = MessageNotificationsComposer.composeMessages(notificacoes);
    res.jsonp({"notificacoes":processed});
  }).catch(error=>{
    console.log(error);
    res.status(500).jsonp({ erro: "Não foi possível obter as notificacoes por ler do user.", msg:error});
  })
})


/*Rota para obter notificacoes de um user*/
router.get('/notifications/:id',function(req,res,next){
  idUser = req.params.id
  notificationsservice.getNotifications(idUser).then(notificacoes=>{
    const processed = MessageNotificationsComposer.composeMessages(notificacoes);
    res.jsonp({"notificacoes":processed});
  }).catch(error=>{
    console.log(error);
    res.status(500).jsonp({ erro: "Não foi possível obter as notificacoes do user.", msg:error});
  })
})


/*Rota para guardar as notificacoes dos lançamentos de notas.*/
router.get('/notifications/grades',function(req,res,next){
  provaInfo = req.body["provaInfo"]
  studentsIds = req.body["studentsIds"]
  notificationsservice.notifyStudentsGradesPublished(provaInfo,studentsIds).then(notificacoes=>{
    res.jsonp({msg:"notificacoes guardadas.","notificacoes":notificacoes});
  }).catch(error=>{
    console.log(error);
    res.status(500).jsonp({ erro: "Não foi possível guardas as notificacoes dos lançamentos de notas.", msg:error});
  })
})

module.exports = router;