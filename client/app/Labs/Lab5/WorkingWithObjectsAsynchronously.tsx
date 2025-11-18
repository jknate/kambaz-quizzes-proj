"use client";
import React, { useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  const fetchAssignment = async () => {
    try {
      const a = await client.fetchAssignment();
      setAssignment(a);
    } catch (e) {
      // leave assignment as empty object on error
    }
  };

  const updateTitle = async (title: string) => {
    try {
      const updated = await client.updateTitle(title);
      setAssignment(updated);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      <FormControl
        defaultValue={assignment.title}
        className="mb-2 w-75"
        onChange={(e: any) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <FormControl
        as="textarea"
        rows={3}
        defaultValue={assignment.description}
        className="mb-2 w-75"
        onChange={(e: any) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <FormControl
        type="date"
        className="mb-2 w-25"
        defaultValue={assignment.due}
        onChange={(e: any) =>
          setAssignment({ ...assignment, due: e.target.value })
        }
      />
      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          defaultChecked={assignment.completed}
          onChange={(e: any) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>
      <div>
        <button
          className="btn btn-primary me-2"
          onClick={() => updateTitle(assignment.title)}
        >
          Update Title
        </button>
      </div>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
