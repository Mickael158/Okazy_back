import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();
  
  return (
    <div
      className={clsx(sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {t("Annonce")}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="mega-menu mega-menu-padding">
              <li>
                <ul>
                  <li >
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                      {t("Tous")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      {t("Favoris")}
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li >
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      {t("Historique de vos annonces")}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
