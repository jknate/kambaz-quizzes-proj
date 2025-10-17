import { Button, FormControl } from "react-bootstrap";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import InputGroup from 'react-bootstrap/InputGroup';
import InputGroupText from "react-bootstrap/esm/InputGroupText";
export default function QuizzesControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Quiz
     </Button>
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Group
     </Button>
      <InputGroup className="mb-3">
                 <InputGroupText><FaMagnifyingGlass /></InputGroupText>
                 <FormControl placeholder="Search for  Quizzes" />
             </InputGroup>
   </div>
);
  }