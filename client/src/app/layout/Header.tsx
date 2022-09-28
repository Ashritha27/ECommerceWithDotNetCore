
import { ShoppingBasket } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography ,Switch, ListItem, List, Box, Badge} from "@mui/material";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
const midLink = [
    {title:'Catalog',path:'/catalog'},
    {title: 'About' , path:'/about'},
    {title:'Contact',path:'/contact'}];

    const endLink = [
        {title:'Cart',path:'/cart'},
        {title: 'Login' , path:'/login'}];



export default function Header(props:any){
    const {basket} = useStoreContext();
    //console.log(basket)
    const itemCount = basket?.items.reduce((sum , item) => sum+item.quantity ,0);
    

    const [cartCount,setCartCount] = useState(0);
    return (
        <AppBar position='static' sx={{mb:4 }}>
            <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
                <Box sx={{display:'flex' ,justifyContent:'space-between'}}>
                <Typography variant='h4'>
                    App
                </Typography>
                <Switch checked={props.darkMode} onChange={props.changeHandler}/>
                </Box>
                <Box>
                <List sx={{display:'flex'}}>
                    {midLink.map(page => (
                        <ListItem sx={{'&:hover' :{color:'secondary.dark'}}} component={NavLink} to={page.path} key={page.title} button>
                            {page.title}
                        </ListItem>
                    ))}
                </List>
                </Box>
                <Box >
                <List sx={{display:'flex',flexDirection:'row' }}>
                    <IconButton component={Link} to='/basket' size='large' sx={{color:'inherit'}}>
                    <Badge badgeContent={itemCount} color="secondary" max={2000}>
                        <ShoppingCartIcon />
                    </Badge>
                    </IconButton>
                    {endLink.map(page => (
                        <ListItem sx={{'&:hover' :{color:'secondary.dark'}}} component={NavLink} to={page.path} key={page.title} button>
                            {page.title}
                        </ListItem>
                    ))}
                </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}