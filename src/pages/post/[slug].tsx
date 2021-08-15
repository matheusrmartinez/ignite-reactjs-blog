import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const routes = useRouter();

  if (routes.isFallback)
    return (
      <>
        <Header /> <span>Carregando...</span>
      </>
    );

    const totalWords = post?.data.content.reduce((acc, iterator) => {
      let totalWordsInContent = 0;

      totalWordsInContent += iterator.heading.split(' ').length;

      totalWordsInContent += iterator.body.reduce((acc2, iterator2) => {
        const words = iterator2.text.split(' ').length;

        return acc2 + words;
      }, 0);

      return acc + totalWordsInContent;
    }, 0);

  return (
    <>
      <Head>
        <title>{post?.data?.title} | Blog desafio</title>
      </Head>
      <Header />
      <div className={styles.banner}>
        <img src={post.data.banner.url}></img>
      </div>
      <main className={styles.contentContainer}>
        <div className={styles.posts}>
          <section className={styles.contentPost}>
            <h1>{post.data.title}</h1>
            <div className={styles.dayAuthorReadingTimeInfo}>
              <div>
                <FiCalendar />
                <span>
                  {format(
                    new Date(post?.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </span>
              </div>
              <div>
                <FiUser />
                <span>{post.data.author}</span>
              </div>
              <div>
                <FiClock />
                <span>{`${Math.ceil(totalWords / 200)} min`}</span>
              </div>
            </div>
            {post.data.content.map((c, index) => (
              <div key={index} className={styles.postHeader}>
                <h1>{c.heading}</h1>
                {c.body.map((b, index) => (
                  <div
                    key={index}
                    className={styles.postContent}
                    dangerouslySetInnerHTML={{ __html: b.text }}
                  />
                ))}
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.predicates.at('document.type', 'post'),
  ]);

  const paths = posts.results.map(post => ({
    params: {
      slug: post.uid,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient();

  const { slug } = params;
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    uid: 'como-utilizar-hooks',
    first_publication_date: '2021-03-25T19:25:28+0000',
    data: {
      title: 'Como utilizar Hooks',
      subtitle: 'Pensando em sincronização em vez de ciclos de vida',
      author: 'Joseph Oliveira',
      banner: {
        url: 'https://images.prismic.io/criando-projeto-do-zero/95494d57-eee2-4adb-9883-befa9829abca_christopher-gower-m_HRfLhgABo-unsplash.jpg?auto=compress,format',
      },
      content: [
        {
          body: [
            {
              type: 'paragraph',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              spans: [],
            },
            {
              type: 'paragraph',
              text: 'Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.',
              spans: [],
            },
            {
              type: 'paragraph',
              text: 'Ut venenatis mauris vel libero pretium, et pretium ligula faucibus. Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam venenatis.',
              spans: [],
            },
          ],
          heading: 'Proin et varius',
        },
        {
          body: [
            {
              type: 'paragraph',
              text: 'Nulla auctor sit amet quam vitae commodo. Sed risus justo, vulputate quis neque eget, dictum sodales sem. In eget felis finibus, mattis magna a, efficitur ex. Curabitur vitae justo consequat sapien gravida auctor a non risus. Sed malesuada mauris nec orci congue, interdum efficitur urna dignissim. Vivamus cursus elit sem, vel facilisis nulla pretium consectetur. Nunc congue.',
              spans: [
                {
                  start: 27,
                  end: 32,
                  type: 'em',
                },
                {
                  start: 365,
                  end: 376,
                  type: 'strong',
                },
              ],
            },
            {
              type: 'paragraph',
              text: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam consectetur massa nec metus condimentum, sed tincidunt enim tincidunt. Vestibulum fringilla risus sit amet massa suscipit eleifend. Duis eget metus cursus, suscipit ante ac, iaculis est. Donec accumsan enim sit amet lorem placerat, eu dapibus ex porta. Etiam a est in leo pulvinar auctor. Praesent sed vestibulum elit, consectetur egestas libero.',
              spans: [],
            },
            {
              type: 'paragraph',
              text: 'Ut varius quis velit sed cursus. Nunc libero ante, hendrerit eget consectetur vel, viverra quis lectus. Sed vulputate id quam nec tristique. Etiam lorem purus, imperdiet et porta in, placerat non turpis. Cras pharetra nibh eu libero ullamcorper, at convallis orci egestas. Fusce ut est tellus. Donec ac consectetur magna, nec facilisis enim. Sed vel tortor consectetur, facilisis felis non, accumsan risus. Integer vel nibh et turpis.',
              spans: [
                {
                  start: 141,
                  end: 158,
                  type: 'hyperlink',
                  data: {
                    link_type: 'Media',
                    name: 'christopher-gower-m_HRfLhgABo-unsplash.jpg',
                    kind: 'image',
                    url: 'https://images.prismic.io/criando-projeto-do-zero/95494d57-eee2-4adb-9883-befa9829abca_christopher-gower-m_HRfLhgABo-unsplash.jpg?auto=compress,format',
                    size: '876817',
                    height: '2584',
                    width: '3882',
                  },
                },
              ],
            },
            {
              type: 'paragraph',
              text: 'Nam eu sollicitudin neque, vel blandit dui. Aliquam luctus aliquet ligula, sed:',
              spans: [],
            },
            {
              type: 'list-item',
              text: 'Suspendisse ac facilisis leo. Sed nulla odio, aliquam ut lobortis vitae, viverra quis risus. Vivamus pulvinar enim sit amet elit porttitor bibendum. Nulla facilisi. Aliquam libero libero, porta ac justo vitae, dapibus convallis sapien. Praesent a nibh pretium, ultrices urna eget, vulputate felis. Phasellus ac sagittis ipsum, a congue lectus. Integer interdum ut velit vehicula volutpat. Nulla facilisi. Nulla rhoncus metus lorem, sit amet facilisis ipsum faucibus et. Lorem ipsum.',
              spans: [],
            },
            {
              type: 'list-item',
              text: 'Curabitur a rutrum ante. Praesent in justo sagittis, dignissim quam facilisis, faucibus dolor. Vivamus sapien diam, faucibus sed sodales sed, tincidunt quis sem. Donec tempus ipsum massa, ut fermentum ante molestie consectetur. In hac habitasse platea dictumst. Sed non finibus nibh, vitae dapibus arcu. Sed lorem magna, imperdiet non pellentesque et, rhoncus ac enim. Class aptent taciti sociosqu ad litora torquent per conubia.',
              spans: [],
            },
            {
              type: 'paragraph',
              text: 'Praesent ac sapien eros. Suspendisse potenti. Morbi eu ante nibh. Proin dictum, tellus ut molestie tincidunt, urna tortor sodales velit, ut tempor lectus ipsum nec sapien. Nulla nec purus vitae libero aliquet posuere non et sapien. Cras in erat rhoncus, dignissim ligula iaculis, faucibus orci. Donec ligula neque, imperdiet vitae mauris eget, egestas varius massa. Praesent ornare nisi at dui dapibus, ac tristique felis.',
              spans: [],
            },
            {
              type: 'paragraph',
              text: 'Phasellus maximus urna lacus, non imperdiet ex blandit sit amet. Vivamus et tellus est. Mauris ligula elit, placerat non tellus a, dictum porttitor urna. Phasellus mollis turpis id suscipit dapibus. In dolor.',
              spans: [],
            },
            {
              type: 'paragraph',
              text: 'Sed sit amet euismod sapien, non eleifend erat. Vivamus et quam odio. Integer nisi lacus, maximus sit amet turpis in, luctus molestie sem. Duis sit amet euismod erat. Fusce pulvinar ex neque, egestas cursus nulla ullamcorper vel. Pellentesque mollis erat egestas est rhoncus, sit amet sodales massa ullamcorper. Etiam auctor ante a neque facilisis tristique. Proin ultricies fringilla turpis, eget tempus elit imperdiet non. Quisque.',
              spans: [],
            },
            {
              type: 'paragraph',
              text: 'Etiam eu tortor placerat, varius orci non, ornare nunc. Cras suscipit in ligula ultricies lacinia. Pellentesque at tristique sapien, et scelerisque leo. Donec eu nisi at magna tristique luctus vel at turpis. Nam vestibulum ornare ex cursus vulputate. In elementum tellus at sapien bibendum, id maximus mauris convallis. Donec facilisis porta lobortis. Vivamus mauris diam, pretium ac dolor.',
              spans: [],
            },
            {
              type: 'paragraph',
              text: 'Pellentesque et consequat arcu, ac laoreet ante. Nam non.',
              spans: [
                {
                  start: 49,
                  end: 56,
                  type: 'strong',
                },
              ],
            },
          ],
          heading: 'Cras laoreet mi',
        },
      ],
    },
  };

  return {
    props: { post },
  };
};
