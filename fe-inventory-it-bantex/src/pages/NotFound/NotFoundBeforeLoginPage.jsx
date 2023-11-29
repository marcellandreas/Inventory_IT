// not found in dashboard after login

import { useEffect } from "react";
import { MainLayout } from "../../components/templates";

const NotFoundBeforeLoginPage = () => {
  useEffect(() => {
    const randomNum = () => Math.floor(Math.random() * 9) + 1;
    let loop1,
      loop2,
      loop3,
      time = 30,
      i = 0;

    const selector3 = document.querySelector(".thirdDigit");
    const selector2 = document.querySelector(".secondDigit");
    const selector1 = document.querySelector(".firstDigit");

    loop3 = setInterval(() => {
      if (i > 40) {
        clearInterval(loop3);
        selector3.textContent = 4;
      } else {
        selector3.textContent = randomNum();
        i++;
      }
    }, time);

    loop2 = setInterval(() => {
      if (i > 80) {
        clearInterval(loop2);
        selector2.textContent = 0;
      } else {
        selector2.textContent = randomNum();
        i++;
      }
    }, time);

    loop1 = setInterval(() => {
      if (i > 100) {
        clearInterval(loop1);
        selector1.textContent = 1;
      } else {
        selector1.textContent = randomNum();
        i++;
      }
    }, time);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(loop1);
      clearInterval(loop2);
      clearInterval(loop3);
    };
  }, []);
  return (
    <MainLayout>
      <section className="flex justify-center items-center h-full w-full">
        <div className="error">
          <div className="container-floud">
            <div className="col-xs-12 ground-color text-center">
              <div className="container-error-404">
                <div className="clip">
                  <div className="shadow">
                    <span className="digit thirdDigit"></span>
                  </div>
                </div>
                <div className="clip">
                  <div className="shadow">
                    <span className="digit secondDigit"></span>
                  </div>
                </div>
                <div className="clip">
                  <div className="shadow">
                    <span className="digit firstDigit"></span>
                  </div>
                </div>
                <div className="msg">
                  OH!<span className="triangle"></span>
                </div>
              </div>
              <h2 className="h1">Maaf! Kamu tidak memiliki Akses</h2>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default NotFoundBeforeLoginPage;
