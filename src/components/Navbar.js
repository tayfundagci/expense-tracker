import styles from "./Navbar.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link component="button" to="/" className={styles.link}>
              Expense Tracker App
            </Link>
          </Typography>

          {!user && (
            <>
              <Button variant="outlined" color="inherit">
                <Link component="button" to="/login" className={styles.link}>
                  LOGIN
                </Link>{" "}
              </Button>
              <Button variant="outlined" color="inherit" sx={{ ml: 2 }}>
                <Link component="button" to="/signup" className={styles.link}>
                  SIGN UP
                </Link>{" "}
              </Button>
            </>
          )}

          {user && (
            <>
              <Typography variant="caption">
                Hello {user.displayName}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={logout}
                sx={{ ml: 5 }}
              >
                LOGOUT
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
