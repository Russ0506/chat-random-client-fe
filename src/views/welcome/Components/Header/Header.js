import React, { useState } from "react";
import Logo from "../svgs/Logo";
import IllustrationMockups from "../svgs/IllustrationMockups";
import { StyledHeader } from "./Header.styled";
import { StyledButton } from "../styled/Button/Button.styled";
import { Box} from "@mui/material";
import { Link } from "react-router-dom";
import WelcomeImg from "../../../../assets/img/wellcome.png"
function Header() {
  return (
    <StyledHeader>
      <nav>
        <Logo />
        <Box component={Link} to="/users/login">
          <StyledButton color={`#111`} bg={"#fff"}>
            Try It Now
          </StyledButton>
        </Box>
      </nav>

      <section className="headerContent">
        <article>
          <h1 style={{ color: "#fff", fontWeight: "bold" }}>
            Stranger Meetup in Cherish chatting
          </h1>
          <p style={{ color: "#fff" }}>
            Huddle re-imagines the way we build communities. You have a voice,
            but so does your audience. Create connections with your users as you
            engage in genuine discussion.
          </p>
          <Box component={Link} to="/users/login">
            <StyledButton>Get Started For Free</StyledButton>
          </Box>
        </article>
        {/* <IllustrationMockups /> */}
        <img src={WelcomeImg} alt="" width={"100%"}></img>
      </section>
    </StyledHeader>
  );
}

export default Header;
