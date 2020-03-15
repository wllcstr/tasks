# TaskList Supero

## backend

API Rest desenvolvida em C# usando EF. Autorização com token bearer.
Usando um banco de dados MSSQL hospedado no Google Clound Plataform.
Bando de dados foi criado usando o EF, as migrations estão junto no git.


## frontend

Totalmente separada da API, criei usando html, javascript e css simples, utilizando jQuery para controlar o DOM e realizar as chamadas via AJAX para a API, na parte de layout, UI e estilo, optei por usar o [Materlizecss](https://materializecss.com/), que oferece uma ótima experiência, tanto desktop quanto mobile.
A página inicial do projeto é a index.html
Usei sessionStorage para guardar o token, porém, localStorage para guardar o endereço da API (requisitado no primeiro acesso) para não ter que preencher a cada execução. Na página de login tem um Float Action Button para limpar o endereço da API no localStorage.


