import React from "react";
import { NavLink } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div id="pillers_main_sections">
        <NavLink to="/news" id="pillers_sections">
          <div id="four-piller-outside">
            <div id="four-piller-img">
              <img
                src={require("../../assets/image/piller.png")}
                alt="islamic-salah"
                width="25%"
              ></img>
            </div>
          </div>
          <div id="four-piller-text">
            <p className="four-piller-names">اسلامی مضامین</p>
            <p className="four-piller-discription">
              اسلامی مضامین اسلام کے ستونوں، قرآنی تعلیمات، تاریخی حکایات، اور
              عصری مسائل کے بارے میں بصیرت انگیز نقطہ نظر فراہم کرتے ہیں۔
            </p>
          </div>
        </NavLink>
        <NavLink to="/books" id="pillers_sections">
          <div id="four-piller-outside">
            <div id="four-piller-img">
              <img
                src={require("../../assets/image/piller.png")}
                alt="islamic-salah"
                width="25%"
              ></img>
            </div>
          </div>
          <div id="four-piller-text">
            <p className="four-piller-names">اسلامی کتابیں</p>
            <p className="four-piller-discription">
              اسلامی کتابیں اسلام کے متنوع پہلوؤں کی گہرائی سے تحقیق کرتی ہیں،
              جو مومنین اور متلاشیوں کے لیے یکساں علم اور رہنمائی کا ذریعہ بنتی
              ہیں۔
            </p>
          </div>
        </NavLink>
        <div id="pillers_sections">
          <div id="four-piller-outside">
            <div id="four-piller-img">
              <img
                src={require("../../assets/image/piller.png")}
                alt="islamic-salah"
                width="25%"
              ></img>
            </div>
          </div>
          <div id="four-piller-text">
            <p className="four-piller-names">اسلامی نام</p>
            <p className="four-piller-discription">
              اسلامی نام، جو لسانی اور ثقافتی اہمیت سے جڑے ہوئے ہیں، معانی اور
              ورثے کی ایک بھرپور ٹیپسٹری کی عکاسی کرتے ہیں۔
            </p>
          </div>
        </div>
        <NavLink to="/warriors" id="pillers_sections">
          <div id="four-piller-outside">
            <div id="four-piller-img">
              <img
                src={require("../../assets/image/piller.png")}
                alt="islamic-salah"
                width="25%"
              ></img>
            </div>
          </div>
          <div id="four-piller-text">
            <p className="four-piller-names">اسلامی جنگجو</p>
            <p className="four-piller-discription">
              اسلامی جنگجو عدل اور ایمان کے غیر متزلزل دفاع میں اسلام کے اصولوں
              سے متاثر ہوکر جرات اور عزم کی مثال دیتے ہیں۔
            </p>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default Categories;
