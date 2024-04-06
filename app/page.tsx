"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Progress, Skeleton } from "antd";
import { EditFilled } from "@ant-design/icons";

interface Assignment {
  title: string;
  status: string;
  duration_in_seconds: number;
  link: string;
}

interface Submission {
  id: number;
  full_name: string;
  email: string;
  score: number;
}

interface Score {
  score_type: string;
  user_score: number;
  max_score: number;
}

interface AssignmentScore {
  full_name: string;
  email: string;
  score: number;
  about_me: string;
  experience: string;
  hobbies: string;
  introduction: string;
  scores: Score[];
}

async function getAssignmentScoreById(id: number): Promise<AssignmentScore> {
  const res = await fetch(
    `https://qyzlgjq37b.execute-api.ap-south-1.amazonaws.com/dev/candidate_assignment_data?user_id=${id}&assignment_id=assignment123`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Assignment Score");
  }

  return res.json();
}

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [assignmentDetails, setAssignmentDetails] = useState<Assignment | null>(
    null
  );
  const [assignmentSubmissions, setAssignmentSubmissions] = useState<
    Submission[] | null
  >(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [assignmentScore, setAssignmentScore] =
    useState<AssignmentScore | null>(null);
  const assignmentDuration: number = assignmentDetails
    ? assignmentDetails.duration_in_seconds / 60 / 60
    : 0;

  useEffect(() => {
    const getAssignmentDetails = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response1 = await fetch(
          "https://qyzlgjq37b.execute-api.ap-south-1.amazonaws.com/dev/assignment_details"
        );
        const response2 = await fetch(
          `https://qyzlgjq37b.execute-api.ap-south-1.amazonaws.com/dev/assignment_candidates?status=review&limit=10&offset=0`
        );
        const response3 = await fetch(
          `https://qyzlgjq37b.execute-api.ap-south-1.amazonaws.com/dev/candidate_assignment_data?user_id=1&assignment_id=assignment123`
        );

        if (!response1.ok) {
          throw new Error("Failed to fetch assignmentDetails");
        }
        if (!response2.ok) {
          throw new Error("Failed to fetch assignmentDetails");
        }
        if (!response3.ok) {
          throw new Error("Failed to fetch assignmentScores");
        }
        const result1: Assignment = await response1.json();
        const result2: Submission[] = await response2.json();
        const result3: AssignmentScore = await response3.json();
        setAssignmentDetails(result1);
        setSelectedUser(1);
        setAssignmentScore(result3);
        setAssignmentSubmissions(result2);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAssignmentDetails();
  }, []);

  const handleClick = async (id: number): Promise<void> => {
    setSelectedUser(id);
    try {
      const scoreData: AssignmentScore = await getAssignmentScoreById(id);
      console.warn(scoreData);
      setAssignmentScore(scoreData);
    } catch (error) {
      console.error("Error fetching assignment score:", error);
    }
  };

  return (
    <main className="space-y-5 w-full px-5">
      <div className="w-full">
        <Breadcrumb
          style={{ display: "flex" }}
          items={[
            {
              title: "Page",
            },
            {
              title: (
                <a href="" style={{ color: "black" }}>
                  Assignment
                </a>
              ),
            },
          ]}
        />
        <span className="font-semibold text-sm">
          {isLoading ? (
            <Skeleton.Input active={isLoading} size="small" />
          ) : (
            assignmentDetails?.title
          )}
        </span>
      </div>

      <div className="flex w-full gap-5">
        <div className="w-[30%] h-fit rounded-xl bg-white py-5">
          <div className="flex items-center justify-between px-5">
            <h4 className="font-semibold">
              {isLoading ? (
                <Skeleton.Input active={isLoading} size="small" />
              ) : (
                assignmentDetails?.title
              )}
            </h4>
            <div className="flex items-center gap-1">
              <span
                className={`font-semibold ${
                  assignmentDetails?.status == "Active"
                    ? "text-[#22B274]"
                    : "text-red-500"
                }`}
              >
                {isLoading ? (
                  <Skeleton.Input active={isLoading} size="small" />
                ) : (
                  assignmentDetails?.status
                )}
              </span>
              <Button
                type="primary"
                shape="round"
                style={{
                  background: "#fff",
                  height: "20px",
                  width: "20px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                icon={
                  <EditFilled style={{ color: "black", fontSize: "10px" }} />
                }
                size={"small"}
              />
            </div>
          </div>
          <div className="mt-4 space-y-1 px-5">
            <div className="flex justify-between text-xs font-semibold text-gray-400">
              <p>Assignment Link</p>
              <p className="text-blue-500">
                {isLoading ? (
                  <Skeleton.Input active={isLoading} size="small" />
                ) : (
                  assignmentDetails?.link
                )}
              </p>
            </div>
            <div className="flex justify-between text-xs font-semibold text-gray-400">
              <p>Assignment Hour</p>
              <p>
                {isLoading ? (
                  <Skeleton.Input active={isLoading} size="small" />
                ) : (
                  `${assignmentDuration} hours`
                )}
              </p>
            </div>
            <div className="flex justify-between text-xs font-semibold text-gray-400">
              <p>Assignment End at</p>
              <p>11 March 2024</p>
            </div>
          </div>

          <div className="space-x-3 mt-10 px-5">
            <Button
              type="primary"
              shape="round"
              style={{
                background: "#fff",
                color: "#4a4a4a",
                fontSize: "10px",
                fontWeight: "700",
                height: "30px",
                width: "100px",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                textTransform: "uppercase",
              }}
              size={"small"}
            >
              To Review
            </Button>
            <Button
              type="primary"
              shape="round"
              style={{
                background: "#fff",
                color: "#4a4a4a",
                fontSize: "10px",
                fontWeight: "700",
                height: "30px",
                width: "100px",
                borderRadius: "10px",
                boxShadow: "none",
                textTransform: "uppercase",
              }}
              size={"small"}
            >
              Shortlisted
            </Button>
          </div>

          <table className="mt-2 w-full">
            <thead>
              <tr className="uppercase text-gray-400 text-[10px] ">
                <th className="text-start pl-5 py-2">Candidate</th>
                <th className="text-start">Score</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <>
                  <Skeleton.Input
                    active={isLoading}
                    size="small"
                    block={true}
                  />
                  <Skeleton.Input
                    active={isLoading}
                    size="small"
                    block={true}
                  />
                  <Skeleton.Input
                    active={isLoading}
                    size="small"
                    block={true}
                  />
                  <Skeleton.Input
                    active={isLoading}
                    size="small"
                    block={true}
                  />
                  <Skeleton.Input
                    active={isLoading}
                    size="small"
                    block={true}
                  />
                </>
              ) : (
                assignmentSubmissions?.map((submission) => (
                  <tr
                    key={submission.id}
                    onClick={() => handleClick(submission.id)}
                    className={`cursor-pointer ${
                      selectedUser == submission.id &&
                      assignmentScore?.id == submission.id
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    <td className="pl-5 flex items-center gap-1 py-2">
                      <div className="bg-gray-400 rounded-lg w-[30px] h-[30px] overflow-hidden">
                        <Image
                          src="https://b1688923.smushcdn.com/1688923/wp-content/uploads/2022/05/Melbourne-Corporate-Headshots-Julia-Nance-Portraits1.jpg?lossy=2&strip=1&webp=1"
                          alt="Saurav Singh"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="text-xs leading-none ">
                        <h4 className="font-semibold">
                          {submission?.full_name}
                        </h4>
                        <p className="text-gray-500">{submission?.email}</p>
                      </div>
                    </td>
                    <td
                      className={`text-sm font-semibold  py-2 ${
                        submission?.score > 75
                          ? "text-green-600"
                          : submission?.score > 50
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {submission?.score}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className=" w-2/3 h-fit rounded-xl bg-white flex p-2">
          <div className="w-1/2 p-3 space-y-5">
            <div className="flex items-center w-full justify-between">
              <div className="flex iftems-center gap-3 ">
                <div className="bg-gray-400 rounded-lg w-[60px] h-[60px] overflow-hidden">
                  <Image
                    src="https://b1688923.smushcdn.com/1688923/wp-content/uploads/2022/05/Melbourne-Corporate-Headshots-Julia-Nance-Portraits1.jpg?lossy=2&strip=1&webp=1"
                    alt="Saurav Singh"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="text-xs leading-none flex flex-col justify-center ">
                  <h4 className="font-semibold">
                    {isLoading ? (
                      <Skeleton.Input active={isLoading} size="small" />
                    ) : (
                      assignmentScore?.full_name
                    )}
                  </h4>
                  <p className="text-gray-500">
                    {isLoading ? (
                      <Skeleton.Input active={isLoading} size="small" />
                    ) : (
                      assignmentScore?.email
                    )}
                  </p>
                </div>
              </div>

              <span
                className={`text-xl font-semibold text-green-600 py-2 ${
                  assignmentScore?.score > 70
                    ? "text-green-500"
                    : assignmentScore?.score > 40
                    ? "text-[#EAB308]"
                    : "text-red-500"
                }`}
              >
                {isLoading ? (
                  <Skeleton.Input active={isLoading} size="small" />
                ) : (
                  `${assignmentScore?.score}%`
                )}
              </span>
            </div>

            <table className="w-full">
              <tbody>
                {isLoading ? (
                  <>
                    <tr>
                      <td>
                        <Skeleton.Input
                          active={isLoading}
                          size="small"
                          block={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Skeleton.Input
                          active={isLoading}
                          size="small"
                          block={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Skeleton.Input
                          active={isLoading}
                          size="small"
                          block={true}
                        />
                      </td>
                    </tr>
                  </>
                ) : (
                  assignmentScore?.scores.map((score, id) => {
                    const scorePercentage: number =
                      (score.user_score / score.max_score) * 100;
                    return (
                      <tr key={id}>
                        <td className="text-xs w-[50%]  text-gray-500 font-semibold">
                          {score.score_type}
                        </td>
                        <td className=" flex items-center gap-2">
                          <Progress
                            percent={scorePercentage}
                            showInfo={false}
                            strokeColor={
                              scorePercentage > 70
                                ? "green"
                                : scorePercentage > 40
                                ? "#EAB308"
                                : "red"
                            }
                          />
                          <span
                            className={`text-[10px] font-semibold tracking-widest ${
                              score.user_score > 7
                                ? "text-green-500"
                                : scorePercentage > 4
                                ? "text-[#EAB308]"
                                : "text-red-500"
                            }`}
                          >
                            {score.user_score}/{score.max_score}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">About</h3>
              <p className="text-[10px] text-gray-500">
                {isLoading ? (
                  <Skeleton.Input active={isLoading} size="small" />
                ) : (
                  `${assignmentScore?.about_me}`
                )}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Experience
              </h3>
              <p className="text-[10px] text-gray-500">
                {isLoading ? (
                  <Skeleton.Input active={isLoading} size="small" />
                ) : (
                  `${assignmentScore?.experience}`
                )}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Hobbies</h3>
              <p className="text-[10px] text-gray-500">
                {isLoading ? (
                  <Skeleton.Input active={isLoading} size="small" />
                ) : (
                  `${assignmentScore?.hobbies}`
                )}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Introduction
              </h3>
              <p className="text-[10px] text-gray-500">
                {isLoading ? (
                  <Skeleton.Input active={isLoading} size="small" />
                ) : (
                  `${assignmentScore?.introduction}`
                )}
              </p>
            </div>
            <div className="w-full text-center p-3">
              <Button
                type="primary"
                shape="round"
                style={{
                  background: "#5BD1C6",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  height: "30px",
                  width: "80%",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  textTransform: "uppercase",
                }}
                size={"small"}
              >
                To Review
              </Button>
            </div>
          </div>

          <div className="w-1/2 bg-gray-100 rounded-xl"></div>
        </div>
      </div>
    </main>
  );
};
export default Home;
