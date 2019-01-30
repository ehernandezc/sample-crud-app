import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux'
import { createItem } from '../actions/items';
import Item from './Item';

const AddItem = compose(
    withState('item', 'setItem', {}),
    withState('btnLabel', 'setBtnLabel', 'Add'),
    withHandlers({
        handleClickBtn: ({ onCreateItem, item, setItem }) => () => {
            const { description = '' } = item;
            if (description.trim() !== '') {
                onCreateItem(
                    item,
                    () => {
                        setItem({})
                    }
                );
            }
        }
    })
)(Item);

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateItem: (item, onSuccess) => {
            return dispatch(createItem(item, onSuccess))
        }
    };
};

export default connect(null, mapDispatchToProps)(AddItem);