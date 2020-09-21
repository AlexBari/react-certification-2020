import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import '../video/video.scss';

const styles = {
    root: {
        flexGrow: 1,
    },
    searchIcon: {
        padding: '1px 5px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        position: 'relative',
        borderRadius: '5px',
        backgroundColor: 'rgba(255, 255, 255, .15)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .25) ',
        },
        marginLeft: 0,
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: '8px 8px 8px 0px',
        paddingLeft: `calc(1em + 32px)`,
    }
};

const SearchBar = ({ classes, handleFormSubmit, title= '' }) => {
    const [term, setTerm] = useState('Default Text');
    const handleChange = (event) => {
        const value = event.target.value;
        setTerm(value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        handleFormSubmit(term);
    }
    return (
        <div className={classes.search}>
            <form onSubmit={handleSubmit}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    id="searchDiv"
                    placeholder={`Search${title}…`}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleChange}
                    autoComplete='off'
                />
            </form>
        </div>)
}

export default withStyles(styles)(SearchBar);