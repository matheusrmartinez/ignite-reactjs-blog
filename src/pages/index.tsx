import { GetStaticProps } from 'next';
import { Head } from 'next/document';
import React from 'react';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import Prismic from '@prismicio/client';
import styles from './home.module.scss';
import Link from 'next/link';

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

export default function Home({postsPagination}: HomeProps) {
  return (
    <>
      <main className={styles.contentContainer}>
        <section className={styles.posts}>
        <Link href="#">
            <a href="#">
              <img src="/images/Logo.svg" alt="logo"></img>
            </a>
          </Link>
          {postsPagination.results.map(posts => {
            return (
              <Link href="#">
              <a href="#">
                <h1>{posts.data.title}</h1>
                <h2>{posts.data.subtitle}</h2>
                <div className={styles.bottomPost}>
                  <img src="/images/calendar.svg" alt="Calendário"></img>
                  <time>{posts.first_publication_date}</time>
                  <img src="/images/user.svg" alt="Usuário"></img>
                  <span>{posts.data.author}</span>
                </div>
              </a>
            </Link>
            )
          })}
            <a href="#">
              <span>Carregar mais posts</span>
            </a>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsPagination = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    }
  );

  return {
    props: { postsPagination },
  };
};
