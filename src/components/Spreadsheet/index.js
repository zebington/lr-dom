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

    toggleSortName = () => {
        if (this.state.sort.by !== 'name') {
            this.setState({
                sort: {
                    by: 'name',
                    dir: 'down'
                }
            });
        } else if (this.state.sort.dir === 'down') {
            this.setState({
                sort: {
                    by: 'name',
                    dir: 'up'
                }
            });
        } else {
            this.setState({
                sort: {
                    by: 'id',
                    dir: 'down'
                }
            });
        }
    };

    sortById = (card1, card2) => card1.id - card2.id * (this.state.sort.dir === 'up' ? -1 : 1);

    sortByName = (card1, card2) => card1.name.localeCompare(card2.name) * (this.state.sort.dir === 'up' ? -1 : 1);

    getSortFunction = () => {
        switch (this.state.sort.by) {
            case 'name': return this.sortByName;
            default: return this.sortById;
        }
    };

    render() {
        if (!this.state.isLoading) {
            const cards = this.state.cards.filter(card =>
                card.name.toLowerCase().includes(this.state.nameFilter)
                && card.manaCost.includes(this.state.manaCostFilter)
                && this.state.gradeFilter[card.grade[0]]
            ).sort(this.getSortFunction()).map(card =>
                <Card name={card.name} manaCost={card.manaCost} grade={card.grade} notes={card.notes} key={card.id}/>
            );
            const gradeSelectorClass = `grade-selector${this.state.gradeSelectorOpen ? " active" : ""}`;
            return (
                <div className="flex-table">
                    <div className="table-header">
                        <div className="header name">
                            <input type="search" placeholder="Name" autoComplete="off" autoCapitalize="words"
                                   onChange={this.filterName}/>
                            <Sorter toggleSort={this.toggleSortName}
                                    sorted={this.state.sort.by === 'name' ? this.state.sort.dir : ''}/>
                        </div>
                        <div className="header mana-cost">
                            <input type="search" placeholder="Cost" autoComplete="off" onChange={this.filterManaCost}/>
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
