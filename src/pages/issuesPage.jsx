import IssuesTable from "../components/issuesTable";
import IssueFilter from "../components/issueFilter";
import { Container } from "@chakra-ui/react";

const IssuesPage = () => {
    return (
        <div className="p-4">
            <Container mb={"8"}>
                <IssueFilter />
            </Container>

            <Container>
                <IssuesTable />
            </Container>
        </div>
    )
}

export default IssuesPage;