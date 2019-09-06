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

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
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

    const newCards = omit(this.state.STORE.allCards, id);
    
    this.setState({
      STORE: {
        lists: newLists,
        allCards: newCards
      }
    });
  }

  handleAddCard = listId => {
    const newCard = newRandomCard();

    const newLists = this.state.STORE.lists.map(list => {
      if (list.id === listId) {
	      return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    })

    console.log(newCard)
    console.log(newLists)

    this.setState({
      STORE: {
        lists: newLists,
        allCards: {
          ...this.state.STORE.allCards,
          [newCard.id]: newCard
        }
      }
    })
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
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              deleteWasClicked={(id) => this.handleDeleteClicked(id)}
              addRandomCardClicked={(listId) => this.handleAddCard(listId)}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
