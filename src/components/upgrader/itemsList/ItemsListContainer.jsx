import {createSignal} from "solid-js";

import SearchBar from "./SearchBar";
import ItemsContainer from "./ItemsContainer";

import {items} from "../../../views/upgrader/Upgrader";

export const sortOptions = ["ASC", "DESC"];

export const [search, setSearch] = createSignal("");
export const [sortBy, setSortBy] = createSignal(sortOptions[0]);

const ItemsListContainer = () => {
  return (
    <div class="flex-col flex gap-4">
      <SearchBar />
      <ItemsContainer items={items} />
    </div>
  );
};

export default ItemsListContainer;
