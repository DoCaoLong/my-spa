/* eslint-disable jsx-a11y/anchor-is-valid */
import {upArrow} from "../../constants/imageList";
import scrollTop from "../../utils/scrollTop";
export default function BackToTop(){
    window.addEventListener("scroll", function () {
        const scrolled = window.scrollY;
        const backToTop = document.querySelector("#back-to-top");
      
        const windowPosition = scrolled > 50;
        if (backToTop) {
          backToTop.classList.toggle("active", windowPosition);
        }
      });
      return (
          <a href="#" id="back-to-top" onClick={()=>{scrollTop()}}>
            <img src={upArrow} alt="icon"/>
            <div className="blur"></div>
          </a>
      )
}
