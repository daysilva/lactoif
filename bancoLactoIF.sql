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

create table produto_criado (
id integer auto_increment,
nome_produto varchar(25),
quantidade_produzida numeric,
primary key (id)
);

create table producao(
id integer auto_increment,
n_producao varchar (20),
 data_inicio datetime,
 data_fim  datetime,
 id_produto integer,
	foreign key (id_produto)
    references produto_criado(id),
 regristro_ocorrencia varchar(3000) null,
 objetivo  varcharacter(3000),
 primary key(id)
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

-- POR ALGUM MOTIVO ELE ESTA DIMINUINDO A QUANTIDADE DE TODOS
create trigger UpdateEstoque after insert
on ingrediente_produto for each row
begin 
	update ingredientes set quantidade_estoque = 
		quantidade_estoque - new.quantidade
        where id = new.id_ingrediente;
end $$

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

insert into produto_criado (nome_produto, quantidade_produzida) values
("queijo", 2),
 ("bolo",4);

insert into producao (n_producao, data_inicio, data_fim, id_produto, objetivo) values
("1/2022", now(), '2022-12-31 23:59:59', 1, "aula"),
("1/2022", now(), '2022-12-31 23:59:59', 2, "aula");

 insert into auxiliar_produto (id_auxiliar, id_producao) values
 (1, 1),
 (1, 2);

 insert into tecnico_produto (id_tecnico, id_producao) values
 (1, 1);

insert into ingrediente_produto (id_ingrediente, id_producao, quantidade) values 
(1, 1, 8);

-- select * from ingredientes;

-- select id from producao where n_producao = "1/2022";

select
(select id from auxiliares where nome = "Allan")
from auxiliares;

