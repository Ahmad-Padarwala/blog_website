import React from "react";
import "../../assets/css/Navbar.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div id="footer_main_section" dir="rtl">
          <div id="footer_text">
            <h3>ہماری نیوز لیٹر کو سبسکرائب کریں</h3>
            <p>
              اقرا علم کے ساتھ علمی سفر کا آغاز کریں۔ ہماری تازہ ترین بلاگ
              پوسٹس، بصیرت انگیز مضامین، اور دلکش کتاب کی سفارشات کے بارے میں
              آگاہ رہیں۔ مزیدار تجربے کے لیے ابھی سبسکرائب کریں اور اپنی انگلیوں
              پر علم کی دنیا دریافت کریں!
            </p>
            <div id="footer_input" dir="ltr">
              <input type="text" placeholder="Enter Email Address" />
              <button>Subscribe</button>
            </div>
            <p id="footer_link">
              2023
              <NavLink to="https://valudas.com/" target="_blank">
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
