"use client";
import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";

const HTTP_SERVER = "/api/proxy";

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [moduleName, setModuleName] = useState("Intro to Node");
  const [moduleDesc, setModuleDesc] = useState("Basics of Node and Express");

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />
      <h4>Modify Score & Completed</h4>
      <div className="mb-2">
        <FormControl
          id="wd-assignment-score"
          type="number"
          className="w-25 d-inline-block me-2"
          value={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: Number(e.target.value) })
          }
        />
        <a
          id="wd-update-assignment-score"
          className="btn btn-primary me-2"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
        <label className="ms-2">
          <input
            id="wd-assignment-completed"
            type="checkbox"
            className="form-check-input ms-2"
            checked={assignment.completed}
            onChange={(e) =>
              setAssignment({ ...assignment, completed: e.target.checked })
            }
          />
          Completed
        </label>
        <a
          id="wd-update-assignment-completed"
          className="btn btn-secondary ms-2"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>
      <hr />

      <h4>Module Object</h4>
      <a
        id="wd-get-module"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <a
        id="wd-get-module-name"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />
      <h4>Modify Module</h4>
      <FormControl
        id="wd-module-name"
        className="mb-2 w-75"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
      />
      <a
        id="wd-update-module-name"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}/name/${encodeURIComponent(moduleName)}`}
      >
        Update Module Name
      </a>
      <FormControl
        id="wd-module-description"
        className="mb-2 w-75"
        value={moduleDesc}
        onChange={(e) => setModuleDesc(e.target.value)}
      />
      <a
        id="wd-update-module-description"
        className="btn btn-secondary"
        href={`${MODULE_API_URL}/description/${encodeURIComponent(moduleDesc)}`}
      >
        Update Module Description
      </a>
      <hr />
    </div>
  );
}
