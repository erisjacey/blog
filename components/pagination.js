import { useState } from 'react';
import Post from '@/components/post';
import paginationStyles from '@/styles/pagination.module.css';
import utilStyles from '@/styles/utils.module.css';

const Pagination = ({ posts }) => {
  const pageNumberLimit = 5;
  const postsPerPageLimit = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [maxPageLimit, setMaxPageLimit] = useState(pageNumberLimit);
  const totalPages = Math.ceil(posts.length / postsPerPageLimit);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (e) => {
    setCurrentPage(Number(e.target.id));
  }

  const handleDecrementEllipsesClick = () => {
    setMaxPageLimit(maxPageLimit - pageNumberLimit);
    setMinPageLimit(minPageLimit - pageNumberLimit);
    setCurrentPage(maxPageLimit - pageNumberLimit);
  }

  const handleIncrementEllipsesClick = () => {
    setMaxPageLimit(maxPageLimit + pageNumberLimit);
    setMinPageLimit(minPageLimit + pageNumberLimit);
    setCurrentPage(minPageLimit + pageNumberLimit + 1);
  }

  const handlePrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev) => prev - 1);
  }

  const handleNextClick = () => {
    if ((currentPage + 1) > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev) => prev + 1);
 }

  const renderPosts = () => (
    <ul className={utilStyles.list}>
      {posts
      .filter((_, index) => {
        const minIndexAtCurrentPage = (currentPage - 1) * postsPerPageLimit;
        const maxIndexAtCurrentPage = currentPage * postsPerPageLimit - 1;
        return index >= minIndexAtCurrentPage && index <= maxIndexAtCurrentPage;
      })
      .map(({ id, title, date}) => (
        <li className={utilStyles.listItem} key={id}>
          <Post id={id} title={title} date={date} />
        </li>
      ))}
    </ul>
  );

  const renderPageNumbers = () => (pages.map((page) => {
    if (page > minPageLimit && page <= maxPageLimit) {
      return (
        <li 
          key={page} 
          id={page} 
          onClick={handlePageClick}
          className={currentPage === page ? paginationStyles.active : null}
        >
          {page}
        </li>
      )
    } else {
      return null;
    }
  }));

  const renderPageDecrementEllipses = () => (
    minPageLimit >= 1
      ? <li onClick={handleDecrementEllipsesClick}>&hellip;</li>
      : null
  );

  const renderPageIncrementEllipses = () => (
    pages.length > maxPageLimit
      ? <li onClick={handleIncrementEllipsesClick}>&hellip;</li>
      : null
  );

  const renderPrevButton = () => (
    <li>
      <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
        Prev
      </button>
    </li>
  );

  const renderNextButton = () => (
    <li>
      <button onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}>
        Next
      </button>
    </li>
  )

  return (
    <div>
      {renderPosts()}
      <ul className={paginationStyles.pageNumbers}>
        {renderPageDecrementEllipses()}
        {renderPrevButton()}
        {renderPageNumbers()}
        {renderNextButton()}
        {renderPageIncrementEllipses()}
      </ul>
    </div>
  );
};

export default Pagination;
