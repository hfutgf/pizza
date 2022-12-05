import React, { useCallback, useContext, useRef, useState } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import icon from "./search-icon.svg";
import xicon from "./x-icon.svg";
import { StoreContext } from "../../../App";

const Search = () => {
  const { searchValue, setSearchValue } = useContext(StoreContext);
  const [value, setValue] = useState("");
  const updateSearchValue = useCallback(
    debounce((str ) => {
      setSearchValue(str);
    }, 500),
    []
  );
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value)
  };

  const inputRef = useRef("");
  const onClickClear = () => {
    setValue("");
    inputRef.current.focus();
  };
  
  return (
    <div className={styles.root}>
      <img src={icon} className={styles.icon} alt="icon" width={24} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => onChangeInput(event)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <img
          onClick={onClickClear}
          src={xicon}
          className={styles.xicon}
          alt="icon"
          width={22}
        />
      )}
    </div>
  );
};

export default Search;
