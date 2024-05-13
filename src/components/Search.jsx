import React from "react";
import debounce from "lodash.debounce";

import searchLogo from "../assets/img/search.svg";
import clear from "../assets/img/close.svg";

function Search({ setSearch }) {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearch(str);
    }, 300),
    []
  );

  const onChangeSearchInput = (event) => {
    const targetValue = event.target.value;

    setValue(targetValue);
    updateSearchValue(targetValue);
  };

  const onClickClear = () => {
    setValue("");
    setSearch("");
    inputRef.current.focus();
  };

  return (
    <div className="content__search">
      <img src={searchLogo} alt="Search" className="search" />
      <input
        ref={inputRef}
        onChange={onChangeSearchInput}
        value={value}
        type="text"
        placeholder="Пошук..."
      />
      <img onClick={onClickClear} src={clear} alt="Clear" className="clear" />
    </div>
  );
}

export default Search;
