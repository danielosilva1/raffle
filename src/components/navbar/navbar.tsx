import {
  HandHeart,
  HeartHandshake,
  Home,
  LogIn,
  Plus,
  Search,
} from "lucide-react";
import { NavbarButton } from "./navbar-button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { CustomTooltip } from "@/components/custom-tooltip";

export const Navbar = () => {
  return (
    <nav className="w-full px-4 py-2 border-b bg-blue-100 flex items-center md:h-14">
      <div
        className="
            flex flex-col space-y-2 mx-auto w-full
            md:max-w-screen-2xl md:flex-row md:justify-between md:items-center md:space-y-0
          "
      >
        <NavbarButton
          href="/"
          icon={Home}
          className="bg-blue-800 text-white hover:bg-blue-800/90           "
        />

        <div
          className="
            flex flex-col space-y-2 justify-end
            md:flex-row md:space-x-6 md:items-center md:space-y-0
          "
        >
          <CustomTooltip content="Veja as campanhas que você apoia">
            <NavbarButton
              label="Meus apoios"
              href="/my-supports"
              icon={HandHeart}
              className="bg-yellow-500 text-white hover:bg-yellow-500/90"
            />
          </CustomTooltip>

          <CustomTooltip content="Veja todas as campanhas cadastradas">
            <NavbarButton
              label="Campanhas"
              href="/my-supports"
              icon={HeartHandshake}
              className="bg-cyan-600 text-white hover:bg-cyan-600/90"
            />
          </CustomTooltip>

          <CustomTooltip content="Veja as campanhas criadas por você">
            <NavbarButton
              label="Minhas campanhas"
              href="/my-campaigns"
              icon={Search}
              className="
              border bg-background shadow-xs
              hover:bg-accent hover:text-accent-foreground
              dark:bg-input/30 dark:border-input dark:hover:bg-input/50
            "
            />
          </CustomTooltip>

          <CustomTooltip content="Adicione uma campanha">
            <NavbarButton
              label="Criar campanha"
              href="/add-campaign"
              icon={Plus}
              className="bg-green-800 text-white hover:bg-green-800/90"
            />
          </CustomTooltip>

          <SignedOut>
            <SignInButton>
              <Button
                variant="default"
                size="sm"
                className="flex justify-start cursor-pointer bg-yellow-700 font-semibold hover:bg-yellow-700/70"
              >
                <LogIn className="w-4 h-4" />
                <span>Entrar</span>
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex justify-end w-full md:w-fit">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
