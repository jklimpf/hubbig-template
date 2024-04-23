"use client";
import { useState } from "react";
import styles from "./SidebarNav.module.scss";
import { usePathname, useRouter } from "next/navigation";
import {
  faIdCard,
  faClipboardList,
  faBuilding,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonMain from "../Buttons/ButtonMain";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { publicPages } from "@/src/middleware";
import Logo from "@/src/assets/images/hubbig_logo.svg";

enum NavItemCategory {
  DRIVERS = "drivers",
  ORDERS = "orders",
  OFFERS = "offers",
  CLIENT = "client",
}

const navItems = [
  {
    name: "Drivers",
    link: "/drivers",
    category: NavItemCategory.DRIVERS,
    icon: <FontAwesomeIcon icon={faIdCard} />,
    subItems: [
      {
        name: "list",
        link: "/drivers/list",
        type: "button",
      },
      {
        name: "Add new driver",
        link: "/drivers/add",
      },
    ],
  },
  {
    name: "Orders/Offers",
    link: "/orders",
    category: NavItemCategory.ORDERS,
    icon: <FontAwesomeIcon icon={faClipboardList} />,
    subItems: [
      {
        name: "Orders",
        link: "/orders",
      },
      {
        name: "Offers",
        link: "/offers",
      },
      {
        name: "New offer",
        link: "/offers/new",
      },
    ],
  },
  {
    name: "Client",
    link: "/client",
    category: NavItemCategory.CLIENT,
    icon: <FontAwesomeIcon icon={faBuilding} />,
    subItems: [
      {
        name: "List",
        link: "/client/list",
      },
      {
        name: "Add new client",
        link: "/client/add",
      },
    ],
  },
];

export default function SidebarNav() {
  console.log(Logo);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<NavItemCategory[]>([]);
  const pathname = usePathname();

  const router = useRouter();
  const t = useTranslations();

  if (publicPages.includes(pathname)) return null;

  if (!isOpen)
    return (
      <div>
        <ButtonMain label="Open" onClick={() => setIsOpen(true)} />
      </div>
    );

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div></div>
        <div
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Close
        </div>
      </div>
      <nav className={styles.navigation}>
        <ul>
          {navItems.map((item, index) => {
            return (
              <li key={item.category} className={styles.navItem}>
                <div
                  className={styles.category}
                  onClick={() => {
                    if (selectedItem.includes(item.category)) {
                      setSelectedItem(
                        selectedItem.filter(
                          (category) => category !== item.category
                        )
                      );
                      return;
                    }
                    setSelectedItem([...selectedItem, item.category]);
                  }}
                >
                  <div className={styles.icon}>{item.icon}</div>
                  <div className={styles.categoryName}>{item.name}</div>
                  <div className={styles.arrow}>
                    {selectedItem.includes(item.category) ? (
                      <FontAwesomeIcon icon={faChevronDown} width="12px" />
                    ) : (
                      <FontAwesomeIcon icon={faChevronRight} width="7px" />
                    )}
                  </div>
                </div>
                {selectedItem.includes(item.category) && (
                  <ul className={styles.subItemsList}>
                    {item.subItems.map((subItem, index) => {
                      if (subItem.type === "button")
                        return (
                          <li key={subItem.name}>
                            <ButtonMain
                              label={"list"}
                              onClick={() => router.push(subItem.link)}
                              className={styles.subItemButton}
                            />
                          </li>
                        );
                      return (
                        <li key={subItem.name} className={styles.subItem}>
                          <Link
                            href={subItem.link}
                            className={
                              pathname === subItem.link ? styles.active : ""
                            }
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <ButtonMain
          label={t("logout")}
          onClick={() => signOut({ redirect: true, callbackUrl: `/login` })}
        />
      </nav>
    </div>
  );
}
