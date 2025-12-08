import { Nav, NavItem } from "react-bootstrap";
import Link from "next/link";
export default function TOC() {
 return (
   <Nav variant="pills">
     <NavItem>
       <Link href="/Labs" className="nav-link">Labs</Link>
     </NavItem>
     <NavItem>
       <Link href="/Labs/Lab1" className="nav-link">Lab 1</Link>
     </NavItem>
     <NavItem>
       <Link href="/Labs/Lab2" className="nav-link">Lab 2</Link>
     </NavItem>
     <NavItem>
       <Link href="/Labs/Lab3" className="nav-link">Lab 3</Link>
     </NavItem>
     <NavItem>
       <Link href="/" className="nav-link">Kambaz</Link>
     </NavItem>
     <NavItem>
       <a href="https://github.com/jannunzi" className="nav-link">My GitHub</a>
     </NavItem>
   </Nav>
);}
