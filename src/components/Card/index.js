import React, {Component} from 'react';

import './Card.css'

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {popup: false};
    }

    keyboardClose = e => {
        if (e.key === "Escape") {
            this.closeCard();
        }
    };

    openCard = () => {
        document.addEventListener('keydown', this.keyboardClose);
        this.setState({
            popup: true
        });
    };

    closeCard = () => {
        document.removeEventListener('keydown', this.keyboardClose);
        this.setState({popup: false});
    };

    fixedEncodeURIComponent = str => encodeURIComponent(str).replace(/[!'()*]/g, escape);

    render() {
        const manaCost = this.props.manaCost.split('').map((part, i) => {
            const className = 'icon icon-' + part.toLowerCase();
            return <span className={className} key={i}>{part}</span>;
        });
        let cardPopup = this.state.popup === false ? null :
            <div>
                <div className="card-popup-blur" onClick={this.closeCard}/>
                <div className="card-popup">
                    <div className="title-bar">
                        <h2>{this.props.name}</h2>
                        <span className="close-button" onClick={this.closeCard}>X</span>
                    </div>
                    <div className="card-img-container" style={{
                        backgroundImage:
                        `url(https://api.scryfall.com/cards/named?exact=${this.fixedEncodeURIComponent(this.props.name)}&format=image&version=normal)`
                    }}/>
                    <p>{this.props.notes}.</p>
                </div>
            </div>;

        return (
            <div className="table-row-container">
                <div className="table-row" onClick={this.openCard}>
                    <div className="table-row-group">
                        <div className="name">{this.props.name}</div>
                        <div className="mana-cost">{manaCost}</div>
                    </div>
                    <div className="grade">{this.props.grade}</div>
                </div>
                {cardPopup}
            </div>
        );
    }
}

export default Card;
