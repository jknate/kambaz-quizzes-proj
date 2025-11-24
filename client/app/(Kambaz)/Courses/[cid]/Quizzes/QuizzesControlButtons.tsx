import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

export default function QuizzesControlButtons({
  quizId,
  deleteQuiz,
}: {
  quizId?: string;
  deleteQuiz?: (quizId: string) => void;
}) {
  return (
    <div className="float-end">
      {deleteQuiz && quizId && (
        <FaTrash
          className="text-danger me-2 mb-1"
          onClick={() => deleteQuiz(quizId)}
        />
      )}
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
