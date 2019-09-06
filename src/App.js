import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

class App extends Component {
  state = { 
    STORE 
  };

  
  handleDeleteClicked = (id) => {
    const newLists = this.state.STORE.lists.map(list => {
      const filterList = list.cardIds.filter(cardId =>  cardId !== id);
      list.cardIds = filterList;
      return list;
    });
    console.log(newLists);

    const newCards = omit(this.state.STORE.allCards, id);
    console.log(newCards)
    
    this.setState({
      STORE: {
        lists: newLists,
        allCards: newCards
      }
    });
  }

  render() {
    const store = this.state.STORE;

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
