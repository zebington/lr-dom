import React, {Component} from 'react';

import Card from '../Card';
import Sorter from '../Sorter';

import Arrow from '../icons/Arrow';

import './Spreadsheet.css';

class Spreadsheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            isLoading: true,
            gradeSelectorOpen: false,
            nameFilter: '',
            manaCostFilter: '',
            gradeFilter: {
                A: true,
                B: true,
                C: true,
                D: true,
                F: true
            },
            sort: {
                by: 'id',
                dir: 'down'
            }
        };
    }

    componentDidMount() {
        return fetch('/cards.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    cards: responseJson.cards
                });
            })
            .catch(error => console.error(error));
    }

    filterName = e => {
        this.setState({nameFilter: e.target.value.toLowerCase()});
    };

    filterManaCost = e => {
        this.setState({manaCostFilter: e.target.value.toUpperCase()});
    };

    filterGrade = e => {
        const grade = e.currentTarget.dataset.grade;
        this.setState({
            gradeFilter: {
                A: (grade !== "A") !== !this.state.gradeFilter.A,
                B: (grade !== "B") !== !this.state.gradeFilter.B,
                C: (grade !== "C") !== !this.state.gradeFilter.C,
                D: (grade !== "D") !== !this.state.gradeFilter.D,
                F: (grade !== "F") !== !this.state.gradeFilter.F
            }
        });
    };

    toggleGradeSelector = () => {
        this.setState({gradeSelectorOpen: !this.state.gradeSelectorOpen})
    };

    toggleSort = e => {
        const sort = e.currentTarget.dataset.sorts;
        if (this.state.sort.by !== sort){
            this.setState({sort: {by: sort, dir: 'down'}});
        } else if (this.state.sort.dir === 'down') {
            this.setState({sort: {by: sort, dir: 'up'}});
        } else {
            this.setState({sort: {by: 'id', dir: 'down'}});
        }
    };

    sortById = (card1, card2) => (card1.id - card2.id) * (this.state.sort.dir === 'up' ? -1 : 1);

    sortByName = (card1, card2) => card1.name.localeCompare(card2.name);

    sortByCost = (card1, card2) => {
        const getVal = (acc, part) => {
            switch (part) {
                case 'X': return acc;
                case 'W': return acc + 1.00001;
                case 'U': return acc + 1.0001;
                case 'B': return acc + 1.001;
                case 'R': return acc + 1.01;
                case 'G': return acc + 1.1;
                default: return acc + Number(part);
            }
        };
        const card1Val = card1.manaCost.split('').reduce(getVal, 0);
        const card2Val = card2.manaCost.split('').reduce(getVal, 0);
        return (card1Val - card2Val);
    };

    sortByGrade = (card1, card2) => {
        const getCardVal = grade => {
            const letterVal = letter => {
                switch (letter) {
                    case 'D': return 1;
                    case 'C': return 2;
                    case 'B': return 3;
                    case 'A': return 4;
                    default: return 0;
                }
            };
            const modVal = mod => {
                switch (mod) {
                    case '+': return 0.25;
                    case '-': return -0.25;
                    default: return 0;
                }
            };
            return letterVal(grade[0]) + (grade.length > 1 ? modVal(grade[1]) : 0);
        };
        return getCardVal(card2.grade) - getCardVal(card1.grade);
    };

    getSortFunction = () => {
        switch (this.state.sort.by) {
            case 'name': return this.sortByName;
            case 'cost': return this.sortByCost;
            case 'grade': return this.sortByGrade;
            default: return this.sortById;
        }
    };

    render() {
        if (!this.state.isLoading) {
            const sortedCards = this.state.cards.filter(card =>
                card.name.toLowerCase().includes(this.state.nameFilter)
                && card.manaCost.includes(this.state.manaCostFilter)
                && this.state.gradeFilter[card.grade[0]]
            ).sort(this.getSortFunction());
            if (this.state.sort.dir === 'up') sortedCards.reverse();
            const cards = sortedCards.map(card =>
                <Card name={card.name} manaCost={card.manaCost} grade={card.grade} notes={card.notes} key={card.id}/>
            );
            const gradeSelectorClass = `grade-selector${this.state.gradeSelectorOpen ? " active" : ""}`;
            return (
                <div className="flex-table">
                    <div className="table-header">
                        <div className="header name">
                            <input type="search" placeholder="Name" autoComplete="off" autoCapitalize="words"
                                   onChange={this.filterName}/>
                            <Sorter toggleSort={this.toggleSort} sorts="name"
                                    sorted={this.state.sort.by === 'name' ? this.state.sort.dir : ''}/>
                        </div>
                        <div className="header mana-cost">
                            <input type="search" placeholder="Cost" autoComplete="off" onChange={this.filterManaCost}/>
                            <Sorter toggleSort={this.toggleSort} sorts="cost"
                                    sorted={this.state.sort.by === 'cost' ? this.state.sort.dir : ''}/>
                        </div>
                        <div className="header grade">
                            <div className={gradeSelectorClass}>
                                <div className="grade-selector-button" onClick={this.toggleGradeSelector}>
                                    Grade <Arrow/>
                                </div>
                                <div className="grade-selector-dropdown">
                                    <div className="grade-selector-dropdown-option" data-grade="A"
                                         onClick={this.filterGrade}>
                                        <input type="checkbox" checked={this.state.gradeFilter.A} readOnly={true}/>A
                                    </div>
                                    <div className="grade-selector-dropdown-option" data-grade="B"
                                         onClick={this.filterGrade}>
                                        <input type="checkbox" checked={this.state.gradeFilter.B} readOnly={true}/>B
                                    </div>
                                    <div className="grade-selector-dropdown-option" data-grade="C"
                                         onClick={this.filterGrade}>
                                        <input type="checkbox" checked={this.state.gradeFilter.C} readOnly={true}/>C
                                    </div>
                                    <div className="grade-selector-dropdown-option" data-grade="D"
                                         onClick={this.filterGrade}>
                                        <input type="checkbox" checked={this.state.gradeFilter.D} readOnly={true}/>D
                                    </div>
                                    <div className="grade-selector-dropdown-option" data-grade="F"
                                         onClick={this.filterGrade}>
                                        <input type="checkbox" checked={this.state.gradeFilter.F} readOnly={true}/>F
                                    </div>
                                </div>
                            </div>
                            <Sorter toggleSort={this.toggleSort} sorts="grade"
                                    sorted={this.state.sort.by === 'grade' ? this.state.sort.dir : ''}/>
                        </div>
                    </div>
                    {cards}
                </div>
            );
        } else {
            return <p>Loading...</p>;
        }
    }
}

export default Spreadsheet;
