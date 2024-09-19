INSERT INTO categories (id, description) VALUES(nextval('CATEGORIES_SEQ')	, 'Mangas');
INSERT INTO categories (id, description) VALUES(nextval('CATEGORIES_SEQ'), 'Animes');
INSERT INTO categories (id, description) VALUES(nextval('CATEGORIES_SEQ'), 'Light Novels');

INSERT INTO suppliers (id, "name") VALUES(nextval('SUPPLIERS_SEQ'), 'Toei');
INSERT INTO suppliers (id, "name") VALUES(nextval('SUPPLIERS_SEQ'), 'Ufotable');

INSERT INTO products (id, fk_category, fk_supplier, quantity_available, create_at, "name") VALUES(nextval('PRODUCTS_SEQ'), 2, 1,  12, current_timestamp, 'One Piece');
INSERT INTO products (id, fk_category, fk_supplier, quantity_available, create_at, "name") VALUES(nextval('PRODUCTS_SEQ'), 1, 2,  122, current_timestamp, 'Demon slayer');
INSERT INTO products (id, fk_category, fk_supplier, quantity_available, create_at, "name") VALUES(nextval('PRODUCTS_SEQ'), 3, 2, 11,  current_timestamp, 'Sword Art Online');
