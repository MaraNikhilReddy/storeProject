/* Replace with your SQL commands */
CREATE TABLE Users(id SERIAL PRIMARY KEY,first_name VARCHAR(20), last_name VARCHAR(20),user_name VARCHAR(20),password VARCHAR(20));

CREATE TABLE Orders(id SERIAL PRIMARY KEY,quantity INTEGER,user_id INTEGER REFERENCES Users(id),status VARCHAR(20));

CREATE TABLE Product(id SERIAL PRIMARY KEY,name VARCHAR(20),price INTEGER);


CREATE TABLE Orders_product(id SERIAL PRIMARY KEY,order_id INTEGER REFERENCES Orders(id),product_id INTEGER REFERENCES Product(id));