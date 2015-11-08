var EditListLayout = React.createClass({
    propTypes: {
        list: React.PropTypes.object,
        items: React.PropTypes.array,
        token: React.PropTypes.string,
        date: React.PropTypes.string
    },

    componentDidMount: function() {
        this.refs.listName.getDOMNode().value = this.props.list.name;
    },

    getInitialState: function() {
        return {items: this.props.items};
    },


    saveName: function() {
        var url = "name/" + this.props.list.id;
        $.post(
            url,
            {
                name: this.refs.listName.getDOMNode().value,
                authenticity_token: this.props.token
            }
        );
    },

    fetchList: function() {
        var url = "items/" + this.props.list.id;
        var thiss = this;
        $.getJSON( url, function(data) {
            thiss.setState({items: data});
        });
    },

    render: function() {
        return(
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                    <form action="#">
                        <div className="mdl-textfield mdl-js-textfield">
                            <input className="mdl-textfield__input" type="text" id="list-title"
                                   onChange={this.saveName} ref="listName" />
                            <label className="mdl-textfield__label" for="list-title">Set list name...</label>
                        </div>
                    </form>
                    <span className="date">{this.props.date}</span>
                </div>

                <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                    <ListTable items={this.state.items}/>
                </div>

                <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                    <ItemEntry listID={this.props.list.id} callback={this.fetchList}/>
                </div>
            </div>
        );
    }
});

var ItemEntry = React.createClass({
    propTypes: {

    },

    addItem: function() {
        var itemName = this.refs.newItemName.getDOMNode().value;
        var category = this.refs.newItemCategory.getDOMNode().value;
        var url = "add/" + this.props.listID;
        $.post(
            url,
            {
                name: itemName,
                category: category,
                authenticity_token: this.props.token
            }
        );

        this.props.callback();
        this.refs.newItemName.getDOMNode().value = "";
        this.refs.newItemCategory.getDOMNode().value = "";
        this.refs.newItemName.getDOMNode().focus();
    },

    render: function() {
        return(
            <div id="item-entry" className="mdl-shadow--2dp">
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                        <form action="#">
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input className="mdl-textfield__input" type="text" id="new-item-name" ref="newItemName" />
                                <label className="mdl-textfield__label" for="new-item-name">Item Name</label>
                            </div>
                        </form>
                    </div>

                    <div className="mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                        <form action="#">
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input className="mdl-textfield__input" type="text" id="new-item-category" ref="newItemCategory" />
                                <label className="mdl-textfield__label" for="new-item-category">Category</label>
                            </div>
                        </form>
                    </div>

                    <div className="mdl-cell mdl-cell--2-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                        <button onClick={this.addItem} id="add-item-button" ref="add-item-button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                            +
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});


var ItemRow = React.createClass({
    propTypes: {
        itemName: React.PropTypes.string,
        isPurchased: React.PropTypes.bool,
        itemCat: React.PropTypes.string,
        id: React.PropTypes.number,
        newCat: React.PropTypes.bool
    },

    getInitialState: function() {
        return {isPurchased: this.props.isPurchased, id: this.props.id};
    },

    checkRow: function() {
        var url = "purchased/" + this.props.id;
        $.post(
            url,
            {
                purchased: !this.state.isPurchased
            }
        );

        this.setState({isPurchased: !this.state.isPurchased})
    },

    render: function() {
        var tableRow = (<tr className={this.state.isPurchased ? "is-selected" : ""}>
            <td className="mdl-data-table__cell--non-numeric">{this.props.itemName.charAt(0).toUpperCase() + this.props.itemName.substr(1).toLowerCase()}</td>
            <td>{this.props.itemCat.charAt(0).toUpperCase() + this.props.itemCat.substr(1).toLowerCase()}</td>
            <td className="check-td">
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for={"cb-" + this.props.itemName}>
                    <input defaultChecked={false} onChange={this.checkRow} type="checkbox" ref={"checkboxInput"} className="mdl-checkbox__input" />
                </label>
            </td>
        </tr>);

        return(tableRow);
    }
});

var ListTable = React.createClass({
    propTypes: {
        items: React.PropTypes.array
    },

    componentDidMount: function() {
        $(".is-selected .mdl-checkbox__input").prop('checked',true);
    },

    componentDidUpdate: function() {
        $(".mdl-checkbox__input").prop('checked',false);
    },

    getInitialState: function() {
        return {doLabel: true, label: ""};
    },

    rerender: function() {
      this.forceUpdate();
    },

    render: function() {
        var thiss = this;

        if (this.props.items.length <= 0) {
            return (
                <table id="list-table" className="mdl-data-table mdl-js-data-table mdl-data-table mdl-shadow--2dp">
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th id="purchased-heading">Purchased</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="mdl-data-table__cell--non-numeric">
                        No Items added to list.
                        </td>
                        <td></td>
                        <td className="check-td">
                        </td>
                    </tr>
                    </tbody>
                </table>
            );
        }

        return(
            <table id="list-table" className="mdl-data-table mdl-js-data-table mdl-data-table mdl-shadow--2dp">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th id="purchased-heading">Purchased</th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.props.items.map(function(item){
                           return(<ItemRow key={item.id} itemName={item.name} isPurchased={item.purchased}
                               itemCat={item.group} newCat={thiss.state.doLabel} id={item.id} />);
                        })
                    }
                </tbody>
            </table>
        );
    }
});