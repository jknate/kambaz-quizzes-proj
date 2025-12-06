"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function QuizzesControls() {
  const { cid } = useParams();
  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <Link href={`/Courses/${cid}/Quizzes/new`}>
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-add-question"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Question
        </Button>
      </Link>
      <InputGroup className="w-25">
        <InputGroup.Text id="wd-search-question">
          <FaSearch />
        </InputGroup.Text>
        <FormControl
          placeholder="Search for Questions"
          aria-label="Search for Questions"
          aria-describedby="wd-search-question"
        />
      </InputGroup>
    </div>
  );
}
