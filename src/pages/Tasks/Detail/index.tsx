import moment from "moment"
import React, { useEffect, useState} from "react"
import { Button, Card } from "react-bootstrap"
import { useHistory, useParams } from "react-router-dom"
import api from "../../../Services/api"

interface ITask{
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Detail: React.FC = () => {

    var data = new Date("2000-01-01T00:00:00Z")

    const [task, setTask] = useState<ITask>({
        id: 0,
        title: '',
        description: '',
        finished: false,
        created_at: data,
        updated_at: data
    })

    const history = useHistory()
    const {id} = useParams<{id: string}>()

    useEffect(() => {
        findTask()
    }, [id])

    async function findTask(){
        const response = await api.get(`tasks/${id}`)
        setTask(response.data)
    }

    function formatDate(date : Date){
        return moment(date).format('DD/MM/YYYY')
    }

    function back(){
        history.goBack()
    }

        return (
            <div className="container">
                <br />
                <div className="task-header">
                    <h1>Detalhes da tarefa</h1>
                    <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
                </div>
                <br />

                <Card>
                    <Card.Body>
                        <Card.Title>{task?.title}</Card.Title>

                        <Card.Text>
                            {task?.description}
                            <br/>
                            {task?.finished ? "Finalizado" : "Pendente"}
                            < br/>
                            <strong>Data de cadastro: </strong>
                            {formatDate(task?.created_at)}
                            <br/>
                            <strong>Data de atualização: </strong>
                            {formatDate(task?.updated_at)}
                        </Card.Text>

                    </Card.Body>
                </Card>

            </div>
        )

}

export default Detail