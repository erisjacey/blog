import Link from 'next/link';
import Date from '@/components/date';
import { topics } from '@/lib/constants';
import {
  capitaliseWord,
  idStrToArr,
  getBlogTypeFromIdArr,
} from '@/lib/utils';
import utilStyles from '@/styles/utils.module.css';

const ALL = 'all';

const Tabs = ({ posts }) => {
  const getBlogTopicFromId = (id) => {
    const idArr = idStrToArr(id);
    return getBlogTypeFromIdArr(idArr);
  };

  const blogTopics = [ALL, ...topics];

  const tabClass = (tabName) => `
    nav-link
    w-full
    block
    font-medium
    text-xs
    leading-tight
    border-x-0 border-t-0 border-b-2 border-transparent
    px-6
    py-3
    my-2
    hover:border-transparent hover:bg-gray-100
    focus:border-transparent
    ${tabName === ALL ? 'active' : ''}
  `;

  const renderPosts = (posts, topic) => (
    <ul className={utilStyles.list}>
      {posts
        .filter(({ id }) => topic === ALL || topic === getBlogTopicFromId(id))
        .map(({ id, date, title }) => (
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

  const renderTab = (topic) => (
    <li key={`${topic}-tab`} id={topic} className="nav-item flex-auto text-center" role="presentation">
      <a
        href={`#tabs-${topic}Posts`}
        className={tabClass(topic)}
        id={`tabs-${topic}-tabFill`}
        data-bs-toggle="pill"
        data-bs-target={`#tabs-${topic}Posts`}
        role="tab"
        aria-controls={`tabs-${topic}Fill`}
        aria-selected="true"
      >
        {capitaliseWord(topic)}
      </a>
    </li>
  );

  const renderTabs = (topics) => (
    <ul
      className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
      id="tabs-tabFill"
      role="tablist"
    >
      {topics.map((topic) => renderTab(topic))}
    </ul>
  )

  const renderTabPanel = (posts, topic) => (
    <div
      key={`${topic}-panel`}
      className={`tab-pane fade ${topic === 'all' ? 'show active' : ''}`}
      id={`tabs-${topic}Posts`}
      role="tabpanel"
      aria-labelledby={`tabs-${topic}-tabFill`}
    >
      {renderPosts(posts, topic)}
    </div>
  );

  const renderTabPanels = (posts, topics) => (
    <div className="tab-content" id="tabs-tabContentFill">
      {topics.map((topic) => renderTabPanel(posts, topic))}
    </div>
  );

  return (
    <>
      {renderTabs(blogTopics)}
      {renderTabPanels(posts, blogTopics)}
    </>
  );
};

export default Tabs;
