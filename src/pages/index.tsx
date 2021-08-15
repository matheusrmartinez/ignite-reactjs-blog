import Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

import Header from '../components/Header';
import { getPrismicClient } from '../services/prismic';
import { getPostsFormatted } from '../utils/postFormatter';
import styles from './home.module.scss';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  async function handleLoadDataFromNextPagePrismic() {
    if (!postsPagination.next_page) return;

    const response = await fetch(postsPagination.next_page);

    response.json().then(result => {
      const newPosts = getPostsFormatted(result.results);

      setPosts([...posts, ...newPosts]);
      setNextPage(result.next_page);
    });
  }

  return (
    <>
      <Head>
        <title>Home | Blog desafio</title>
      </Head>
      <main className={styles.contentContainer}>
        <Header />
        <div className={styles.posts}>
          {posts.map(result => (
            <Link key={result.uid} href={`/post/${result.uid}`}>
              <a>
                <section className={styles.contentPost}>
                  <h1>{result.data.title}</h1>
                  <h2>{result.data.subtitle}</h2>
                  <div className={styles.dayAuthorInfo}>
                    <div>
                      <FiCalendar />
                      <span>
                        {format(
                          new Date(result.first_publication_date),
                          'dd MMM yyyy',
                          { locale: ptBR }
                        )}
                      </span>
                    </div>
                    <div>
                      <FiUser />
                      <span>{result.data.author}</span>
                    </div>
                  </div>
                </section>
              </a>
            </Link>
          ))}
        </div>
        {nextPage && (
          <button
            className={styles.highlightButton}
            type="button"
            onClick={handleLoadDataFromNextPagePrismic}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
    }
  );

  const results = getPostsFormatted(postsResponse.results);

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results,
      },
    },
  };
};
