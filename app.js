/*----------------------------------------------------------Pré requisitos-------------------------------------------------------*/

const mysql = require('mysql');
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const notifier = require('node-notifier');
const session = require('express-session');
const app = express();

/*-------------------------------------------------------------Sessions-----------------------------------------------------------*/

const sessionOpt = {
    secret: 'frase',
    resave: false,
    saveUninitialized: false
}

app.use(session(sessionOpt));

//Sessão de bloqueio
function block(req, res, next) {
    if (req.session.login || req.path==='/login' ) {

        //Sessão de ID - Doador
        req.session.idDoador;

        //Sessão de ID - Instituição
        req.session.idInst;

        //Sessão de Notificação
        req.session.notificacao;

        next();

    } else {
        alertFalha("Você não tem permissão para acessar esta página");
        res.redirect('/');

    }
};

/*-------------------------------------------------------------------------------------------------------------------------------*/

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Permitir requisições do REST
app.use(methodOverride('_method'));

//Ver Statics
app.use(express.static('views/public'));

//Mostrar arquivos .ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//Conexão
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doeamor',
});
    
//Verificar erros
conexao.connect(function(err) {
    if (err){
        console.log("Erro");
        throw err;
    } else {
        console.log("Conectado");
    }
});

/*-----------------------------------------------------------Notificações--------------------------------------------------------*/

function alertErro(err) {
    notifier.notify({
        icon: path.join(__dirname, '/views/public/imagens/error-icon.png'),
        sound: true,
        message: 'Erro'
    });

    console.log(err);
};

function alertFalha(msg) {
    notifier.notify({
        title: 'Falhou',
        icon: path.join(__dirname, '/views/public/imagens/error-icon.png'),
        sound: true,
        message: msg
    });

};

function alertSucesso(msg) {
    notifier.notify({
        title: 'Sucesso',
        icon: path.join(__dirname, '/views/public/imagens/success-icon.png'),
        sound: true,
        message: msg
    });
}

/*-------------------------------------------------------------Esconder-----------------------------------------------------------*/

function esconderCard(esconder) {
    
    if (esconder.length<12) {

        for (i = esconder.length; i<12; i++) {
            esconder.push("hidden");
        };
    };
    
    return esconder;
}

/*--------------------------------------------------------------Contar------------------------------------------------------------*/
function countNotif(req, res, next) {
    conexao.query(`SELECT * FROM notificacao WHERE id_instituicao='${req.session.idInst}' `, function (err, response) {

        if (err) {
            alertErro(err);

        } else {

            req.session.notificacao = response.length;
            next();
        }
    });
}

/*--------------------------------------------------------Página Principal------------------------------------------------------*/

//Página Principal
app.get('/', (req, res) => {
    res.render('Cadastro');
});

/*-------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------Cadastro----------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------*/

app.post('/cad-doador', (req, res) => {
    const {emailDoador, cpf, nomeDoador, data, sexo, senhaDoador} = req.body;
    const {estadoDoador, cidadeDoador, ruaDoador, localNumDoador} = req.body; //Localização
    const {dddDoador, telefoneDoador} = req.body; //Telefone

    //Juntar rua
    var fullRua = (ruaDoador +" "+ localNumDoador);

    //Juntar telefone
    var fullNum = ("("+ dddDoador +") "+ telefoneDoador);

    //Verificar se já foi cadastrado
    conexao.query(`SELECT * FROM doador WHERE cpf=${cpf} OR email='${emailDoador}' OR telefone='${fullNum}' `, 
    function(err, response) {
        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else if (response.length>0) {
            alertFalha('Email/CPF/Telefone já cadastrado');
            res.redirect("javascript:history.back()");

        } else {

            //Salvar no banco
            conexao.query(`INSERT INTO doador (nome_doador, cpf, email, rua, estado, cidade, telefone, nascimento, sexo, senha) 
            VALUES ('${nomeDoador}', '${cpf}', '${emailDoador}', '${fullRua}', '${estadoDoador}', '${cidadeDoador}', '${fullNum}', 
                '${data}', '${sexo}', '${senhaDoador}')`, 
                function(err) {
         
                    if (err) {          
                        alertErro(err);
                        res.redirect("javascript:history.back()");

                    } else {
                        alertSucesso('Doador cadastrado!');
                        res.redirect("javascript:history.back()");

                    }

            });
        }
    });
});

