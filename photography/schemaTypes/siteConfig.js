// siteConfig.js - NOVO SCHEMA DE CONFIGURAÇÃO GLOBAL PT-BR

export default {
    name: 'siteConfig',
    title: 'Configurações do Site (Textos e Categorias)',
    type: 'document',
    // Limita a criação a apenas UM documento
    __experimental_actions: ['update', 'publish', 'create', 'delete'],
    fields: [
        {
            name: 'siteTexts',
            title: 'Textos Fixos do Site',
            type: 'object',
            fields: [
                // Menu e Botões
                { name: 'home', title: 'Início', type: 'string', initialValue: 'Início' },
                { name: 'photography', title: 'Fotografia', type: 'string', initialValue: 'Fotografia' },
                { name: 'ai_art', title: 'Arte com IA', type: 'string', initialValue: 'Arte com IA' },
                { name: 'videos', title: 'Vídeos', type: 'string', initialValue: 'Vídeos' },
                { name: 'donate', title: 'Doar', type: 'string', initialValue: 'Doar' },
                
                // Seção Sobre Mim
                { name: 'about_me', title: 'Título Sobre Mim', type: 'string', initialValue: 'Sobre Mim' },
                { name: 'about_text_1', title: 'Texto Sobre Mim 1', type: 'text', initialValue: 'Olá, meu nome é Weslen...' },
                { name: 'about_text_2', title: 'Texto Sobre Mim 2', type: 'text', initialValue: 'Desde as ruas movimentadas...' },
                
                // Seção de Galerias - Títulos/Subtítulos
                { name: 'photography_title', title: 'Título da Seção Fotografia', type: 'string', initialValue: 'Fotografia' },
                { name: 'photography_subtitle', title: 'Subtítulo da Seção Fotografia', type: 'string', initialValue: 'Capturando momentos, um clique de cada vez.' },
                { name: 'ai_art_title', title: 'Título da Seção IA', type: 'string', initialValue: 'Arte Gerada por IA' },
                { name: 'ai_art_subtitle', title: 'Subtítulo da Seção IA', type: 'string', initialValue: 'Onde a criatividade encontra a inteligência artificial.' },
                { name: 'videos_title', title: 'Título da Seção Vídeos', type: 'string', initialValue: 'Vídeos' },
                { name: 'videos_subtitle', title: 'Subtítulo da Seção Vídeos', type: 'string', initialValue: 'Histórias em movimento.' },

                // Seção Doação
                { name: 'donate_title', title: 'Título Seção Doar', type: 'string', initialValue: 'Apoie meu Trabalho' },
                { name: 'donate_subtitle', title: 'Subtítulo Seção Doar', type: 'string', initialValue: 'Sua contribuição me ajuda a continuar criando.' },
                { name: 'why_donate_title', title: 'Título Por Que Doar', type: 'string', initialValue: 'Por Que Doar?' },
                { name: 'why_donate_text', title: 'Texto Por Que Doar', type: 'text', initialValue: 'Criar e manter este portfólio...' },
                { name: 'pix_key', title: 'Chave Pix (HTML)', type: 'text', initialValue: 'Chave: <strong>weslen-pix@email.com</strong>', description: 'Pode incluir tags HTML para negrito.' },
                { name: 'paypal_desc', title: 'Descrição PayPal', type: 'string', initialValue: 'Doações seguras através do PayPal.' },
                { name: 'paypal_button', title: 'Texto Botão PayPal', type: 'string', initialValue: 'Doar com PayPal' },

                // Footer
                { name: 'created_by', title: 'Criado Por', type: 'string', initialValue: 'Criado com ❤️ por Weslen' },
                { name: 'rights_reserved', title: 'Direitos Reservados', type: 'string', initialValue: 'Todos os direitos reservados.' },
            ]
        },
        {
            name: 'categoryNames',
            title: 'Nomes de Exibição das Categorias (Filtros)',
            type: 'object',
            description: 'Nome que aparecerá no botão de filtro para cada chave (Slug).',
            fields: [
                { name: 'all', title: 'Todos', type: 'string', initialValue: 'Todos' },
                { name: 'natureza', title: 'Natureza', type: 'string', initialValue: 'Natureza' },
                { name: 'rua', title: 'Rua', type: 'string', initialValue: 'Rua' },
                { name: 'pessoas', title: 'Pessoas', type: 'string', initialValue: 'Pessoas' },
                { name: 'fantasia', title: 'Fantasia', type: 'string', initialValue: 'Fantasia' },
                { name: 'cyberpunk', title: 'Cyberpunk', type: 'string', initialValue: 'Cyberpunk' },
                { name: 'animais', title: 'Animais', type: 'string', initialValue: 'Animais' },
                { name: 'vlog', title: 'Vlog', type: 'string', initialValue: 'Vlog' },
                { name: 'curta', title: 'Curtas', type: 'string', initialValue: 'Curtas' },
                { name: 'arquitetura', title: 'Arquitetura', type: 'string', initialValue: 'Arquitetura' },
                { name: 'viagem', title: 'Viagem', type: 'string', initialValue: 'Viagem' },
                { name: 'abstrato', title: 'Abstrato', type: 'string', initialValue: 'Abstrato' },
                { name: 'alimentos', title: 'Alimentos', type: 'string', initialValue: 'Alimentos' },
                { name: 'documentario', title: 'Documentário', type: 'string', initialValue: 'Documentário' },
                { name: 'industrial', title: 'Industrial', type: 'string', initialValue: 'Industrial' },
            ]
        }
    ],
    preview: {
        prepare() {
            return {
                title: 'Configurações de Textos e Categorias (PT-BR)',
                subtitle: 'Documento único para todos os textos fixos do site.'
            }
        }
    }
}