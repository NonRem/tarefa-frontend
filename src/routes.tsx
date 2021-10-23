import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home'
import Tasks from './pages/Tasks'
import TasksForm from './pages/Tasks/Form'
import Detail from './pages/Tasks/Detail'

const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tarefas" exact component={Tasks} />
            <Route path="/cadastro_tarefa" exact component={TasksForm} />
            <Route path="/cadastro_tarefa/:id" exact component={TasksForm} />
            <Route path="/ver_tarefa/:id" exact component={Detail} />
        </Switch>
    )
}

export default Routes