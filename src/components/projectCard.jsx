import { Card, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProjectDrawer from "./projectDrawer.jsx";
import { FaTrashAlt } from "react-icons/fa";
import { deleteProjectAPI } from "../network/project.js";

const ProjectCard = ({
  projectTitle,
  projectDescription,
  projectId,
  setProjects,
}) => {
  const handleOnClick = (id) => {
    if (confirm("Are you sure you want to delete this?")) {
      const response = deleteProject(id);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id != id)
      );
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await deleteProjectAPI(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card.Root width="320px" m="4" variant="subtle" key={projectId}>
      <Card.Body gap="2">
        <Card.Title mt="2">{projectTitle}</Card.Title>
        <Card.Description>{projectDescription}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-start">
        <Link
          size="sm"
          to="/issues"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          issues
        </Link>
        <ProjectDrawer
          buttonName={"Update"}
          drawerTitle={"Update Project"}
          setProjects={setProjects}
          project={{
            id: projectId,
            title: projectTitle,
            description: projectDescription,
          }}
        />
        <IconButton
          size="sm"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          onClick={() => handleOnClick(projectId)}
        >
          <FaTrashAlt />
        </IconButton>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProjectCard;
