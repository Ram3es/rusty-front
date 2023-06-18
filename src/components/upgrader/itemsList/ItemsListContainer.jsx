import {createSignal, onCleanup, on, createEffect} from "solid-js";

import SearchBar from "./SearchBar";
import ItemsContainer from "./ItemsContainer";

import {items} from "../../../views/upgrader/Upgrader";

export const sortOptions = ["ASC", "DESC"];

export const [search, setSearch] = createSignal("");
export const [sortBy, setSortBy] = createSignal(sortOptions[1]);
export const [sortedItems, setSortedItems] = createSignal([]);

const sortAndFilterItems = () => {
  let currentItems = items();

  currentItems = currentItems.filter((c) =>
    c.name.toLowerCase().includes(search().toLowerCase())
  );

  currentItems = currentItems.sort((a, b) => {
    if (sortBy() === "ASC") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  setSortedItems(currentItems);
};

const ItemsListContainer = () => {
  // Recompute sortedItems whenever search or sortBy changes
  on([search, sortBy], sortAndFilterItems);

  createEffect(() => {
    sortAndFilterItems();
  });

  onCleanup(() => {
    // Cleanup when the component gets unmounted
    setSortedItems([]);
  });

  return (
    <div class="flex-col flex gap-4 max-w-[1370px] w-full">
      <SearchBar />
      <ItemsContainer items={sortedItems()} />
    </div>
  );
};

export default ItemsListContainer;
