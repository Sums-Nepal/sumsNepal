import { useCallback } from "react";
import type { LogoImageProps } from "../../types";
import { useNavigate } from "react-router-dom";


/**
 * This is the LogoImage component where user can choose with the link or without the link
 * @param param0 
 * @returns 
 */
const LogoImage: React.FC<LogoImageProps> = ({ makeClickable = false }) => {
  const navigate = useNavigate();

  const redirectToTheHomePage = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.preventDefault();
      if (makeClickable) {
        navigate("/");
      } else {
        return;
      }
    },
    [makeClickable]
  );

  return (
    <>
      <img
        style={{ cursor: "pointer" }}
        src="./images/header_logo.png"
        alt="logo"
        width={60}
        height={60}
        onClick={redirectToTheHomePage}
      />
    </>
  );
};

export default LogoImage;
