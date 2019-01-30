import React, { Component } from 'react';
import AddItem from '../components/AddItem';
import ItemsList from '../components/ItemList';
import { invalidateItems, deleteItem, fetchItemsIfNeeded } from '../actions/items';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

class Home extends Component {
    componentDidMount(){
        this.props.onFetchItems();
    }

    render() {
        let { items, isFetching, hasErrored, onFetchItems, onInvalidateItems, onDelete } = this.props;

        return (
            <Paper>
                <Card>
                    <AddItem />
                    { isFetching ? <span>Loading…</span> : null}
                </Card>

                {
                    hasErrored ? <p>Sorry! There was an error loading the items</p> :
                        <ItemsList
                            items={items}
                            onRefresh={()=>{
                                onInvalidateItems();
                                onFetchItems();
                            }}
                            onDelete={onDelete}
                        />
                }

            </Paper>
        );
    }
}

Home.propTypes = {
    items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        items: state.items.items,
        hasErrored: state.items.hasErrored,
        isFetching: state.items.isFetching,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchItems: () => {
            return dispatch(fetchItemsIfNeeded())
        },
        onInvalidateItems: () => {
            return dispatch(invalidateItems())
        },
        onDelete: (id) => {
            return dispatch(deleteItem(id))
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