app.post('/cad-inst', (req, res) => {
    const {emailInst, cnpj, nomeInst, descInst, necessidade, prioridade, senhaInst} = req.body;
    const {estadoInst, cidadeInst, ruaInst, localNumInst} = req.body; //Localização
    const {dddInst, telefoneInst} = req.body; //Telefone

    //Juntar rua
    var fullRua = (ruaInst +" "+ localNumInst);

    //Juntar telefone
    var fullNum = ("("+ dddInst +") "+ telefoneInst);

    //Verificar se já foi cadastrado
    conexao.query(`SELECT * FROM instituicao WHERE cnpj=${cnpj} OR email='${emailInst}' OR telefone='${fullNum}' `, 
    function(err, response) {
      
        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else if (response.length>0) {
            alertFalha('Email/CNPJ/Telefone já cadastrado');
            res.redirect("javascript:history.back()");

        } else {

            //Salvar no banco
            conexao.query(`INSERT INTO instituicao (nome_inst,  cnpj, email, rua, estado, cidade, telefone, senha, 
                descricao, necessidade, prioridade) VALUES (
                '${nomeInst}', '${cnpj}', '${emailInst}', '${fullRua}', '${estadoInst}', '${cidadeInst}', '${fullNum}', 
                '${senhaInst}', '${descInst}', '${necessidade}', '${prioridade}')`, 
                function(err) {
                   
                    if (err) {
                        alertErro(err);
                        res.redirect("javascript:history.back()");

                    } else {
                        alertSucesso('Instituição cadastrada!')
                        res.redirect("javascript:history.back()");

                    }
            });
        }
    });
});

/*------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------Login-----------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------*/

//Verificar Login do doador
app.post('/login/doador', (req, res) =>{
    const {logCPF, logSenhaDoador} = req.body;

    //Verificar se existe
    conexao.query(`SELECT id_doador, nome_doador FROM doador WHERE cpf='${logCPF}' AND senha='${logSenhaDoador}' `, 
    function(err, response) {
       
        req.session.login = false;

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else if (response.length>0) {

            var json = Object.values(JSON.parse(JSON.stringify(response)));
            req.session.idDoador = json[0].id_doador;
            nome = json[0].nome_doador;
            
            //Iniciar sessão
            req.session.login = true;
            
            alertSucesso('Bem Vindo(a) '+nome+'!');
            res.redirect('/Doacao');

        } else {
            alertFalha('CPF/Senha incorreto');
            res.redirect("javascript:history.back()");

        }
    })
});

//Verificar Login da instituição
app.post('/login/inst', async (req, res) => {
    const {logCNPJ, logSenhaInst} = req.body;

    //Verificar se existe
    conexao.query(`SELECT id_instituicao, nome_inst FROM instituicao WHERE cnpj='${logCNPJ}' AND senha='${logSenhaInst}' `, 
    function(err, response) {

        req.session.login = false;

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else if (response.length>0) {

            var json = Object.values(JSON.parse(JSON.stringify(response)));
            req.session.idInst = json[0].id_instituicao;
            nome = json[0].nome_inst;

            //Iniciar sessão
            req.session.login = true;

            alertSucesso('Bem Vindo(a) '+nome+'!')
            res.redirect('/Perfil-Inst');

        } else {
            alertFalha('CNPJ/Senha incorreto');
            res.redirect("javascript:history.back()");

        }
    })
});

//Bloquear acesso não autorizado
app.use(block);

/*-------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------Páginas-----------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------Páginas Doador-------------------------------------------------------*/

app.get('/Doacao', (req, res) => {
    res.render('viewDoador/Doacao');
});

