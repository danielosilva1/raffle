import { Plus, Search } from "lucide-react";
import { NavbarButton } from "./navbar-button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full px-4 py-2 border-b bg-blue-100 flex items-center md:h-14">
      <div
        className="
            flex flex-col space-y-2 mx-auto w-full
            md:max-w-screen-2xl md:flex-row md:justify-between md:items-center md:space-y-0
          "
      >
        <p>Home</p>

        <div
          className="
            flex flex-col space-y-2 justify-end
            md:flex-row md:space-x-6 md:items-center md:space-y-0
          "
        >
          <NavbarButton
            label="Minhas rifas"
            href="/"
            icon={Search}
            className="
              border bg-background shadow-xs
              hover:bg-accent hover:text-accent-foreground
              dark:bg-input/30 dark:border-input dark:hover:bg-input/50
            "
          />

          <NavbarButton
            label="Criar rifa"
            href="/"
            icon={Plus}
            className="bg-green-800 text-white hover:bg-green-800/90           "
          />
        </div>
      </div>
    </nav>
  );
};
