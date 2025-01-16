# Desafio Cubos Movies

Essa é uma solução para o desafio Cubos Movies - Frontend Developer.


# Índice
  - [Índice](#table-of-contents)
  - [Overview](#overview)
    - [O desafio](#the-challenge)
  - [Executando o projeto](#running)
  - [Meu processo](#my-process)
    - [Feito com](#built-with)
    - [Possíveis melhorias](#continued-development)
  - [Autor](#author)

# Overview

## O Desafio

### Página de Pesquisa de Filmes (Pagina inicial)
A página inicial do aplicativo web será a página de pesquisa. Esta página deve exibir uma lista de filmes, mesmo que o usuário ainda não tenha inserido nada no campo de pesquisa. Quando o usuário digita algo no campo de pesquisa, os resultados devem refletir filmes que correspondam ao texto inserido.
Os resultados exibidos nesta página devem ser paginados, mostrando 10 itens por página.
Ao clicar no cartão de um filme, o usuário será direcionado para a página de detalhes desse filme.

#### Filtros de pesquisa
Há um espaço designado para filtros logo abaixo do campo de pesquisa. Você tem a liberdade de decidir quais filtros devem ser incluídos ali, levando em consideração as possibilidades oferecidas pela API do TMDB. Você também deve escolher quais tipos de input usar, como eles devem funcionar e como devem ser visualmente. No entanto, é importante que o design final do formulário esteja alinhado com a identidade visual já estabelecida.
Este formulário de filtros deve permitir que os usuários refinem suas pesquisas de filmes. O design do formulário deve facilitar a navegação e a utilização pelos usuários, permitindo-lhes refinar os resultados da pesquisa de maneira eficiente e intuitiva.

### Página de Detalhes do Filme
Esta página apresenta detalhes específicos sobre o filme, incluindo o título, o título original, a data de lançamento, a descrição, o orçamento, entre outros detalhes.

# Executando o projeto
1. Clonar o projeto com `git clone https://github.com/AyllaChristinne/cubos-challenge.git`
2. Entrar no diretório do projeto com `cd cubos-challenge`
3. Criar arquivo `.env` na raiz do projeto com o conteúdo `REACT_APP_TMDB_API_TOKEN=<seu-api-token>`. O **Token de Leitura da API** pode ser obtido [nas configurações de conta do TMDB](https://www.themoviedb.org/settings/api) após criar uma conta. Certifique-se de usar **Token de Leitura da API** e não "Chave da API".
4. (Na raiz do projeto) Instalar dependências com `npm i`
5. (Na raiz do projeto) Executar o projeto com `npm start`
6. (Na raiz do projeto) É possível executar os testes com `npm test`

# My process

## Feito com

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org)
- [SASS](https://sass-lang.com)
- [Axios](https://axios-http.com/ptbr/docs/intro) e [TanStack React Query](https://tanstack.com/query/v5/docs/framework/react/overview)
- [Jest](https://jestjs.io)
- Mobile-first workflow


## Possíveis Melhorias

- Adição de testes `end-to-end`
- Reestruturação do projeto adotando a abordagem de módulos (*modules approach*) com diretórios `modules`, `container` e `pages`
- Melhoria da nomenclatura das variáveis de cores
- Melhoria na componentização
- Melhoria no tratamento de erros

# Desenvolvedor

- [github.com/AyllaChristinne](https://github.com/AyllaChristinne)
- [Aylla Christinne no LinkedIn](https://www.linkedin.com/in/aylla-christinne-766892173/)