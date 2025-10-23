// categoryConfig.js - CORRIGIDO

export default {
  name: 'categoryConfig',
  title: 'Configuração de Categorias',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'create', 'delete'],
  fields: [
    {
      name: 'data',
      title: 'Mapeamento de Categorias',
      type: 'object',
      description: 'Mapeia a chave da categoria (slug) para o nome de exibição em PT e EN.',
      fields: [
        // Português
        {
          name: 'pt',
          title: 'Português (pt)',
          type: 'object',
          // 🚨 CORREÇÃO AQUI: Lista de campos dentro de 'fields'
          fields: [
            { name: 'all', title: 'Todos', type: 'string', initialValue: 'Todos' },
            { name: 'natureza', title: 'Natureza', type: 'string', initialValue: 'Natureza' },
            { name: 'rua', title: 'Rua', type: 'string', initialValue: 'Rua' },
            { name: 'pessoas', title: 'Pessoas', type: 'string', initialValue: 'Pessoas' },
            { name: 'fantasia', title: 'Fantasia', type: 'string', initialValue: 'Fantasia' },
            { name: 'cyberpunk', title: 'Cyberpunk', type: 'string', initialValue: 'Cyberpunk' },
            { name: 'animais', title: 'Animais', type: 'string', initialValue: 'Animais' },
            { name: 'vlog', title: 'Vlog (Vídeo)', type: 'string', initialValue: 'Vlog' },
            { name: 'curta', title: 'Curtas (Vídeo)', type: 'string', initialValue: 'Curtas' },
            { name: 'arquitetura', title: 'Arquitetura', type: 'string', initialValue: 'Arquitetura' },
            { name: 'viagem', title: 'Viagem', type: 'string', initialValue: 'Viagem' },
            { name: 'abstrato', title: 'Abstrato', type: 'string', initialValue: 'Abstrato' },
            { name: 'alimentos', title: 'Alimentos', type: 'string', initialValue: 'Alimentos' },
            { name: 'documentario', title: 'Documentário', type: 'string', initialValue: 'Documentário' },
            { name: 'industrial', title: 'Industrial', type: 'string', initialValue: 'Industrial' },
          ]
        },
        // Inglês
        {
          name: 'en',
          title: 'Inglês (en)',
          type: 'object',
          // 🚨 CORREÇÃO AQUI: Lista de campos dentro de 'fields'
          fields: [
            { name: 'all', title: 'All', type: 'string', initialValue: 'All' },
            { name: 'natureza', title: 'Nature', type: 'string', initialValue: 'Nature' },
            { name: 'rua', title: 'Street', type: 'string', initialValue: 'Street' },
            { name: 'pessoas', title: 'People', type: 'string', initialValue: 'People' },
            { name: 'fantasia', title: 'Fantasy', type: 'string', initialValue: 'Fantasy' },
            { name: 'cyberpunk', title: 'Cyberpunk', type: 'string', initialValue: 'Cyberpunk' },
            { name: 'animais', title: 'Animals', type: 'string', initialValue: 'Animals' },
            { name: 'vlog', title: 'Vlog (Video)', type: 'string', initialValue: 'Vlog' },
            { name: 'curta', title: 'Shorts (Video)', type: 'string', initialValue: 'Shorts' },
            { name: 'arquitetura', title: 'Architecture', type: 'string', initialValue: 'Architecture' },
            { name: 'viagem', title: 'Travel', type: 'string', initialValue: 'Travel' },
            { name: 'abstrato', title: 'Abstract', type: 'string', initialValue: 'Abstract' },
            { name: 'alimentos', title: 'Food', type: 'string', initialValue: 'Food' },
            { name: 'documentario', title: 'Documentary', type: 'string', initialValue: 'Documentary' },
            { name: 'industrial', title: 'Industrial', type: 'string', initialValue: 'Industrial' },
          ]
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Configurações de Categorias (Nomes de Filtro)',
        subtitle: 'Mapeia as chaves de filtro para nomes PT/EN.'
      }
    }
  }
}