/** @jsxImportSource theme-ui */
import Flag from "./Flag";
import ColorSwitcher from "./color-switcher";

const Navbar = (props) => (
    <div sx={{ pl: 20 }}>
        <Flag/>
        <ColorSwitcher/>
    </div>
);

export default Navbar;