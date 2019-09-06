import React, { Component } from 'react';
import List from './List'
import './App.css';
import store from './STORE';

class App extends Component {

  state = { store }

  handleDeleteClicked = (id) => {
    const allCards = store.allCards.filter(allCard => allCard.id !== id)
    console.log(allCards)
   /*  this.setState({
      allCards
    }); */
  }

  render() {
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              deleteWasClicked={(id) => this.handleDeleteClicked(id)}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
