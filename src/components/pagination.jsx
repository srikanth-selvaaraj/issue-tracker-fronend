import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../components/ui/pagination";

const Pagination = ({recordCount, limit, page, setPage}) => {
  return (
    <PaginationRoot
      count={recordCount}
      pageSize={limit}
      defaultPage={1}
      page={page}
      onPageChange={(e) => setPage(e.page)}
      variant="solid"
    >
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </PaginationRoot>
  );
};


export default Pagination;