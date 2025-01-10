import Head from 'next/head';
import Layout, { siteTitle } from '@/components/layout';
import Date from '@/components/date';
import { getAllPostIds, getPostData } from '@/lib/posts';
import utilStyles from '@/styles/utils.module.css';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

const Post = ({ postData }) => {
  const title = siteTitle
                + " | "
                + postData.title.replace(/^\[.*\]\s/, "");

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article className="prose">
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export default Post;
