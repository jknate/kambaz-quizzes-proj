import Link from "next/link";
export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <h3>Nathaniel Kilonzo</h3>
      <h3>Section: CS4550.11597.202610</h3>
      <Link href="https://github.com/jknate/kambaz-next-js" id="wd-github">
        https://github.com/jknate/kambaz-next-js
      </Link>
      <br />
      <Link href="https://github.com/jknate/kambaz-node-server-app" id="wd-backend-server">
        https://github.com/jknate/kambaz-node-server-app
      </Link>
      <br />
      <Link href="https://kambaz-node-server-app-ttnj.onrender.com/" id="wd-live-server">
        https://kambaz-node-server-app-ttnj.onrender.com/
      </Link>
      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab4-link">
            Lab 4: React State and Props
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab5" id="wd-lab5-link">
            Lab 5: Node.js and HTTP Client
          </Link>
        </li>
      </ul>
    </div>
  );
}
