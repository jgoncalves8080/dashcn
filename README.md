
# Dashboard Interativo - Next.js + TailwindCSS + Shadcn

## Descrição do Projeto

Este projeto tem como objetivo criar um **dashboard interativo** utilizando **Next.js**, **Shadcn (Radix UI com TailwindCSS)** e **TailwindCSS**, com foco em **responsividade**, **acessibilidade** e **boas práticas de desenvolvimento frontend**.

### Funcionalidades do Dashboard:
- **Página Inicial (Home):** Exibe um resumo dos projetos ativos e concluídos, gráficos simples mostrando o progresso dos projetos.
- **Página de Projetos:** Lista todos os projetos, incluindo informações como nome, status (ativo, atrasado, concluído), barra de progresso, e permite criar novos projetos.
- **Modal de Criação de Projetos:** Permite criar novos projetos, incluindo campos obrigatórios como nome, data de início e fim, descrição e responsável. O formulário possui validações com feedback visual.
- **Página de Detalhes do Projeto:** Exibe os detalhes do projeto, incluindo tarefas associadas, comentários e a opção de marcar tarefas como concluídas com feedback visual imediato.

- **Persistência de Dados:** Utilizei o banco de dados **SQLite** com **Prisma ORM** para persistir dados.
- **Dark Mode:** Suporte a modo escuro com TailwindCSS.

## Como Executar o Projeto

Para rodar este projeto localmente, siga os passos abaixo:

### 1. Clonando o repositório:

```bash
git clone https://github.com/usuario/dashcn.git
cd dashcn
```

### 2. Instalando as dependências:

Utilize o **npm** ou **yarn** para instalar as dependências do projeto:

```bash
npm install
# ou
yarn install
```

### 3. Configuração do Banco de Dados:

Este projeto utiliza o **SQLite** como banco de dados, e o **Prisma** como ORM.

#### Passos para configurar o Prisma:

1. Crie o banco de dados com Prisma:

```bash
npx prisma migrate dev
```

2. Se necessário, altere a configuração do banco de dados no arquivo `prisma/schema.prisma` para se adequar ao seu ambiente.

### 4. Executando o Projeto:

Após configurar as dependências e o banco de dados, você pode iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://localhost:3000`.

## Arquitetura

Este projeto segue o padrão de **arquitetura Onion**, que foca em desacoplamento entre camadas e separação de responsabilidades. A estrutura é organizada da seguinte forma:

- **Camada de Apresentação:** Contém os componentes do frontend, como páginas, modais e listas, utilizando **Next.js**, **Shadcn (Radix UI com TailwindCSS)** e **TailwindCSS**.
- **Camada de Aplicação:** Lógica de negócio e manipulação de dados, como validações de formulário e controle de estado da aplicação. *
- **Camada de Persistência:** Responsável pela comunicação com o banco de dados, utilizando **Prisma ORM** para manipulação de dados no **SQLite**. *

A ideia da arquitetura Onion é garantir que as dependências fluam de fora para dentro, com o núcleo da aplicação sendo independente de tecnologias externas.


## Funcionalidades Pendentes

Embora a aplicação esteja funcional, há várias melhorias que podem ser feitas para melhorar a experiência e aumentar a escalabilidade do projeto. Algumas melhorias potenciais incluem:

### 1. **Autenticação:**
Atualmente, a autenticação ainda não foi implementada. Uma solução simples utilizando o **next-auth** poderia ser implementada para permitir login via **Google** ou **GitHub**.

### 2. **Criação de Tarefas:**
Ainda falta implementar a funcionalidade de **criação de tarefas** e associá-las a um **projeto**. Esta funcionalidade pode ser aprimorada para permitir que o usuário defina informações como prazo, responsável e descrição.

### 3. **Associação de Tarefas a Projetos:**
A integração entre as **tarefas** e os **projetos** ainda precisa ser completada. A possibilidade de associar tarefas específicas a projetos está em falta e deve ser incluída em uma versão futura.

### 4. **Responsável por Tarefa:**
Ainda falta integrar o nome do **responsável** em cada **tarefa**.

### 5. **Backend Aprimorado:**
Embora a API tenha sido criada de forma simples, existem muitos cenários que poderiam ser tratados no backend, como validações adicionais, tratamento de erros mais detalhado e escalabilidade do banco de dados.

## Desafios e Melhorias

Este projeto foi desenvolvido com **Next.js**, **TailwindCSS** e **Prisma ORM**, e tem como objetivo proporcionar uma experiência de desenvolvimento eficiente e limpa. A aplicação já está funcional, mas ainda existem várias áreas de aprimoramento, como:

- **Adição de autenticação robusta** utilizando autenticação via **Google** ou **GitHub** ou outro Provider.
- **Implementação de criação e gerenciamento de tarefas**.
- **Integração de funcionalidades mais avançadas no backend**.
- **Implementação de testes unitários e End2End**

A arquitetura foi construída de forma a permitir fácil escalabilidade, então melhorias podem ser feitas sem comprometer a estrutura já existente.

## Conclusão

Este projeto foi desenvolvido como um **dashboard** com funcionalidades de gerenciamento de **projetos**, **tarefas**, utilizando as melhores práticas de **desenvolvimento frontend**, com ênfase em **responsividade** e **acessibilidade**. A arquitetura **Onion** (poderá ser evoluída a estrutura) foi utilizada para manter o código modular, desacoplado e escalável.

---
