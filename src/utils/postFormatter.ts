import {Document} from '@prismicio/client/types/documents';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function getPostsFormatted(posts: Document[]) {
const formattedPosts = posts.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: String(post.data.title),
        subtitle: String(post.data.subtitle),
        author: String(post.data.author),
      },
    };
  });
  return formattedPosts;
}
