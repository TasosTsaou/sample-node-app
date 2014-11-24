#CRUDappWithAuthMssql

This sample app constists of boilerplate code for a mssql/node/express/angular/bootstrap/html5 web app based on the tutorial and code created by J Cole Morrison, many thanks are in order,the work of this guy helped me much.

Here is his blog, you should check it to get familiar with grunt workflows and many other staff. (http://start.jcolemorrison.com/building-an-angular-and-express-app-part-1/) It includes link to his app github repo.

My app is an expanded version of the above mentioned app, and its an attempt to cover the following areas:

1.use of more than one database servers on the same app,decided by user choise on client.

2.use of MS SQL Server as an RDBMS, which is a non-trivial subject with node.js

3.use of promises serverside.

4.use of Angular cookies (via cookieStore module) for session management( its not implemented to have timeouts yet).

5.use of smart-table to picture fetched data on client.

It can be used as boilerplate and the reason I uploaded it is to demonstrate some definately basic and non-perfect, but still functional ways to perform tasks concerning the bulletpoints above. Despite my workload, I hope I will be able to commit new features in the near future and improve the already functional ones.