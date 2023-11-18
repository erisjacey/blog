import Link from 'next/link';
import Date from '@/components/date';
import utilStyles from '@/styles/utils.module.css';

const Post = ({ id, title, date }) => (
  <>
    <Link href={`/posts/${id}`}>{title}</Link>
    <br />
    <small className={utilStyles.lightText}>
      <Date dateString={date} />
    </small>
  </>
);

export default Post;
