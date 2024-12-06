import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../components/ui/accordion";
import { Flex } from "@chakra-ui/react";
import { Box, Collapsible } from "@chakra-ui/react"

const IssueFilter = () => {
  return (
    <Collapsible.Root>
    <Collapsible.Trigger paddingY="3">Toggle Collapsible</Collapsible.Trigger>
    <Collapsible.Content>
      <Box padding="4" borderWidth="1px">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Box>
    </Collapsible.Content>
  </Collapsible.Root>
  );
};

export default IssueFilter;
