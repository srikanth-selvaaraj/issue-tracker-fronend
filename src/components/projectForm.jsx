import { useState } from "react";

const CreateProjectForm = ({inputs, onInputChange}) => {
    return (
        <form id="createProjectForm">
        <div className="mb-5">
          <label
            for="project_title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project Title
          </label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={onInputChange}
            id="project_title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Project title"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            value={inputs.description}
            onChange={onInputChange}
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description..."
          ></textarea>
        </div>
      </form>
    )
}

export default CreateProjectForm;