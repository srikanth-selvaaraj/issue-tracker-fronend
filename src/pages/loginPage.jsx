import { useState } from "react";
import { userLogin } from "../network/user";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate(); 
  const [inputs, setInputData] = useState({});

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputData((prevValues) => ({...prevValues, [name]:value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await userLogin(inputs);

        if (response.status === 200 && response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            navigate('/');
        }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-semibold">Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-5">
            <input
              name="password"
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="password"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
            <h1 className="text-center pb-4 text-blue-600">Forget password?</h1>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>

        <h1 className="text-center p-4">Don't have an account? <span className="text-blue-600">sign up</span></h1>
      </div>
    </div>
  );
};

export default LoginPage;