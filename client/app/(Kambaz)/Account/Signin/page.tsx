/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        defaultValue={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        defaultValue={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>
      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>

      <hr className="my-4" />

      <div className="mt-4">
        <h5 className="mb-3">About This Project</h5>
        <h4 className="fw-semibold mb-3">Section: CS4550.11597.202610</h4>
        <div className="mb-2">
          <strong>GitHub Repository (Client and Server):</strong>{" "}
          <a
            href="https://github.com/jknate/kambaz-quizzes-proj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            https://github.com/jknate/kambaz-quizzes-proj
          </a>
        </div>
        <div>
          <strong>Team Members:</strong>
          <ul className="mt-2">
            <li>Kelsey Wandera</li>
            <li>Seamus Mufarinya</li>
            <li>Nathaniel Kilonzo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
