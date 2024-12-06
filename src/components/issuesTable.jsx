import { Table, Container, Flex } from "@chakra-ui/react";
import { listIssuesAPI } from "../network/issues";
import { useEffect, useState } from "react";
import Pagination from "./pagination";
import PageLimitDropdown from "./pageLimitDropdown";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
// import IssueTableHeader from "./issueTableHeader";

// TODO:: sorting
// TODO:: search and select multiple title
// TODO:: date range filter

const IssuesTable = () => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recordCount, setRecordCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortKey, setSortKey] = useState('updated_at')
  const [sortValue, setSortValue] = useState('desc')

  const getIssues = async (payload = {}) => {
    try {
      setIsLoading(true);
      payload = { ...payload, page: page, limit: limit, sort_key: sortKey, sort_value: sortValue};
      const response = await listIssuesAPI(payload);
      console.log(response);

      if (response.status == 200) {
        setIssues(response.data.results);
        setRecordCount(response.data.count);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSort = (key) => {
    const sortDirection = sortKey == key && sortValue == 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortValue(sortDirection);
  }

  const getSortIcon = (key) => {
    if (sortKey == key) {
      return sortValue == 'desc' ? <FaSortDown /> : <FaSortUp />;
    }

    return <FaSort />
  }

  useEffect(() => {
    getIssues();
  }, [page, limit, sortKey, sortValue]);

  let tableColumns = {
    "Title": "title",
    "Description": "description",
    "Created at": "created_at",
    "Updated at": "updated_at",
  };

  return (
    <Container>
      <Table.Root stickyHeader variant={"outline"} interactive>
        <Table.Header>
          <Table.Row>
              {
                Object.entries(tableColumns).map(([key, value]) => (
                  <Table.ColumnHeader key={key} onClick={() => {handleSort(value)}}>
                    <Flex alignItems="center" justifyContent="space-between">
                      {key} {getSortIcon(value)}
                    </Flex>
                  </Table.ColumnHeader>
                ))
              }
          </Table.Row>
        </Table.Header>
        <Table.Body className="bg-gray-800">
          {isLoading ? (
            <Table.Row>
              <Table.Cell>
                <div className="text-center">Loading...</div>
              </Table.Cell>
            </Table.Row>
          ) : (
            issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell>{issue.description}</Table.Cell>
                <Table.Cell>{new Date(issue.created_at).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{new Date(issue.updated_at).toLocaleDateString()}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>

      <Flex justifyContent={"center"} py={4}>
        <PageLimitDropdown
          limit={limit}
          setLimit={setLimit}
          setPage={setPage}
        />
        <Pagination
          recordCount={recordCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </Flex>
    </Container>
  );
};

export default IssuesTable;
