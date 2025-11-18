import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId?: string;
  deleteAssignment?: (assignmentId: string) => void;
}) {
  return (
    <div className="float-end">
      {deleteAssignment && assignmentId && (
        <FaTrash
          className="text-danger me-2 mb-1"
          onClick={() => deleteAssignment(assignmentId)}
        />
      )}
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
