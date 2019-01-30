import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ItemList = ({ items, onDelete, onRefresh }) => {
    return(
        <Paper>
            <IconButton aria-label="Refresh" onClick={ onRefresh }>
                <RefreshIcon />
            </IconButton>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell><Link to={`/item/${item.id}`}>{item.description}</Link></TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Delete" onClick={onDelete.bind(null, item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </Paper>
    );
};

ItemList.propTypes = {
    items: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
};

export default ItemList;