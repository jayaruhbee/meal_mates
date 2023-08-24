import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  UserIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  HomeIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  MoonIcon,
  ScissorsIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
// import { useState } from "react";
import { useContext, useState } from "react";
// import { useOutletContext } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utilities";
import { userContext } from "../App";

/*TODO: USER NAME NOT SHOWING*/

// *DROP DOWN PROFILE MENU ITEMS
const dropDownProfileMenuItems = [
  // {
  //   label: "Users",
  //   icon: UserIcon,
  // },
  {
    label: "Log Out",
    icon: PowerIcon,
  },
];

// *DROP DOWN PROFILE MENU FUNCTIONS(LOGOUT AND USERS)
function DropDownProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);
  const { user, setUser } = useContext(userContext);

  const logOut = async () => {
    let response = await api.post("users/logout/");
    if (response.status === 204) {
      localStorage.removeItem("token");
      setUser(null);
      delete api.defaults.headers.common["Authorization"];
      navigate("/signin");
    }
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <PowerIcon className="w-6 text-silver" />

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1 bg-jet-800">
        {dropDownProfileMenuItems.map(({ label, icon }, key) => {
          // SETTING COLOUR FOR DROPDOWN MENU
          const isLastItem = key === dropDownProfileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={isLastItem ? logOut : closeMenu}
              // onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-blue" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "blue-gray" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
// * NAVBAR ITEMS PALS, MEALS, ETC
const navBarItems = [
  {
    label: "Home",
    icon: HomeIcon,
  },
  {
    label: "Pals",
    icon: UserIcon,
  },
  {
    label: "Meals",
    icon: MoonIcon,
  },
  {
    label: "Create Your Plan",
    icon: ChevronDoubleUpIcon,
  },
];

// *FUNCTION TO ROUTE NAVBAR ITEMS TO DIFFERENT PAGES
function whichPage(label) {
  switch (label) {
    case "Pals":
      return "/all_users";
    case "Meals":
      return "/mealCreation";
    case "Home":
      return "/home";
    // HOME IS MEAL PLANS RN
    case "Create Your Plan":
      return "/setmealplan";
    // default:
    //   return "#"; // Default link
  }
}
// *FUNCTION FOR NAVBAR ITEMS
function NavBar() {
  return (
    <ul className="mb-1 mt-2 pt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {/* <NavBarMenu /> */}
      {navBarItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="div"
          variant="small"
          className="font-normal text-silver text-lg underline "
        >
          {/* USE LINK INSTEAD OF ANCHOR TAGS */}
          <Link to={whichPage(label)}>
            <MenuItem className="flex items-center px-2 gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[30px] w-[30px]" })}
              {label}
            </MenuItem>
          </Link>
        </Typography>
      ))}
    </ul>
  );
}

export default function NavbarDefault() {
  const { user, setUser } = useContext(userContext);


  useEffect(() => {
    console.log("useEffect user",user)
  },[user])


  // ONLY SHOW NAVBAR TO AUTH USERS
  if (!user) {
    return null;
  }
  return (
    <Navbar className="crimson_font p-2 lg:pl-6 bg-gray-900 rounded-sm">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <div className="relative flex w-full gap-2 md:w-max text-silver-600 text-2xl pr-5">{user? `Welcome ${user.first_name}!` : "Welcome" }</div>

        <div className="relative flex w-full gap-2 md:w-max">
          {/* <Input
              placeholder="Find a meal here.."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px] text-black",
              }}
              /> */}
        </div>
        <div className="flex flex-row  lg:block">
          <NavBar />
        </div>

        <DropDownProfileMenu />
      </div>
    </Navbar>
  );
}
