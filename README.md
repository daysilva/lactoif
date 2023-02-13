Este é o sistema que desenvolvemos para a materia de Projeto Integrador.
Para baixar dependencias e colocar o sistema para rodar, siga as seguintes etapas:

execute esse arquivo que contém o banco de dados, para que o mesmo seja criado.

bancoLactoIF.sql

    "Nós estamos usando o banco de dados mysql"




O arquivo:

lactoif\backEnd\BD\conexao.js

É ele quem se conecta com o banco de dados. Você deve alterar o password, inserindo a senha que você usa para se conectar com seu banco de dados

    host: 'localhost',
    
    user: 'root',
    
    password: "sua senha",
    
    database: 'lactoif'
    
 
Agora você deve instalar as dependências.

    "Dica! deixe dois terminais abertos. Um para o backEnd e outro para o frontEnd"

Dentro do diretorio backEnd, digite o comando npm install:

lactoif\backEnd> npm install

Dentro do diretorio frontEnd\vue-project, digite o comando npm install:

lactoif\frontEnd\vue-project> npm install


Agora que você ja configurou tudo, coloque o projeto para rodar


Para o terminal que levantará o servidor do backEnd:

lactoif\backEnd\src> node .\server.js

Para o terminal que executará o frontEnd:

lactoif\frontEnd\vue-project> npm run dev



Entre com o endereço gerado pelo vueJS
  ➜  Local:   http://127.0.0.1:5173/
  
  
  
Você então verá nossa pagina de login. Para poder entrar digite um de nossos perfis ficticios

nome: Ramon 

Senha: ifrn
