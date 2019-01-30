import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { compose, withHandlers } from 'recompose';

const Item = ({ item = {}, btnLabel, handleChange, handleKeyPress, handleClickBtn}) => {
    const { description = '' } = item;
    return(
        <React.Fragment>
            <TextField
                label="Enter item"
                value={description}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <Button onClick={handleClickBtn}>{btnLabel}</Button>
        </React.Fragment>
    );
};

const ItemExt = compose(
    withHandlers({
        handleChange: ({ setItem, item }) => (event) => {
            setItem({
                ...item,
                description: event.target.value
            });
        },
        handleKeyPress: ({ handleClickBtn }) => (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleClickBtn();
            }
        }
    })
)(Item);

export default ItemExt;