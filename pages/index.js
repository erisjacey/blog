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
      <article className={`prose ${utilStyles.headingMd} ${utilStyles.padding3pc} text-justify`}>
        <p>Welcome to my blog!</p>
        <p>
           My name is Eris, and I am currently a software engineer with a 
           degree Computer Science raised and living in Singapore.
        </p>
        <p>
          This website is a collection of my documented recent experiences, ranging
          from local escapades to overseas adventures.
        </p>
        <p>I aim to continue updating this blog, so stay tuned!</p>
        <h2 className={`${utilStyles.headingLg} ${utilStyles.padding3pc}`}>Latest Posts</h2>
      </article>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Tabs posts={allPostsData} />
      </section>
    </Layout>
  );
};

export default Home;
