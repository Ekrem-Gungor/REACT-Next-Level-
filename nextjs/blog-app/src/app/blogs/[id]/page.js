import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export default async function Page({ params }) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/blogs/${id}`);
  const blog = await response.json();

  return (
    <>
      <Grid container>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: "45%" }}
            image={`/img/${blog.img}`}
            alt=""
          ></CardMedia>
          <Box>
            <CardContent>
              <Typography variant="h6" component="div">
                {blog.name}
              </Typography>
              <Typography variant="subtitle1" component="div">
                {blog.description}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </>
  );
}
