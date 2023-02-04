drop database if exists lactoif;
create database if not exists lactoif;
use lactoif;


create table usuarios(
id integer auto_increment,
	primary key (id),
nome varchar(30),
senha varchar(30)
);

insert into usuarios (nome, senha) values
('Ramon', 'ifrn'),
('Felipe','1234');

create table tecnicos(
id integer auto_increment,
nome varchar(100),
matricula varcharacter(20),
senha varcharacter(50),
primary key(id)
);


create table auxiliares(
id integer auto_increment,
nome varchar(100),
primary key(id)
);
create table ingredientes (
id integer auto_increment,
nome varchar(50), 
quantidade_estoque numeric,
medicao varchar(10),
primary key(id)
);

create table nome_produto (
id integer auto_increment,
id_secundario integer,
nome_produto varchar(25),
medicao varchar(10),
primary key (id)
);


create table producao(
id integer auto_increment,
n_producao varchar (20),
 data_inicio datetime,
 data_fim  datetime,
 regristro_ocorrencia varchar(3000) null,
 objetivo  varcharacter(3000),
 primary key(id)
);

create table produto_producao (
id_producao integer,
	foreign key (id_producao)
		references producao (id),
id_produto integer,
	foreign key (id_produto)
		references nome_produto (id),
quantidade_produzida numeric,
primary key (id_producao, id_produto)
);

create table auxiliar_produto(
id_auxiliar integer,
foreign key (id_auxiliar)
	references auxiliares(id),
id_producao integer,
foreign key(id_producao)
  references producao(id),
  primary key (id_auxiliar, id_producao)
);

create table tecnico_produto (
id_tecnico integer,
foreign key(id_tecnico)
  references tecnicos(id),
id_producao integer,
foreign key(id_producao)
  references producao(id),
   primary key (id_tecnico, id_producao)
 );
 
 create table ingrediente_produto (
 id_ingrediente integer,
foreign key (id_ingrediente)
		references ingredientes (id),
id_producao integer,
foreign key (id_producao)
	references producao (id),
quantidade integer,
 primary key (id_ingrediente, id_producao)
 );
 
 
delimiter $$


create trigger UpdateEstoque after insert
on ingrediente_produto for each row
begin 
	update ingredientes set quantidade_estoque = 
		quantidade_estoque - new.quantidade
        where id = new.id_ingrediente;
end $$

delimiter ;



insert into tecnicos (nome, matricula, senha) values
("Felipe Araujo dos Santos", "22022#", "123456"),
("Ramon Aráujo dos Santos", "22023#", "12345"),
("Arquileine Maionomy Benicio de Carvalho", "22024#", "1234");

insert into auxiliares (nome) values 
("Laylla Christtyann Dantas"),
("Gabriel Bruno Adelino da Silva"),
("Pablo Thaisse Ferreira de Souza"),
("Elisângela Figueiredo de Lima Santos"),
("Jerffson Amaral de Moura"),
("Jéssica Thaise Ferreira de Souza");


insert into ingredientes (nome, quantidade_estoque, medicao) values
("Açucar", 50, "Kg"),
("Sal",50 , "kg"),
("Bicarbonato de sódio",50 , "kg"),
("Cirato de sódio", 50, "kg"),
("Cloreto de cálcio", 50, "kg"),
("Coagulante",50 , "L"),
("Ácido láctico",50 , "L"),
("Corante a base de urucum",50 , "kg"),
("Preparado de morango",50 , "Kg"),
("Preparado de açaí com banana",50 , "kg"),
("Preparado de banana, aveia e mel", 50, "kg"),
("Preparado de ameixa", 50, "kg"),
("Preparado de graviola", 50, "kg"),
("Leite desnatado",50 , "L"),
("Creme de leite fresco ", 50, "Kg"),
("Leite", 20, "L");


insert into nome_produto (nome_produto, medicao) values

("Queijo coalho", "kg"),
 ("Doce de leite pastoso", "kg"),
 ("Iogute", "L"),
 ("Coalhada", "Kg"),
 ("Queijo minas padrão", "Kg"),
 ("Queijo minas frescal", "kg"),
 ("Queijo do reino", "kg"),
 ("Queijo pamesão", "Kg"),
 ("Queijo petit-suisse", "Kg"),
 ("Doce de leite em barra", "Kg"),
 ("Ricota", "Kg"),
 ("Iogute grego", "Kg"),
 ("Queijo gouda", "Kg"),
 ("Pate de ricota", "Kg"),
 ("Manteiga de garrafa", "L"),
 ("Manteiga pastosa", "Kg"),
 ("Queijo Brie", "Kg");

insert into producao (n_producao, data_inicio, data_fim, objetivo) values
("1/2022", now(), '2022-12-31 23:59:59', "aula");

insert into produto_producao (id_producao, id_produto, quantidade_produzida) values
(1, 1, 3),
(1, 2, 1);

 insert into auxiliar_produto (id_auxiliar, id_producao) values
 (1, 1),
 (2, 1);

 insert into tecnico_produto (id_tecnico, id_producao) values
 (1, 1);

insert into ingrediente_produto (id_ingrediente, id_producao, quantidade) values 
(1, 1, 8);
