# WESLEN.ARTE | PORTFÓLIO CRIATIVO DINÂMICO

## Visão Geral do Projeto

O **Weslen.Arte Portfólio** é uma plataforma de vitrine digital desenvolvida com o objetivo de apresentar obras visuais (Fotografia, Arte Gerada por IA e Vídeo) de maneira rápida, limpa e totalmente gerenciável. O projeto adota a arquitetura *Jamstack*, garantindo alto desempenho, carregamento imediato e baixa manutenção de código.

## Núcleo Tecnológico e Arquitetura

O sistema é construído sobre uma base robusta e leve:

* **Frontend Leve:** Desenvolvido com **HTML5, Vanilla JavaScript (ES6+)** e estilização via **Tailwind CSS**. Essa escolha garante um código minimalista e otimizado para velocidade em todos os dispositivos.
* **Headless CMS (Sanity.io):** Todo o conteúdo do portfólio, incluindo textos fixos (como a seção "Sobre Mim" e a de "Doação") e todos os itens de galeria, é gerenciado através do Sanity.io.
* **Comunicação de Dados (GROQ):** A recuperação de dados é realizada via **GROQ** (Graph-Relational Object Queries), buscando o `siteConfig` e os `galleryItem`s diretamente na API da Sanity.

## Principais Funcionalidades

### Gestão de Conteúdo e Exibição

* **100% Dinâmico:** Todos os textos e elementos do menu usam chaves `data-translate-key` e são preenchidos pelos dados de tradução e categorias do Sanity.
* **Filtros Inteligentes:** As categorias de filtro são geradas dinamicamente com base nas categorias cadastradas nos itens da galeria.
* **Visualização Imersiva (Lightbox):** Implementação de um lightbox nativo que suporta a visualização otimizada de imagens e vídeos (via embed).

### Robustez e Confiabilidade

* **Sistema de Fallback de Dados:** Uma solução de tolerância a falhas foi implementada no `script.js`. Caso a conexão com a API do Sanity falhe (o que resolveu o problema de CORS e domínio), o site carrega automaticamente um conjunto de dados de **backup** (*hardcoded*) para garantir que a interface seja carregada sem travar o preloader.
* **Protocolo Corrigido:** A URL de busca da API utiliza o formato `https://[projectId].api.sanity.io`, resolvendo os problemas de redirecionamento e segurança SSL encontrados em ambientes locais.

***

**Status:** **Concluído e Funcional.** O projeto está pronto para o deploy e para o preenchimento total de conteúdo via Studio.