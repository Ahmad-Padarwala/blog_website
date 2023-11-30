import React from "react";
import "../../assets/css/Navbar.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div id='footer_main_section' dir='rtl'>
          <div id='footer_text'>
            <h3>ہماری نیوز لیٹر کو سبسکرائب کریں</h3>
            <p>کی صنعت کی معیاری ڈمی ایک نامعلوم پرنٹر
              قسم کی ایک گیلی لیا اور جب کے بعد سے کبھی متن کیا گیا
              ہے… کی صنعت کی معیاری ڈمی ایک نامعلوم پرنٹر قسم کی
              ایک گیلی لیا اور جب کے بعد سے کبھی متن کیا گیا ہے…
              کی صنعت کی معیاری ڈمی ایک نامعلوم پرنٹر قسم کی
              ایک گیلی لیا اور جب کے بعد سے کبھی متن کیا گیا ہے…
            </p>
            <div id='footer_input' dir="ltr">
              <input type='text' placeholder='Enter Email Address' />
              <button>Subscribe</button>
            </div>
            <p id='footer_link'>2023
              <NavLink
                to="https://valudas.com/"
                target="_blank"
              >
                Valuda's Tech Park
              </NavLink>
              ©
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
