import { compose, withHandlers, withState, withStateHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux'
import { updateItem, fetchItemsIfNeeded } from '../actions/items';
import { withRouter } from 'react-router-dom';
import Item from './Item';

const UpdateItem = withRouter(compose(
    withState('btnLabel', 'setBtnLabel', 'Edit'),
    withStateHandlers(
        ({ item }) => ({
            ...item
        }),
        {
            setItem: () => (item) => ({
                item
            })
        }
    ),
    withHandlers({
        handleClickBtn: ({ onUpdateItem, item, history }) => () => {
            const { description = '' } = item;
            if (description.trim() !== '') {
                onUpdateItem( item, () => {
                    history.push('/');
                } );
            }
        }
    }),
    lifecycle({
        componentDidMount(){
            this.props.onFetchItemsIfNeeded();
        }
    })
)(Item));

const mapStateToProps = (state, ownProps) => {
    return {
        item: state.items.items.find(item => item.id === parseInt(ownProps.match.params.id, 10))
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateItem: (item, onSuccess) => {
            return dispatch(updateItem(item, onSuccess))
        },
        onFetchItemsIfNeeded: () => {
            return dispatch(fetchItemsIfNeeded())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItem);