-- Crear tablas

create table usuarios (
    usuario varchar(10) primary key not null,
    passwd  varchar(10)
);

create table entradas (
    usuario varchar(10),
    texto   varchar(500)
);

-- Crear algunos usuarios

insert into usuarios values ('jperez', '123456');
insert into usuarios values ('clopez', 'password');
insert into usuarios values ('bjuarez', 'qwerty');
insert into usuarios values ('amartinez', 'abc123');
