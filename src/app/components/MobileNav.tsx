import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  buttonType: "home-menu" | "pdp-menu";
  content?: JSX.Element;
}

const MobileNav: React.FC<ButtonProps> = ({ buttonType, content }) => {
  return (
    <header className="bottom-separator">
      <nav className="home-mobile-nav">
        {buttonType === "home-menu" ? (
          <>
            <button id="menu" className="mobile-menu-btn" type="button">
              <Image src="/icons/menu.svg" alt="menu" width={20} height={20} />
            </button>

            <button className="avatar" type="button">
              <Image
                src="/icons/avatar.jpg"
                width="47"
                height="47"
                alt="avatar"
              />
            </button>
          </>
        ) : (
          <>
            <Link href="/" className="go-back mobile-menu-btn">
              <Image
                src="/icons/arrow-left.svg"
                alt="menu"
                width={20}
                height={20}
              />
            </Link>
            {content && content}
            <button id="menu-dots" className="mobile-menu-btn" type="button">
              <Image
                src="/icons/menu-dots.svg"
                alt="menu"
                width={20}
                height={20}
              />
            </button>
          </>
        )}
      </nav>
    </header>
  );
};
export default MobileNav;
