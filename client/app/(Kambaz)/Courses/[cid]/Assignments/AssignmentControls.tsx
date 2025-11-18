"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function AssignmentControls() {
  const { cid } = useParams();
  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <Link href={`/Courses/${cid}/Assignments/new`}>
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-add-assignment"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
      </Link>
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment-group"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
      <InputGroup className="w-25">
        <InputGroup.Text id="wd-search-assignment">
          <FaSearch />
        </InputGroup.Text>
        <FormControl
          placeholder="Search for Assignments"
          aria-label="Search for Assignments"
          aria-describedby="wd-search-assignment"
        />
      </InputGroup>
    </div>
  );
}
