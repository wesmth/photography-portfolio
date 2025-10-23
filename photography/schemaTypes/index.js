// schemaTypes/index.js (Atualizado)

import galleryItem from './galleryItem'; // Mantenha esse (agora simplificado)
import siteConfig from './siteConfig'; // ⬅️ NOVO SCHEMA DE CONFIGURAÇÃO

export const schemaTypes = [
  galleryItem,
  siteConfig, 
  
  // Seus outros schemas antigos (author, post, etc.) se existirem:
  // category, 
  // post,
  // author,
  // blockContent,
]