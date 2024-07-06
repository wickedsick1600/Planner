import ToDo from './ToDo/ToDo.jsx'
import ShoppingList from './ShoppingList/ShoppingList.jsx';
import Header from './Header/Header.jsx'

function App() {
  return (
  <div className='appCont'>
    <Header />
    <ToDo />
    <ShoppingList />
  </div>);
}

export default App
