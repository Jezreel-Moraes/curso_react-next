import { useCallback, useEffect, useState } from "react";

import "./styles.css";

import { ChangePageButton } from "../../components/ChangePageButton";
import { PostsContainer } from "../../components/PostsContainer";
import { SearchBar } from "../../components/SearchBar";

import { PageCounter } from "../../components/PageCounter";
import { loadPosts } from "../../utils/get-posts";

export const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [pagePosts, setPagePosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const pagesAmount = !!searchValue
    ? filteredPosts.length / postsPerPage
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

  const updatePagePosts = (
    currentPage,
    newPostsPerPage = null,
    maybePosts = null
  ) => {
    const posts = maybePosts || allPosts;
    const postsAmount = newPostsPerPage || postsPerPage;
    const index = indexOfPostToRender(currentPage);
    setPagePosts(posts.slice(index, index + postsAmount));
  };

  const handleLoadPosts = useCallback(async () => {
    console.log("so devo aparecer 1 vez");
    const posts = await loadPosts();
    setPage(1);
    setAllPosts(posts);
    updatePagePosts(1, null, posts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAllPosts]);

  const handleSearchBarChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const newPosts = allPosts.filter((post) => {
      return post.title.toLowerCase().includes(value.toLowerCase());
    });
    setPage(1);
    setFilteredPosts(newPosts);
    updatePagePosts(1, null, newPosts);
  };

  const handleNextPage = (e) => {
    if (page + 1 > maxPage) return;
    setPage(page + 1);
    updatePagePosts(page + 1, null, !!searchValue ? filteredPosts : null);
  };

  const handlePreviousPage = (e) => {
    if (page - 1 < 1) return;
    setPage(page - 1);
    updatePagePosts(page - 1, null, !!searchValue ? filteredPosts : null);
  };

  const handlePostsPerPageChange = (e) => {
    console.log("alo1");
    const value = Math.floor(Math.abs(e.target.value));
    const newPostsPerPage = value > 0 ? value : value + 1;
    setPostsPerPage(newPostsPerPage);
    setPage(1);
    updatePagePosts(1, newPostsPerPage);
    console.log("alo2");
  };

  useEffect(() => {
    handleLoadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(" >> CARREGANDO << ");

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
      <PostsContainer posts={pagePosts} />
      <div className="buttons-container">
        <ChangePageButton handleClick={handlePreviousPage} text={"<"} />
        <PageCounter
          handleChange={handlePostsPerPageChange}
          postsPerPage={postsPerPage}
          postsAmount={!!searchValue ? filteredPosts.length : allPosts.length}
          page={page}
          maxPage={maxPage}
        />
        <ChangePageButton handleClick={handleNextPage} text={">"} />
      </div>
    </section>
  );
};
