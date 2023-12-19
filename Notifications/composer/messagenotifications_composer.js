class MessageNotificationsComposer {
    static composeMessages(notificacoes) {
        for (let i = 0; i < notificacoes.length; i++) {
            if (notificacoes[i]["notificacao"] == "registo docente") {
                notificacoes[i] = MessageNotificationsComposer.composeRegisterMessage(notificacoes[i]);
            }
            if (notificacoes[i]["notificacao"] == "registo aluno") {
                notificacoes[i] = MessageNotificationsComposer.composeRegisterMessage(notificacoes[i]);
            }
            if (notificacoes[i]["notificacao"] == "inscricao prova") {
                notificacoes[i] = MessageNotificationsComposer.composeNewExamMessage(notificacoes[i]);
            }
            if (notificacoes[i]["notificacao"] == "nota") {
                notificacoes[i] = MessageNotificationsComposer.composeGradedExamMessage(notificacoes[i]);
            }
        }
        return notificacoes;
    }

    static composeMessage(notificacao) {
        if (notificacao["notificacao"] == "registo docente") {
            notificacao = MessageNotificationsComposer.composeRegisterMessage(notificacao);
        }
        if (notificacao["notificacao"] == "registo aluno") {
            notificacao = MessageNotificationsComposer.composeRegisterMessage(notificacao);
        }
        if (notificacao["notificacao"] == "inscricao prova") {
            notificacao = MessageNotificationsComposer.composeNewExamMessage(notificacao);
        }
        if (notificacao["notificacao"] == "edicao prova") {
            notificacao = MessageNotificationsComposer.composeEditExamMessage(notificacao);
        }
        if (notificacao["notificacao"] == "nota") {
            notificacao = MessageNotificationsComposer.composeGradedExamMessage(notificacao);
        }
        if (notificacao["notificacao"] == "sala indisponivel") {
            notificacao = MessageNotificationsComposer.composeUnavailableRoomMessage(notificacao);
        }
        return notificacao;
    }

    static composeRegisterMessage(notificacao) {
        const message = "Olá, " + notificacao['nome'] +"!\r\n" + "Viemos informar que você foi registado(a) no sistema com o email: " + notificacao['email'] +" e password: "+notificacao['platform_password']+".";
        const newmessage = { notificacao , "mensagem":message}
        return newmessage
    }

    static composeNewExamMessage(notificacao) {
        const message = "Olá, " + notificacao["numero"] +"!\r\n" +  "Viemos informar que foi inscrito para a prova: " + notificacao["prova"] + ".\r\n" +
        "A prova realizar-se-á na sala " + notificacao["sala"] + " no dia " + notificacao["data"] + " às " + notificacao["hora"] + "H.";
        const newmessage = { notificacao , "mensagem":message}
        return newmessage;
    }

    static composeEditExamMessage(notificacao) {
        const message = "Olá, " + notificacao["numero"] +"!\r\n" + " Viemos informar que houve alterações em relação à prova: " + notificacao["prova"] + ".\r\n" +
        "A prova realizar-se-á na sala " + notificacao["sala"] + " no dia " + notificacao["data"] + " às " + notificacao["hora"] + "H.";
        const newmessage = { notificacao , "mensagem":message}
        return newmessage;
    }

    static composeGradedExamMessage(notificacao) {
        const message = "Olá, " + notificacao["numero"] +"!\r\n" + " Viemos informar que foram lançadas as suas notas da prova: " + notificacao["prova"]+ "H.";
        const newmessage = { notificacao , "mensagem":message}
        return newmessage;
    }

    static composeUnavailableRoomMessage(notificacao){
        const message = "Olá, " + notificacao["numero"] +"!\r\n" + " Viemos informar que a sala " + notificacao["sala"]+ " se encontra indisponível. Assim, a realização do teste "+ notificacao["prova"] +
        " terá de ser feita noutra sala.";
        const newmessage = { notificacao , "mensagem":message}
        return newmessage;
    }

}

module.exports.MessageNotificationsComposer = MessageNotificationsComposer;
