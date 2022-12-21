import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Head from 'next/head';
import Link from 'next/link';
import Date from '@/components/date';
import Layout, { siteTitle } from '@/components/layout';
import MapChart from '@/components/mapchart';
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
  const [content, setContent] = useState('');

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <MapChart setTooltipContent={setContent} />
        <a id="props-basic"> Test </a>
        <Tooltip anchorId="props-basic" content={content} />
      </div>
      <section className={utilStyles.headingMd}>
        <p>Welcome to Eris&apos; blog!</p>
        <p>
          This is a still a work in progress. More to show in the future. :)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Latest Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
