import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './styles/index.css';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
//react router wires
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import PostsIndex from './components/PostsIndex';
import PostsNew from './components/PostsNew';
import PostsShow from './components/PostsShow';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore); //apply Middleware ReduxPromise


render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/posts/new" component={PostsNew}/>
                    <Route path="/posts/:id" component={PostsShow}/>
                    <Route path="/" component={PostsIndex}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
