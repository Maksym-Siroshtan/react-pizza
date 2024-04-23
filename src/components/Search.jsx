import searchLogo from "../assets/img/search.svg";
import close from "../assets/img/close.svg";

function Search({ search, setSearch }) {
  return (
    <div className="content__search">
      <img src={searchLogo} alt="Search" className="search" />
      <input
        onChange={() => setSearch(event.target.value)}
        value={search}
        type="text"
        placeholder="Пошук..."
      />
      <img
        onClick={() => setSearch("")}
        src={close}
        alt="Close"
        className="close"
      />
    </div>
  );
}

export default Search;
