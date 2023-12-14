create table projets (
  id int unsigned primary key auto_increment NOT NULL,
  label varchar(255) NOT NULL,
  description TEXT,
  date_start DATE NOT NULL,
  date_end DATE,
  is_done BOOLEAN DEFAULT 0
)

CREATE TABLE technologies (
  id int unsigned primary key auto_increment NOT NULL,
  label VARCHAR(255) NOT NULL
);

CREATE TABLE experiences (
  id int unsigned primary key auto_increment NOT NULL,
  label VARCHAR(255) NOT NULL,
  description TEXT,
  company VARCHAR(255) NOT NULL,
  date_start DATE NOT NULL,
  date_end DATE,
);

CREATE TABLE competences (
  id int unsigned primary key auto_increment NOT NULL,
  label VARCHAR(255) NOT NULL
);

CREATE TABLE contacts {
  id int unsigned primary key auto_increment NOT NULL,
  objet VARCHAR(255) NOT NULL,
  message VARCHAR(255) NOT NULL,
  date_reception DATE DEFAULT CURRENT_DATE, 
}

CREATE TABLE utilisateurs (
  id int unsigned primary key auto_increment NOT NULL,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL,
  role ENUM('admin', 'employeur', 'developpeur', 'visiteur') DEFAULT 'visiteur'
);
