import { useEffect } from "react";

import "./styles.css";

export const PageCounter = ({
  handleChange,
  postsPerPage,
  postsAmount,
  page,
  maxPage,
}) => {
  console.log(" > RECEBI:");
  console.log(handleChange);
  console.log(postsPerPage);
  console.log(postsAmount);
  console.log(page);
  console.log("maxpage = ", maxPage);

  const inputClassName = "posts-per-page";

  const selfHandleChange = (e) => {
    const value = e.target.value;
    const letterWidth = 10;
    e.target.style.width = `${
      letterWidth + value.toString().length * letterWidth
    }px`;
    handleChange(e);
  };

  const handleBlur = (e) => {
    e.target.value = postsPerPage > postsAmount ? postsAmount : postsPerPage;
  };

  useEffect(() => {
    const self = document.querySelector("." + inputClassName);
    const value = postsPerPage > postsAmount ? postsAmount : postsPerPage;
    self.value = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsAmount]);

  return (
    <span>
      Showing {console.log("Iniciando Page Counter")}
      <input
        type="number"
        onChange={selfHandleChange}
        onBlur={handleBlur}
        className={inputClassName}
        min={1}
      />
      of {postsAmount} {postsPerPage > 1 ? "posts" : "post"} | Page {page} /{" "}
      {maxPage}
    </span>
  );
};