app.get('/Duvidas-Doador', (req, res) => {
    res.render('viewDoador/Duvidas');
});

app.get('/Historico/:paginaAtual', (req, res) => {

    //Verificar se o doador tem um histórico
    conexao.query(`SELECT *, produto, _data, nome_instituicao 
    FROM historico WHERE id_doador='${req.session.idDoador}' `, 
    function (err, response) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else if(response.length==0) {
            alertFalha('Você ainda não realizou uma doação');
            res.redirect("javascript:history.back()");

        } else {
            
            //Quantidade total
            var quantidade = response.length;

            //Verifica se a quantidade cabe em apenas uma página e conta a quantidade de páginas
            if (quantidade % 12 == 0) {
                var paginas = parseInt(quantidade/12);

            } else {
                var paginas = parseInt((quantidade/12)+1);

            }

            //Pega o valor da página atual
            var paginaAtual = parseInt(req.params.paginaAtual);

            //Verifica se a página atual existe
            if (paginaAtual<=0) {
                var paginaAtual = 1;

            } else if (paginaAtual>=paginas) {
                var paginaAtual = paginas;

            }

            //Pega a última doação específica da página
            var ultimaDoacao = parseInt(12*paginaAtual);

            if (ultimaDoacao>=quantidade) {
                var ultimaDoacao = quantidade;

            }

            //Pega a primeira instituição específica da página
            if (paginaAtual==1) {
                var primeiraDoacao = 0;

            } else {
                var primeiraDoacao = parseInt(12*(paginaAtual-1));

            }

            var nomes = [];
            var produtos = [];
            var datas = [];
            var esconder = [];

            var json = Object.values(JSON.parse(JSON.stringify(response)));
                    
            //Pega os valores de cada historico
            for (i = primeiraDoacao; i<ultimaDoacao; i++) {

                nomes.push(json[i].nome_instituicao);
                produtos.push(json[i].produto);
                esconder.push("");
                        
                //Converter data para formato que funciona
                data = new Date(json[i]._data).toISOString().slice(0, 10).replace('T', ' ');
                datas.push(data);

            };

            //Esconde os card de instituições não cadastradas
            esconderCard(esconder);

            res.render('viewDoador/Historico', {produtos, datas, nomes, paginaAtual, paginas, esconder});

        }
    });

});

app.get('/Perfil-Doador', (req, res) => {
    conexao.query(`SELECT nome_doador, cpf, email, rua, estado, cidade, telefone, nascimento, sexo, senha 
    FROM doador WHERE id_doador='${req.session.idDoador}' `, 
    function(err, response) {

        if (err) {
                
            alertErro(err);
            res.redirect("javascript:history.back()");
                
        } else {
                
            var json = Object.values(JSON.parse(JSON.stringify(response)));
            var nome = json[0].nome_doador;
            var cpf = json[0].cpf;
            var email = json[0].email;
            var rua = json[0].rua;
            var estado = json[0].estado;
            var cidade = json[0].cidade;
            var telefone = json[0].telefone;
            var nascimento = json[0].nascimento;
            var sexo = json[0].sexo;
            var senha = json[0].senha;
            var id = req.session.idDoador;

            //Converter data para formato que funciona
            data = new Date(nascimento).toISOString().slice(0, 10).replace('T', ' ');

            //Converter sexo para valor escrito
            if (sexo=='M') {
                var genero="Masculino";
            } else if (sexo=="F") {
                var genero="Feminino";
            } else if (sexo=="N/A") {
                var genero="Indefinido";
            }
                
            res.render('viewDoador/Perfil', {nome, id, cpf, email, rua, estado, cidade, telefone, data, sexo, genero, senha});
        }
    });
});

