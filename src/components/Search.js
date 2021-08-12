import { Input, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function Search() {
  return (
    <section>
      <article className="search">
        <Input
          value={"asdafs"}
          label="Pokemon Search"
          variant="filled"
          style={{ color: "white" }}
          color="secondary"
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </article>
    </section>
  );
}
