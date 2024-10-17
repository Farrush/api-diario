create database diario_db;
use diario_db;

create table diario_tb(
	id_diario int auto_increment primary key,
    nm_titulo varchar(200)
);
create table usuario_tb(
	id_usuario int auto_increment primary key,
    nm_nome varchar(200) not null,
    em_email varchar(200) unique not null,
    pw_senha varchar(200) not null,
    id_diario int,
    foreign key (id_diario) references diario_tb(id_diario)
);
create table paragrafo_tb(
	id_paragrafo int auto_increment primary key,
    co_conteudo varchar(2000),
    id_diario int not null,
    foreign key (id_diario) references diario_tb(id_diario) on delete cascade
);