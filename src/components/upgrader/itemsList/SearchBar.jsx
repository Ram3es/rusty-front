import CaseSearchInput from "../../../views/case/CaseSearchInput";
import Dropdown from "../../elements/Dropdown";

import {
  search,
  setSearch,
  sortBy,
  setSortBy,
  sortOptions,
} from "./ItemsListContainer";

const SearchBar = () => {
  return (
    <div class="flex flex-col lg:flex-row w-full gap-1 lg:gap-0 font-SpaceGrotesk text-[#9A9EC8]">
      <div class="text-20 font-semibold">SELECT A SKIN</div>
      <div class="flex-1" />
      <div class="flex gap-2">
        <CaseSearchInput
          search={search()}
          onReset={() => setSearch("")}
          onInput={(text) => setSearch(text)}
          placeholderOverride="Search for skins..."
        />
        <Dropdown
          activeName={sortBy()}
          itemsList={sortOptions}
          submitItem={(sort) => setSortBy(sort)}
          label="Sort by Price:"
        />
      </div>
    </div>
  );
};

export default SearchBar;
