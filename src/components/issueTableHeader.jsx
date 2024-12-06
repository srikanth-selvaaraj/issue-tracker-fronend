const IssueTableHeader = ({columnHeader, columnApiKey, handleSort, getSortIcon}) => {
  return (
    <Table.ColumnHeader
      onClick={() => {
        handleSort("description");
      }}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        {columnHeader} {getSortIcon(columnApiKey)}
      </Flex>
    </Table.ColumnHeader>
  );
};

export default IssueTableHeader;
