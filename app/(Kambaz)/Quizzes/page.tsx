import Link from "next/link";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { FaBook } from "react-icons/fa6";
import QuizzesControls from "./QuizzesControls";
import { BsGripVertical } from "react-icons/bs";
import QuizzesControlButtons from "./QuizzesControlButtons";
export default function Assignments() {
  return (
    <><div>
      <QuizzesControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray"></ListGroupItem>
      </ListGroup>
    </div><ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <ListGroup className="wd-assignments-list rounded-0">
            <ListGroupItem className="wd-assignment-list-item ps-3 p-2">
              <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link p-3">
              <FaBook className="me-2 fs-3" />
                <BsGripVertical className="me-2 fs-3" /> HTML QUIZ <QuizzesControlButtons />
              </Link>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment-list-item">
              Multiple Modules | Not Available Until 09/12/2025 | Due: 09/21/2025 at 11:59pm | 100 pts
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
      <ListGroup id="wd-assignment-list">
        <ListGroupItem className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/1234" className="wd-assignment-link">
          <FaBook className="me-2 fs-3" />
            CSS + BOOTSTRAP QUIZ <QuizzesControlButtons />
          </Link>
        </ListGroupItem>
        <ListGroupItem className="wd-assignment-list-item">
          Multiple Modules | Not Available Until 09/27/2025 | Due: 10/05/2025 at 11:59pm | 100 pts
        </ListGroupItem>
      </ListGroup><ListGroup id="wd-assignment-list">
        <ListGroupItem className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/12345" className="wd-assignment-link">
          <FaBook className="me-2 fs-3" />
            JAVASCRIPT + REACT QUIZ <QuizzesControlButtons />
          </Link>
        </ListGroupItem>
        <ListGroupItem className="wd-assignment-list-item">
          Multiple Modules | Not Available Until 09/11/2025 | Due: 09/17/2025 at 11:59pm | 100 pts
        </ListGroupItem>
      </ListGroup></>
  );
}