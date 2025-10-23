// galleryItem.js - SIMPLIFICADO SOMENTE PT-BR

export default {
  name: 'galleryItem',
  title: 'Item de Galeria (Foto/Vídeo)',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID (Único)',
      type: 'number',
      description: 'ID numérico único para ordenação e referência no frontend.',
      validation: Rule => Rule.required().integer()
    },
    {
      name: 'type',
      title: 'Tipo de Conteúdo',
      type: 'string',
      options: {
        list: [
          { title: 'Fotografia', value: 'photography' },
          { title: 'Arte com IA', value: 'ai-art' },
          { title: 'Vídeo', value: 'videos' }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'mediaType',
      title: 'Tipo de Mídia',
      type: 'string',
      options: {
        list: [
          { title: 'Imagem', value: 'image' },
          { title: 'Vídeo (Embed)', value: 'video' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Categoria (Chave/Slug)',
      type: 'string',
      description: 'Use uma chave única para a categoria (ex: "rua", "cyberpunk", "vlog").',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Imagem de Destaque',
      type: 'image',
      description: 'A imagem principal que será usada (para fotos e thumb de vídeos).',
      options: { hotspot: true },
      // hidden: se a mídia for vídeo, esconde o campo de imagem.
      hidden: ({ document }) => document?.mediaType === 'video',
    },
    {
      name: 'videoEmbedSrc',
      title: 'Link de Incorporação (Embed SRC)',
      type: 'url',
      description: 'A URL de embed do YouTube (ex: https://www.youtube.com/embed/XXXXXX).',
      // hidden: se a mídia for imagem, esconde o campo de vídeo.
      hidden: ({ document }) => document?.mediaType === 'image',
    },
    {
      name: 'homepagePosition',
      title: 'Posição na Home (Puzzle)',
      type: 'number',
      description: '1 ou 2 para aparecer nas grades iniciais da Home. Vazio para não aparecer.',
      options: { list: [1, 2] }
    },
    {
      name: 'title',
      title: 'Título (Português)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Descrição (Português)',
      type: 'text',
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'image',
    }
  }
}