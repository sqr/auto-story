import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import JobList from './components/JobList';
import Start from './components/Start';


const App = () => {
  return (
    <Router>
      <div>
        <Route exact path='/' component={Start} />
        <Route path='/job_list' component={JobList} />
      </div>
    </Router>
  )
}

export default App;
