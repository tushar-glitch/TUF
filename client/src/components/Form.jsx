import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
export default function Form() {
  const [username, setUsername] = useState("");
  const [lang_id, setLanguage] = useState("");
  var [input, setStdin] = useState("");
  var [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    localStorage.setItem("username", username);
    console.log("Username:", username);
    console.log("Language:", lang_id);
    console.log("Stdin:", input);
    console.log("Code:", code);

    axios
      .post("https://tuf-mgn0.onrender.com/api/submissions/post", {
        username,
        lang_id,
        input,
        code,
      })
      .then((res) => {
        console.log(res);
        navigate('/submissions')
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setUsername("");
    setLanguage("");
    setStdin("");
    setCode("");
  };
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner size="large" color="blue" />
          <p className="mt-2 text-white text-lg">Generating output, please wait...</p>
        </div>
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcw5hXYo5EMa0NLWuPt39fiGbBv0mWvbKfOIeuw-jwHQ&s"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            TakeUForward
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                for="countries"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Select an option
              </label>
              <select
                id="countries"
                value={lang_id}
                onChange={(e) => setLanguage(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected>Choose a language</option>
                <option value="52">C++</option>
                <option value="91">Java</option>
                <option value="93">Javascript</option>
                <option value="92">Python</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Standard Input(stdin)
              </label>
              <div className="mt-2 ">
                <textarea
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={input}
                  onChange={(e) => setStdin(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  "
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Code
              </label>
              <div className="mt-2">
                <textarea
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
