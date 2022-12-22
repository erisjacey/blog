import Head from 'next/head';
import Link from 'next/link';
import Date from '@/components/date';
import Layout, { siteTitle } from '@/components/layout';
import { getSortedPostsData } from '@/lib/posts';
import utilStyles from '@/styles/utils.module.css';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

const Home = ({ allPostsData }) => {
  const renderPosts = (postsData) => (
    <ul className={`not-prose ${utilStyles.list}`}>
      {postsData.map(({ id, date, title }) => (
        <li className={utilStyles.listItem} key={id}>
          <Link href={`/posts/${id}`}>{title}</Link>
          <br />
          <small className={utilStyles.lightText}>
            <Date dateString={date} />
          </small>
        </li>
      ))}
    </ul>
  );

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <article className={`prose ${utilStyles.headingMd}`}>
        <p>Welcome to Eris&apos; blog!</p>
        <p>
          This is a still a work in progress. More to show in the future. :)
        </p>
      </article>
      <article className={`prose ${utilStyles.headingMd} ${utilStyles.padding3pc}`}>
        <h2 className={utilStyles.headingLg}>Latest Posts</h2>
        {renderPosts(allPostsData)}
      </article>
    </Layout>
  );
};

export default Home;
