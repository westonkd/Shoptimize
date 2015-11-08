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
        if (this.props.listMap[parseInt(this.props.item.id)]) {
            return(
                <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--12-col-phone" onClick={this.handleClick}>
                    <form action={"lists/edit/" + this.props.item.id} method="post" ref="editForm">
                        <input type="hidden" name="authenticity_token" id="authenticity_token" value={this.props.token} />
                    </form>
                    <div className="small-card mdl-card list-card mdl-shadow--2dp">
                        <h3 className="card-heading">{this.props.item.name}</h3>
                        <ul>
                            {
                                this.props.listMap[parseInt(this.props.item.id)].map(function(item){
                                    return(
                                        <li>{item.name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--12-col-phone" onClick={this.handleClick}>
                    <form action={"lists/edit/" + this.props.item.id} method="post" ref="editForm">
                        <input type="hidden" name="authenticity_token" id="authenticity_token" value={this.props.token} />
                    </form>
                    <div className="small-card mdl-card list-card mdl-shadow--2dp">
                        <h3 className="card-heading">{this.props.item.name}</h3>
                    </div>
                </div>
            );
        }
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
                    {
                        this.props.lists.map(function(list){
                            return(
                                <Item item={list} token={this.props.token} listMap={this.props.listMap} />
                            );
                        }, this)
                    }
                </div>
            </div>
        );
    }
});



