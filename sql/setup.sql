drop table if exists items;

create table items ( 
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cost INTEGER CHECK (cost > 0)
);