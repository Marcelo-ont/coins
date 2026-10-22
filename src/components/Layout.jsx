import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

// Import the Detail component for the coin route
import { Detail } from './Detail';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// Main Layout Component containing the AppBar and Drawer
export const Layout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('coin-favorites') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('coin-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')
      .then((response) => {
        if (!response.ok) throw new Error(`Server error: ${response.status}. You might be rate-limited by CoinGecko.`);
        return response.json();
      })
      .then(setCoins)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleFavorite = (coin) => {
    const favorite = { id: coin.id, name: coin.name, symbol: coin.symbol, image: coin.image };
    setFavorites((current) => current.some((item) => item.id === coin.id)
      ? current.filter((item) => item.id !== coin.id)
      : [...current, favorite]);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              { mr: 2 },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Crypto Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Typography variant="overline" color="text.secondary">Favoritos</Typography>
        </Box>
        <List dense sx={{ pt: 0 }}>
          {favorites.length === 0 ? (
            <ListItem>
              <ListItemText primary="Aún no tienes favoritos" primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
            </ListItem>
          ) : favorites.map((coin) => (
            <ListItem key={coin.id} disablePadding>
              <ListItemButton onClick={() => navigate(`/coin/${coin.id}`)}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {coin.image ? <Box component="img" src={coin.image} alt="" sx={{ width: 24, height: 24 }} /> : <StarIcon color="warning" />}
                </ListItemIcon>
                <ListItemText primary={coin.name} secondary={coin.symbol?.toUpperCase()} primaryTypographyProps={{ noWrap: true }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/about')}>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
       <DrawerHeader />
       <Routes>
        <Route path="/" element={(
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>Cryptocurrency Prices</Typography>
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>}
            {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}><strong>Failed to load coins:</strong> {error}</Alert>}
            {!loading && !error && (
              <Grid container spacing={3}>
                {coins.map((coin) => {
                  const isFavorite = favorites.some((favorite) => favorite.id === coin.id);
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={coin.id}>
                      <Card onClick={() => navigate(`/coin/${coin.id}`)} sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', '&:hover': { transform: 'scale(1.02)' } }}>
                        <IconButton
                          aria-label={isFavorite ? `Quitar ${coin.name} de favoritos` : `Agregar ${coin.name} a favoritos`}
                          onClick={(event) => { event.stopPropagation(); toggleFavorite(coin); }}
                          sx={{ position: 'absolute', zIndex: 1, mt: 1, ml: 1, bgcolor: 'background.paper' }}
                        >
                          <StarIcon color={isFavorite ? 'warning' : 'disabled'} />
                        </IconButton>
                        <CardMedia component="img" height="140" image={coin.image} alt={coin.name} sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }} />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h6">{coin.name} ({coin.symbol.toUpperCase()})</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Price: ${coin.current_price?.toLocaleString()}</Typography>
                          <Typography variant="body2" color="text.secondary">Market Cap: ${coin.market_cap?.toLocaleString()}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        )} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/coin/:id" element={<Detail />} />
       </Routes>
      </Main>
    </Box>
  );
}
