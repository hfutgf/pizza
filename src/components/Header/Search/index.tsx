import React, { useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import icon from "./search-icon.svg";
import xicon from "./x-icon.svg";
import { setSearchValue } from "../../../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { searchValue } = useSelector(
    (state: { filter: { searchValue: string } }) => state.filter
  );

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      setSearchValue(str);
    }, 500),
    []
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
    updateSearchValue(event.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const onClickClear = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log("test", event);
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };

  return (
    <>
      {pathname !== "/cart" && (
        <div className={styles.root}>
          <img src={icon} className={styles.icon} alt="icon" width={24} />
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(event) => onChangeInput(event)}
            className={styles.input}
            placeholder="Поиск пиццы..."
          />
          {searchValue && (
            <img
              onClick={onClickClear}
              src={xicon}
              className={styles.xicon}
              alt="icon"
              width={22}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Search;
