INSERT INTO categories (id, description) VALUES(1, 'Mangas');
INSERT INTO categories (id, description) VALUES(2, 'Animes');
INSERT INTO categories (id, description) VALUES(3, 'Light Novels');

INSERT INTO suppliers (id, "name") VALUES(1, 'Toei');
INSERT INTO suppliers (id, "name") VALUES(2, 'Ufotable');

INSERT INTO products (fk_category, fk_supplier, id, quantity_available, "name") VALUES(2, 1, 1, 12, 'One Piece');
INSERT INTO products (fk_category, fk_supplier, id, quantity_available, "name") VALUES(1, 2, 2, 122, 'Demon slayer');
INSERT INTO products (fk_category, fk_supplier, id, quantity_available, "name") VALUES(3, 2,3, 11, 'Sword Art Online');