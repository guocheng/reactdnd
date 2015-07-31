var React = require('react'),
    ReactDnD = require('react-dnd'),
    ItemTypes = require('./ItemTypes');


var QuestionEditor = React.createClass({
    propTypes: {
        connectDragSource: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        id: React.PropTypes.any.isRequired,
        text: React.PropTypes.string.isRequired,
        swapCards: React.PropTypes.func.isRequired
    },

    render: function () {
        var style = {
            border: '1px dashed gray',
            padding: '0.5rem 1rem',
            marginBottom: '.5rem',
            backgroundColor: 'white',
            cursor: 'move',
            opacity: this.props.isDragging ? 0 : 1
        };

        return this.props.connectDragSource(this.props.connectDropTarget(
            <div style={style}>
                My order is {this.props.text}
            </div>
        ));
    }
});

var questionSource = {
    beginDrag: function (props) {
        return { id: props.id };
    }
};

var questionTarget = {
    hover: function(props, monitor) {
        var draggedId = monitor.getItem().id;

        if (draggedId !== props.id) {
            props.swapCards(draggedId, props.id);
        }
    }
};

var DragSourceDecorator = ReactDnD.DragSource(ItemTypes.QUESTION, questionSource,
    function(connect, monitor){
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        };
});

var DropTargetDecorator = ReactDnD.DropTarget(ItemTypes.QUESTION, questionTarget,
    function (connect) {
        return {
            connectDropTarget: connect.dropTarget()
        };
});

module.exports = DropTargetDecorator(DragSourceDecorator(QuestionEditor));
