import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Search as SearchIcon, Brightness4, Brightness7 } from "@mui/icons-material";

const API_KEY = "5492e88dfab372a261f53fa5dc9f7eb2"; 
const BASE_URL = "https://gnews.io/api/v4/search";

function App() {
  const [searchQuery, setSearchQuery] = useState("latest");
  const [articles, setArticles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: darkMode ? "#90caf9" : "#1976d2" },
      background: { default: darkMode ? "#121212" : "#f5f5f5" },
    },
  });

  const fetchNews = async (reset = false) => {
  try {
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = `${BASE_URL}?q=${searchQuery}&lang=en&max=10&page=${page}&token=${API_KEY}`;
    const res = await fetch(proxyUrl + encodeURIComponent(targetUrl));

    const wrapped = await res.json();
    const data = JSON.parse(wrapped.contents);

    const newArticles = data.articles || [];
    setArticles(reset ? newArticles : [...articles, ...newArticles]);
  } catch (err) {
    console.error("Error fetching news:", err);
  }
};


  useEffect(() => {
    fetchNews(true);
   
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchNews(true);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) fetchNews();
    
  }, [page]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="primary" sx={{ mb: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
           NewsFeed
          </Typography>

          <form
            onSubmit={handleSearch}
            style={{ display: "flex", alignItems: "center" }}
          >
            <InputBase
              placeholder="Search latest news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                bgcolor: darkMode ? "#424242" : "#fff",
                color: darkMode ? "#fff" : "#000",
                px: 2,
                py: 0.6,
                borderRadius: 2,
                width: { xs: 160, sm: 250, md: 300 },
                boxShadow: 1,
              }}
            />
            <IconButton type="submit" color="inherit">
              <SearchIcon />
            </IconButton>
          </form>

          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        {articles.length === 0 ? (
          <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
            No articles found
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {articles.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      boxShadow: 4,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    {article.image && (
                      <CardMedia
                        component="img"
                        height="180"
                        image={article.image}
                        alt={article.title}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.description || "No description available"}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box textAlign="center" sx={{ mt: 4 }}>
              <Button variant="contained" onClick={loadMore}>
                Load More Articles
              </Button>
            </Box>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
