import { DragEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MenuListProps, MenuProps, UpperMenuProps } from '../types/menu';
import styles from './menuwrap.module.css';

interface UpperBarProps {
  toggle: boolean;
  menuList: MenuListProps;
  isBookmark?: boolean;
  /** bookmark 수정 메소드 */
  insertBookmark?: () => void;
  /**  bookmark 삭제 메소드*/
  deleteBookMark?: () => void;
  /**  화면에 엑셀 버튼 표시 여부*/
  isExcelBtnVisible?: boolean;
  /**  엑셀 다운로드 실행 메소드*/
  excelDownload?: () => void;
}

const defaultMenuWrap: MenuProps[] = [
  {
    idx: 0,
    name: '',
    urlLink: '/',
  },
];

function getMenuObj(
  obj: MenuProps,
  idx: number,
  name: string,
  urlLink: string
) {
  obj.idx = idx;
  obj.name = name;
  obj.urlLink = urlLink;
}

const defaultPreventer = (event: DragEvent<HTMLElement>) =>
  event.preventDefault();

export const MenuTab = ({
  toggle,
  menuList,
  isBookmark,
  insertBookmark,
  deleteBookMark,
  isExcelBtnVisible,
  excelDownload,
}: UpperBarProps) => {
  const [menuWrapList, setMenuWrapList] = useState(defaultMenuWrap);
  /** 탭 드래그 앤 드롭 시 활성화 되는 탭 */
  const [hoverIdx, setHover] = useState(-1);
  /** 탭 관리 버튼 토글 관리 */
  const [tabToggle, setToggle] = useState(false);
  const router = useRouter();
  const addMenuWrap = (menuWrapTemp: MenuProps) => {
    setMenuWrapList((prev) => {
      return [
        menuWrapTemp,
        ...prev.filter(({ idx }) => idx !== menuWrapTemp.idx),
      ];
      const tempMenuWrapList = [menuWrapTemp, ...prev];
      const reverseList = tempMenuWrapList.reverse();

      //중복제거
      const chkMenuWrap = reverseList.filter((item, i) => {
        return (
          tempMenuWrapList.findIndex((item2) => {
            return item.idx === item2.idx;
          }) === i
        );
      });
      return chkMenuWrap.reverse();
    });
  };

  //메뉴Wrap 삭제
  const deleteMenuWrap = (menuWrapTemp: MenuProps) =>
    setMenuWrapList((prev) =>
      prev.filter(({ idx }) => idx !== menuWrapTemp.idx)
    );

  //메뉴
  function getMenu(
    menuObj: MenuProps,
    menuList: MenuListProps,
    currUrlLink: string
  ) {
    const tempList = [
      menuList.upperMenuList,
      menuList.middleMenuList,
      menuList.lowerMenuList,
      menuList.defaultMenuList,
    ];
    if (Array.isArray(tempList)) {
      tempList.forEach((tempMenuList, idx) => {
        if (Array.isArray(tempMenuList)) {
          tempMenuList.forEach((menu: UpperMenuProps) => {
            if (menu.subMenu.length == 0 && menu.urlLink === currUrlLink) {
              getMenuObj(menuObj, menu.idx, menu.name, menu.urlLink);
            } else {
              menu.subMenu.find((subMenu: any) => {
                if (subMenu.urlLink === currUrlLink) {
                  getMenuObj(
                    menuObj,
                    subMenu.idx,
                    subMenu.name,
                    subMenu.urlLink
                  );
                }
              });
            }
          });
        }
      });
    }
  }

  /** drag and drop */
  const [draggedTodo, setDraggedTodo] = useState<MenuProps | null>(null);
  const handleDragStart = (todo: MenuProps) => setDraggedTodo(todo);
  const handleDrop = (droppedTodo: MenuProps) => {
    if (draggedTodo) {
      const draggedTodoIndex = menuWrapList.indexOf(draggedTodo);
      const droppedTodoIndex = menuWrapList.indexOf(droppedTodo);

      setMenuWrapList((prevTodos) =>
        prevTodos.map((todo, idx) =>
          idx === draggedTodoIndex
            ? droppedTodo
            : idx === droppedTodoIndex
            ? draggedTodo
            : todo
        )
      );
      setDraggedTodo(null);
    }
  };
  /** close tab methods */
  const closeTab = () => {
    setToggle(false);
    setMenuWrapList((prevList) => {
      const tempResult = prevList.filter(
        ({ urlLink }) => urlLink !== router.route
      );
      router.push(tempResult.length !== 0 ? tempResult[0].urlLink : '/');
      return tempResult;
    });
  };
  const closeAllTab = () => {
    setMenuWrapList([]);
    setToggle(false);
    router.push('/');
  };
  const closeOtherTab = () => {
    setMenuWrapList((prevList) =>
      prevList.filter(({ urlLink }) => urlLink === router.route)
    );
    setToggle(false);
  };
  /** 탭 클릭 시 해당 탭 화면 출력 및 1번 위치로 이동 */
  const moveToTab = (moveURLLink: string) => {
    setMenuWrapList((prevList) => [
      ...prevList.filter(({ urlLink }) => urlLink === moveURLLink),
      ...prevList.filter(({ urlLink }) => urlLink !== moveURLLink),
    ]);
    setToggle(false);
  };

  useEffect(() => {
    const currUrlLink = router.route;
    const menuObj: MenuProps = { idx: 0, name: '', urlLink: '/' };

    //메뉴 찾기
    getMenu(menuObj, menuList, currUrlLink);
    addMenuWrap(menuObj);
  }, [router.route]);

  return (
    <div className={`${styles.menuWrap} ${toggle ? styles.active : ''}`}>
      <ul className={styles.menuTab}>
        {menuWrapList.map((menuWrapObj, idx) =>
          menuWrapObj.idx !== 0 ? (
            <li
              key={menuWrapObj.idx}
              className={
                menuWrapObj.urlLink === router.route ||
                menuWrapObj.idx === hoverIdx
                  ? styles.active
                  : ''
              }
              draggable
              onDragStart={() => handleDragStart(menuWrapObj)}
              onDragOver={defaultPreventer}
              onDragEnter={() => setHover(menuWrapObj.idx)}
              onDragEnd={() => setHover(-1)}
              onDrop={() => handleDrop(menuWrapObj)}
            >
              <button
                type='button'
                className={styles['menuTab-btn']}
                onClick={() =>
                  router.push(
                    `${menuWrapObj.urlLink}?${new URLSearchParams(
                      Object(router.query)
                    )}`
                  )
                }
              >
                {menuWrapObj.name}
              </button>
              <Link
                href={`${
                  menuWrapList[idx === 0 ? 1 : 0]?.urlLink ?? '/'
                }?${new URLSearchParams(Object(router.query))}`}
              >
                <button
                  type='button'
                  className={
                    menuWrapObj.urlLink === router.route ||
                    menuWrapObj.idx === hoverIdx
                      ? styles['tabDel-on']
                      : styles['tabDel']
                  }
                  onClick={() => {
                    deleteMenuWrap(menuWrapList[idx]);
                  }}
                ></button>
              </Link>
            </li>
          ) : null
        )}
      </ul>
      <div className={styles.menuIcon}>
        <button
          className={[
            styles['btn-menuctl'],
            tabToggle ? styles.active : '',
          ].join(' ')}
          onClick={() => setToggle((prev) => !prev)}
          onBlur={() => setTimeout(() => setToggle(false), 200)}
        ></button>
        {tabToggle ? (
          <ul className={isExcelBtnVisible ? styles.excel : ''}>
            <li onClick={closeTab}>Close Tab</li>
            <li onClick={closeAllTab}>Close All Tabs</li>
            <li onClick={closeOtherTab}>Close Other Tabs</li>
            {[...menuWrapList].reverse().map(({ name, idx, urlLink }) =>
              idx !== 0 ? (
                <Link
                  key={`ctl${idx}`}
                  href={`${urlLink}/?${new URLSearchParams(
                    Object(router.query)
                  )}`}
                >
                  <li
                    className={urlLink === router.route ? styles.active : ''}
                    onClick={() => moveToTab(urlLink)}
                  >
                    {name}
                  </li>
                </Link>
              ) : null
            )}
          </ul>
        ) : null}
        <Link
          href={`${router.route}?${new URLSearchParams(Object(router.query))}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <button type='button' className={styles['btn-newtab']}></button>
        </Link>
        {isExcelBtnVisible ? (
          <button
            type='button'
            className={styles['btn-download']}
            onClick={excelDownload}
          ></button>
        ) : null}
        {/*<button type='button' className={styles['btn-print']}></button>*/}
        <button
          type='button'
          className={[
            styles['btn-favorites'],
            isBookmark ? styles.active : '',
          ].join(' ')}
          onClick={() =>
            isBookmark
              ? deleteBookMark && deleteBookMark()
              : insertBookmark && insertBookmark()
          }
        ></button>
      </div>
    </div>
  );
};
