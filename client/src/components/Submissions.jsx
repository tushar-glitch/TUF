import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "id",
  "time stamp",
  "username",
  "input",
  "output",
  "Language",
  "Code",
];

export function Submissions() {
  const [TABLE_ROWS, setTablerows] = useState([]);
  const [newCode, setNewCode] = useState([]);
  const [newInput, setNewInput] = useState([]);
  const username = localStorage.getItem("username");
  
  const [openInput, setOpenInput] = useState(false);
  const [openOutput, setOpenOutput] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mysub, setMySub] = useState(true);

  const handleOpenInput = () => {
    setOpenInput(!openInput);
    console.log(openInput);
  };
  const handleMysub = ()=> {setMySub(true)}
  const handleAllsub = () => { setMySub(false) }
  const handleOpenOutput = () => setOpenOutput(!openOutput);
  const handleOpenCode = () => setOpenCode(!openCode);
  useEffect(() => {
    setIsLoading(true);
    if (mysub) {
      axios
        .get(`http://localhost:5000/api/submissions/get/${username}`)
        .then((res) => {
          // setNewCode(jsesc(res.data.code))
          // setNewInput(jsesc(res.data.input))
          setTablerows(res.data);
          console.log(res.data[0].code);
          console.log(TABLE_ROWS);
        })
        .catch((err) => {
          console.log(err);
        })
      .finally(() => {
        setIsLoading(false);
      });
    }
    else {
      axios
        .get(`http://localhost:5000/api/submissions/get`)
        .then((res) => {
          // setNewCode(jsesc(res.data.code))
          // setNewInput(jsesc(res.data.input))
          setTablerows(res.data);
          console.log(res.data[0].code);
          console.log(TABLE_ROWS);
        })
        .catch((err) => {
          console.log(err);
        })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [mysub]);

  return (
    <div>
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner size="large" color="blue" />
          <p className="mt-2 text-white text-lg">Loading, please wait...</p>
        </div>
      )}
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
      <div>
        <Button variant="outlined" onClick={handleMysub}>My submissions</Button>
        <Button variant="outlined" onClick={handleAllsub}>All submissions</Button>
      </div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                { id, time_stamp, username, input, output, lang_id, code },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {time_stamp}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {username}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {/* {input} */}
                        <Button onClick={handleOpenInput} variant="gradient">
                          View input
                        </Button>
                        <Dialog open={openInput} handler={handleOpenInput}>
                          <DialogHeader>Standard Input</DialogHeader>
                          <DialogBody>
                            <pre>{input}</pre>
                          </DialogBody>
                          <DialogFooter>
                            <Button
                              variant="gradient"
                              color="green"
                              onClick={handleOpenInput}
                            >
                              <span>Okay</span>
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {/* {input} */}
                        <Button onClick={handleOpenOutput} variant="gradient">
                          View output
                        </Button>
                        <Dialog open={openOutput} handler={handleOpenOutput}>
                          <DialogHeader>Standard Output</DialogHeader>
                          <DialogBody>
                            <pre>{output ? output : "~𝘕𝘰 𝘰𝘶𝘵𝘱𝘶𝘵~"}</pre>
                          </DialogBody>
                          <DialogFooter>
                            <Button
                              variant="gradient"
                              color="green"
                              onClick={handleOpenOutput}
                            >
                              <span>Okay</span>
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {lang_id == 52
                          ? "C++"
                          : lang_id == 91
                          ? "Java"
                          : lang_id == 93
                          ? "Javascript"
                          : "Python"}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <Button onClick={handleOpenCode} variant="gradient">
                          View code
                        </Button>
                        <Dialog open={openCode} handler={handleOpenCode}>
                          <DialogHeader>
                            Code(Only initial 100 chars. displayed)
                          </DialogHeader>
                          <DialogBody>
                            <pre>
                              {code.substr(0, Math.min(100, code.length - 1))}
                            </pre>
                          </DialogBody>
                          <DialogFooter>
                            <Button
                              variant="gradient"
                              color="green"
                              onClick={handleOpenCode}
                            >
                              <span>Okay</span>
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </Typography>
                    </td>
                    {/* <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td> */}
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
