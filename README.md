# Projeto: Consumindo uma API pública

![Substitua a imagem ao lado por um screenshot do seu projeto](https://github.com/elc1090/project2-2024a-anthony-e-luizfelipe-quotable-api/blob/main/img-api.png)


Acesso: https://project2-2024a-anthony-e-luizfelipe-quotable-api.vercel.app/


### Desenvolvedores

Anthony Carlos da Silva  - Ciência da Computação

Luiz Felipe Cavalheiro   - Ciência da Computação


### Nosso produto

Nosso projeto consiste em um site que proporciona aos usuários acesso a uma vasta coleção de citações. Com foco na temática do conhecimento, o site oferece uma plataforma intuitiva e interativa para explorar e compartilhar insights de diversas áreas do saber.

### Principais Funcionalidades:

#### - Pesquisa Avançada de Citações: 
Os usuários podem buscar citações utilizando diversos critérios, incluindo autor, tema ou frase específica. Isso permite uma experiência personalizada, adaptada aos interesses individuais de cada usuário.

#### - Visualização e Compartilhamento: 
Após realizar uma pesquisa, os usuários podem visualizar as citações encontradas em um formato limpo. Além disso, eles têm a opção de copiar a citação para a área de transferência ou compartilhá-la diretamente no Twitter ou WhatsApp. O compartilhamento é facilitado por meio de um popup que exibe a citação selecionada, pronta para ser compartilhada.

#### - Interação Social: 
Ao permitir que os usuários compartilhem citações inspiradoras em suas redes sociais, nosso site promove a disseminação do conhecimento e estimula o diálogo entre indivíduos interessados em aprender e compartilhar ideias.

#### - Interface Amigável: 
O design do site foi elaborado para oferecer uma experiência de usuário agradável. A navegação é intuitiva, garantindo que os usuários possam acessar facilmente as funcionalidades oferecidas pelo site.


### Conhecimento
Nosso projeto está ligado ao tema do conhecimento, pois visa facilitar o acesso a insights e reflexões provenientes de diversas fontes e áreas de conhecimento. Ao fornecer uma plataforma para a busca e compartilhamento dessas citações, incentivamos a expansão dos horizontes intelectuais dos usuários servindo para aprendizado e troca de ideias.

### API escolhida

Quotable API
URL: https://api.quotable.io

O Quotable é uma API gratuita e de código aberto que fornece citações, ela possui um limite de taxa de 180 requisições por minuto, por endereço IP.

#### Exemplos


Obter 3 citações aleatórias [Teste no navegador](https://api.quotable.io/quotes/random?limit=3)

```HTTP
GET /quotes/random?limit=3
```


Obter todas as citacoes com as tags `love` `OR` `happiness` [Teste no navegador](https://api.quotable.io/quotes?tags=love|happiness)

```HTTP
GET /quotes?tags=love|happiness
```


Pesquisar autores por slug. Neste caso, você fornece uma lista de slugs separados por pipe [Teste no navegador](https://api.quotable.io/authors?slug=albert-einstein|abraham-lincoln)

```HTTP
GET /authors?slug=albert-einstein|abraham-lincoln
```


Busca por autor chamado "Einstein" ([Teste no navegador](https://api.quotable.io/search/authors?query=einstein))

```HTTP
GET /search/authors?query=Einstein
```

> Results:
>
> - Albert Einstein


Pesquisar por citações com as palavras-chave "life" ou "happiness" ([Teste no navegador](https://api.quotable.io/search/quotes?query=life+happiness))

```HTTP
GET /search/quotes?query=life happiness
```

> Results
>
> - "It is with our passions, as it is with fire and water, they are good servants but bad masters."

### Desenvolvimento

Primeiramente, o tema foi definido e teve a validação da professora, em seguida foi decido quais tecnologias seriam usadas, elas estão listadas abaixo. Durante o desenvolvimento, a primeira fase foi compreender o funcionamento da API e então conectar com ela, para isos, foram criadas funções que fazem as buscas e armazenam o resultado. Na sequência, foi necessário formatar o texto que as funcções recebem como parâmetro pois a API exige que akguns campos tenham um formato específico. Depois, as funções de compartilhamento em redes sociais e de copiar citação foram ciradas. Concluídas estas funcionalidades, a etapa seguinte foi criar a interface de usuário, com campos e tipos de busca que o usuário pode realizar, asism como o botão de pesquisar e os botões de compartilhamento de citações. Por fim, o site foi hospedado na URL apresentada no início deste arquivo. 


#### Tecnologias

- HTML
- CSS
- JavaScript
- VueJS
- Git
- GitHub

#### Ambiente de desenvolvimento

- VS Code
- Google Chrome
- Github

#### Referências e créditos

- [ChatGPT](https://www.openai.com/chatgpt/)
- [Quotable API](https://api.quotable.io/)
- [Blog Cyberini](https://www.blogcyberini.com)
- [Meta for Developers](https://developers.facebook.com/)



---
Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2024a) em 2024a
