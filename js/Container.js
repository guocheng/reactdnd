var React = require('react'),
    HTML5Backend = require('react-dnd/modules/backends/HTML5'),
    QuestionEditor = require('./QuestionEditor'),
    ReactDnD = require('react-dnd');

var style = {
    width: 400
};

var Container = React.createClass({
    getInitialState: function(){
        return {
            questions: [{
                id: 1,
                order: 1,
                text: 'Write a cool JS library'
            }, {
                id: 2,
                order: 2,
                text: 'Make it generic enough'
            }, {
                id: 3,
                order: 3,
                text: 'Write README'
            }, {
                id: 4,
                order: 4,
                text: 'Create some examples'
            }, {
                id: 5,
                order: 5,
                text: 'Spam in Twitter and IRC to promote it'
            }, {
                id: 6,
                order: 6,
                text: '???'
            }, {
                id: 7,
                order: 7,
                text: 'PROFIT'
            }]
        };
    },

    compareCards: function(q1, q2){
        return q1.order - q2.order;
    },

    swapCards: function (id1, id2) {
        var questions = this.state.questions;

        var q1 = questions.filter(function(c){return c.id === id1})[0];
        var q2 = questions.filter(function(c){return c.id === id2})[0];

        var quest1Order = q1.order;
        q1.order = q2.order;
        q2.order = quest1Order;

        questions.sort(this.compareCards);

        this.setState({
            questions: questions
        });
    },

    render: function() {
            return (
                <div style={style}>
                    {this.state.questions.map(function(question) {
                        return (
                            <QuestionEditor key={question.id}
                                        id={question.id}
                                        text={question.order}
                                        swapCards={this.swapCards} />
                        );
                    }, this)}
                </div>
            );
        }
});

module.exports = ReactDnD.DragDropContext(HTML5Backend)(Container);


