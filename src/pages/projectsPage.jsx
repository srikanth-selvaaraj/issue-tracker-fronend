import { useEffect, useState } from "react";
import ProjectCard from "../components/projectCard";
import { getProjects } from "../network/project";
import ProjectDrawer from "../components/projectDrawer";
import { Input, Flex, Container, Box, Button } from "@chakra-ui/react";
import Pagination from "../components/pagination";
import PageLimitDropdown from "../components/pageLimitDropdown";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [recordCount, setRecordCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchProjects = async (payload = {}) => {
    try {
      setLoading(true);
      payload = { ...payload, page: page, limit: limit };
      const response = await getProjects(payload);

      setProjects(response.data.results);
      setRecordCount(response.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleOnClick = async () => {
    if (!search) return;

    try {
      await fetchProjects({ search: search });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, limit]);

  return (
    <>
      <div className="bg-gray-800">
        <Container>
          <Flex justify="space-between" p={4}>
            <Box>
              <Input
                placeholder="Search Project..."
                size={"sm"}
                variant={"subtle"}
                width={80}
                marginEnd={"auto"}
                p={4}
                value={search}
                onChange={handleOnChange}
              />
              <Button
                onClick={handleOnClick}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm mx-4 px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              >
                Search
              </Button>
            </Box>
            <ProjectDrawer
              buttonName={"Create Project"}
              drawerTitle={"Create Project"}
              setProjects={setProjects}
            />
          </Flex>
        </Container>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Container fluid>
            <Flex justify="center" wrap={"wrap"}>
              {projects.length > 0 ? (
                projects.map((project) => {
                  return (
                    <ProjectCard
                      key={project.id}
                      projectTitle={project.title}
                      projectDescription={project.description}
                      projectId={project.id}
                      setProjects={setProjects}
                    />
                  );
                })
              ) : (
                <p> No projects found </p>
              )}
            </Flex>
          </Container>
        )}

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
      </div>
    </>
  );
};

export default ProjectsPage;
