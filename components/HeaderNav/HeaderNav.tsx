import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Navbar>
      <NavbarBrand>

      <p className="font-bold text-inherit text-3xl bg-gradient-to-r from-danger to-primary bg-clip-text text-transparent">Libby+</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-9" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" color="foreground" aria-current="page">
            Get started
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">About us</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Github
          </Button>
        </NavbarItem>
      </NavbarContent>

      
    </Navbar>
  );
}