app.get('/VerInst-Doador/:id', (req, res) => {

    //Pega o id da instituição que o usuário escolheu
    var id = req.params.id;

    //Pega os valores desta instituição para mostrar na página
    conexao.query(`SELECT nome_inst, cnpj, email, rua, estado, cidade, telefone, descricao, necessidade, prioridade 
    FROM instituicao WHERE id_instituicao='${id}' `,
    function (err, response) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else {

            var json = Object.values(JSON.parse(JSON.stringify(response)));
            var nome = json[0].nome_inst;
            var cnpj = json[0].cnpj;
            var email = json[0].email;
            var rua = json[0].rua;
            var estado = json[0].estado;
            var cidade = json[0].cidade;
            var telefone = json[0].telefone;
            var descricao = json[0].descricao;
            var necessidade = json[0].necessidade;
            var prioridade = json[0].prioridade;
            var key = id;


            res.render('viewDoador/PerfilInstituicao', {nome, cnpj, email, rua, estado, cidade, telefone, descricao, necessidade, prioridade, key});
        }
    });

});

app.get('/Pesquisar-Doador/:paginaAtual', (req, res) => {

    //Pega a quantidade de instituições
    conexao.query(`SELECT *, nome_inst, email, estado, cidade, rua, id_instituicao 
    FROM instituicao`, 
    function(err, response) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else if(response.length==0) {
            alertFalha('Não existem instituições cadastradas no momento');
            res.redirect("javascript:history.back()");

        } else {

            //Quantidade total
            var quantidade = response.length;

            //Verifica se a quantidade cabe em apenas uma página e conta a quantidade de páginas
            if (quantidade % 12 == 0) {
                var paginas = parseInt(quantidade/12);

            } else {
                var paginas = parseInt((quantidade/12)+1);

            }

            //Pega o valor da página atual
            var paginaAtual = parseInt(req.params.paginaAtual);

            //Verifica se a página atual existe
            if (paginaAtual<=0) {
                var paginaAtual = 1;

            } else if (paginaAtual>=paginas) {
                var paginaAtual = paginas;

            }

            //Pega a última instituição específica da página
            var ultimaInst = parseInt(12*paginaAtual);

            if (ultimaInst>=quantidade) {
                var ultimaInst = quantidade;

            }

            //Pega a primeira instituição específica da página
            if (paginaAtual==1) {
                var primeiraInst = 0;

            } else {
                var primeiraInst = parseInt(12*(paginaAtual-1));

            }

            var todos = [];

            var json = Object.values(JSON.parse(JSON.stringify(response)));

            //Pega os valores de todas as instituições cadastradas
            for (i = primeiraInst; i<ultimaInst; i++) {

                todos.push(json[i]);

            };

            res.render("viewDoador/Pesquisar", {todos, paginaAtual, paginas});
            
        }
    });
});

app.get('/Ver-Feedback/:id/:paginaAtual', (req, res) => {

    var id = req.params.id;

    conexao.query(`SELECT *, nome_doador, comentario, nota 
    FROM feedback WHERE id_instituicao='${id}' `, 
    function (err, response) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else if (response.length==0) {
            alertFalha("Esta instituição ainda não possui nenhum feedback");
            res.redirect("javascript:history.back()");

        } else {

            //Quantidade total
            var quantidade = response.length;

            //Verifica se a quantidade cabe em apenas uma página e conta a quantidade de páginas
            if (quantidade % 12 == 0) {
                var paginas = parseInt(quantidade/12);

            } else {
                var paginas = parseInt((quantidade/12)+1);

            }

            //Pega o valor da página atual
            var paginaAtual = parseInt(req.params.paginaAtual);

            //Verifica se a página atual existe
            if (paginaAtual<=0) {
                var paginaAtual = 1;

            } else if (paginaAtual>=paginas) {
                var paginaAtual = paginas;

            }

            //Pega a última doação específica da página
            var ultimoFeedback = parseInt(12*paginaAtual);

            if (ultimoFeedback>=quantidade) {
                var ultimoFeedback = quantidade;

            }

            //Pega a primeira instituição específica da página
            if (paginaAtual==1) {
                var primeiroFeedback = 0;

            } else {
                var primeiroFeedback = parseInt(12*(paginaAtual-1));

            }

            var todos = [];

            var json = Object.values(JSON.parse(JSON.stringify(response)));
                    
            //Pega os valores de cada historico
            for (i = primeiroFeedback; i<ultimoFeedback; i++) {

                todos.push(json[i]);

            };

            res.render('viewDoador/VerFeedback', {todos, paginaAtual, paginas});

        }
    });
});


