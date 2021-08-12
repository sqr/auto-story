import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import JobList from './components/JobList';
import Start from './components/Start';
import NewVideo from './components/NewVideo';

const App = () => {


  return (
    <Router>
      <div>
        <Route exact path='/' component={Start} />
        <Route path='/new_video' component={NewVideo} />
        <Route path='/job_list' component={JobList} />
      </div>
    </Router>
  )
}

export default App;
