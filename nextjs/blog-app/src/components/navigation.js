"use client";

import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathName = usePathname();

  return (
    <AppBar position="static" sx={{ backgroundColor: blue[500] }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image src="vercel.svg" height={20} width={20} alt="" />
          <Button
            component={Link}
            href="/"
            color={pathName === "/" ? "error" : "inherit"}
          >
            Home
          </Button>
          <Button
            component={Link}
            href="/blogs"
            color={pathName === "/blogs" ? "error" : "inherit"}
          >
            Blogs
          </Button>
          <Button
            component={Link}
            href="/users"
            color={pathName === "/users" ? "error" : "inherit"}
          >
            Users
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
