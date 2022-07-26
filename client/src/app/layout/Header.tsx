import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
const pages = ['Products', 'Pricing', 'Blog'];
export default function Header(){
    return (
        <AppBar position='static' sx={{mb:4}}>
            <Toolbar>
                <Typography>
                    <h1>App</h1>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}