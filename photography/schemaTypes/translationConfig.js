// translationConfig.js

export default {
  name: 'translationConfig',
  title: 'Configuração de Traduções (PT/EN)',
  type: 'document',
  // Limita a criação a apenas UM documento no Studio
  __experimental_actions: ['update', 'publish', 'create', 'delete'],
  fields: [
    {
      name: 'data',
      title: 'Dicionário de Traduções',
      type: 'object',
      description: 'Estrutura JSON das traduções (Chave: "pt" e "en").',
      fields: [
        // PT
        {
          name: 'pt',
          title: 'Português (pt)',
          type: 'object',
          fields: [
            // Menu
            { name: 'home', title: 'Home', type: 'string' },
            { name: 'photography', title: 'Fotografia', type: 'string' },
            { name: 'ai_art', title: 'Arte com IA', type: 'string' },
            { name: 'videos', title: 'Vídeos', type: 'string' },
            { name: 'donate', title: 'Doar', type: 'string' },
            // About
            { name: 'about_me', title: 'Título Sobre Mim', type: 'string' },
            { name: 'about_text_1', title: 'Texto Sobre Mim 1', type: 'text' },
            { name: 'about_text_2', title: 'Texto Sobre Mim 2', type: 'text' },
            // Photography
            { name: 'photography_title', title: 'Título Seção Fotografia', type: 'string' },
            { name: 'photography_subtitle', title: 'Subtítulo Seção Fotografia', type: 'string' },
            // AI Art
            { name: 'ai_art_title', title: 'Título Seção IA', type: 'string' },
            { name: 'ai_art_subtitle', title: 'Subtítulo Seção IA', type: 'string' },
            // Videos
            { name: 'videos_title', title: 'Título Seção Vídeos', type: 'string' },
            { name: 'videos_subtitle', title: 'Subtítulo Seção Vídeos', type: 'string' },
            // Donate
            { name: 'donate_title', title: 'Título Seção Doar', type: 'string' },
            { name: 'donate_subtitle', title: 'Subtítulo Seção Doar', type: 'string' },
            { name: 'why_donate_title', title: 'Título Por Que Doar', type: 'string' },
            { name: 'why_donate_text', title: 'Texto Por Que Doar', type: 'text' },
            { name: 'pix_key', title: 'Chave Pix (HTML)', type: 'text', description: 'Pode incluir tags HTML para negrito, ex: Chave: <strong>...</strong>' },
            { name: 'paypal_desc', title: 'Descrição PayPal', type: 'string' },
            { name: 'paypal_button', title: 'Texto Botão PayPal', type: 'string' },
            // Footer
            { name: 'created_by', title: 'Criado Por', type: 'string' },
            { name: 'rights_reserved', title: 'Direitos Reservados', type: 'string' },
          ],
        },
        // EN
        {
          name: 'en',
          title: 'Inglês (en)',
          type: 'object',
          fields: [
            // Menu
            { name: 'home', title: 'Home', type: 'string' },
            { name: 'photography', title: 'Photography', type: 'string' },
            { name: 'ai_art', title: 'AI Art', type: 'string' },
            { name: 'videos', title: 'Videos', type: 'string' },
            { name: 'donate', title: 'Donate', type: 'string' },
            // About
            { name: 'about_me', title: 'About Me Title', type: 'string' },
            { name: 'about_text_1', title: 'About Me Text 1', type: 'text' },
            { name: 'about_text_2', title: 'About Me Text 2', type: 'text' },
            // Photography
            { name: 'photography_title', title: 'Photography Section Title', type: 'string' },
            { name: 'photography_subtitle', title: 'Photography Section Subtitle', type: 'string' },
            // AI Art
            { name: 'ai_art_title', title: 'AI Art Section Title', type: 'string' },
            { name: 'ai_art_subtitle', title: 'AI Art Section Subtitle', type: 'string' },
            // Videos
            { name: 'videos_title', title: 'Videos Section Title', type: 'string' },
            { name: 'videos_subtitle', title: 'Videos Section Subtitle', type: 'string' },
            // Donate
            { name: 'donate_title', title: 'Donate Section Title', type: 'string' },
            { name: 'donate_subtitle', title: 'Donate Section Subtitle', type: 'string' },
            { name: 'why_donate_title', title: 'Why Donate Title', type: 'string' },
            { name: 'why_donate_text', title: 'Why Donate Text', type: 'text' },
            { name: 'pix_key', title: 'Pix Key (HTML)', type: 'text' },
            { name: 'paypal_desc', title: 'PayPal Description', type: 'string' },
            { name: 'paypal_button', title: 'PayPal Button Text', type: 'string' },
            // Footer
            { name: 'created_by', title: 'Created By', type: 'string' },
            { name: 'rights_reserved', title: 'Rights Reserved', type: 'string' },
          ],
        },
      ],
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      title: 'data.pt.home',
    },
    prepare() {
      return {
        title: 'Configurações Globais de Texto (Traduções)',
        subtitle: 'Usado no PT e EN.',
      }
    }
  }
}