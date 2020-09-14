import React from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Drawer } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    drawerPaper: {
        position: "relative",
        width: 240
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    toolbarMargin: theme.mixins.toolbar,
    aboveDrawer: {
        zIndex: theme.zIndex.drawer + 1
    }
}));

const SideBar = ({ variant, open, onClose, onItemClick }) => {
    const classes = useStyles();
    return (
        <Drawer id="sideBar" variant={variant} open={open} onClose={onClose}
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <div
                className={clsx({
                    [classes.toolbarMargin]: variant === 'persistent'
                })}
            />
            <List style={{paddingTop: '0'}}>
                <ListItem id="sideBar-item" button component={Link} to="/" onClick={onItemClick('Home')}>
                    <ListItemText>Home</ListItemText>
                </ListItem>
            </List>
        </Drawer>
    )
};

export default SideBar;