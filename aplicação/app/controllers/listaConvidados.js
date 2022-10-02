const { addConvidado } = require("../models/home");
const { getTodosConvidados, getConvidado } = require("../models/listaConvidados");

module.exports.getTodosConvidadosController = (app,req,res) =>{
    getTodosConvidados((error,result) =>{
        if(error){
            console.log("Erro ao buscar todos os convidados >>> ",error);
            let erro = {}; 
            if(error.errno == 1146){
                erro.mensagem = "A tabela de convidados não foi encontrada";
                erro.codigo = 1146;
                logger.log({
                    level: 'bancoDeDados',
                    message: error.sqlMessage
                });
            }else if(error.errno == 1045){
                erro.mensagem = "A senha do banco de dados está incorreta";
                erro.codigo = 1045;
                logger.log({
                    level: 'bancoDeDados',
                    message: error.sqlMessage
                });
            }
            else{
                erro.mensagem = "Tivemos um problema ao buscar todos os convidados";
                erro.codigo = 0000;
                logger.log({
                    level: 'desconhecido',
                    message: error.code
                });
            }
            res.render('errorView', {erro: erro})
        }else{
            res.render('listaConvidados.ejs', {convidados: result});
        }
        
    });
}
module.exports.addConvidadoController = (app,req,res) =>{
    let convidado = req.body;
    console.log(convidado)
    convidado.status = "Convidado";
    addConvidado(convidado,(error,result) =>{
        console.log("Resultado da inserção >>> ",result);
        console.log("Erro ao inserir >>> ",error);
        res.redirect('/');
    })
}
module.exports.detalheConvidadoController = (app,req,res) =>{
    let convidado = req.query;
    getConvidado(convidado.idConvidado,(error,result) =>{
        if(error){
            console.log(error);
        }else{
            res.render('infoConvidado',{erro: {}, convidado: result});
        }
    })
}
