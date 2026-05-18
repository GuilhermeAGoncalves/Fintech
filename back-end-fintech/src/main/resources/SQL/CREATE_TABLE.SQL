CREATE TABLE FT_USERS (
                          userId VARCHAR2(255),
                          email VARCHAR2(100) NOT NULL,
                          name VARCHAR2(60) NOT NULL,
                          password VARCHAR2(255) NOT NULL,
                          createdAt TIMESTAMP NOT NULL,

                          CONSTRAINT FT_USERS_PK PRIMARY KEY (userId)
);

CREATE TABLE FT_CATEGORIES (
                               categoryId VARCHAR2(255),
                               name VARCHAR2(60) NOT NULL,
                               type VARCHAR2(10) NOT NULL,
                               FT_USERS_userId VARCHAR2(255) NOT NULL,

                               CONSTRAINT FT_CATEGORIES_PK PRIMARY KEY (categoryId),
                               CONSTRAINT FT_CATEGORIES_FT_USERS_FK FOREIGN KEY (FT_USERS_userId)
                                   REFERENCES FT_USERS(userId)
);

CREATE TABLE FT_ACCOUNTS (
                             accountId VARCHAR2(255),
                             FT_USERS_userId VARCHAR2(255) NOT NULL,
                             name VARCHAR2(60) NOT NULL,
                             initialBalance NUMBER(10, 2) NOT NULL, -- Ajustado para suportar decimais em dinheiro
                             accountType VARCHAR2(60) NOT NULL,
                             color VARCHAR2(12) NOT NULL,
                             isActive CHAR(1) NOT NULL,

                             CONSTRAINT FT_ACCOUNTS_PK PRIMARY KEY (accountId),
                             CONSTRAINT FT_ACCOUNTS_FT_USERS_FK FOREIGN KEY (FT_USERS_userId)
                                 REFERENCES FT_USERS(userId)
);

CREATE TABLE FT_TRANSACTIONS (
                                 transactionId VARCHAR2(255),
                                 FT_CATEGORIES_categoryId VARCHAR2(255) NOT NULL,
                                 FT_USERS_userId VARCHAR2(255) NOT NULL,
                                 FT_ACCOUNTS_accountId VARCHAR2(255) NOT NULL,
                                 description VARCHAR2(100) NOT NULL,
                                 amount NUMBER(10, 2) NOT NULL, -- Ajustado para suportar decimais em dinheiro
                                 dtTransaction TIMESTAMP NOT NULL,
                                 status VARCHAR2(10) NOT NULL,

                                 CONSTRAINT FT_TRANSACTIONS_PK PRIMARY KEY (transactionId),
                                 CONSTRAINT FT_TRANSACTIONS_FT_CATEG_FK FOREIGN KEY (FT_CATEGORIES_categoryId)
                                     REFERENCES FT_CATEGORIES(categoryId),
                                 CONSTRAINT FT_TRANSACTIONS_FT_USERS_FK FOREIGN KEY (FT_USERS_userId)
                                     REFERENCES FT_USERS(userId),
                                 CONSTRAINT FT_TRANSACTIONS_FT_ACC_FK FOREIGN KEY (FT_ACCOUNTS_accountId)
                                     REFERENCES FT_ACCOUNTS(accountId)
);