import { Container } from "@mui/material"
import React from "react"
import Logo from "../assets/logo cut.svg"
import "./footer.css"

function Footer() {
  return (
    <div className="footer">
      <Container>
        <div className="footer__container _container">
          <div className="footer__logo">
            <img src={Logo} alt="" />
          </div>
          <ul className="footer__menu">
            <li className="footer__menu-list">
              <a href="#" className="footer__menu-link">
                Achievements
              </a>
            </li>
            <li className="footer__menu-list">
              <a href="#" className="footer__menu-link">
                Best works
              </a>
            </li>
            <li className="footer__menu-list">
              <a href="#" className="footer__menu-link">
                Upload
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  )
}

export default Footer
