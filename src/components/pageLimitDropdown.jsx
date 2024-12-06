import {
    NativeSelectField,
    NativeSelectRoot,
  } from "../components/ui/native-select";

const PageLimitDropdown = ({limit, setLimit, setPage}) => {
    return (
        <NativeSelectRoot size="sm" width={"60px"} variant="subtle">
            <NativeSelectField
              px={1}
              value={limit}
              onChange={(e) => {setLimit(e.currentTarget.value); setPage(1)}}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
            </NativeSelectField>
          </NativeSelectRoot>
    )
}

export default PageLimitDropdown;