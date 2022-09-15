DROP DATABASE IF EXISTS FMH;
CREATE DATABASE FMH;
USE FMH;
CREATE TABLE breed (
	bid INTEGER NOT NULL AUTO_INCREMENT, 
	bname VARCHAR(100), 
	PRIMARY KEY (bid)
);

CREATE TABLE disease (
	disid INTEGER NOT NULL AUTO_INCREMENT, 
	name VARCHAR(60), 
	PRIMARY KEY (disid)
);

CREATE TABLE shelter (
	sid INTEGER NOT NULL AUTO_INCREMENT, 
	name VARCHAR(100), 
	street VARCHAR(100), 
	city VARCHAR(100), 
	country VARCHAR(100), 
	email VARCHAR(100), 
	username VARCHAR(100), 
	password VARCHAR(100), 
	picture VARCHAR(100), 
	phone VARCHAR(100), 
	proof VARCHAR(100),
	lat VARCHAR(100),
	lng VARCHAR(100),
	PRIMARY KEY (sid)
);

CREATE TABLE user (
	uid INTEGER NOT NULL AUTO_INCREMENT, 
	fname VARCHAR(60), 
	lname VARCHAR(60), 
	city VARCHAR(60), 
	country VARCHAR(60), 
	email VARCHAR(60), 
	username VARCHAR(60), 
	password VARCHAR(60), 
	picture VARCHAR(60), 
	phone VARCHAR(60),
	lat VARCHAR(100),
	lng VARCHAR(100),
	PRIMARY KEY (uid)
);

CREATE TABLE admin (
	aid INTEGER NOT NULL AUTO_INCREMENT, 
	name VARCHAR(100), 
	username VARCHAR(100), 
	password VARCHAR(100), 
	email VARCHAR(100), 
	PRIMARY KEY (aid)
);

CREATE TABLE dog (
	did INTEGER NOT NULL AUTO_INCREMENT, 
	sid INTEGER NOT NULL, 
	dname VARCHAR(60), 
	age VARCHAR(60), 
	imageurl VARCHAR(60),
	bid INTEGER, 
	PRIMARY KEY (did, sid), 
	FOREIGN KEY(sid) REFERENCES shelter (sid) ON DELETE CASCADE, 
	FOREIGN KEY(bid) REFERENCES breed (bid) ON DELETE CASCADE
);

CREATE TABLE blog (
	blid INTEGER NOT NULL AUTO_INCREMENT, 
	url VARCHAR(100), 
	aid INTEGER, 
	PRIMARY KEY (blid), 
	FOREIGN KEY(aid) REFERENCES admin (aid)
);


CREATE TABLE diseasedog (
	description VARCHAR(400), 
	did INTEGER NOT NULL, 
	disid INTEGER NOT NULL, 
	PRIMARY KEY (did, disid), 
	FOREIGN KEY(did) REFERENCES dog (did) ON DELETE CASCADE, 
	FOREIGN KEY(disid) REFERENCES disease (disid) ON DELETE CASCADE
);


CREATE TABLE list (
	lid INTEGER NOT NULL, 
	uid INTEGER NOT NULL, 
	did INTEGER NOT NULL, 
	PRIMARY KEY (lid, uid, did), 
	FOREIGN KEY(uid) REFERENCES user (uid) ON DELETE CASCADE, 
	FOREIGN KEY(did) REFERENCES dog (did) ON DELETE CASCADE
);

