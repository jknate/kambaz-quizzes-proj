import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
export default function QuizzesControlSection() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-module-btn">
      40% total
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
     </Button>
   </div>
 );
}