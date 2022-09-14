const fs = require('fs');

const knex = require('knex')({
    client: 'mssql',
    connection: {
        user: 'sa',
        password: 'passw0rD',
        server: '127.0.0.1',
        database: 'AdventureWorksLT2019'
    }
});

// knex.select('*').from('[SalesLT].[SalesOrderDetail]').then(sales => {
//     console.log(sales);
// })


// const customerQueryRAW = fs.readFileSync('sql/customerQuery.sql').toString();
const customerQueryRAW = 
`
SELECT TOP (1000) [CustomerID]
,[NameStyle]
,[Title]
,[FirstName]
,[MiddleName]
,[LastName]
,[Suffix]
,[CompanyName]
,[SalesPerson]
,[EmailAddress]
,[Phone]
,[PasswordHash]
,[PasswordSalt]
,[rowguid]
,[ModifiedDate]
FROM [AdventureWorksLT2019].[SalesLT].[Customer]
`;

const customers = async function() {
   const res = await knex.raw(customerQueryRAW)
   return res;
};

(async () => {
    const c = await customers();
    console.log(c);
    // Now you push this to algolia
})();