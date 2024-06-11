import React from "react";
import debounce from "lodash.debounce";

import searchLogo from "../assets/img/search.svg";
import clear from "../assets/img/close.svg";

type SearchProps = {
  onChangeSearchQuery: any;
};

const Search: React.FC<SearchProps> = ({ onChangeSearchQuery }) => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      onChangeSearchQuery(str);
    }, 300),
    []
  );

  const onChangeSearchInput = (event: any) => {
    const targetValue = event.target.value;

    setValue(targetValue);
    updateSearchValue(targetValue);
  };

  const onClickClear = () => {
    setValue("");
    onChangeSearchQuery("");
    inputRef.current?.focus();
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
};

export default Search;
