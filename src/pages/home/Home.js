import { Container, Grid } from "@mui/material";
import Form from "./Form";
import "./Home.module.css";

import { useAuthContext } from "../../hooks/useAuthContext";

import Liste from "./Liste";
import { useCollection } from "../../hooks/useCollection";

export default function Home() {
  const { user } = useAuthContext();
  const { belgeler, hata } = useCollection(
    "harcamalar",
    ["uid", "==", user.uid],
    ["olusturulmaTarih", "desc"]
  );

  return (
    <Container sx={{ mt: 8 }}>
      <Grid container spacing={10}>
        <Grid item md={8} sm={12} xs={12}>
          {hata && <p>{hata}</p>}
          {belgeler && <Liste harcamalar={belgeler} />}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Form uid={user.uid} />
        </Grid>
      </Grid>
    </Container>
  );
}
