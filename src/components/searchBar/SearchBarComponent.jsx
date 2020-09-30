import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import '../video/video.scss';
import { withStyles } from '@material-ui/core';

const styles = {
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '8px 8px 8px 0px',
    paddingLeft: `calc(1em + 32px)`,
  },
};

const DivWrapper = styled.div`
  position: relative;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, .15);
  margin-left: 0;
  &:hover {
    background-color: rgba(255, 255, 255, .50),
  }
  .searchIcon {
    padding: 1px 5px;
    height: 100%;
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchBar = ({ classes, handleFormSubmit, title = '' }) => {
  const [term, setTerm] = useState('Default Text');
  const handleChange = (event) => {
    const { value } = event.target;
    setTerm(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleFormSubmit(term);
  };

  return (
    <DivWrapper>
      <form onSubmit={handleSubmit}>
        <div className="searchIcon">
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
          autoComplete="off"
        />
      </form>
    </DivWrapper>
  );
};

export default withStyles(styles)(SearchBar);
