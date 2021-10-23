import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import api from '../../Services/api';
import moment from 'moment';
import './index.css'

interface ITask{
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Tasks: React.FC = () => {
    
    const [tasks, setTasks] = useState<ITask[]>([])
    const history = useHistory()

    useEffect(() => {
        loadTasks()
    }, [])
    
    async function loadTasks() {
        const response = await api.get('/tasks')
        console.log(response)
        setTasks(response.data)
    }

    function formatDate(date: Date){
        return moment(date).format('DD/MM/YYYY')
    }

    function editTask(id: number){
        history.push(`/cadastro_tarefa/${id}`)
    }

    function newTask(){
        history.push('/cadastro_tarefa')
    }

    async function deleteTask(id: number){
        const response = await api.delete(`/tasks/${id}`)
    }

    async function viewTask(id: number){
        history.push(`/ver_tarefa/${id}`)
    }

    async function finishTask(id: number){
        const response = await api.patch(`/tasks/${id}`)
    }

    return (
        <div className="container">
            <br />
            <div className='task-header'>
                <h1>Página de Tarefas</h1>
                <Button variant='dark' size='sm' onClick={newTask}>Nova Tarefa</Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Data de atualização</th>
                    <th>Status</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       tasks.map(task => (
                           <tr key={task.id}>
                           <td>{task.id}</td>
                           <td>{task.title}</td>
                           <td>{formatDate(task.updated_at)}</td>
                           <td>{task.finished ? "Finalizado" : "Pendente"}</td>

                           <td>
                               <Button size='sm' variant='primary' disabled={task.finished} onClick={() => editTask(task.id)}>Editar</Button>
                               <Button size='sm' variant='success' onClick={() => viewTask(task.id)}>Vizualizar</Button>
                               <Button size='sm' variant='warning' disabled={task.finished} onClick={() => finishTask(task.id)}>Finalizar</Button>
                               <Button size='sm' variant='danger' onClick={() => deleteTask(task.id)}>Deletar</Button>
                           </td>
                           </tr> 
                       ))
                   }
                </tbody>
                </Table>
        </div>
    );
}
 
export default Tasks;
