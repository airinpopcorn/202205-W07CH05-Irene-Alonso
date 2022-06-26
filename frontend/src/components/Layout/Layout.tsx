import { ReactNode } from "react";
import { aMenuItems } from "../../interfaces/menu-items";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export function Layout({
  children,
  options,
}: {
  children: ReactNode;
  options: aMenuItems;
}) {
  return (
    <>
      <Header options={options}></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}
