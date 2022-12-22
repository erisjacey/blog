import Head from 'next/head';
import Layout, { siteTitle } from '@/components/layout';
import MapChart from '@/components/mapchart';
import Tabs from '@/components/tabs';
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
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <MapChart />
      </div>
      <article className={`prose ${utilStyles.headingMd} ${utilStyles.padding3pc}`}>
        <p>Welcome to Eris&apos; blog!</p>
        <p>
          This is a still a work in progress. More to show in the future. :)
        </p>
        <h2 className={`${utilStyles.headingLg} ${utilStyles.padding3pc}`}>Latest Posts</h2>
      </article>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Tabs posts={allPostsData} />
      </section>
    </Layout>
  );
};

export default Home;
