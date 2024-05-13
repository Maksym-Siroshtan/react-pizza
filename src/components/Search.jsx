import React from "react";

import searchLogo from "../assets/img/search.svg";
import clear from "../assets/img/close.svg";

function Search({ search, setSearch }) {
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearch("");
    inputRef.current.focus();
  };

  return (
    <div className="content__search">
      <img src={searchLogo} alt="Search" className="search" />
      <input
        ref={inputRef}
        onChange={() => setSearch(event.target.value)}
        value={search}
        type="text"
        placeholder="Пошук..."
      />
      <img onClick={onClickClear} src={clear} alt="Clear" className="clear" />
    </div>
  );
}

export default Search;
