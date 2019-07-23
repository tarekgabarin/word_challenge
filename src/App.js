import React from 'react';
import WordChallenge from '../src/components/WordChallenge/WordChallenge';
import StartMenu from '../src/components/StartMenu/StartMenu';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'


function App() {
  return (
    <div>
     <Router>
         <Switch>
             <Route exact path={'/'} component={StartMenu} />
             <Route exact path={'/challenge/:seconds'} component={WordChallenge} />
         </Switch>
     </Router>
    </div>
  );
}

export default App;
