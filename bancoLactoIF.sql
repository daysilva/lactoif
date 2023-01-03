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

insert into ingredientes (nome, quantidade_estoque, medicao) values
("açucar", 10, "Kg"),
("leite", 2, "L"),
("farinha", 5, "Kg"),
("nutela", 3, "Kg");

insert into nome_produto (nome_produto, medicao) values
("queijo", "Kg"),
("iorgute", "L"),
 ("bolo", "unidade"),
 ("doce", "g");

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



