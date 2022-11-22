
const UsersModel = require('../models/users');
const ConvidadosController = require('../controllers/listaConvidados');


const Joi = require('joi');
const schema = Joi.object().keys({
    nome: Joi.string().required().min(1).max(50),
    emailConvidado: Joi.string().email(),
    status: Joi.number().min(1).max(3)
    
 });

module.exports = class UsersController {
    static async authUser(req, res, next){
        console.log('Controller Users');
        try{
            let user = req.body
            const usuario = await UsersModel.authUser(user.email,user.password);
            //res.status(200).json(usuario);
            /*req.session.userName = user.email;
            req.session.loggedIn = true;*/
            ConvidadosController.getAllConvidados();
            //getTodosConvidadosController(app,req,res);
            
        }catch(error){
            console.log(error);
            //res.status(500).json({error: error})
            const erro={};
            erro.code = "Tivemos um problema ao autenticar seu usuário";
            erro.codigo = 1212;
                            
            res.render('errorView', {erro: erro});
            //res.end("Erro ao autenticar usuario");
            console.log(error);
        }
    }
}
/*const logger = require('../../config/winstonLogger');
const crypto = require('crypto');
const { addUser, authUser } = require ('../models/users');
const { getTodosConvidadosController } = require('./listaConvidados');

module.exports.addUserController = (app, req, res) =>{
    let user = req.body;
    let passwordCrypto = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = passwordCrypto;
    
    addUser(user, (error, result) => {
        if(error) {
            console.log(error);
            res.end("Erro ao Cadastrar usuario");
        }else{
            getTodosConvidadosController(app,req,res);
        }
        
        
    })
}
    module.exports.authUserController = (app, req, res) =>{
        let user = req.body;
        console.log(user);
        //let passwordCrypto = crypto.createHash('md5').update(user.password).digest('hex');
        //user.password = passwordCrypto;
        authUser(user, (error, result) => {
            if(error) {
                let erro = {};
                if(error.errno == 1045){
                    erro.mensagem = "A senha do banco de dados está incorreta";
                    erro.codigo = 1045;
                    logger.log({
                        level: 'bancoDeDados',
                        message: error.sqlMessage
                    });
                    res.render('errorView', {erro: erro})
                }else{
                    erro.mensagem = "Tivemos um problema ao autenticar seu usuário";
                    erro.codigo = 0000;
                    logger.log({
                        level: 'desconhecido',
                        message: error.code
                    });
                }
                res.render('errorView', {erro: erro})
                //res.end("Erro ao autenticar usuario");
                console.log(error);
            }else{
                
                if(result.length >0 ){
                    req.session.userName = user.email;
                    req.session.loggedIn = true;
                    getTodosConvidadosController(app,req,res);
                }else{
                    let erro = {};  
                    erro.mensagem = "Acesso não autorizado";
                    erro.codigo = 00000
                    
                    logger.log({
                        level: 'autenticação',
                        message: erro.message
                    });
                    res.render('errorView', {erro: erro})
                }
            }
            
        })
    }*/

   /* module.exports.authUserController = (app, req, res) =>{
        let user = req.body;
        console.log(user);
        //let passwordCrypto = crypto.createHash('md5').update(user.password).digest('hex');
        //user.password = passwordCrypto;
        authUser(user, (error, result) => {
            if(error) {
                let erro = {};
                if(error.errno == 1045){
                    erro.mensagem = "A senha do banco de dados está incorreta";
                    erro.codigo = 1045;
                    logger.log({
                        level: 'bancoDeDados',
                        message: error.sqlMessage
                    });
                    res.render('errorView', {erro: erro})
                }else{
                    erro.mensagem = "Tivemos um problema ao autenticar seu usuário";
                    erro.codigo = 0000;
                    logger.log({
                        level: 'desconhecido',
                        message: error.code
                    });
                }
                res.render('errorView', {erro: erro})
                //res.end("Erro ao autenticar usuario");
                console.log(error);
            }else{
                
                if(result.length >0 ){
                    req.session.userName = user.email;
                    req.session.loggedIn = true;
                    getTodosConvidadosController(app,req,res);
                }else{
                    let erro = {};  
                    erro.mensagem = "Acesso não autorizado";
                    erro.codigo = 00000
                    
                    logger.log({
                        level: 'autenticação',
                        message: erro.message
                    });
                    res.render('errorView', {erro: erro})
                }
            }
            
        })
    }*/