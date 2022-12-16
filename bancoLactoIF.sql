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
('root', 'ifrn');

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
primary key(id)
);

create table produto(
id integer auto_increment,
nome varchar(100),
 data_inicio datetime,
 data_fim  datetime,
 quantidade_produzida numeric,
 objetivo  varcharacter(1000),
 primary key(id)
);

create table auxiliar_produto(
id_auxiliar integer,
foreign key (id_auxiliar)
	references auxiliares(id),
id_produto integer,
foreign key(id_produto)
  references produto(id)
	);
create table tecnico_produto (
id_tecnico integer,
foreign key(id_tecnico)
  references tecnicos(id),
id_produto integer,
foreign key(id_produto)
  references produto(id)
 );
 
 create table ingrediente_produto (
 id_ingrediente integer,
foreign key (id_ingrediente)
		references ingredientes (id),
id_produto integer,
foreign key (id_produto)
	references produto (id),
quantidade integer
 );
 
 
delimiter $$
/*
POR ALGUM MOTIVO ELE ESTA DIMINUINDO A QUANTIDADE DE TODOS
create trigger UpdateEstoque after insert
on ingrediente_produto for each row
begin 
	update ingredientes set quantidade_estoque = 
		quantidade_estoque - new.quantidade;
end $$
*/
delimiter ;


insert into tecnicos (nome, matricula, senha) values
("Jaziel", "22022#", "123456"),
("Ramon", "22023#", "123456"),
("Mayomir", "22024#", "123456");

insert into auxiliares (nome) values 
("Andreilson"),
("Allan"),
("Ricardo"),
("Denys");

insert into ingredientes (nome, quantidade_estoque) values
("açucar", 10),
("leite", 2),
("farinha", 5),
("nutela", 3);

insert into produto (nome, data_inicio, data_fim, quantidade_produzida, objetivo) values
("quejo", now(), '2022-12-31 23:59:59', 2, "aula");

 insert into auxiliar_produto (id_auxiliar, id_produto) values
 (1, 1);
 
 insert into tecnico_produto (id_tecnico, id_produto) values
 (1, 1);

insert into ingrediente_produto (id_ingrediente, id_produto, quantidade) values 
(1, 1, 8);