/*--------------------------------------------------------Páginas Instituição-----------------------------------------------------*/

app.get('/Perfil-Inst', (req, res) => {

    //Pega os valores da instituição para mostrar
    conexao.query(`SELECT nome_inst, cnpj, email, rua, estado, cidade, telefone, descricao, necessidade, prioridade, senha
    FROM instituicao WHERE id_instituicao='${req.session.idInst}' `, 
    function(err, response) {
            
        if (err) {
                
            alertErro(err);
            res.redirect("javascript:history.back()");
                
        } else {
                
            var json = Object.values(JSON.parse(JSON.stringify(response)));
            var nome = json[0].nome_inst;
            var cnpj = json[0].cnpj;
            var email = json[0].email;
            var rua = json[0].rua;
            var estado = json[0].estado;
            var cidade = json[0].cidade;
            var telefone = json[0].telefone;
            var descricao = json[0].descricao;
            var necessidade = json[0].necessidade;
            var prioridade = json[0].prioridade;
            var senha = json[0].senha;
            var id = req.session.idInst;
                   
            //Pegar quantidade de notificações (necessário por aqui pra evitar erro)
            conexao.query(`SELECT * FROM notificacao WHERE id_instituicao='${req.session.idInst}' `,
            function (err, response) {

                if (err) {
                    alertErro(err);

                } else {
                    req.session.notificacao = response.length;
                    var count = req.session.notificacao;

                    res.render('viewInstituicao/Perfil', {count, nome, id, cnpj, email, rua, estado, cidade, telefone, descricao, necessidade, prioridade, senha});

                }
            })
    
        }
    });
});

app.get('/Duvidas-Inst', (req, res) => {

    var count = req.session.notificacao;
    res.render('viewInstituicao/Duvidas', {count});
});

app.get('/Notificacoes/:paginaAtual', (req, res) => {

    //Verifica se a instituição tem um histórico
    conexao.query(`SELECT *, id_notificacao, nome_doador, produto, _data 
    FROM notificacao WHERE id_instituicao='${req.session.idInst}' `, 
    function (err, response) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else if(response.length==0) {
            alertFalha('Você não tem novas notificações');
            res.redirect("javascript:history.back()");

        } else {

            //Quantidade total
            var quantidade = req.session.notificacao;

            //Verifica se a quantidade cabe em apenas uma página e conta a quantidade de páginas
            if (quantidade % 12 == 0) {
                var paginas = parseInt(quantidade/12);

            } else {
                var paginas = parseInt((quantidade/12)+1);

            }

            //Pega o valor da página atual
            var paginaAtual = parseInt(req.params.paginaAtual);

            //Verifica se a página atual existe
            if (paginaAtual<=0) {
                var paginaAtual = 1;

            } else if (paginaAtual>=paginas) {
                var paginaAtual = paginas;

            }

            //Pega a última doação específica da página
            var ultimaDoacao = parseInt(12*paginaAtual);

            if (ultimaDoacao>=quantidade) {
                var ultimaDoacao = quantidade;

            }

            //Pega a primeira instituição específica da página
            if (paginaAtual==1) {
                var primeiraDoacao = 0;

            } else {
                var primeiraDoacao = parseInt(12*(paginaAtual-1));

            }

            var ids = [];
            var nomes = [];
            var produtos = [];
            var datas = [];
            var esconder = [];

            var json = Object.values(JSON.parse(JSON.stringify(response)));
                    
            //Pega os valores de cada historico
            for (i = primeiraDoacao; i<ultimaDoacao; i++) {

                ids.push(json[i].id_notificacao);
                nomes.push(json[i].nome_doador);
                produtos.push(json[i].produto);
                esconder.push("");
                        
                //Converter data para formato que funciona
                data = new Date(json[i]._data).toISOString().slice(0, 10).replace('T', ' ');
                datas.push(data);

            };

            //Esconde os card de instituições não cadastradas
            esconderCard(esconder);

            var count = req.session.notificacao;
            res.render('viewInstituicao/Notificacoes', {count, ids, nomes, produtos, datas, paginaAtual, paginas, esconder});

        }

    });

});

