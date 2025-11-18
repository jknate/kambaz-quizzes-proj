"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const params = useParams();
  const cid = params.cid;
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = link === "Modules" ? "CourseModules" : link;
        const fullPath =
          link === "People"
            ? `/Courses/${cid}/${path}/Table`
            : `/Courses/${cid}/${path}`;
        const isActive = pathname.includes(`/${path}`);

        return (
          <Link
            key={link}
            href={fullPath}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
