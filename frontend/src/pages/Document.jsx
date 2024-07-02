import React from "react";

function Document() {
    return (
        <div className="container">
            <div className="titleDoc">
                <h1>API_BUSCAR_MUSEU</h1>
                <h2>Documentação</h2>
            </div>

            <div className="paragDoc">
                <p className="parag">Esse projeto visa o desenvolvimento de uma aplicação web
                     que faz busca em um conjunto de dados utilizando filtros
                     conforme preferência do usuário. Nesse caso a busca é por museus brasileiros.
                </p>
                <p className="parag">A construção se deu em duas partes: Backend e Frontend.</p>

                <section>
                    <h3 className="subtitle">1 - BACKEND</h3>
                    <p className="parag">Desenvolvido com Node.js que lê dados de um arquivo JSON e insere-os a um banco de dados.
                         Expõe também um API RESTful que permite consultar os dados inseridos.
                    </p>
                    <h5 className="topicos">Estrutura</h5>
                    <figure><img src="../../public/estruturaBackend.png" alt="Estrutura do Backend" className="estrutura" /></figure>
                    <h5 className="topics">Execução</h5>
                    <p className="parag">É necessário ter o Node.js instalado</p>
                    <div className="seqExec">
                        <ol>
                            <li>Crie uma pasta com o nome do projeto, dentro dessa pasta cria outra pasta chamada backend.</li>
                            <li>No prompt de comando digita: npm init -y.. Esse comando inicia o projeto Node e cria o pacote json (package.json)</li>
                            <li>Ainda no prompt instale as dependências: npm install express cors sqlite3, express facilita a criação de servidores e APIs Restful, o cors permite que o servidor responde a solicitações de diferentes origens de maneira segura, já o SQLite é o banco de dados que iremos trabalhar, pode ser substituído por qualquer outro.</li>
                            <li>Abra o projeto no seu editor preferido e coloque seu arquivo json (ex: data.json) com os registros que deseja trabalhar para inserir no banco de dados. </li>
                            <li>Crie três arquivos: server.js para configurar o servidor, database.js para configurar a conexão com o banco de dados SQLite e criar a tabela museus e o importData.js para ler os dados JSON e inseri-los na tabela</li>
                            <li>No terminal execute o script node importData.js para importar os dados. Depois inicia o servidor com o comando node server.js.</li>
                        </ol>
                    </div>
                    <h5 className="topics">Endpoints</h5>
                    <p className="parag">Todos os métodos foram de Get, pois é uma aplicação somente de busca.</p>
                    <ul>
                        <li>api/museus – retorna uma lista paginada de museus com filtros opcionais por UF, município e termo de busca.</li>
                        <li>api/ufs - retorna uma lista de Estados brasileiros.</li>
                        <li>api/municípios – retorna lista de municípios filtrados por Estado.</li>
                        <li>api/pesquisa - procura museu pelo termo de busca</li>
                    </ul>
                </section>

                <section>
                    <h3 className="subtitle">2 - FRONTEND</h3>
                    <p className="parag">A aplicação foi construída usando o React e configurada usando o Vite. Para as requisições usamos o axios.</p>
                    <h5 className="topicos">Estrutura</h5>
                    <figure><img src="../../public/estruturaFrontend.png" alt="Estrutura do Backend" className="estrutura" /></figure>
                    <h5 className="topicos">Execução</h5>
                    <div className="seqExec">
                        <ol>
                            <li>No prompt de comando ou bash, dentro da sua aplicação &#40;que já temos a pasta backend&#41;
                                 crie o projeto com o comando npm create vite@latest frontend --template react,
                                  se solicitar que você escolha um framework, escolha React e depois JavaScript. O nome frontend é o nome da pasta que pode ser alterada.
                            </li>
                            <li> Entra na pasta do frontend e instale as dependências com npm install,
                                 já vamos instalar o axios npm install axios. Vamos rodar o projeto usando npm run dev. No terminal irá aparecer algo assim: <br />
                                 <img src="../../public/localhost.png" alt="Tela conexão localhost" /> <br />
                                Abre o local no navegador e se aparecer a página do Vite, está tudo ok.
                            </li>
                            <li>Agora vamos montar a estrutura: dentro da pasta src crie as pastas components, pages e styles.
                                 Na pasta components ficará os componentes que são a base da construção, eles encapsulam toda lógica e podem ser reutilizados.
                                  Na pasta pages ficará todas as suas páginas de navegação da aplicação.E na pasta styles ficará os arquivos para estilização e responsividade.
                            </li>
                            <li>Em components crie os arquivos Header.jsx, Footer.jsx, Filters.jsx, Results.jsx e Details.jsx.
                                 No Header e Footer estará o cabeçalho e o rodapé padronizados que serão usados em toda aplicação.
                                  Em Filters contem os filtros de pesquisa, ordenação e condicional. Em Results será configurado para listar os resultados.
                                   E Details exibirá os detalhes do registro encontrdo.
                            </li>
                            <li>Em pages crie os arquivos About.jsx, Contact.jsx, Document.jsx e Home.jsx.
                                 A Home é a principal e é nela que vamos fazer a importação dos componentes, com exceção do header e footer.
                                  Nela será configurado as funções de carregar dados, buscas, requisições, erros, manipulação de eventos e renderização dos resultados.
                            </li>
                            <li>Em styles crie os arquivos Header.css e Footer.css. E dentro da pasta src terá o arquivo App.css coloca-o também dessa pasta para uma melhor organização.
                                 O Header e Footer serão para estilizar o conteúdo do Header.jsx e Footer.jsx, já o App.css para todo o resto. Foi utilizado o bootstrap para contribuir na estilização.
                                  Faça a instalação no prompt npm install bootstrap. No arquivo index.css fazemos a estilização global de toda aplicação.
                            </li>
                            <li>O arquivo App.jsx é onde importamos o Header.jsx e Footer.jsx e também importamos todas as nossas páginas.
                                 Nesse arquivo é onde vamos determinar as rotas e para isso precisamos do react-router, vamos instalar usando npm  install react-router-dom.
                                  Agora fazemos a importação: import  &#123; BrowserRouter as Router, Roue, Routes &#125; from &#39;react-router-dom&#39;. Não se esqueça de fazer a importação do arquivo App.css.
                            </li>
                            <li>No arquivo main.jsx criamos um ponto de entrada raiz dentro do &#39;root&#39; que está dentro de index.html e também aqui renderizamos o componente App.
                                 Aqui também é onde fazemos a importação do arquivo index.css para garantir que os estilos globais estejam disponíveis em toda aplicação
                                  e também importamos o bootstrap : import &#39;bootstrap/dist/css/bootstrap.min.css&#39;.
                             </li>
                            <li>E no arquivo index.html temos a div com id=&#39;root&#39; que é o container onde será montada toda a nossa aplicação.</li>
                            <li>Na pasta public coloque todas as imagens e ícones que serão usadas.</li>
                        </ol>

                    </div>
                </section>
                <p>
                    Nota: Lembre-se sempre de primeiro rodar o servidor com o comando node server.js, abra outro terminal e rode a aplicação com npm run dev.
                     Para parar o servidor ou a aplicação é só digitar Ctrl+C.
                      Sempre que fizer alguma alteração no servidor, precisa pará-lo e reiniciá-lo para que as alterações sejam aplicadas.
                </p>
            </div>
        </div>
    )
}

export default Document;
