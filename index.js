const express = require('express')
//instancia
const app = express();
const path = require('path')
//express puro só envia respsotas  (texto, json, arquivos) para o navegador

//template engine é uma ferramenta que permite misturar HTML com código JavaScript (ou outra linguagem) de forma dinâmica.
/*

EJS é um tipo de template que permite misturar HTML e JavaScript.
EJS foi feito especificamente para HTML + JavaScript

    Mostrar nomes de usuários dinamicamente

    Criar listas a partir de arrays

    Inserir informações do banco de dados direto no HTML

consegue enviar respostas ao navegador usando Express + EJS, sem precisar concatenar strings manualmente    
*/


/*
express.static libera a pasta public para acesso no navegador Permite usar CSS, JS e imagens no HTML
Sem express.static, o Node/Express NÃO entrega arquivos para o navegador.

__dirname guarda o diretorio absoluto do projeto meu-projeto/...
*/
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, './views'))

//use() vem do express | Middleware é uma função que fica entre a requisição e a resposta | pode alterar req e res antes da resposta final ao cliente
//Permite que o Express leia dados json enviados no corpo da requisição
app.use(express.json());
//Permite que o Express leia dados enviados por form html
app.use(express.urlencoded({ extended: true }));


var tarefas = [];


app.post('/',(req,res)=>{
    //pego valor do atributo tarefa, passado pelo frontend
    //push adiciona um elemento no final do array
   tarefas.push(req.body.tarefa)


    res.redirect('/');

});

//quando chegar no diretorio '/' vou ter algo para mostrar ao usuario
//constroi o retorno para o navegador
app.get('/',(req,res)=>{

    //O HTML é renderizado com res.render()
    //pega elementos de tarefas e renderiza no navegador atraves da variavel tarefasLista
    res.render('index',{tarefasLista:tarefas});
})


//rota deletar
//:qualquerNome receberá o valor passado na url
app.get('/deletar/:id',(req,res)=>{

    //retorna apenas id diferente doq for passado na url e rescresve valor de tarefas (criando novo array)
    tarefas = tarefas.filter((_,index)=>{

        //se o id for diferete do id passado, retorna o elemento (id igual nao sera retornado)
        //Number() converte pra numero. node retorna como string
        //req obj que presenta tudo que o cliente mandou para o servidor (URL, parâmetros, query, body, headers, etc.)
        //params Parametros da rota(valores que vem definidos na url:valor)
       return index != Number(req.params.id);
    })

    //chama caminho '/' para retornar a pagina inicial e atualizar a tarefasLista
    /*
            a variável tarefas é atualizada neste bloco
            e a rota '/' também tem acesso a ela,
            pois a variável está armazenada na memória ram
    */

    res.redirect('/');

});


//start o servidor
//listen() faz o servidor escutar requisições na porta 5000 / 
//quando ouver uma requisocao, retornar chamada

/*
Várias requisições de clientes diferentes
Cada cliente usa uma porta diferente
Todas chegam na mesma porta do servidor (backend)
*/
app.listen(5000, ()=>{
    console.log('server rodando')
});




/*
node é um runtime que permite executar JavaScript fora do navegador, como em um servidor. (recebe req e envia resposta)
Express é um framework que abstrai e simplifica a sintaxe e o trabalho de baixo nível do Node.js.
EJS é uma template engine que permite inserir JavaScript em arquivos HTML no lado do servidor, gerando páginas dinâmicas antes de enviá-las ao navegador.
*/