app.get('/Feedback/:paginaAtual', (req, res) => {

    //Verifica se a instituição tem feedback
    conexao.query(`SELECT *, nome_doador, comentario, nota 
    FROM feedback WHERE id_instituicao='${req.session.idInst}' `, 
    function (err, response) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else if(response.length==0) {
            alertFalha('Você ainda não recebeu nenhum feedback');
            res.redirect("javascript:history.back()");

        } else {

            //Quantidade total
            var quantidade = response.length;

            //Verifica se a quantidade cabe em apenas uma página e conta a quantidade de páginas
            if (quantidade % 12 == 0) {
                var paginas = parseInt(quantidade/12);

            } else {
                var paginas = parseInt((quantidade/12)+1);

            }

            //Pega o valor da página atual
            var paginaAtual = parseInt(req.params.paginaAtual);

            //Verifica se a página atual existe
            if (paginaAtual<=0) {
                var paginaAtual = 1;

            } else if (paginaAtual>=paginas) {
                var paginaAtual = paginas;

            }

            //Pega a última doação específica da página
            var ultimoFeedback = parseInt(12*paginaAtual);

            if (ultimoFeedback>=quantidade) {
                var ultimoFeedback = quantidade;

            }

            //Pega a primeira instituição específica da página
            if (paginaAtual==1) {
                var primeiroFeedback = 0;

            } else {
                var primeiroFeedback = parseInt(12*(paginaAtual-1));

            }

            var todos = [];

            var json = Object.values(JSON.parse(JSON.stringify(response)));
                    
            //Pega os valores de cada historico
            for (i = primeiroFeedback; i<ultimoFeedback; i++) {

                todos.push(json[i]);

            };

            var count = req.session.notificacao;
            res.render('viewInstituicao/Feedback', {count, todos, paginaAtual, paginas});

        }

    });


});

app.get('/VerInst-Inst/:id', (req, res) => {

    //Pega o id da instituição que o usuário escolheu
    var id = req.params.id;

    //Verifica se não é a própria instituição logada
    if (id==req.session.idInst) {
        res.redirect('/Perfil-Inst');

    } else {
   
        conexao.query(`SELECT nome_inst, cnpj, email, rua, estado, cidade, telefone, descricao, necessidade, prioridade 
        FROM instituicao WHERE id_instituicao='${id}' `,
        function (err, response) {

            if (err) {
                alertErro(err);
                res.redirect("javascript:history.back()");

            } else {

                var json = Object.values(JSON.parse(JSON.stringify(response)));
                var nome = json[0].nome_inst;
                var cnpj = json[0].cnpj;
                var email = json[0].email;
                var rua = json[0].rua;
                var estado = json[0].estado;
                var cidade = json[0].cidade;
                var telefone = json[0].telefone;
                var descricao = json[0].descricao;
                var necessidade = json[0].necessidade;
                var prioridade = json[0].prioridade;
                var id = id;

                var count = req.session.notificacao;   
                res.render('viewInstituicao/PerfilInstituicao', {count, nome, cnpj, email, rua, estado, cidade, telefone, descricao, necessidade, prioridade, id});
            }
        });
    }

});