INSERT INTO breed (bname) VALUES ("Chihuahua");
INSERT INTO breed (bname) VALUES ("Japanese spaniel");
INSERT INTO breed (bname) VALUES ("Maltese dog");
INSERT INTO breed (bname) VALUES ("Pekinese");
INSERT INTO breed (bname) VALUES ("Shih-tzu");
INSERT INTO breed (bname) VALUES ("Blenheim spaniel");
INSERT INTO breed (bname) VALUES ("Papillon");
INSERT INTO breed (bname) VALUES ("Toy terrier");
INSERT INTO breed (bname) VALUES ("Rhodesian ridgeback");
INSERT INTO breed (bname) VALUES ("Afghan hound");
INSERT INTO breed (bname) VALUES ("Basset");
INSERT INTO breed (bname) VALUES ("Beagle");
INSERT INTO breed (bname) VALUES ("Bloodhound");
INSERT INTO breed (bname) VALUES ("Bluetick");
INSERT INTO breed (bname) VALUES ("Black-and-tan coonhound");
INSERT INTO breed (bname) VALUES ("Walker hound");
INSERT INTO breed (bname) VALUES ("English foxhound");
INSERT INTO breed (bname) VALUES ("Redbone");
INSERT INTO breed (bname) VALUES ("Borzoi");
INSERT INTO breed (bname) VALUES ("Irish wolfhound");
INSERT INTO breed (bname) VALUES ("Italian greyhound");
INSERT INTO breed (bname) VALUES ("Whippet");
INSERT INTO breed (bname) VALUES ("Ibizan hound");
INSERT INTO breed (bname) VALUES ("Norwegian elkhound");
INSERT INTO breed (bname) VALUES ("Otterhound");
INSERT INTO breed (bname) VALUES ("Saluki");
INSERT INTO breed (bname) VALUES ("Scottish deerhound");
INSERT INTO breed (bname) VALUES ("Weimaraner");
INSERT INTO breed (bname) VALUES ("Staffordshire bullterrier");
INSERT INTO breed (bname) VALUES ("American staffordshire terrier");
INSERT INTO breed (bname) VALUES ("Bedlington terrier");
INSERT INTO breed (bname) VALUES ("Border terrier");
INSERT INTO breed (bname) VALUES ("Kerry blue terrier");
INSERT INTO breed (bname) VALUES ("Irish terrier");
INSERT INTO breed (bname) VALUES ("Norfolk terrier");
INSERT INTO breed (bname) VALUES ("Norwich terrier");
INSERT INTO breed (bname) VALUES ("Yorkshire terrier");
INSERT INTO breed (bname) VALUES ("Wire-haired fox terrier");
INSERT INTO breed (bname) VALUES ("Lakeland terrier");
INSERT INTO breed (bname) VALUES ("Sealyham terrier");
INSERT INTO breed (bname) VALUES ("Airedale");
INSERT INTO breed (bname) VALUES ("Cairn");
INSERT INTO breed (bname) VALUES ("Australian terrier");
INSERT INTO breed (bname) VALUES ("Dandie dinmont");
INSERT INTO breed (bname) VALUES ("Boston bull");
INSERT INTO breed (bname) VALUES ("Miniature schnauzer");
INSERT INTO breed (bname) VALUES ("Giant schnauzer");
INSERT INTO breed (bname) VALUES ("Standard schnauzer");
INSERT INTO breed (bname) VALUES ("Scotch terrier");
INSERT INTO breed (bname) VALUES ("Tibetan terrier");
INSERT INTO breed (bname) VALUES ("Silky terrier");
INSERT INTO breed (bname) VALUES ("Soft-coated wheaten terrier");
INSERT INTO breed (bname) VALUES ("West highland white terrier");
INSERT INTO breed (bname) VALUES ("Lhasa");
INSERT INTO breed (bname) VALUES ("Flat-coated retriever");
INSERT INTO breed (bname) VALUES ("Curly-coated retriever");
INSERT INTO breed (bname) VALUES ("Golden retriever");
INSERT INTO breed (bname) VALUES ("Labrador retriever");
INSERT INTO breed (bname) VALUES ("Chesapeake bay retriever");
INSERT INTO breed (bname) VALUES ("German short-haired pointer");
INSERT INTO breed (bname) VALUES ("Vizsla");
INSERT INTO breed (bname) VALUES ("English setter");
INSERT INTO breed (bname) VALUES ("Irish setter");
INSERT INTO breed (bname) VALUES ("Gordon setter");
INSERT INTO breed (bname) VALUES ("Brittany spaniel");
INSERT INTO breed (bname) VALUES ("Clumber");
INSERT INTO breed (bname) VALUES ("English springer");
INSERT INTO breed (bname) VALUES ("Welsh springer spaniel");
INSERT INTO breed (bname) VALUES ("Cocker spaniel");
INSERT INTO breed (bname) VALUES ("Sussex spaniel");
INSERT INTO breed (bname) VALUES ("Irish water spaniel");
INSERT INTO breed (bname) VALUES ("Kuvasz");
INSERT INTO breed (bname) VALUES ("Schipperke");
INSERT INTO breed (bname) VALUES ("Groenendael");
INSERT INTO breed (bname) VALUES ("Malinois");
INSERT INTO breed (bname) VALUES ("Briard");
INSERT INTO breed (bname) VALUES ("Kelpie");
INSERT INTO breed (bname) VALUES ("Komondor");
INSERT INTO breed (bname) VALUES ("Old english sheepdog");
INSERT INTO breed (bname) VALUES ("Shetland sheepdog");
INSERT INTO breed (bname) VALUES ("Collie");
INSERT INTO breed (bname) VALUES ("Border collie");
INSERT INTO breed (bname) VALUES ("Bouvier des flandres");
INSERT INTO breed (bname) VALUES ("Rottweiler");
INSERT INTO breed (bname) VALUES ("German shepherd");
INSERT INTO breed (bname) VALUES ("Doberman");
INSERT INTO breed (bname) VALUES ("Miniature pinscher");
INSERT INTO breed (bname) VALUES ("Greater swiss mountain dog");
INSERT INTO breed (bname) VALUES ("Bernese mountain dog");
INSERT INTO breed (bname) VALUES ("Appenzeller");
INSERT INTO breed (bname) VALUES ("Entlebucher");
INSERT INTO breed (bname) VALUES ("Boxer");
INSERT INTO breed (bname) VALUES ("Bull mastiff");
INSERT INTO breed (bname) VALUES ("Tibetan mastiff");
INSERT INTO breed (bname) VALUES ("French bulldog");
INSERT INTO breed (bname) VALUES ("Great dane");
INSERT INTO breed (bname) VALUES ("Saint bernard");
INSERT INTO breed (bname) VALUES ("Eskimo dog");
INSERT INTO breed (bname) VALUES ("Malamute");
INSERT INTO breed (bname) VALUES ("Siberian husky");
INSERT INTO breed (bname) VALUES ("Affenpinscher");
INSERT INTO breed (bname) VALUES ("Basenji");
INSERT INTO breed (bname) VALUES ("Pug");
INSERT INTO breed (bname) VALUES ("Leonberg");
INSERT INTO breed (bname) VALUES ("Newfoundland");
INSERT INTO breed (bname) VALUES ("Great pyrenees");
INSERT INTO breed (bname) VALUES ("Samoyed");
INSERT INTO breed (bname) VALUES ("Pomeranian");
INSERT INTO breed (bname) VALUES ("Chow");
INSERT INTO breed (bname) VALUES ("Keeshond");
INSERT INTO breed (bname) VALUES ("Brabancon griffon");
INSERT INTO breed (bname) VALUES ("Pembroke");
INSERT INTO breed (bname) VALUES ("Cardigan");
INSERT INTO breed (bname) VALUES ("Toy poodle");
INSERT INTO breed (bname) VALUES ("Miniature poodle");
INSERT INTO breed (bname) VALUES ("Standard poodle");
INSERT INTO breed (bname) VALUES ("Mexican hairless");
INSERT INTO breed (bname) VALUES ("Dingo");
INSERT INTO breed (bname) VALUES ("Dhole");
INSERT INTO breed (bname) VALUES ("African hunting dog");
INSERT INTO breed (bname) VALUES ("others");
INSERT INTO disease (name) VALUES ("Viral infections");
INSERT INTO disease (name) VALUES ("Bacterial infections");
INSERT INTO disease (name) VALUES ("Fungal infections");
INSERT INTO disease (name) VALUES ("Protozoal diseases");
INSERT INTO disease (name) VALUES ("Internal parasites");
INSERT INTO disease (name) VALUES ("External parasites");
INSERT INTO disease (name) VALUES ("Skeletal and muscular disorders");
INSERT INTO disease (name) VALUES ("Cardiovascular and circulatory");
INSERT INTO disease (name) VALUES ("Nervous system");
INSERT INTO disease (name) VALUES ("Eyes");
INSERT INTO disease (name) VALUES ("Ears");
INSERT INTO disease (name) VALUES ("Skin");
INSERT INTO disease (name) VALUES ("Endocrine diseases");
INSERT INTO disease (name) VALUES ("Gastrointestinal diseases");
INSERT INTO disease (name) VALUES ("Urinary and reproductive systems");
INSERT INTO disease (name) VALUES ("Cancers");
INSERT INTO disease (name) VALUES ("Behavioral");
INSERT INTO disease (name) VALUES ("Environmental");
INSERT INTO disease (name) VALUES ("Poisons and overdoses");
INSERT INTO disease (name) VALUES ("Injuries");

