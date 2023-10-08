import React, { useEffect, useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useMediaQuery } from "react-responsive";
function Sidebar() {
  let isTab = useMediaQuery({ query: "(max-width:768px)" });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);
  const sidebar_animation = isTab
    ? {
        //mobile view
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 30,
          },
        },
        close: {
          x: -250,
          width: 0,
          transition: {
            damping: 30,
            delay: 0.15,
          },
        },
      }
    : {
        // system view
        open: {
          width: "16rem",
          transition: {
            damping: 30,
          },
        },
        close: {
          width: "4rem",
          transition: {
            damping: 30,
          },
        },
      };

  useEffect(() => {
    if (isTab) {
      // mobile view
      setIsOpen(false);
    } else {
      //system view
      setIsOpen(true);
    }
  }, [isTab]);
  const logo_variant = {
    open: {
      fontSize: "2.25rem",
      lineHeight: "2.5rem",
    },
    close: {
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
    },
  };
  const item_variant = {
    open: {},
    close: {
      display: "none",
      transition: {
        damping: 30,
      },
    },
  };
  return (
    <div>
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 max-h-full z-[998] bg-black/50 ${
          isOpen ? "block" : "hidden"
        }`}
      ></div>
      <div
        variants={sidebar_animation}
        animate={isOpen ? "open" : "close"}
        className="bg-white text-gray shadow-xl z-[999] w-[16rem] max-w-[16rem] h-full overflow-hidden md:relative fixed"
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="absolute w-fit z-50 right-4 top-5 cursor-pointer md:block hidden"
        >
          <MenuRoundedIcon />
        </div>
        <div
          variants={logo_variant}
          className="text-4xl whitespace-wrap text-center font-bold py-9 my-5 text-blue-950"
        >
          Notes App
        </div>
        <div className="flex flex-col h-screen">
          <ul className="h-full">
            <li className="link active ">
              <DescriptionOutlinedIcon />
              <div variants={item_variant}>Notes</div>
            </li>
          </ul>
        </div>
      </div>

      <div className="m-3 md:hidden" onClick={() => setIsOpen(true)}>
        <MenuRoundedIcon />
      </div>
    </div>
  );
}
export default Sidebar;