app.get('/Pesquisar-Inst/:paginaAtual', (req, res) => {

    //Pega a quantidade de instituições
    conexao.query(`SELECT *, nome_inst, email, estado, cidade, rua, id_instituicao 
    FROM instituicao`, 
    function(err, response) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else if(response.length==0) {
            alertFalha('Não existem instituições cadastradas no momento');
            res.redirect("javascript:history.back()");

        } else {

            //Quantidade total
            var quantidade = response.length;

            //Verifica se a quantidade cabe em apenas uma página e conta a quantidade de páginas
            if (quantidade % 12 == 0) {
                var paginas = parseInt(quantidade/12);

            } else {
                var paginas = parseInt((quantidade/12)+1);

            }

            //Pega o valor da página atual
            var paginaAtual = parseInt(req.params.paginaAtual);

            //Verifica se a página atual existe
            if (paginaAtual<=0) {
                var paginaAtual = 1;

            } else if (paginaAtual>=paginas) {
                var paginaAtual = paginas;

            }

            //Pega a última instituição específica da página
            var ultimaInst = parseInt(12*paginaAtual);

            if (ultimaInst>=quantidade) {
                var ultimaInst = quantidade;

            }

            //Pega a primeira instituição específica da página
            if (paginaAtual==1) {
                var primeiraInst = 0;

            } else {
                var primeiraInst = parseInt(12*(paginaAtual-1));

            }

            var todos = [];

            var json = Object.values(JSON.parse(JSON.stringify(response)));

            for (i = primeiraInst; i<ultimaInst; i++) {

                todos.push(json[i]);
                        
            };
                    
            var count = req.session.notificacao;
            res.render("viewInstituicao/Pesquisar", {count, todos, paginaAtual, paginas});
               
        }
    });
});

/*-----------------------------------------------------------Doação---------------------------------------------------------------*/

app.post('/Doar-Direto/:key', (req, res) => {
    
   var key = req.params.key;
   const {categoria, descProduto, quantidade, estadoItens, entrega} = req.body;

   //Pegar nome da instituição
   conexao.query(`SELECT i.nome_inst, d.nome_doador 
   FROM instituicao i, doador d 
   WHERE i.id_instituicao='${key}' AND d.id_doador='${req.session.idDoador}' `, 
   function (err, response) {

        if (err) {
            alertErro(err);

        } else {
            var json = Object.values(JSON.parse(JSON.stringify(response)));
            nome_inst = json[0].nome_inst;

            var json = Object.values(JSON.parse(JSON.stringify(response)));
            nome_doador = json[0].nome_doador;

                    
            //Salvar no historico
            conexao.query(`INSERT INTO historico (nome_doador, id_doador, produto, _data, nome_instituicao, id_instituicao) 
                    VALUES ('${nome_doador}', '${req.session.idDoador}', "${quantidade} ${categoria} ${estadoItens}: ${descProduto}", 
                    '${entrega}', '${nome_inst}', '${key}' )`,
                function (err, response) {
                
                if (err) {
                    alertErro(err);
                    res.redirect("javascript:history.back()");
                
                } else {

                    //Salvar nas notificações
                    conexao.query(`INSERT INTO notificacao (nome_doador, id_doador, produto, _data, nome_instituicao, id_instituicao)
                    VALUES ('${nome_doador}', '${req.session.idDoador}', "${quantidade} ${categoria} ${estadoItens}: ${descProduto}",
                    '${entrega}', '${nome_inst}', '${key}' )`,
                    function (err, response) {

                        if (err) {
                            alertErro(err);
                            res.redirect("javascript:history.back()");

                        } else {

                            alertSucesso('Doação realizada!');
                            res.redirect("javascript:history.back()");
                        }
                    })

                }
            });

        }
   });

});

/*----------------------------------------------------------Feedback--------------------------------------------------------------*/

app.post('/Mandar-Feedback/:key', (req, res) => {

    var key = req.params.key;
    const {like} = req.body;

    //Verificar se o comentário está em branco
    var {comentario} = req.body
    if (comentario=='') {
        comentario='Este doador não deixou nenhum comentário';
    }
    
    conexao.query(`SELECT nome_doador FROM doador WHERE id_doador='${req.session.idDoador}' `, function (err, response) {

        if (err) {
            alertErro(err);

        } else {

            var json = Object.values(JSON.parse(JSON.stringify(response)));
            nome = json[0].nome_doador;

            conexao.query(`INSERT INTO feedback (id_doador, nome_doador, comentario, nota, id_instituicao) VALUES (
            '${req.session.idDoador}', '${nome}', '${comentario}', '${like}', '${key}') `, function (err, response) {

                if (err) {
                    alertErro(err);

                } else {
                    alertSucesso('Feedback realizado!');
                    res.redirect("javascript:history.back()");

                }
            });
        }
    });

});

