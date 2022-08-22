import { useEffect, useState } from "react";

import "./styles.css";

import { ChangePageButton } from "../../components/ChangePageButton";
import { PageCounter } from "../../components/PageCounter";
import { PostsContainer } from "../../components/PostsContainer";
import { SearchBar } from "../../components/SearchBar";
import { loadPosts } from "../../utils/get-posts";

export const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredBySearchPosts, setFilteredBySearchPosts] = useState([]);
  const [currentPagePosts, setCurrentPagePosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const localStoragePosts = "allPosts";

  const pagesAmount = !!searchValue
    ? filteredBySearchPosts.length / postsPerPage
    : allPosts.length / postsPerPage;

  const maxPage =
    pagesAmount - Math.floor(pagesAmount) !== 0
      ? Math.floor(pagesAmount) + 1
      : pagesAmount === 0
      ? 1
      : pagesAmount;

  const indexOfPostToRender = (currentPage) => {
    return (currentPage - 1) * postsPerPage;
  };

  const updateCurrentPagePosts = (
    currentPage,
    newPostsPerPage = null,
    newPosts = null
  ) => {
    const posts =
      newPosts || (!!searchValue ? filteredBySearchPosts : allPosts);
    const postsAmount = newPostsPerPage || postsPerPage;
    const index = indexOfPostToRender(currentPage);
    setCurrentPagePosts(posts.slice(index, index + postsAmount));
  };

  const getLocalPostsIfExists = () => {
    return JSON.parse(localStorage.getItem(localStoragePosts));
  };

  const handleLoadPosts = async () => {
    const localPosts = getLocalPostsIfExists();
    const posts = !!localPosts ? localPosts : await loadPosts();

    if (!localPosts) {
      localStorage.setItem(localStoragePosts, JSON.stringify(posts));
    }

    setCurrentPage(1);
    setAllPosts(posts);
    updateCurrentPagePosts(1, null, posts);
  };

  function handleSearchBarChange(e) {
    const value = e.target.value;
    setSearchValue(value);
    const newPosts = allPosts.filter((post) => {
      return post.title.toLowerCase().includes(value.toLowerCase());
    });
    setCurrentPage(1);
    setFilteredBySearchPosts(newPosts);
    updateCurrentPagePosts(1, null, newPosts);
  }

  const handleNextPage = (e) => {
    if (currentPage + 1 > maxPage) return;
    setCurrentPage(currentPage + 1);
    updateCurrentPagePosts(
      currentPage + 1,
      null,
      !!searchValue ? filteredBySearchPosts : null
    );
  };

  const handlePreviousPage = (e) => {
    if (currentPage - 1 < 1) return;
    setCurrentPage(currentPage - 1);
    updateCurrentPagePosts(
      currentPage - 1,
      null,
      !!searchValue ? filteredBySearchPosts : null
    );
  };

  const handlePostsPerPageChange = (e) => {
    const value = Math.floor(Math.abs(e.target.value));
    const newPostsPerPage = value > 0 ? value : value + 1;
    setPostsPerPage(newPostsPerPage);
    setCurrentPage(1);
    updateCurrentPagePosts(1, newPostsPerPage);
  };

  useEffect(() => {
    handleLoadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("loaded");
  return (
    <section className="container">
      <div className={`search-container ${!!searchValue ? "searching" : ""}`}>
        <SearchBar
          handleChange={handleSearchBarChange}
          searchValue={searchValue}
          placeholder={"Type your search"}
        />
        {!!searchValue ? <h1>Search result for: {searchValue}</h1> : ""}
      </div>
      <PostsContainer posts={currentPagePosts} />
      <div className="buttons-container">
        <ChangePageButton handleClick={handlePreviousPage} text={"<"} />
        <PageCounter
          handleChange={handlePostsPerPageChange}
          postsPerPage={postsPerPage}
          postsAmount={
            !!searchValue ? filteredBySearchPosts.length : allPosts.length
          }
          page={currentPage}
          maxPage={maxPage}
        />
        <ChangePageButton handleClick={handleNextPage} text={">"} />
      </div>
    </section>
  );
};
