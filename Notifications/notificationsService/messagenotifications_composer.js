class MessageNotificationsComposer {
    static composeMessages(notificacoes) {
        for (let i = 0; i < notificacoes.length; i++) {
            if (notificacoes[i]["notificacao"] == "registo docente") {
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
        if (notificacao["notificacao"] == "inscricao prova") {
            notificacao = MessageNotificationsComposer.composeNewExamMessage(notificacao);
        }
        if (notificacao["notificacao"] == "nota") {
            notificacao = MessageNotificationsComposer.composeGradedExamMessage(notificacao);
        }
        return notificacao;
    }

    static composeRegisterMessage(notificacao) {
        const message = "Olá, " + notificacao['nome'] + "! Viemos informar que você foi registado(a) no sistema com o email: " + notificacao['email'];
        const newmessage = { notificacao , "mensagem":message}
        return newmessage
    }

    static composeNewExamMessage(notificacao) {
        const message = "Olá, " + notificacao["numero"] + "! Viemos informar que foi criada uma nova prova: " + notificacao["prova"] + " para a qual você foi inscrito.\r\n" +
        "A prova irá se realizar na sala " + notificacao["sala"] + " no dia " + notificacao["data"] + " às " + notificacao["hora"] + ".";
        const newmessage = { notificacao , "mensagem":message}
        return newmessage;
    }

    static composeGradedExamMessage(notificacao) {
        const message = "Olá, " + notificacao["numero"] + "! Viemos informar que foram lançadas as suas notas da prova: " + notificacao["prova"]+ ".";
        const newmessage = { notificacao , "mensagem":message}
        return newmessage;
    }

}

module.exports.MessageNotificationsComposer = MessageNotificationsComposer;
