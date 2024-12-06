import {useState} from "react";
import CreateProjectForm from "./projectForm";
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import {Button} from "@chakra-ui/react";
import {createProjectAPI, updateProjectAPI} from "../network/project";

const ProjectDrawer = ({buttonName, drawerTitle, setProjects, project = {}}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputs, setInputData] = useState(project);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputData((values) => ({...values, [name]: value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (Object.keys(project).length > 0) {
            updateProject();
        } else {
            createProject();
        }
    };

    const createProject = async () => {
        try {
            const response = await createProjectAPI(inputs);

            setIsOpen(false);
            setProjects((prevProjects) => [response.data, ...prevProjects]);

        } catch (error) {
            console.log(error);
        }
    };

    const updateProject = async () => {
        try {
            const response = await updateProjectAPI(project.id, inputs);

            setProjects((prevProjects) =>
                prevProjects.map((prevProject) =>
                    prevProject.id === project.id ? { ...prevProject, ...response.data } : prevProject
                )
            );

            setIsOpen(false);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <DrawerRoot size="md" open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <DrawerBackdrop/>

            <DrawerTrigger asChild>
                <Button variant="outline" size="sm"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    {buttonName}
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{drawerTitle}</DrawerTitle>
                </DrawerHeader>

                <DrawerBody>
                    <CreateProjectForm inputs={inputs} onInputChange={handleChange}/>
                </DrawerBody>

                <DrawerFooter>
                    <DrawerActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerActionTrigger>
                    <Button onClick={handleSubmit}>Save</Button>
                </DrawerFooter>

                <DrawerCloseTrigger/>
            </DrawerContent>

        </DrawerRoot>
    );
};

export default ProjectDrawer;
