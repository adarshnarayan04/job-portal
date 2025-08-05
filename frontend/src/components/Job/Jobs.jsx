import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); // ✅ Get ?category= from URL

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://job-portal-qvey.onrender.com/api/v1/job/getall",
          {
            withCredentials: true,
            params: category ? { category } : {}, // ✅ Pass category if present
          }
        );
        setJobs(response.data.jobs); // ✅ Fix: access jobs directly
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [category]); // ✅ Refetch jobs if category changes

  return (
    <section className="jobs page">
      <div className="container">
        <h1>
          {category
            ? `Jobs in "${
                category.charAt(0).toUpperCase() + category.slice(1)
              }"`
            : "ALL AVAILABLE JOBS"}
        </h1>
        <div className="banner">
          {jobs.length > 0 ? (
            jobs.map((element) => (
              <div className="card" key={element._id}>
                <p>
                  <strong>Title:</strong> {element.title}
                </p>
                <p>
                  <strong>Category:</strong> {element.category}
                </p>
                <p>
                  <strong>Country:</strong> {element.country}
                </p>
                <Link to={`/job/${element._id}`}>View Job Details</Link>
              </div>
            ))
          ) : (
            <p>No jobs found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
