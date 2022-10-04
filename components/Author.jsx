import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Author() {
  return (
    <Container maxWidth="md">
      <List
        sx={{
          background: "#F29E12",
          border: "1px solid #E97B0A",
          padding: "13px",
          borderRadius: "16px",
          my: "30px",
        }}
      >
        <ListItem>
          <ListItemIcon>
            <Image
              src="/author.jpg"
              height={35}
              width={35}
              quality={100}
              style={{ borderRadius: "50%" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Mahbub Hasan(Author)"
            secondary="I love to solve problem using technology and share with people."
          ></ListItemText>
        </ListItem>
      </List>
    </Container>
  );
}
