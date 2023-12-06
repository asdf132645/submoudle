import styles from './pagebtn.module.css';

interface PaginationProps {
  pageButtons: number[];
  currentPage: number;
  onClickPageBtn: (page: number) => void;
  onClickPrevPageBtn: () => void;
  onClickNextPageBtn: () => void;
  onClickLastPageBtn: () => void;
}

export const Pagination = ({
  pageButtons,
  currentPage,
  onClickPageBtn,
  onClickPrevPageBtn,
  onClickNextPageBtn,
  onClickLastPageBtn,
}: PaginationProps) => {
  return (
    <div className={styles.pagingWrap} style={{ margin: '10px' }}>
      <ul>
        <li>
          <button
            type='button'
            className={styles['btn-prev2']}
            onClick={() => onClickPageBtn(1)}
          ></button>
        </li>
        <li>
          <button
            type='button'
            className={styles['btn-prev1']}
            onClick={onClickPrevPageBtn}
          ></button>
        </li>
        {pageButtons.map((page: number) => (
          <li key={page}>
            <button
              onClick={() => onClickPageBtn(page)}
              value={page}
              className={[
                styles['page-btn'],
                page === currentPage ? styles.active : '',
              ].join(' ')}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            type='button'
            className={styles['btn-next1']}
            onClick={onClickNextPageBtn}
          ></button>
        </li>
        <li>
          <button
            type='button'
            className={styles['btn-next2']}
            onClick={onClickLastPageBtn}
          ></button>
        </li>
      </ul>
    </div>
  );
};
