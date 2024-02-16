create database Diary_v1;

create table users(
    username text primary key,
    pswd text not null,
    fname text not null,
    lname text,
    dob date,
    email text unique not null,
    journal bigint [],
    verified boolean default 'false'

);

create table diaries(
    id serial primary key,
    title text not null,
    content text not null,
    created date default current_date,
    username text references users (username)
);

insert into users(username, pswd, fname, lname, email) 
values('nithin','nithin','nithin','nithin','nithin');

insert into diaries(title, content, username, created) 
values('title','content','thatchin', '2023-12-01');

select id, title, content, created, username from diaries 
inner join users on users.username = diaries.username;

select * from diaries where username = 'thatchin'