/*-----------------------------------------------------------Alterar--------------------------------------------------------------*/

app.patch('/Alt-Doador/:id', (req, res) => {

    var id = req.params.id;
    const {novoEmailDoador, novoCPF, novoNomeDoador, novaData, novoSexo, novaSenhaDoador, novoNumDoador} = req.body;
    const {novoEstadoDoador, novaCidadeDoador, novaRuaDoador} = req.body; //Localização

    conexao.query(`UPDATE doador SET nome_doador='${novoNomeDoador}', cpf=${novoCPF}, email='${novoEmailDoador}', 
    rua='${novaRuaDoador}', estado='${novoEstadoDoador}', cidade='${novaCidadeDoador}', telefone='${novoNumDoador}', 
    nascimento='${novaData}', sexo='${novoSexo}', senha='${novaSenhaDoador}' WHERE id_doador='${id}' `,
    function (err) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else {
            alertSucesso('Perfil alterado');
            res.redirect('/Perfil-Doador');

        }
    });
});

app.patch('/Alt-Inst/:id', (req, res) => {

    var id = req.params.id;
    const {novoEmailInst, novoCNPJ, novoNomeInst, novaDescInst, novoNumInst, novaSenhaInst} = req.body;
    const {novoEstadoInst, novaCidadeInst, novaRuaInst} = req.body; //Localização

    conexao.query(`UPDATE instituicao SET nome_inst='${novoNomeInst}', cnpj='${novoCNPJ}', email='${novoEmailInst}', 
    rua='${novaRuaInst}', estado='${novoEstadoInst}', cidade='${novaCidadeInst}', telefone='${novoNumInst}', 
    descricao='${novaDescInst}', senha='${novaSenhaInst}' WHERE id_instituicao='${id}' `, 
    function (err) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else {
            alertSucesso('Perfil alterado');
            res.redirect('/Perfil-Inst');

        }
    });
});

app.patch('/Alt-Necessidade/:id', (req, res) => {

    var id = req.params.id;
    const {novaNecessidade, novaPrioridade} = req.body;

    conexao.query(`UPDATE instituicao SET necessidade='${novaNecessidade}', prioridade='${novaPrioridade}' 
    WHERE id_instituicao='${id}' `,
    function (err) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else {
            alertSucesso('Necessidade atualizada');
            res.redirect('/Perfil-Inst');

        }
    });
});

/*-----------------------------------------------------------Excluir--------------------------------------------------------------*/

//Excluir Doador
app.delete('/Excluir-Doador/:id', (req, res) => {
   
    var id = req.params.id;

    conexao.query(`DELETE FROM doador WHERE id_doador='${id}' `, function (err) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else {
            alertSucesso('Usuário deletado');
            res.redirect('/');

        }
    });
});

//Excluir Instituicao
app.delete('/Excluir-Inst/:id', (req, res) => {
    
    var id = req.params.id;

    conexao.query(`DELETE FROM instituicao WHERE id_instituicao='${id}' `, function (err) {

        if (err) {
            alertErro(err);
            res.redirect("javascript:history.back()");

        } else {
            alertSucesso('Usuário deletado');
            res.redirect('/');

        }
    });
});

//Excluir Notificações
app.delete('/Excluir-Notif/:id', (req, res) => {

    var id = req.params.id;
    
    conexao.query(`DELETE FROM notificacao WHERE id_notificacao='${id}' `, function (err, response) {

        if (err) {
            alertErro(err);

        } else {
            alertSucesso("Notificação deletada");
            res.redirect('/Perfil-Inst');

        }
    })
});

/*-------------------------------------------------------------------------------------------------------------------------------*/

app.get('/Logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

//Iniciar
app.listen('3000', function() {
    console.log("Started on port 3000");
});