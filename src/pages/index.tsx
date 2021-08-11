import { GetStaticProps } from 'next';
import { Head } from 'next/document';
import React from 'react';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
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

export default function Home() {
  return (
    <>
      <main className={styles.contentContainer}>
        <section className={styles.posts}>
          <img src="/images/Logo.svg" alt="Logo"></img>
          <Link href="#">
            <a href="#">
              <h1>Como utilizar Hooks</h1>
              <h2>Pensando em sincronização em vez de ciclos de vida.</h2>
              <div className={styles.bottomPost}>
              <img src="/images/calendar.svg" alt="Calendário"></img>
              <time>15 Mar 2021</time>
              <img src="/images/user.svg" alt="Usuário"></img>
              <span>Matheus Martinez</span>
              </div>
            </a>
          </Link>
          {/* <Link href="#">
            <a href="#">
              <strong>Como utilizar Hooks</strong>
              <h3>Pensando em sincronização em vez de ciclos de vida.</h3>
              <time>15 Mar 2021</time>
              <span>Matheus Martinez</span>
            </a>
          </Link>
          <Link href="#">
            <a href="#">
              <strong>Como utilizar Hooks</strong>
              <h3>Pensando em sincronização em vez de ciclos de vida.</h3>
              <time>15 Mar 2021</time>
              <span>Matheus Martinez</span>
            </a>
          </Link> */}
        </section>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
