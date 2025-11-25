"use client";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";
import { redirect } from "next/navigation";
export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordVerify: "",
    role: "STUDENT",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleSignup = () => {
    if (!form.username || !form.password || !form.passwordVerify) {
      setError("All fields required");
      return;
    }
    if (form.password !== form.passwordVerify) {
      setError("Passwords do not match");
      return;
    }
    if (db.users.find((u) => u.username === form.username)) {
      setError("Username already exists");
      return;
    }
    // Only required fields: username, password, role
    const newUser = {
      _id: Math.random().toString(36).slice(2),
      username: form.username,
      password: form.password,
      role: form.role,
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      loginId: "",
      section: "",
      lastActivity: new Date().toISOString().slice(0, 10),
      totalActivity: "00:00:00",
    };
    db.users.push(newUser);
    dispatch(setCurrentUser(newUser));
    redirect("/Account/Profile");
  };
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <FormControl
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        className="mb-2"
        value={form.passwordVerify}
        onChange={(e) => setForm({ ...form, passwordVerify: e.target.value })}
      />
      <div className="mb-2">
        <label htmlFor="wd-role" className="form-label">
          Role
        </label>
        <select
          id="wd-role"
          className="form-select"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
        </select>
      </div>
      {error && <div className="text-danger mb-2">{error}</div>}
      <Button
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2"
        onClick={handleSignup}
      >
        Sign up
      </Button>
      <Link id="wd-signin-link" href="/Account/Signin">
        Sign in
      </Link>
    </div>
  );
}
