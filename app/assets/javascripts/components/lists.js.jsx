var Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object,
        token: React.PropTypes.string
    },

    handleClick: function(event)
    {
        React.findDOMNode(this.refs.editForm).submit();
    },

    render: function() {
        return(
            <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--12-col-phone" onClick={this.handleClick}>
                <form action={"lists/edit/" + this.props.item.id} method="post" ref="editForm">
                    <input type="hidden" name="authenticity_token" id="authenticity_token" value={this.props.token} />
                </form>
                <div className="mdl-card list-card mdl-shadow--2dp">
                </div>
            </div>
        );
    }
});

var Lists = React.createClass({
    propTypes: {
        item: React.PropTypes.object,
        token: React.PropTypes.string
    },

    render: function () {
        return (
            <div>

                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--12-col-phone">
                        <div className="mdl-card list-card add-list mdl-shadow--2dp">
                        </div>
                    </div>
                    {
                        this.props.lists.map(function(list){
                            return(
                                <Item item={list} token={this.props.token}/>
                            );
                        }, this)
                    }
                </div>
            </div>
        );
    }
});



