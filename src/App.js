import React, {Component} from 'react';
import Spreadsheet from './components/Spreadsheet';
import './App.css';
import './icons/Icons.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">LR's Limited DOM Review</h1>
                </header>
                <Spreadsheet/>
                <footer>
                    <p>
                        Based on the ratings provided by <a className="reference" href="https://twitter.com/lsv">
                        Luis Scott-Vargas</a> and <a className="reference" href="https://twitter.com/marshall_lr">
                        Marshall Sutcliffe</a> on the podcast <a className="reference" href="http://lrcast.com/">
                        Limited Resources</a>.
                    </p>
                    <p>
                        Card rating data obtained from <a className="reference"
                        href="https://docs.google.com/spreadsheets/d/1v1i--JKPQaA6cmEB3vp6rbush9Gj2TqJI6ErUxo7K1w/edit?usp=sharing">
                        this spreadsheet</a>, collated by reddit user <a className="reference" href="https://www.reddit.com/user/Ravenscar">
                        Ravenscar</a>.
                    </p>
                    <p>
                        Card images obtained from <a className="reference" href="https://scryfall.com/">scryfall.com
                        </a> and are the copyright of Wizard's of the Coast.
                    </p>
                    <p>
                        App created by <a className="reference" href="https://www.reddit.com/user/zebington/">zebington
                        </a>, 2018.
                    </p>
                </footer>
            </div>
        );
    }
}

export default App;
